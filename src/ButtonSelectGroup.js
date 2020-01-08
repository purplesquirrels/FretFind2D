import React from "react";

export function ButtonSelectItem({
  name,
  label,
  selected,
  onChange,
  className = ""
}) {
  let classes = className + " py-1 px-3";

  if (selected) {
    classes += " bg-blue-500 hover:bg-blue-600 text-white";
  } else {
    classes += " bg-gray-300 hover:bg-gray-400 text-gray-800";
  }

  return (
    <label className={classes}>
      {label}
      <input
        className="hidden"
        type="radio"
        name={name}
        checked={selected}
        onChange={onChange}
      />
    </label>
  );
}

export function ButtonSelectGroup({ children }) {
  return (
    <div className="inline-flex">
      {React.Children.map(children, (child, index) => {
        let className = child.props.className || "";
        if (index === 0) className += "rounded-l";
        if (index === children.length - 1) className += "rounded-r";
        return React.cloneElement(child, { ...child.props, className });
      })}
    </div>
  );
}
