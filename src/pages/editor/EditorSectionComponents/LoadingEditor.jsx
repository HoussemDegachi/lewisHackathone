import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
function LoadingEditor() {
  useGSAP(() => {
    let tl = gsap.timeline();

    tl.to(".box", {
      scale: 0,
      y: 60,
      rotate: 400,
      duration: 1,
      delay: 0.5,
      repeat: 1,
      yoyo: true,
      yoyoEase: true,
      stagger: {
        amount: 1.5,
        from: "start",
        // axis: "y",
        grid: [3, 3],
      },
    });

    tl.to(".container", {
      rotate: "-450deg",
      scale: 0,
      duration: 1,
    });

    tl.to(".wrapper", {
      opacity: 0,
      display: none,
    });
  });

  return (
    <div className="bg-editor w-full h-full flex items-center justify-center">
      <div className="wrapper absolute top-0 left-0 flex flex-col justify-center items-center w-screen h-screen">
        <div className="container rotate-45 w-24 grid  grid-cols-3 place-items-center place-content-center gap-1 ">
          {new Array(9).fill().map((arr) => {
            return <div className="box w-7 h-7 bg-[#39FF14] "></div>;
          })}
        </div>
      </div>
      <p className="font-bold text-md text-neutral-300">Loading Hell...</p>
    </div>
  );
}

export default LoadingEditor;
