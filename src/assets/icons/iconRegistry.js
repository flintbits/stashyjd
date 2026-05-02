import { MdSpaceDashboard } from "react-icons/md";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { CgSoftwareUpload } from "react-icons/cg";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaTriangleExclamation } from "react-icons/fa6";
import { MdInfo } from "react-icons/md";

export const ICONS = {
  DashboardIcon: MdSpaceDashboard,
  ApplicationIcon: BsFillSuitcaseLgFill,
  SettingsIcon: IoSettingsSharp,
  DocumentsIcon: HiDocumentText,
  CloseIcon: IoClose,
  UploadIcon: CgSoftwareUpload,
  AddIcon: null,
  CircleAddIcon: MdOutlineAddCircleOutline,

  SuccessIcon: FaCheckCircle,
  ErrorIcon: FaCircleExclamation,
  WaringIcon: FaTriangleExclamation,
  InfoIcon: MdInfo,
};
