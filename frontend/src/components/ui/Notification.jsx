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
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-4 right-4 top-4 z-50 flex items-start justify-between gap-3 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg sm:left-auto sm:max-w-sm"
    >
      <span>{notification.message}</span>

      <button
        type="button"
        onClick={clearNotification}
        className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export default Notification;
