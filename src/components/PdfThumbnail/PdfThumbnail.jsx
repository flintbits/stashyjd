import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

import { readFile } from "@tauri-apps/plugin-fs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export function PdfThumbnail({ filePath }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPdf = async () => {
      try {
        // read local file as bytes
        const fileBytes = await readFile(filePath);

        // convert to Uint8Array
        const pdfData = new Uint8Array(fileBytes);

        // load PDF from binary
        const pdf = await pdfjsLib.getDocument({
          data: pdfData,
        }).promise;

        const page = await pdf.getPage(1);

        const viewport = page.getViewport({
          scale: 0.5,
        });

        const canvas = canvasRef.current;

        if (!canvas) return;

        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;
      } catch (error) {
        console.error("Failed to render PDF thumbnail:", error);
      }
    };

    renderPdf();
  }, [filePath]);

  return (
    <div className="pdf-thumbnail">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default PdfThumbnail;
