let touchStartX = 0;
let touchStartY = 0;
let touchMoved = false;
const MOVE_THRESHOLD = 10; // pixels
if (typeof window !== "undefined") {
  window.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    }
  }, { passive: true });
  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      const dx = Math.abs(e.touches[0].clientX - touchStartX);
      const dy = Math.abs(e.touches[0].clientY - touchStartY);
      if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
        touchMoved = true;
      }
    }
  }, { passive: true });
}
export function wasScrolling(): boolean {
  return touchMoved;
}
