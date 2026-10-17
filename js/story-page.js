// =============================================================
// Shared story page (story/my-story.html)
//
// Reads ?id=... from the address bar, finds that story in
// STORYCAST_STORIES (js/stories-data.js) and fills the page template.
// Unknown or missing IDs show a "story not found" message instead of
// an unrelated video. Text is set with textContent, so nothing from
// the URL is ever inserted as HTML.
// =============================================================

(function () {
  "use strict";

  // The page lives in story/, data paths are relative to the root.
  const ROOT = "../";

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("id");
  const stories = typeof STORYCAST_STORIES !== "undefined" ? STORYCAST_STORIES : [];
  const story = stories.find(function (item) {
    return item.id === requestedId;
  });

  if (story) {
    showStory(story);
  } else {
    showNotFound(requestedId);
  }

  // ---------- Helpers ----------

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (text) {
      node.textContent = text;
    }
    return node;
  }

  function link(href, text, className) {
    const a = el("a", className, text);
    a.href = href;
    return a;
  }

  function badges(item) {
    const labels = ["Video · " + item.duration];
    if (item.audio) {
      labels.push("Audio version");
    }
    if (item.captions) {
      labels.push("Captions");
    }
    if (item.transcript) {
      labels.push("Transcript");
    }
    return labels;
  }

  function badgeList(labels) {
    const list = el("ul", "badge-list");
    list.setAttribute("aria-label", "Story details");
    labels.forEach(function (label) {
      list.appendChild(el("li", "badge", label));
    });
    return list;
  }

  // ---------- Story found ----------

  function showStory(item) {
    document.title = item.title + " | StoryCast";

    document.getElementById("story-category").textContent = item.category;
    document.getElementById("story-title").textContent = item.title;
    document.getElementById("story-description").textContent = item.description;
    document.getElementById("story-badges").replaceWith(badgeList(badges(item)));

    fillVideo(item);
    fillAudio(item);
    fillTranscript(item);
    document.getElementById("story-source").textContent =
      "Source: " + item.source + ". Shown on this student prototype for demonstration only.";
    fillRelated(item);

    document.getElementById("story").hidden = false;
  }

  function fillVideo(item) {
    const video = document.getElementById("story-video");
    video.poster = ROOT + item.poster;

    const source = el("source");
    source.src = ROOT + item.video;
    source.type = "video/mp4";
    video.appendChild(source);

    if (item.captions) {
      const track = el("track");
      track.kind = "captions";
      track.src = ROOT + item.captions;
      track.srclang = "en";
      track.label = "English";
      track.default = true;
      video.appendChild(track);
    }

    // Shown only by browsers that cannot play the video.
    const fallback = el("p", null, "Your browser cannot play this video. ");
    fallback.appendChild(link(ROOT + item.video, "Download the video (MP4)"));
    video.appendChild(fallback);
    video.load();

    // Caption under the player: honest notes about captions and sound.
    const caption = document.getElementById("story-video-caption");
    const notes = [];
    notes.push(item.captions
      ? "Video with English captions."
      : "Closed captions are not available for this video yet.");
    if (item.onScreenText) {
      notes.push(item.onScreenText);
    }
    if (!item.videoHasSound && item.audio) {
      notes.push("This video file has no sound of its own. Play the audio version below to hear it.");
    }
    caption.textContent = notes.join(" ") + " ";
    caption.appendChild(link("#transcript", "Go to the transcript section"));
    caption.appendChild(document.createTextNode("."));
  }

  function fillAudio(item) {
    const section = document.getElementById("audio");
    if (!item.audio) {
      section.hidden = true;
      return;
    }
    const audio = document.getElementById("story-audio");
    const source = el("source");
    source.src = ROOT + item.audio;
    source.type = "audio/mpeg";
    audio.appendChild(source);
    const fallback = el("p", null, "Your browser cannot play this audio. ");
    fallback.appendChild(link(ROOT + item.audio, "Download the audio (MP3)"));
    audio.appendChild(fallback);
    audio.load();

    document.getElementById("audio-download").href = ROOT + item.audio;
  }

  function fillTranscript(item) {
    const container = document.getElementById("story-transcript");
    const lines = typeof STORYCAST_TRANSCRIPTS !== "undefined" ? STORYCAST_TRANSCRIPTS[item.id] : null;
    if (!lines || lines.length === 0) {
      container.appendChild(el("p", "transcript__missing",
        "A verified transcript for this video is not available yet. " +
        "We only publish transcripts that have been checked against the recording."));
      return;
    }

    const intro = el("p", "transcript__intro",
      "Transcript supplied with the video. Select a time to move the video to that point. ");
    if (item.transcript) {
      intro.appendChild(link(ROOT + item.transcript, "Download the transcript (TXT)"));
    }
    container.appendChild(intro);

    // Chapter entries start a new heading and list; other entries are lines.
    let list = null;
    lines.forEach(function (line) {
      if (line.chapter) {
        container.appendChild(el("h3", "transcript__chapter", line.chapter));
        list = null;
        return;
      }
      if (!list) {
        list = el("ol", "transcript");
        container.appendChild(list);
      }
      const row = el("li", "transcript__line");
      const time = el("button", "transcript__time", line.time);
      time.type = "button";
      time.setAttribute("aria-label", "Move video to " + line.time);
      time.addEventListener("click", function () {
        seekTo(toSeconds(line.time));
      });
      row.appendChild(time);
      row.appendChild(el("span", "transcript__text", line.text));
      list.appendChild(row);
    });
  }

  function toSeconds(time) {
    const parts = time.split(":").map(Number);
    return parts[0] * 60 + parts[1];
  }

  // Move the video (and the audio version, if present) to a time.
  function seekTo(seconds) {
    ["story-video", "story-audio"].forEach(function (mediaId) {
      const media = document.getElementById(mediaId);
      if (media && media.querySelector("source")) {
        media.currentTime = seconds;
      }
    });
  }

  function fillRelated(item) {
    const others = stories.filter(function (other) {
      return other.id !== item.id;
    });
    const section = document.getElementById("related");
    if (others.length === 0) {
      section.hidden = true;
      return;
    }
    // The next three stories after this one, wrapping around the list.
    const start = stories.indexOf(item);
    const related = [];
    for (let i = 1; related.length < Math.min(3, others.length); i += 1) {
      related.push(stories[(start + i) % stories.length]);
    }

    const list = document.getElementById("related-list");
    related.forEach(function (other) {
      list.appendChild(relatedCard(other));
    });
  }

  function relatedCard(other) {
    const item = el("li", "story-grid__item");
    const card = el("article", "story-card story-card--linked");

    const media = el("div", "story-card__media");
    const img = el("img");
    img.src = ROOT + other.poster.replace("-960.jpg", "-480.jpg");
    img.srcset = ROOT + other.poster.replace("-960.jpg", "-480.jpg") + " 480w, " + ROOT + other.poster + " 960w";
    img.sizes = "(min-width: 64em) 24rem, (min-width: 40em) 50vw, 100vw";
    img.width = 480;
    img.height = 270;
    img.alt = other.posterAlt;
    img.loading = "lazy";
    media.appendChild(img);

    const body = el("div", "story-card__body");
    body.appendChild(el("p", "story-card__category", other.category));
    body.appendChild(el("h3", "story-card__title", other.title));
    body.appendChild(el("p", "story-card__description", other.description));

    const footer = el("div", "story-card__footer");
    footer.appendChild(badgeList(badges(other)));
    const watch = link("my-story.html?id=" + encodeURIComponent(other.id), "Watch Story",
      "button button--primary story-card__link");
    watch.appendChild(el("span", "visually-hidden", ": " + other.title));
    footer.appendChild(watch);
    body.appendChild(footer);

    card.appendChild(media);
    card.appendChild(body);
    item.appendChild(card);
    return item;
  }

  // ---------- Story not found ----------

  function showNotFound(id) {
    document.title = "Story not found | StoryCast";
    const message = document.getElementById("story-error-message");
    if (id === null || id === "") {
      message.textContent = "No story was selected. Choose a story from the full list to watch it here.";
    } else {
      message.textContent = "We could not find a story called “" + id +
        "”. The link may be out of date. Choose a story from the full list instead.";
    }
    document.getElementById("story-error").hidden = false;
  }
})();
