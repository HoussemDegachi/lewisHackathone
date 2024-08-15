import { X } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";

function AlertModal({ onSubmit }) {
  const render = (
    <section
      onClick={(e) => e.stopPropagation()}
      className="fixed h-screen w-full top-0 left-0 bg-black/50 text-white flex items-center justify-center z-10"
    >
      <div className="relative max-w-2xl max-h-full rounded-lg border-2 border-gray-700 bg-gray-900 p-6 flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">Alert</h1>
        <p>
          <b>Chaotic Code Editor</b> only supports <b>IntelliSense</b> for
          TypeScript, JavaScript, CSS, LESS, SCSS, JSON and HTML.
        </p>
        <button
          className="self-end px-4 py-2 rounded-lg focus:ring-2 bg-gray-700"
          onClick={onSubmit}
        >
          Got It!
        </button>
        <X
          onClick={onSubmit}
          className="absolute top-3 right-3 hover:cursor-pointer m-0"
        />
      </div>
    </section>
  );
  return createPortal(render, document.getElementById("modal-hook"));
}

export default AlertModal;
