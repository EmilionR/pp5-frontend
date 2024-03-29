import React, { useCallback, useEffect } from "react";
import styles from "../styles/Toast.module.css";

const Toast = ({ toastList, position, setList }) => {
  const deleteToast = useCallback(
    (id) => {
      console.log("Deleting toast");
      const toastListItem = toastList.filter((toast) => toast.id !== id);
      setList(toastListItem);
    },
    [toastList, setList]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        deleteToast(toastList[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, deleteToast]);

  return (
    <div className={`${styles.Container}, ${styles[position]}`}>
      {toastList.map((toast, i) => (
        <div
          key={i}
          className={`${styles.Notification} ${styles.Toast}, ${styles[position]}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <button className={styles.CloseButton} onClick={() => deleteToast(toast.id)}>
            <i className="fas fa-xmark"></i>
          </button>
          <div>
            <p className={styles.Title}>{toast.title}</p>
            <p className={styles.Message}>{toast.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
