import React from 'react'
import styles from "../styles/Toast.module.css";

const Toast = ({ toastList, position }) => {
  return (
    <div className={`${styles.Container}, ${styles[position]}`}>
      {
        toastList.map((toast, i) => (
            <div
                key={i}
                style={{ backgroundColor: toast.backgroundColor }}
            >
                <button><i className="fas fa-xmark"></i></button>
                <div>
                    <p>{toast.title}</p>
                    <p>{toast.message}</p>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default Toast
