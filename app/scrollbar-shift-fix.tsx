"use client";
import { useEffect } from "react";

/**
 * Prevents layout shift when the page is scroll-locked
 * (e.g., when modals set body { overflow: hidden } or add a "modal-open" class).
 * It adds right padding equal to the scrollbar width while locked.
 */
export default function ScrollbarShiftFix() {
  useEffect(() => {
    const docEl = document.documentElement;
    const body = document.body;

    const getScrollbarWidth = () =>
      window.innerWidth - docEl.clientWidth; // works across platforms

    const apply = () => {
      const locked =
        body.style.overflow === "hidden" ||
        docEl.style.overflow === "hidden" ||
        body.classList.contains("modal-open") ||
        docEl.classList.contains("modal-open");
      const w = getScrollbarWidth();
      if (locked && w > 0) {
        body.style.paddingRight ||= `${w}px`;
        docEl.style.setProperty("--scrollbar-width", `${w}px`);
      } else {
        // remove only if we set it
        if (body.style.paddingRight) body.style.paddingRight = "";
        docEl.style.removeProperty("--scrollbar-width");
      }
    };

    // Observe style/class changes that typically happen during modal open/close
    const observer = new MutationObserver(apply);
    observer.observe(body, { attributes: true, attributeFilter: ["style", "class"] });
    observer.observe(docEl, { attributes: true, attributeFilter: ["style", "class"] });

    // Recompute on resize (scrollbar width can change)
    const onResize = () => apply();
    window.addEventListener("resize", onResize);

    // Initial run
    apply();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      // cleanup any padding we added
      if (body.style.paddingRight) body.style.paddingRight = "";
      docEl.style.removeProperty("--scrollbar-width");
    };
  }, []);

  return null;
}
