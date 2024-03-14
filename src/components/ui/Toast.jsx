import React, {useEffect} from 'react'
import useToastStore from '@/store/ToastStore'

const colourVariants = {
  error: "alert-error",
  success: "alert-success",
  warning: "alert-warning",
  info: "alert-info",
};

const Toast = () => {

  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    toasts.forEach((toast) => {
      setTimeout(() => {
        removeToast(toast.id);
      }, 5000);
    });
  }, [toasts, removeToast]);

  return (
    <div className="toast">
      {toasts.map((toast, index) => (
        <div key={index} className={`alert ${colourVariants[toast.type]}`}>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}

export default Toast