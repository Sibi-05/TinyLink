import React from "react";
import { format } from "timeago.js";

export default function LinkTable({ links, onDelete }) {
  if (!links || links.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        No links found.
      </p>
    );
  }

  return (
    <table className="w-full border rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-3">Code</th>
          <th className="p-3">URL</th>
          <th className="p-3">Clicks</th>
          <th className="p-3">Last Clicked</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link) => (
          <tr key={link.code} className="border-t hover:bg-gray-50">
            <td className="p-3 text-blue-600 underline">
              <a href={`/code/${link.code}`}>{link.code}</a>
            </td>

            <td className="p-3 max-w-xs truncate">{link.url}</td>

            <td className="p-3">{link.clicks}</td>

            <td className="p-3">
              {link.last_clicked ? format(link.last_clicked) : "-"}
            </td>

            <td className="p-3">
              <button
                onClick={() => onDelete(link.code)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
