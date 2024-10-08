import React from "react";
import './Input.css';

const InputText = ({
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
    <div className='inputText'>
      <label className={``}>{label}</label>
      <div className={`mt-1`}>
        <input
          type="text"
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

export default InputText;
