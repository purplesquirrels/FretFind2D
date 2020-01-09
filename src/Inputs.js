import React from "react";

export function Button({ children, onClick, className = "" }) {
  return (
    <button
      className={"btn " + className}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({ children, onClick, ...props }) {
  return (
    <Button className="btn-primary" {...props}>
      {children}
    </Button>
  );
}

export function NumberInput({
  onChange,
  value,
  id,
  label,
  min = 0,
  max = null,
  step = 1
}) {
  return (
    <div className="md:flex md:items-center mb-2">
      {label && (
        <div className="md:w-1/2">
          <label
            className="block text-gray-100 md:text-left mb-1 md:mb-0 pr-4"
            htmlFor={id}
          >
            {label}
          </label>
        </div>
      )}
      <div className={label ? "md:w-1/2" : ""}>
        <input
          className="bg-gray-700 appearance-none  rounded w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none focus:bg-gray-600 focus:border-purple-500"
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(parseFloat(e.currentTarget.value))}
        />
      </div>
    </div>
  );
}

export function TextInput({ onChange, value, id, label }) {
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label
          className="block text-gray-100 md:text-left mb-1 md:mb-0 pr-4"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      <div className="md:w-2/3">
        <input
          className="bg-gray-700 appearance-none  rounded w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none focus:bg-gray-600 focus:border-purple-500"
          id={id}
          type="text"
          value={value}
          onChange={e => onChange(e.currentTarget.value)}
        />
      </div>
    </div>
  );
}
