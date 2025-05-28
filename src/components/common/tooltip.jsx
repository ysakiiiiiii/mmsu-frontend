import React, { useEffect, useState } from "react";

const Tooltip = ({ message, onClose, position = { top: "", right: "0" } }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in
    setVisible(true);

    // Auto close tooltip after 3s with fade-out
    const timer = setTimeout(() => {
      setVisible(false);
      // Close after fade-out duration (300ms)
      setTimeout(() => {
        onClose();
      }, 300);
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
        pointerEvents: "none", // avoid interfering with mouse
      }}
      role="alert"
      aria-live="assertive"
    >
      {message}
      <style jsx>{`
        .tooltip-container {
          background: rgba(220, 38, 38, 0.95); /* Tailwind Red-600 with slight transparency */
          color: white;
          font-size: 0.75rem;
          font-family: "Poppins", sans-serif;
          padding: 0.4rem 0.6rem;
          border-radius: 0.375rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          position: relative;
          user-select: none;
          pointer-events: none;
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
