import React, { useRef, useEffect } from "react";

const useClickOutsideToggle = () => {
  // State for the expanded navbar
  const [expanded, setExpanded] = React.useState(false);
  const ref = useRef(null);
  // Close the navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);
  return {expanded, setExpanded, ref};
};

export default useClickOutsideToggle;
