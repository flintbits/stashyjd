import { useEffect } from "react";

export default function useResizable(ref, onResize, direction = "right") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startWidth = 0;

    const onMouseMove = (e) => {
      const delta = e.clientX - startX;
      if (direction === "right") {
        onResize(startWidth + delta);
      } else {
        onResize(startWidth - delta);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
    };

    const onMouseDown = (e) => {
      startX = e.clientX;
      if (direction === "right") {
        startWidth = el.previousElementSibling ? el.previousElementSibling.offsetWidth : 0;
      } else {
        startWidth = el.nextElementSibling ? el.nextElementSibling.offsetWidth : 0;
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "col-resize";
      e.preventDefault();
    };

    el.addEventListener("mousedown", onMouseDown);

    return () => el.removeEventListener("mousedown", onMouseDown);
  }, [ref, onResize, direction]);
}
