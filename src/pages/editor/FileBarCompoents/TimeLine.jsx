import { Slider } from "@/components/ui/slider";
import { useEditorDataProvider } from "@/contexts/EditorDataProvider";
import React from "react";

function Timeline() {

  const {setYear, year} = useEditorDataProvider()
  const currentYear = new Date().getFullYear()

  function handleYearChange(selectedYear) {
    setYear(selectedYear)
  }

  return (
    <div className="w-full pl-1 py-4 bg-slate-950 bg-opacity-20 h-full">
      <div className="">
        <details className="group overflow-hidden  [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center cursor-pointer gap-[0.10rem] transition leading-none tracking-[1.2px] uppercase border-none outline-none text-[0.9rem]">
            <span className="transition-all -rotate-90 group-open:-rotate-[145]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="#A9A9A9 " className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>

            <p className="font-light text-gray text-[0.81rem] block ">Timeline</p>
          </summary>

          <div className=" mt-1 px-3 py-2 space-y-2 text-white *:text-[0.8rem]">
            {
              <span className="text-sm">
                {year == currentYear? "Now" : year}
              </span>
              }
            <Slider step={1} min={1900} max={currentYear} defaultValue={[currentYear]} onValueChange={(newValue) => handleYearChange(newValue[0])}  />
          </div>
        </details>
      </div>
    </div>
  );
};

export default Timeline;
