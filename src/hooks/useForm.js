import { useState } from "react";

function useForm(initialState, callback) {
  const [inputs, setInputs] = useState(initialState);
  const onChangeHandler = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    callback();
  };
  return { inputs, setInputs, onChangeHandler, onSubmitHandler };
}

export default useForm;
