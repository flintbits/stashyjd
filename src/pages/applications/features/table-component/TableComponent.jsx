import React from "react";
import { TABLEDATA, TABLEHEADERS } from "../../configs";
import AvatarLetter from "../../../../widgets/avatar-letter/AvatarLetter";
import "./TableComponent.css";

export default function TableComponent() {
  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          {TABLEHEADERS.map((col) => (
            <th key={col.id} className="table-header-text">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {TABLEDATA.map((row, index) => (
          <tr key={index}>
            <td>
              <input type="checkbox" />
            </td>
            {TABLEHEADERS.map((header) => (
              <td
                key={header.id}
                className={header.id === "company" ? "company-cell" : ""}
              >
                {header.id === "company" && (
                  <AvatarLetter name={row[header.id]} size="small" />
                )}
                <span>{row[header.id]}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
