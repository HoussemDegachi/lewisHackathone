import React from "react";

function BrokenEditorLine({ text, onClick, className }) {
  const randomX = Math.floor(Math.random() * 90);
  const randomY = Math.floor(Math.random() * 90);
  const randomRotation = Math.floor(Math.random() * 360); // random rotation
  const randomZIndex = Math.floor(Math.random() * 10); // random z-index
  const randomDuration = Math.random() * 3 + 2; // animation duration between 2s and 7s

  return (
    <div
      style={{
        top: `${randomY}%`,
        left: `${randomX}%`,
        transform: `rotate(${randomRotation}deg)`,
        zIndex: randomZIndex,
        animationDuration: `${randomDuration}s`,
      }}
      className={`absolute broken-line animate-space-float ${className}`}
      onClick={onClick}>
      {text}
    </div>
  );
}

export default BrokenEditorLine;
