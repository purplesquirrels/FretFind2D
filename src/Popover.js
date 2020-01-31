import React, { useState } from "react";
import RTP, { ArrowContainer } from "react-tiny-popover";

export default function Popover({
  triggerElement,
  position = "right",
  children = null,
  noPadding = false,
  maxWidth = "400px"
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!triggerElement) {
    throw new Error("No triggerElement prop provided for Popover");
  }

  return (
    <RTP
      isOpen={isOpen}
      position={position} // preferred position
      containerStyle={{ overflow: "visible", zIndex: 100 }}
      onClickOutside={e => setIsOpen(false)}
      transitionDuration={0.15}
      content={({ position, targetRect, popoverRect }) => (
        <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
          position={position}
          targetRect={targetRect}
          popoverRect={popoverRect}
          arrowColor={"#2d3748"}
          arrowSize={10}
          arrowStyle={{
            transform:
              position === "right"
                ? "translateX(1px)"
                : position === "bottom"
                ? "translateY(1px)"
                : position === "left"
                ? "translateX(-1px)"
                : position === "top"
                ? "translateY(-1px)"
                : null
          }}
        >
          <div
            className={
              "bg-gray-800 text-gray-500 text-sm rounded shadow-2xl" +
              (noPadding ? "" : " p-4")
            }
            style={{ maxWidth }}
          >
            {children}
          </div>
        </ArrowContainer>
      )}
    >
      {React.cloneElement(triggerElement, {
        ...triggerElement.props,
        onClick: e =>
          e.preventDefault() || console.log(isOpen) || setIsOpen(!isOpen)
      })}
    </RTP>
  );
}
