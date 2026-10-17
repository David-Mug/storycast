// =============================================================
// Story list pagination (vanilla JavaScript)
//
// Progressive enhancement: the HTML contains every story card, so
// without JavaScript all stories are simply visible. When this script
// runs it shows one page of cards at a time and builds the Previous /
// page number / Next buttons below the list.
//
// Markup it expects on the list:
//   data-paginate             marks the list to paginate
//   data-per-page="6"         cards per page
//   data-status="id"          element that describes the current page
//   data-pagination="id"      empty <nav> that receives the buttons
// =============================================================

(function () {
  "use strict";

  const list = document.querySelector("[data-paginate]");
  if (!list) {
    return;
  }

  const perPage = Number(list.dataset.perPage) || 6;
  const status = document.getElementById(list.dataset.status);
  const nav = document.getElementById(list.dataset.pagination);
  const items = Array.from(list.children);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  let currentPage = 1;
  let previousButton;
  let nextButton;
  const pageButtons = [];

  // ---------- Build the controls ----------

  function createButton(label, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pagination__button " + className;
    button.innerHTML = label;
    return button;
  }

  function buildControls() {
    const listElement = document.createElement("ul");
    listElement.className = "pagination__list";

    previousButton = createButton(
      '<span aria-hidden="true">&larr;</span> Previous',
      "pagination__button--step"
    );
    previousButton.addEventListener("click", function () {
      goToPage(currentPage - 1, true);
    });
    listElement.appendChild(wrapInListItem(previousButton));

    for (let page = 1; page <= totalPages; page += 1) {
      const button = createButton(String(page), "pagination__button--page");
      // "Page 2" is read out instead of just "2".
      button.setAttribute("aria-label", "Page " + page);
      button.addEventListener("click", function () {
        goToPage(page, true);
      });
      pageButtons.push(button);
      listElement.appendChild(wrapInListItem(button));
    }

    nextButton = createButton(
      'Next <span aria-hidden="true">&rarr;</span>',
      "pagination__button--step"
    );
    nextButton.addEventListener("click", function () {
      goToPage(currentPage + 1, true);
    });
    listElement.appendChild(wrapInListItem(nextButton));

    nav.appendChild(listElement);
  }

  function wrapInListItem(element) {
    const item = document.createElement("li");
    item.appendChild(element);
    return item;
  }

  // ---------- Show a page ----------

  function goToPage(page, moveFocus) {
    currentPage = Math.min(Math.max(page, 1), totalPages);

    const start = (currentPage - 1) * perPage;
    const end = Math.min(start + perPage, totalItems);

    items.forEach(function (item, index) {
      item.hidden = index < start || index >= end;
    });

    updateStatus(start, end);

    if (totalPages > 1) {
      previousButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;

      pageButtons.forEach(function (button, index) {
        if (index + 1 === currentPage) {
          button.setAttribute("aria-current", "page");
        } else {
          button.removeAttribute("aria-current");
        }
      });

      // Keep the page number in the address bar so a refresh or a
      // shared link opens the same page. No page reload happens.
      const url = new URL(window.location.href);
      if (currentPage === 1) {
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", currentPage);
      }
      window.history.replaceState(null, "", url);
    }

    // After a button press, move focus to the status line above the
    // list. Screen readers read it once ("Page 2 of 3..."), and
    // keyboard users continue from the top of the new cards.
    if (moveFocus && status) {
      status.focus();
    }
  }

  function updateStatus(start, end) {
    if (!status) {
      return;
    }
    if (totalItems === 0) {
      status.textContent = "No stories are available yet. Please check back soon.";
    } else if (totalPages === 1) {
      status.textContent =
        "Showing all " + totalItems + (totalItems === 1 ? " story" : " stories");
    } else {
      status.textContent =
        "Page " + currentPage + " of " + totalPages +
        ": showing stories " + (start + 1) + " to " + end + " of " + totalItems;
    }
  }

  // ---------- Start ----------

  // Pagination is only needed when there is more than one page.
  if (totalPages > 1 && nav) {
    buildControls();
    nav.hidden = false;
  }

  const requestedPage = Number(new URL(window.location.href).searchParams.get("page"));
  goToPage(Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1, false);
})();
