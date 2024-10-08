import React from "react";
import "./Input.css";

const InputTextArea = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  isDisabled,
  maxLength,
  placeholder = `Enter ${label}`,
}) => {
  return (
    <div className="inputText">
      <label className={``}>{label}</label>
      <div className={`mt-1`}>
        <textarea
          type="text"
          rows={3}
          placeholder={placeholder}
          className="form-control"
          name={name}
          onChange={onChange}
          value={value ?? ""}
          disabled={isDisabled}
          onBlur={onBlur}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
};

export default InputTextArea;
