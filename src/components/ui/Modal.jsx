import React from "react";

function Modal({ children }) {
  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className="fixed h-screen w-full top-0 left-0 bg-black/50 text-white flex items-center justify-center z-10"
    >
      <div className="relative max-w-2xl max-h-full rounded-lg border-2 border-gray-700 bg-gray-900 p-6 flex flex-col gap-5">
        {children}
        <X
          onClick={onClose}
          className="absolute top-3 right-3 hover:cursor-pointer m-0"
        />
      </div>
    </section>
  );
}

export default Modal;
