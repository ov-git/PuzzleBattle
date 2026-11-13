import { useEffect, useState } from "react";

type Props = {};

type ToastProps = {
  toast: number;
};

const Toast = ({ toast }: ToastProps) => {
  const [state, setState] = useState(0);

  const active = state > 0;

  useEffect(() => {
    setState(toast);
    const timeout = setTimeout(() => {
      setState(0);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <div
      className={`flex justify-center items-center w-full ${state == 2 ? "bg-red-700" : state == 1 ? "bg-green-600" : "bg-none"} text-white p-2 text-center h-8 absolute bottom-0 transition-opacity duration-800 hover:opacity-100 ${active ? " opacity-100" : "opacity-0"}`}
    >
      <p className="text-lg font-bold">
        {state === 1 ? "Solved!" : state === 2 ? "Try again!" : ""}
      </p>
    </div>
  );
};

export default Toast;
