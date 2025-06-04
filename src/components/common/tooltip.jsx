import React, { useEffect, useState } from "react";

const Tooltip = ({ message, onClose, position = { top: "0", right: "0" } }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 300); // allow exit animation
    }, 1000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`tooltip-container ${visible ? "visible" : ""}`}
      style={{
        position: "absolute",
        ...position,
        zIndex: 1000,
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}
      role="alert"
      aria-live="assertive"
    >
      {message}
      <style>{`
        .tooltip-container {
          background: rgba(220, 38, 38, 0.95);
          color: white;
          font-size: 0.75rem;
          font-family: "Poppins", sans-serif;
          padding: 0.4rem 0.6rem;
          border-radius: 0.375rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          user-select: none;
        }
        .tooltip-container.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Tooltip;
