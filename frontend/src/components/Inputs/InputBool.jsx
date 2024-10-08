import React from "react";
import "./Input.css";

const InputBool = ({
  textInput,
  name,
  value,
  onChange,
  sectionName,
  isDisabled
}) => {
  return (
    <>
      <label>
        <input
          type="checkbox"
          name={name}
          onChange={onChange}
          checked={value ?? false}
          value={value ?? false}
          disabled={isDisabled}
          id={`${sectionName}-${name}`}
        />
        <svg viewBox="0 0 64 64" height="0.8em" width="0.8em">
          <path
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            pathLength="575.0541381835938"
            className="path"></path>
        </svg>
      </label>
      <div>{textInput}</div>
    </>
  );
};

export default InputBool;
