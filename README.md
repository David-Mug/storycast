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
