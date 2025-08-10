import { toast } from "react-toastify";

export const failedLoginNotify = (currentTheme: string) =>
  toast.error(
    <div>
      <div>Login Failed!</div>
      <div style={{ fontSize: "0.9em", opacity: 0.8 }}>
        Something went wrong. Please try again later. If the issue continues,
        please contact us!
      </div>
    </div>,
    {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: currentTheme,
    }
  );

export const successfulLoginNotify = (currentTheme: string) =>
  toast.info("You have successfully login!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: currentTheme,
  });

export const successfulRegisterNotify = (currentTheme: string) =>
  toast.info("You have successfully registered!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: currentTheme,
  });

export const successfulQuestionNotify = (currentTheme: string) =>
  toast.success(
    <div>
      <div>Question sent successfully!</div>
      <div style={{ fontSize: "0.9em", opacity: 0.8 }}>
        Your post will appear soon
      </div>
    </div>,
    {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: currentTheme,
    }
  );

export const infoLogoutNotify = (currentTheme: string) =>
  toast.info("You have successfully logout!", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: currentTheme,
  });

export const detailInfoNotify = (currentTheme: string, message: string) =>
  toast.info(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: currentTheme,
  });

export const detailErrorNotify = (currentTheme: string, message: string) =>
  toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: currentTheme,
  });
