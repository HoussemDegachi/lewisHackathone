import React from "react";

const SavePageButton = () => {
  const handleSavePage = () => {
    const path = window.location.pathname;

    const filename = path.split("/").pop() || "page.html";

    const htmlContent = document.documentElement.outerHTML;

    const blob = new Blob([htmlContent], { type: "text/html" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    link.download = filename;

    link.click();
  };

  return (
    <button onClick={handleSavePage} className="bg-gray-700 p-4 rounded-md block w-fit mb-4 text-white hover:bg-gray-950 text-sm">
      Save Code
    </button>
  );
};

export default SavePageButton;
