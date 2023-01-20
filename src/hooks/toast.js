import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from "react";

const useToast = () => {
  const [, setToastRerender] = useState(false);
  const toasts = useRef([]);
  const addToast = (toast) => {
    const id = uuidv4();
    const toastWithId = {
      ...toast,
      id,
    };
    toasts.current = [...toasts.current, toastWithId];
    setToastRerender((prev) => !prev);

    setTimeout(() => {
      deleteToast(id, toasts, setToastRerender);
    }, 5000);
  };

  const deleteToast = (id) => {
    console.log(toasts);
    const filtered = toasts.current.filter((toast) => {
      return toast.id !== id;
    });
    toasts.current = filtered;
    setToastRerender((prev) => !prev);
  };
  return [toasts.current, addToast, deleteToast];
};

export default useToast;
