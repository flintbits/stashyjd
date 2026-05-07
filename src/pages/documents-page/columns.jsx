import { formatSize } from "../../utils/formatFileSize";
import getIcon from "../../utils/getIcon";

function formatRelativeDate(dateStr) {
  if (!dateStr) return { relative: "", absolute: "" };

  const date = new Date(dateStr.replace(" ", "T"));
  const now = new Date();

  const diffMs = now - date;

  if (diffMs < 0) {
    return { relative: "Just now", absolute: "" };
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30.44);
  const diffYears = Math.floor(diffMonths / 12);

  let relative;

  if (diffMinutes < 5) {
    relative = "Just now";
  } else if (diffMinutes < 60) {
    relative = `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    relative = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffDays < 7) {
    relative = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffWeeks < 4) {
    relative = `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  } else if (diffMonths < 12) {
    relative = `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  } else {
    relative = `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  }

  const absolute =
    diffDays < 1
      ? date.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : date.toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

  return { relative, absolute };
}

export const document_table_columns = [
  {
    id: "select",
    header: ({ table }) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <input
          style={{ scale: 1.1 }}
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          ref={(el) => {
            if (!el) return;
            el.indeterminate = table.getIsSomeRowsSelected();
          }}
          onChange={table.getToggleAllRowsSelectedHandler()}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <input
          style={{ scale: 1.1 }}
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    ),
    enableSorting: false,
    size: 40,
    maxSize: 40,
    minSize: 40,
  },

  {
    accessorKey: "original_file_name",
    header: "File Name",
    enableColumnFilter: true,
    size: 300,
    minSize: 200,
    cell: ({ row, getValue }) => {
      const fileName = getValue();
      const mime = row.original.mime_type;

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontSize: "var(--text-xs))",
              flexShrink: 0,
            }}
          >
            {getIcon(mime)}
          </span>

          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={fileName}
          >
            {fileName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "document_type",
    header: "Type",
    enableColumnFilter: true,
    size: 120,
  },

  {
    accessorKey: "updated_at",
    header: "Uploaded At",
    enableColumnFilter: true,
    size: 200,
    cell: ({ getValue }) => {
      const value = getValue();
      const { relative, absolute } = formatRelativeDate(value);

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: "1.6",
            fontSize: "var(--text-xs))",
          }}
        >
          <span style={{ fontWeight: 500 }}>{relative}</span>

          <span
            style={{
              fontWeight: "var(--font-thin)",
              color: "var(--text-tertiary)",
            }}
          >
            {absolute}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "file_size",
    header: "Size",
    enableColumnFilter: true,
    size: 100,
  },
  {
    accessorKey: "file_size",
    header: "Size",
    enableColumnFilter: true,
    size: 100,
    cell: ({ getValue }) => formatSize(getValue()),
  },
];
