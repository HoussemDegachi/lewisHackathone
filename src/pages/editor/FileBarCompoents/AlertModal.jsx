import Modal from "@/components/ui/Modal";
import { X } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";

function AlertModal({ onSubmit }) {
  const render = (
    <Modal>
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
    </Modal>
  );
  return createPortal(render, document.getElementById("modal-hook"));
}

export default AlertModal;
