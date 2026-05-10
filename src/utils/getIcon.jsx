import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFile,
} from "react-icons/fa";

export default function getIcon(mime) {
  if (!mime) return <FaFile />;

  if (mime.includes("pdf")) return <FaFilePdf color="#e53935" />;
  if (mime.includes("word")) return <FaFileWord color="#2b579a" />;
  if (mime.includes("excel")) return <FaFileExcel color="#217346" />;
  if (mime.includes("image")) return <FaFileImage color="#8e44ad" />;

  return <FaFile />;
}
