import React from "react";

export function ConfigGroup({ title, children }) {
  return (
    <div className=" border border-gray-300 rounded">
      <h2 className="font-bold text-sm bg-gray-300 px-2 py-1 text-gray-700">
        {title}
      </h2>
      <div className="p-2">{children}</div>
    </div>
  );
}
