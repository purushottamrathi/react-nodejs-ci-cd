import React from "react";
import styles from "./Dashboard.module.scss";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <h1>Welcome to the Dashboard!</h1>
      <p>This is the main dashboard page of our application.</p>
    </div>
  );
};

export default Dashboard;