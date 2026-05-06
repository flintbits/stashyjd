import { useEffect, useRef, useState } from "react";

export default function useDynamicRows(rowHeight = 56, extraOffset = 80) {
  const containerRef = useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      const height = el.clientHeight;

      const headerHeight = el.querySelector("thead")?.offsetHeight ?? 0;

      // subtract header + pagination height
      const usableHeight = height - usableHeight;

      const rows = Math.floor(usableHeight / rowHeight);
      setRowsPerPage(rows > 0 ? rows : 1);
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { containerRef, rowsPerPage };
}
