import { changePosition } from '@/lib/animation';
import { FileDown } from 'lucide-react'
import React, { useEffect } from 'react'

function DownloadFileBtn({ onClick, file }) {
    
    useEffect(() => {
    const button = document.querySelector("#sneaky-file-btn");
    ["mouseover", "click"].map((type) => changePosition(button, type));

    return () => {
        ["mouseover", "click"].map((type) => {
        button.removeEventListener(type, () => {});
        });
    };
    }, []);

  return (
    <div className='absolute z-50 right-[86px] top-3' id='sneaky-file-btn'>
    <button
    onClick={onClick}
    className="bg-gray-700 py-1.5 px-3 h-10 rounded-md group flex items-center text-sm"
  >
    <FileDown size={22} />
    {file?.fullName && (
      <span className="max-w-0 group-hover:max-w-28 group-hover:pl-1 whitespace-nowrap overflow-hidden transition-all duration-500">
        {file.fullName}
      </span>
    )}
  </button>
</div>

)
}

export default DownloadFileBtn