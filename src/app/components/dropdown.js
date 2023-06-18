import React, { useState, useEffect } from 'react';

const Dropdown = ({ title, options, handleSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionsSelect = (option) => {
    handleSelect(option);
    setIsOpen(false);
  }

  return (
    <div className="dropdown relative flex m-5 items-center justify-center">
  {!isOpen && (<button className="flex items-center justify-center px-4 py-2 text-white bg-deep-forest-green hover:bg-moss-green rounded-md" onClick={toggleMenu}>
    {title}
  </button>)}
  {isOpen && (
    <div className="top-full left-0 z-10 bg-white shadow-md rounded-md overflow-hidden">
      {options.map((option, index) => (
        <div
          key={index}
          className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
          onClick={() => handleOptionsSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default Dropdown;
