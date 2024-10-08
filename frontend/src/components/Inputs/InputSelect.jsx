import React from "react";
import Select from "react-select";
import "./Input.css";

const InputSelect = ({
  label,
  options,
  value,
  onChange,
  name,
  isDisabled,
  placeholder = "Select",
}) => {
  const handleOnChange = (res) => {
    let data = {
      target: {
        value: res,
        name: name,
      },
    };
    onChange(data);
  };

  const customStyles = {
    option: provided => ({
      ...provided,
      color: 'black'
    }),
    control: provided => ({
      ...provided,
      color: 'black'
    }),
    singleValue: provided => ({
      ...provided,
      color: 'black'
    })
  }

  return (
    <div className="row">
      <label>{label}</label>
      <div className='mt-1'>
        <Select
          options={options ?? []}
          getOptionLabel={(option) => option.name}
          value={value ?? ""}
          onChange={handleOnChange}
          placeholder={placeholder}
          isDisabled={isDisabled}
          styles={customStyles}
          menuPosition="fixed"
        />
      </div>
    </div>
  );
};

export default InputSelect;
