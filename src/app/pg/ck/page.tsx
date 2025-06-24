"use client";
import React from "react";

const ck = () => {
  const hideNumericInput = () => {
    const inputContainer = document.getElementById("input-container");
    if (inputContainer) {
      inputContainer.style.display = "none";
    }
  };

  return (
    <>
      <div id="input-container" className="p-4">
        <input
          id="numericInput"
          type="number"
          inputMode="decimal"
          pattern="[0-9]*"
          placeholder="Enter number"
          className="w-full border-2 p-2 border-blue-600 font-bold rounded-md"
        />
      </div>
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={hideNumericInput}
      >
        Hide Input
      </button>
    </>
  );
};

export default ck;
