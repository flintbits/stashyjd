import {
  LuLayoutDashboard,
  LuBriefcase,
  LuSettings,
  LuX,
  LuCloudUpload,
  LuPlus,
  LuCirclePlus,
  LuCircleCheck,
  LuCircleAlert,
  LuTriangleAlert,
  LuInfo,
  LuFile,
  LuCalendar,
  LuFileStack,
  LuFileText,
  LuFileScan,
  LuTrash2,
  LuEye,
  LuDownload,
} from "react-icons/lu";

import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";

export const ICONS = {
  DashboardIcon: LuLayoutDashboard,
  ApplicationIcon: LuBriefcase,
  SettingsIcon: LuSettings,
  DocumentsIcon: LuFileText,
  CloseIcon: LuX,
  UploadIcon: LuCloudUpload,
  DownloadIcon: LuDownload,
  AddIcon: LuPlus,
  CircleAddIcon: LuCirclePlus,
  CalendarIcon: LuCalendar,
  DeleteIcon: LuTrash2,
  PreviewIcon: LuEye,

  SuccessIcon: LuCircleCheck,
  ErrorIcon: LuCircleAlert,
  WaringIcon: LuTriangleAlert,
  InfoIcon: LuInfo,

  UnsortedIcon: FaSort,
  DownSortIcon: FaSortDown,
  UpSortIcon: FaSortUp,

  //documents Page
  AllDocumentsIcon: LuFileStack,
  AllResumeIcon: LuFileText,
  AllCoverLetterIcon: LuFileScan,
};
