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

  const button = document
    .querySelector("#sneaky-btn")

    [("mouseover", "click")].forEach((element) => {
      button.addEventlistener(type, function (e) {
        const top = getRandomNum(window.innerHeight - this.offsetHeight);
        const left = getRandomNum(window.innerHeight - this.offsetWidth);

        console.log("go to top", top);
        console.log("go to left", left);

        moveElement(this, "left", left);
        moveElement(this, "top", top);
      });
    });

  const moveElement = (element, animeType, pixels) => {
    anime({
      targets: element,
      [animeType]: ` ${pixels}s`,
      easing: "easeOutElastic(1, .5)",
    }).play();
  };

  const getRandomNum = (num) => {
    return Math.floor(Math.random() * num);
  };

  return (
    <button onClick={handleSavePage} id="#sneaky-btn" className="bg-gray-700 p-4 rounded-md block w-fit mb-4 text-white hover:bg-gray-950 text-sm">
      Save Code
    </button>
  );
};

export default SavePageButton;
