import { formatRelativeDate } from "../../utils/formatDate";
import { formatSize } from "../../utils/formatFileSize";
import getIcon from "../../utils/getIcon";

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
    accessorKey: "file_size_temp",
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
