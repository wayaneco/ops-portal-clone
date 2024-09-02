"use client";

import { Toast } from "flowbite-react";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ToastProviderType = {
  showToast: (newState: ToastStateType) => void;
};

type ToastStateType = {
  error?: boolean;
  message: string | ReactNode;
};

const ToastContext = createContext<ToastProviderType | undefined>(undefined);

export const ToastProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [toastState, setToastState] = useState<ToastStateType>({
    error: false,
    message: "",
  });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!!toastState?.message) {
      timeout = setTimeout(() => {
        setToastState({ message: "", error: false });
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!toastState?.message]);

  return (
    <ToastContext.Provider
      value={{
        showToast: (newState: ToastStateType) => setToastState(newState),
      }}
    >
      {children}
      {!!toastState?.message && (
        <Toast
          className={`absolute right-5 top-5 z-[9999] ${
            toastState?.error ? "bg-red-500" : "bg-primary-500"
          }`}
        >
          <div className="ml-3 text-sm font-normal text-white">
            {toastState?.message}
          </div>
          <Toast.Toggle
            className={toastState?.error ? "bg-red-500" : "bg-primary-500"}
            onClick={() => setToastState({ message: "", error: false })}
          />
        </Toast>
      )}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext<ToastProviderType | undefined>(ToastContext!);

  if (!context)
    throw new Error(
      "useSupabaseSessionContext should be used within the SupabaseSessionContext provider!"
    );

  return context;
};
