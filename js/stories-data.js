// =============================================================
// StoryCast story data
//
// One entry per video. story/my-story.html reads ?id=... from the URL
// and shows the matching entry. All paths are relative to the project
// root; the story page adds "../" because it lives in story/.
//
// Fields:
//   id             value used in the URL (my-story.html?id=story1)
//   title          shown as the page heading and card title
//   category       short label above the title
//   description    one or two sentences about the video
//   duration       human-readable length, measured from the file
//   video          MP4 file
//   videoHasSound  false when the MP4 has no audio track
//   audio          separate MP3 of the same soundtrack, or null
//   poster         16:9 still taken from the video
//   posterAlt      text alternative for the poster on cards
//   onScreenText   note about text burned into the picture, or null
//   captions       WebVTT file, or null when not yet available
//   transcript     plain-text transcript file, or null when none is
//                  available. The timestamped lines shown on the page
//                  are in js/transcripts-data.js, under the same ID.
//   source         who made the video (shown as a credit)
// =============================================================

const STORYCAST_STORIES = [
  {
    id: "story1",
    title: "Muhammad Ali",
    category: "Biography · Sport",
    description: "An animated short from HISTORY about the life and boxing career of Muhammad Ali.",
    duration: "1 min 50 s",
    video: "assets/video/videoplayback(1).mp4",
    videoHasSound: true,
    audio: "assets/audio/Audioplayback(1).mp3",
    poster: "assets/images/story1-poster-960.jpg",
    posterAlt: "Animated illustration of Muhammad Ali in a suit, holding a championship belt beside a boxing ring.",
    onScreenText: null,
    captions: "assets/video/story1-captions-en.vtt",
    transcript: "assets/transcripts/story1.txt",
    source: "HISTORY (third-party video)",
  },
  {
    id: "story2",
    title: "Jesse Owens: One of the Greatest Olympians Ever",
    category: "Biography · Sport",
    description: "A Biography mini-bio of Jesse Owens: his records at Ohio State, his four gold medals at the 1936 Berlin Olympics, and the discrimination he still faced at home.",
    duration: "3 min 40 s",
    video: "assets/video/videoplayback(2).mp4",
    videoHasSound: true,
    audio: "assets/audio/Audioplayback(2).mp3",
    poster: "assets/images/story2-poster-960.jpg",
    posterAlt: "Black-and-white archive film of a sprinter leading a race in a packed Olympic stadium.",
    onScreenText: null,
    captions: "assets/video/story2-captions-en.vtt",
    transcript: "assets/transcripts/story2.txt",
    source: "Biography / bio. (third-party video)",
  },
  {
    id: "story3",
    title: "Are You In or Are You Out",
    category: "Music",
    description: "A black-and-white music video of a band writing, rehearsing and playing together, with some lyrics shown on screen.",
    duration: "2 min 3 s",
    video: "assets/video/videoplayback(3).MP4",
    videoHasSound: true,
    audio: null,
    poster: "assets/images/story3-poster-960.jpg",
    posterAlt: "Black-and-white photo of three musicians playing guitars outdoors beside a building.",
    onScreenText: "Some song lyrics appear as text at the bottom of the picture. They are not full captions.",
    captions: null,
    transcript: null,
    source: "Artist not yet identified (third-party video)",
  },
  {
    id: "story4",
    title: "Anne-Marie and Celestin: Forgiveness After the Rwandan Genocide",
    category: "Reconciliation",
    description: "BBC News Africa meets Anne-Marie, who lost four children and her husband in the Rwandan genocide, and Celestin, the man who has admitted killing her children. A priest helped her to forgive him.",
    duration: "2 min 54 s",
    video: "assets/video/videoplayback(4).mp4",
    videoHasSound: true,
    audio: "assets/audio/Audioplayback(4).mp3",
    poster: "assets/images/story4-poster-960.jpg",
    posterAlt: "A man and a woman in a blue patterned dress walking together along a red dirt road between banana plants.",
    onScreenText: "English subtitles are part of the picture (open captions). They cannot be turned off or restyled.",
    captions: null,
    transcript: null,
    source: "BBC News Africa (third-party video)",
  },
  {
    id: "story5",
    title: "57 Years Apart: A Boy and a Man Talk About Life",
    category: "Conversation · Generations",
    description: "From FACTS: a young boy and an older man sit facing each other, ask each other questions about life and give each other advice.",
    duration: "4 min 36 s",
    video: "assets/video/videoplayback(5).mp4",
    videoHasSound: true,
    audio: "assets/audio/Audioplayback(5).mp3",
    poster: "assets/images/story5-poster-960.jpg",
    posterAlt: "A young boy and an older man sitting on chairs facing each other in a white studio, the boy gesturing as he talks.",
    onScreenText: "Short text cards appear between parts of the conversation.",
    captions: "assets/video/story5-captions-en.vtt",
    transcript: "assets/transcripts/story5.txt",
    source: "FACTS (third-party video)",
  },
];
