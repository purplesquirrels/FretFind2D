import React from "react";
import Popover from "./Popover";
import SaveUI from "./SaveUI";

export default function Header({ children }) {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-700 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        {/* <svg
          className="mr-2"
          width="30"
          height="30"
          viewBox="0 0 295 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="74.7272"
            y="2.71469"
            width="29"
            height="237"
            rx="14.5"
            transform="rotate(-5 74.7272 2.71469)"
            fill="white"
          />
          <rect
            x="0.39151"
            y="87.5746"
            width="29"
            height="166.723"
            rx="14.5"
            transform="rotate(-15 0.39151 87.5746)"
            fill="white"
          />
          <rect
            x="190.383"
            y="0.187164"
            width="29"
            height="237"
            rx="14.5"
            transform="rotate(5 190.383 0.187164)"
            fill="white"
          />
          <rect
            x="266.222"
            y="79.0927"
            width="29"
            height="168.361"
            rx="14.5"
            transform="rotate(15 266.222 79.0927)"
            fill="white"
          />
          <circle cx="146" cy="134" r="15" fill="white" />
        </svg> */}

        <svg
          className="mr-2"
          width="30"
          height="30"
          viewBox="0 0 308 237"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.82402"
            y="7.79068"
            width="25"
            height="237"
            rx="12.5"
            transform="rotate(-15 0.82402 7.79068)"
            fill="white"
          />
          <rect
            width="25"
            height="148.299"
            rx="12.5"
            transform="matrix(0.996992 -0.0775082 0.0979834 0.995188 93.2627 67.1353)"
            fill="white"
          />
          <rect
            x="283.16"
            y="0.284912"
            width="25"
            height="237"
            rx="12.5"
            transform="rotate(15 283.16 0.284912)"
            fill="white"
          />
          <path
            d="M189.107 76.4398C189.784 69.5695 195.912 64.4338 202.794 64.9689V64.9689C209.677 65.5039 214.709 71.5072 214.032 78.3776L201.808 202.533C201.132 209.404 195.004 214.54 188.121 214.004V214.004C181.238 213.469 176.207 207.466 176.883 200.596L189.107 76.4398Z"
            fill="white"
          />
          <circle cx="155" cy="140" r="15" fill="white" />
        </svg>

        <span className="font-semibold text-xl tracking-tight">FretFind</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block  lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">{children}</div>
      </div>
      <div>
        <Popover
          position={"bottom"}
          triggerElement={
            <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-700 hover:bg-white mt-4 lg:mt-0">
              Save
            </button>
          }
        >
          <SaveUI />
        </Popover>
      </div>
    </nav>
  );
}
