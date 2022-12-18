import { useEffect } from "react";

function Alert({ type, msg, removeAlert }) {
  let color = "";
  let svgPathElement;

  // -if alert type is danger, then show error icon with red text
  if (type === "danger") {
    svgPathElement = (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    );
    color = "text-red-600";
  }
  // -if alert type is success, then show correct icon with green text
  if (type === "success") {
    svgPathElement = (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    );
    color = "text-green-600";
  }

  // -componentWillMount
  useEffect(() => {
    // -remove the alert after 3 seconds
    const timingOut = setTimeout(() => {
      removeAlert();
    }, 3000);

    // -componentWillUnmount
    // -clear the timingOut function after removing
    return () => {
      clearTimeout(timingOut);
    };
  }, []);

  return (
    <div className="h-3/5 flex flex-row items-center gap-x-2 md:gap-x-4 px-4 md:px-10 py-2 shadow-xl bg-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-6 h-6 ${color}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {svgPathElement}
      </svg>
      <span className={`text-sm ${color}`}>{msg}</span>
    </div>
  );
}

export default Alert;
