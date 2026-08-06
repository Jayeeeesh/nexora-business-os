import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used inside a NotificationProvider",
    );
  }

  return context;
}

export default useNotification;
