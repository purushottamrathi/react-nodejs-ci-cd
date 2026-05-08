import React from "react";
import styles from "./ErrorPage.module.scss";

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.errorPage}>
      <h1>Error!</h1>
      <p>An error occurred while loading the page.</p>
    </div>
  );
};

export default ErrorPage;