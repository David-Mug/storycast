# StoryCast

StoryCast is a storytelling website that helps people discover and experience meaningful stories through video, audio, and transcripts. It aims to make stories accessible and help people connect with different experiences, cultures, and perspectives.

## Features

- **Home:** Introduces StoryCast and highlights featured stories.
- **All Stories:** Allows users to explore available stories.
- **Story Details:** Displays a story's video or audio, description, and transcript.
- **About StoryCast:** Explains the platform's mission, vision, and values.
- **Responsive Design:** Works on desktop, tablet, and mobile devices.
- **Accessibility:** Designed to support different users through readable content and accessible media.

---

## Project Structure

```text
storycast/
├── index.html              Home page
├── stories.html            All stories page
├── about.html              About StoryCast page
├── story/
│   └── my-story.html       Shared story details page
├── sass/                   Sass styles and partials
├── css/
│   └── main.css            Compiled CSS
├── js/                     JavaScript files
├── assets/
│   ├── images/             Images and thumbnails
│   ├── audio/              Audio files
│   ├── video/              Video files
│   └── transcripts/        Story transcripts
└── documentation/
    └── storycast-research.pdf
```

*Note: The structure above reflects the intended project organization. Update it if your actual folders or filenames differ.*

---

## Current Stories

StoryCast currently includes five video stories. Four of them also have a separate audio version. Every story opens in the shared story details page, `story/my-story.html?id=story1` to `story5`, and its details come from `js/stories-data.js`. Media files are in `assets/video/` and `assets/audio/`, and transcripts are in `assets/transcripts/`.

| **Story** | **Format** | **Media** | **Captions** | **Transcript** |
|---|---|---|---|---|
| Muhammad Ali (`story1`) | Video + audio version · 1 min 50 s | `videoplayback(1).mp4`, `Audioplayback(1).mp3` | `story1-captions-en.vtt` | `story1.txt` (timestamped) |
| Jesse Owens: One of the Greatest Olympians Ever (`story2`) | Video + audio version · 3 min 40 s | `videoplayback(2).mp4`, `Audioplayback(2).mp3` | `story2-captions-en.vtt` | `story2.txt` (timestamped) |
| Are You In or Are You Out (`story3`) | Video · 2 min 3 s | `videoplayback(3).MP4` | Not available yet | Not available yet |
| Anne-Marie and Celestin: Forgiveness After the Rwandan Genocide (`story4`) | Video + audio version · 2 min 54 s | `videoplayback(4).mp4`, `Audioplayback(4).mp3` | Not available yet (English subtitles are burned into the video) | Not available yet |
| 57 Years Apart: A Boy and a Man Talk About Life (`story5`) | Video + audio version · 4 min 36 s | `videoplayback(5).mp4`, `Audioplayback(5).mp3` | `story5-captions-en.vtt` | `story5.txt` (timestamped, 6 chapters) |

*All five videos are third-party content (HISTORY, Biography, an unidentified music video, BBC News Africa and FACTS), shown for demonstration and credited on each story page.*

---

## Technologies Used

- **HTML5:** Structures the website content.
- **Sass (SCSS):** Organizes styles using reusable partials.
- **CSS Grid and Flexbox:** Create responsive page layouts.
- **JavaScript:** Supports interactive features and dynamic story content.
- **Figma:** Used to design the sitemap, wireframes, and high-fidelity mockups.

---

## Design

StoryCast uses a warm, editorial visual style to create a welcoming storytelling experience.

- **Primary background:** Cream (`#FAF7F2`)
- **Primary accent:** Terracotta (`#A95738`)
- **Main text:** Charcoal (`#252525`)
- **Fonts:** Manrope for headings and DM Sans for body text
- **Layout:** Responsive designs for desktop, tablet, and mobile.

---

## Running Locally

Open a terminal in the project folder and run:

```bash
python3 -m http.server 8000
```

Then open the following address in your browser:

```text
http://localhost:8000
```

---

## Project Goal

The goal of StoryCast is to make meaningful stories easy to discover, watch, listen to, and understand. By offering different ways to experience stories, the platform aims to make storytelling more accessible and bring people closer through shared experiences.

---

## Accessibility

StoryCast is designed with accessibility in mind, including:

- Semantic HTML elements.
- Responsive layouts for different screen sizes.
- Readable typography and clear visual hierarchy.
- Captions and transcripts for media where available.
- Keyboard-friendly navigation and visible focus states.

Accessibility features should be tested before claiming full WCAG compliance.

---

## Accessibility Checklist (WCAG 2.1 AA)

StoryCast aims to provide an accessible experience for users with different needs. The table below shows how each requirement is handled in the current code.

| **Requirement** | **Implementation** |
|---|---|
| **Semantic HTML** | Every page uses `<header>`, `<nav>`, `<main>`, `<section>` and `<footer>`. Story cards are `<article>` elements, and media uses native `<video>` and `<audio>`. |
| **Heading hierarchy** | Each page has one `<h1>`, followed by `<h2>` and `<h3>` in order. |
| **Keyboard navigation** | A "Skip to main content" link comes first on every page. All links, buttons, media controls and transcript timestamps can be reached and used with the keyboard. |
| **Visible focus** | A 3 px `:focus-visible` outline: charcoal on light backgrounds, peach on the dark footer and cream on the terracotta band. |
| **Text alternatives** | Story thumbnails and the About photo have descriptive `alt` text (from `js/stories-data.js` for stories). Decorative logos and icons use `alt=""` or `aria-hidden`. |
| **Video captions** | English WebVTT captions for `story1`, `story2` and `story5`, on by default. `story3` and `story4` do not have captions yet, and their story pages say so. |
| **Audio transcripts** | Timestamped transcripts for `story1`, `story2` and `story5`, shown on the story page with a TXT download. Each timestamp moves the video to that point. `story3` and `story4` do not have transcripts yet. |
| **Colour contrast** | Text colours were measured against their backgrounds: charcoal on cream 14.34:1, gray 6.98:1, links `#8A4329` 6.74:1, white on terracotta 5.11:1, and footer links 8.37:1 on charcoal. |
| **Responsive design** | Mobile-first CSS Grid and Flexbox. The story grid has 1, 2 or 3 columns, and story cards use a container query. Pages reflow down to 320 px without horizontal scrolling. |
| **Readable typography** | Body text is 16–18 px (fluid `clamp()`) with 1.6 line height and lines of about 65 characters. Manrope is used for headings and DM Sans for body text. |
| **Accessible links and buttons** | Labels describe the destination, for example "Watch Story: Muhammad Ali" (title in visually hidden text) and "Page 2" on pagination. The current page uses `aria-current="page"`. |
| **Reduced motion** | `prefers-reduced-motion: reduce` turns off smooth scrolling and transitions (`sass/_base.scss`). |
| **Language** | Every page has `<html lang="en">`. |

**Testing:** The site was checked in Google Chrome with the W3C Nu HTML Checker (0 errors on all four pages), real keyboard input (Tab, Enter, Space; no keyboard traps), layout tests at widths from 320 px to 1280 px, and automated contrast checks. It has not yet been tested with a screen reader (VoiceOver or NVDA) or in other browsers. Captions and transcripts are still missing for `story3` and `story4`, so the site does not yet meet WCAG 2.1 success criterion 1.2.2 (Captions) for those videos and cannot claim full compliance.
