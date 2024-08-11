import React from "react";

const SavePageButton = () => {
  const handleSavePage = () => {
    // Get the current path from the URL
    const path = window.location.pathname; // e.g., "/name.js"

    // Extract the filename from the path, defaulting to "page.html" if no path
    const filename = path.split("/").pop() || "page.html";

    // Get the HTML content of the page
    const htmlContent = document.documentElement.outerHTML;

    // Create a blob from the HTML content
    const blob = new Blob([htmlContent], { type: "text/html" });

    // Create a link to download the file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    // Use the extracted filename as the download name
    link.download = filename;

    // Trigger the download
    link.click();
  };

  return (
    <button onClick={handleSavePage} className="bg-gray-700 p-4 rounded-md block w-fit mb-4 text-white hover:bg-gray-950 text-sm">
      Save Code
    </button>
  );
};

export default SavePageButton;
