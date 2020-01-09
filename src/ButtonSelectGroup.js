import React from "react";

export function HeaderButtonSelectItem({
  name,
  label,
  selected,
  onChange,
  className = ""
}) {
  let classes = className + " py-1 px-3";

  if (selected) {
    classes += " text-white bg-red-600";
  } else {
    classes += " text-red-600 border-red-600 border";
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

export function ButtonSelectItem({
  name,
  label,
  selected,
  onChange,
  className = ""
}) {
  let classes = className + " py-1 px-3 w-full text-center";

  if (selected) {
    classes += " bg-red-600 hover:bg-red-500 text-white";
  } else {
    classes += " bg-gray-700 hover:bg-gray-600 text-gray-100";
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

export function ButtonSelectGroup({ children, margin = true }) {
  return (
    <div className={"flex  justify-stretch" + (margin ? " mb-4" : "")}>
      {React.Children.map(children, (child, index) => {
        let className = child.props.className || "";
        if (index === 0) className += "rounded-l";
        if (index === children.length - 1) className += "rounded-r";
        return React.cloneElement(child, { ...child.props, className });
      })}
    </div>
  );
}
