import { formatRelativeDate } from "../../utils/formatDate";
import { formatSalaryRange } from "../../utils/formatPrice";
import AvatarLetter from "../../components/AvatarLetter/AvatarLetter";

export const application_table_columns = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        ref={(el) => {
          if (!el) return;
          el.indeterminate = table.getIsSomeRowsSelected();
        }}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    size: 40,
    maxSize: 40,
    minSize: 40,
  },

  {
    accessorKey: "company_name",
    header: "Company",
    size: 220,
    minSize: 180,

    cell: ({ row, getValue }) => {
      const company = getValue();
      const role = row.original.role_title;

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            gap: 18,
          }}
        >
          <AvatarLetter name={company} size="small" />
          <span
            style={{
              fontSize: "var(--text-xs))",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {company}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "role_title",
    header: "Role",
    size: 180,

    cell: ({ row }) => {
      const role = row.original.role_title;
      return (
        <span
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {role}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Stage",
    size: 120,

    cell: ({ getValue }) => {
      const value = getValue();

      return (
        <span className={`status-badge ${value?.toLowerCase()}`}>{value}</span>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    size: 180,

    cell: ({ getValue }) => (
      <span
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {getValue() || "—"}
      </span>
    ),
  },

  {
    accessorKey: "created_at",
    header: "Applied",
    size: 180,

    cell: ({ getValue }) => {
      const value = getValue();

      const { relative, absolute } = formatRelativeDate(value);

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: "1.4",
          }}
        >
          <span style={{ fontWeight: 500 }}>{absolute}</span>

          {/* <span
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
            }}
          >
            {absolute}
          </span> */}
        </div>
      );
    },
  },
];
