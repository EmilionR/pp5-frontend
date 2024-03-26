import React from "react";
import styles from "../../styles/BlockedComment.module.css";

const BlockedComment = ({ spinner, src, message }) => {
  return (
    <div className={styles.Blocked}>
      <i className={`fas fa-ban ${styles.Icon}`}></i>
      <div className={styles.Content}>
        <strong>Blocked user</strong>
        <p>Comment hidden</p>
      </div>
    </div>
  );
};

export default BlockedComment;
