import React from "react";

export function ConfigGroup({ title, children, divider = true }) {
  return (
    <div className={divider ? "border-t border-gray-900" : ""}>
      {title && (
        <h2 className="font-bold text-sm  px-4 pt-3 text-gray-200 flex justify-between">
          {title}
        </h2>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
