export const usePropsSelect = (values, formValues, setFormValues) => {  
  const propsSelectFromPromises = (key) => {
    return {
      name: key,
      value: values?.find((o) => o.value == formValues[key]),
      onChange: (res) => {
        setFormValues((lastData) => ({ ...lastData, [key]: res.target?.value?.value ?? res.target?.value }));
      },
    };
  };
  return [propsSelectFromPromises];
};