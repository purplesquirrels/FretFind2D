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
    classes += " text-indigo-700 bg-white  text-white";
  } else {
    classes += " text-white border-white border";
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
  let classes = className + " py-1 px-3";

  if (selected) {
    classes += " bg-indigo-700 hover:bg-indigo-800 text-white";
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
