import React from "react";

interface FloatingButtonProps {
  onOpen: () => void; // Cambiamos el nombre a onOpen para alinearlo con TaskAdderProps
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({ onOpen }) => {
  return (
    <button
      className="fixed bottom-4 right-4 rounded-full w-20 h-20 bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 flex items-center justify-center"
      onClick={onOpen} // Utilizamos onOpen aquí en lugar de onClick
    >
      <svg
        fill="#ffffff"
        width="800px"
        height="800px"
        viewBox="0 0 1920 1920"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fillRule="evenodd">
          <path d="M106.667 267H320v213.333h853.33V267h213.34v160h106.66V160.333h-329.1C1142.26 98.19 1083 53.667 1013.33 53.667H480c-69.665 0-128.931 44.523-150.896 106.666H0V1867h1493.33v-320h-106.66v213.33H106.667V267Zm320 106.667v-160c0-29.456 23.878-53.334 53.333-53.334h533.33c29.46 0 53.34 23.878 53.34 53.334v160H426.667Z" />
          <path d="m1677.57 528.309 225.88 225.883c22.02 22.023 22.02 57.713 0 79.849L1225.8 1511.69c-10.62 10.5-24.96 16.49-39.98 16.49H959.937c-31.171 0-56.47-25.3-56.47-56.47v-225.89c0-15.02 5.986-29.36 16.489-39.86L1597.6 528.309c22.14-22.136 57.83-22.136 79.97 0Zm-155.41 235.144 146.03 146.033 115.43-115.426-146.04-146.033-115.42 115.426Zm-505.75 651.787h146.03l425.9-425.9-146.03-146.038-425.9 425.898v146.04Z" />
        </g>
      </svg>
    </button>
  );
};
