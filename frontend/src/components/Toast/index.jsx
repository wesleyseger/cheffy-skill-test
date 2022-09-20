import { ToastContainer, toast } from "react-toastify"

export const notify = (type, message) => {
  switch (type) {
    case 'error':
      toast.error(message);
      break;
    case 'success':
      toast.success(message);
      break;
    default: null;
  }
}

export function Toast() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  )
}