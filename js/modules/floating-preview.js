/**
 * @fileoverview Floating Preview Module
 * @description Implementuje efekt pływającego podglądu projektu podążającego za kursorem.
 * @module floating-preview
 */

/**
 * Inicjalizuje floating preview dla sekcji portfolio V2
 */
export function initFloatingPreview() {
  const container = document.getElementById('portfolio');
  const preview = document.getElementById('floating-preview');
  const previewImage = document.getElementById('floating-preview-img');
  const cursor = document.getElementById('floating-cursor');

  if (!container || !preview || !previewImage) {
    return;
  }

  const projectItems = container.querySelectorAll('.project-item-v2');

  if (projectItems.length === 0) {
    return;
  }

  // Stan pozycji (dla lerp)
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let isVisible = false;
  let animationId = null;

  // Lerp factor (0.1 = płynne, 0.3 = szybsze)
  const lerpFactor = 0.12;

  /**
   * Linear interpolation
   */
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  /**
   * Animacja pozycji preview
   */
  function animate() {
    currentX = lerp(currentX, targetX, lerpFactor);
    currentY = lerp(currentY, targetY, lerpFactor);

    preview.style.transform = `translate(${currentX}px, ${currentY}px)`;

    if (isVisible) {
      animationId = requestAnimationFrame(animate);
    }
  }

  /**
   * Mouse move handler
   */
  function handleMouseMove(e) {
    // Preview 450x281 - pozycjonujemy tak, żeby ŚRODEK preview był na kursorze
    targetX = e.clientX - 225; // połowa szerokości (450/2)
    targetY = e.clientY - 140; // połowa wysokości (~281/2)
  }

  /**
   * Mouse enter na projekt
   */
  function handleProjectEnter(e) {
    const item = e.currentTarget;
    const imageSrc = item.dataset.preview;

    if (imageSrc) {
      previewImage.src = imageSrc;
    }

    // Pokaż preview
    preview.classList.remove('opacity-0', 'scale-90');
    preview.classList.add('opacity-100', 'scale-100');

    // Aktywuj kursor
    if (cursor) {
      cursor.classList.add('scale-110');
    }

    isVisible = true;
    if (!animationId) {
      animate();
    }
  }

  /**
   * Mouse leave z projektu
   */
  function handleProjectLeave() {
    preview.classList.remove('opacity-100', 'scale-100');
    preview.classList.add('opacity-0', 'scale-90');

    if (cursor) {
      cursor.classList.remove('scale-110');
    }

    isVisible = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  // Event listeners
  container.addEventListener('mousemove', handleMouseMove);

  projectItems.forEach(item => {
    item.addEventListener('mouseenter', handleProjectEnter);
    item.addEventListener('mouseleave', handleProjectLeave);
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
}
