import useNotification from "../../hooks/useNotification";
import { useEffect } from "react";

function Notification() {
  const { notification, clearNotification } = useNotification();

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timeId = setTimeout(() => {
      clearNotification();
    }, 3000);

    return () => clearTimeout(timeId);
  }, [notification, clearNotification]);

  if (!notification) {
    return;
  }

  return (
    <div className="fixed right-4 top-4 z-50 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg">
      <span>{notification.message}</span>

      <button
        type="button"
        onClick={clearNotification}
        className="ml-4"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export default Notification;
