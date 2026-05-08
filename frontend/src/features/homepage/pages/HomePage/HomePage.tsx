import React from "react";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homepage}>
      <h1>Welcome to the Homepage!</h1>
      <p>This is the main landing page of our application.</p>
    </div>
  );
};

export default HomePage;
