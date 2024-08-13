import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

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

  useEffect(() => {
    const button = document.querySelector("#sneaky-btn");

    ["mouseover", "click"].forEach(function (type) {
      button.addEventListener(type, function () {
        const top = getRandomNum(window.innerHeight - this.offsetHeight);
        const left = getRandomNum(window.innerWidth - this.offsetWidth);

        moveElement(this, "left", left);
        moveElement(this, "top", top);
      });
    });

    return () => {
      ["mouseover", "click"].forEach((type) => {
        button.removeEventListener(type, () => {});
      });
    };
  }, []);

  const moveElement = (element, animeType, pixels) => {
    anime({
      targets: element,
      [animeType]: `${pixels}px`,
      easing: "easeOutElastic(1, .5)",
      duration: 1000,
    }).play();
  };

  const getRandomNum = (num) => {
    return Math.floor(Math.random() * num);
  };

  return (
    <button
      onClick={handleSavePage}
      id="sneaky-btn"
      className="bg-slate-400 p-4 py-2 rounded-md block w-fit mb-4 text-white hover:bg-slate-600 text-sm z-50 cursor-pointer"
      style={{ position: "absolute" }}>
      Save Code
    </button>
  );
};

export default SavePageButton;
