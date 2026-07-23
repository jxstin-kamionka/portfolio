/** Drives the portfolio slideshow from progress through its sticky track. */
const portfolioTrack = document.querySelector(".portfolio-list");
const portfolioStage = document.querySelector(".portfolio-sticky");
const portfolioItems = document.querySelectorAll(".portfolio-list .portfolio-item");

/**
 * Scrubs each portfolio screenshot GIF frame-by-frame with scroll position,
 * using the browser's native WebCodecs ImageDecoder (Chrome/Edge, Firefox 130+,
 * Safari 26+) instead of a build step or library. Where it isn't supported,
 * the <img> is simply left alone and plays as a normal looping GIF.
 */
const portfolioScrubbers = new Map();

/**
 * Creates a queued GIF-frame renderer that drops stale decode requests.
 *
 * @param {ImageDecoder} decoder - Browser image decoder for the GIF.
 * @param {HTMLCanvasElement} canvas - Canvas receiving decoded frames.
 * @returns {(frameIndex: number) => void} Function that requests a frame.
 */
function makeFrameDrawer(decoder, canvas) {
  const ctx = canvas.getContext("2d");
  let wantedFrame = null;
  let drawing = false;

  /**
   * Decodes the latest requested frame until no request remains.
   *
   * @returns {Promise<void>}
   */
  async function drainQueue() {
    if (drawing) return;
    drawing = true;
    while (wantedFrame !== null) {
      const frameIndex = wantedFrame;
      wantedFrame = null;
      try {
        const { image } = await decoder.decode({ frameIndex });
        canvas.width = image.displayWidth;
        canvas.height = image.displayHeight;
        ctx.drawImage(image, 0, 0);
        image.close();
      } catch {
        // Scroll moved past this frame before decoding finished - ignore.
      }
    }
    drawing = false;
  }

  return (frameIndex) => {
    wantedFrame = frameIndex;
    drainQueue();
  };
}

/**
 * Replaces a GIF image with a canvas once its frames are decodable.
 *
 * @param {Element} item - Portfolio item associated with the image.
 * @param {HTMLImageElement} img - GIF image to make scroll-controlled.
 * @returns {Promise<void>}
 */
async function createPortfolioScrubber(item, img) {
  if (!("ImageDecoder" in window)) return;

  try {
    const response = await fetch(img.currentSrc || img.src);
    if (!response.ok) return;
    const data = await response.arrayBuffer();
    const decoder = new ImageDecoder({ data, type: "image/gif" });
    await decoder.tracks.ready;
    const frameCount = decoder.tracks.selectedTrack?.frameCount;
    if (!frameCount) return;

    const canvas = document.createElement("canvas");
    canvas.className = img.className;
    img.replaceWith(canvas);
    portfolioScrubbers.set(item, {
      frameCount,
      draw: makeFrameDrawer(decoder, canvas),
    });
  } catch {
    // Keep the original looping GIF when loading or decoding is unavailable.
  }
}

portfolioItems.forEach((item) => {
  const img = item.querySelector(".portfolio-screenshot");
  if (img) createPortfolioScrubber(item, img);
});

/**
 * Restricts a numeric value to the inclusive range from zero to one.
 *
 * @param {number} value - Number to constrain.
 * @returns {number} Constrained number.
 */
function clampProgress(value) {
  return Math.min(Math.max(value, 0), 1);
}

/**
 * Calculates normalized progress through the portfolio track.
 *
 * @returns {number} Scroll progress between zero and one.
 */
function getPortfolioProgress() {
  const rect = portfolioTrack.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  return scrollable > 0 ? clampProgress(-rect.top / scrollable) : 0;
}

/**
 * Shows the frame matching the progress through an item's segment.
 *
 * @param {Element} item - Portfolio item whose frame should change.
 * @param {number} localProgress - Item progress between zero and one.
 * @returns {void}
 */
function updatePortfolioFrame(item, localProgress) {
  const scrubber = portfolioScrubbers.get(item);
  if (!scrubber) return;
  scrubber.draw(Math.round(localProgress * (scrubber.frameCount - 1)));
}

/**
 * Updates one portfolio item for the current scroll segment.
 *
 * @param {Element} item - Portfolio item to update.
 * @param {number} index - Zero-based item index.
 * @param {number} progress - Overall portfolio progress.
 * @param {number} segment - Normalized size of one item segment.
 * @param {number} activeIndex - Index of the visible item.
 * @returns {void}
 */
function updatePortfolioItem(item, index, progress, segment, activeIndex) {
  item.classList.toggle("is-active", index === activeIndex);
  const localProgress = clampProgress((progress - index * segment) / segment);
  updatePortfolioFrame(item, localProgress);
}

/**
 * Moves the stage glow and records the active project.
 *
 * @param {number} progress - Overall portfolio progress.
 * @param {number} activeIndex - Index of the visible item.
 * @returns {void}
 */
function updatePortfolioGlow(progress, activeIndex) {
  const shift = (progress - 0.5) * 90;
  if (!portfolioStage) return;
  portfolioStage.dataset.activeProject = String(activeIndex);
  portfolioStage.style.setProperty("--stage-glow-y", `${shift * 1.8}px`);
}

/**
 * Selects and positions portfolio items for the current scroll position.
 *
 * @returns {void}
 */
function updatePortfolio() {
  if (!portfolioTrack || !portfolioItems.length) return;
  const progress = getPortfolioProgress();
  const segment = 1 / portfolioItems.length;
  const activeIndex = Math.min(portfolioItems.length - 1, Math.floor(progress / segment));
  portfolioItems.forEach((item, index) => {
    updatePortfolioItem(item, index, progress, segment, activeIndex);
  });
  updatePortfolioGlow(progress, activeIndex);
}

/**
 * Connects portfolio updates to scrolling and viewport resizing.
 *
 * @returns {void}
 */
function initializePortfolio() {
  if (!portfolioTrack) return;
  window.addEventListener("scroll", updatePortfolio, { passive: true });
  window.addEventListener("resize", updatePortfolio);
  updatePortfolio();
}

initializePortfolio();
