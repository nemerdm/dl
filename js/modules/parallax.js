/**
 * Parallax Blob Effect
 * Tworzy efekt 3D poprzez poruszanie blobów z różną prędkością przy scrollowaniu
 */

export function initParallaxBlobs() {
  const blobs = document.querySelectorAll('[data-parallax]');

  if (blobs.length === 0) {
    return;
  }

  // Throttle dla wydajności
  let ticking = false;

  function updateBlobPositions() {
    const scrollY = window.scrollY;

    blobs.forEach(blob => {
      const speed = parseFloat(blob.dataset.parallax) || 0.1;
      const yOffset = scrollY * speed;

      // Użyj transform dla lepszej wydajności (GPU accelerated)
      blob.style.transform = `translateY(${yOffset}px)`;
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateBlobPositions);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial pozycje
  updateBlobPositions();
}
