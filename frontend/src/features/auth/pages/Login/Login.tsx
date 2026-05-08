import React from "react";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const loginWithGoogle = () => {
    window.open(`${import.meta.env.VITE_API_BASE_URL}/auth/google/callback`, "_self"); 
  }

  return (
    <div className={styles.loginPage}>
      <h1>Login</h1>
      <p>Please enter your credentials to login.</p>
      <div className={styles.form}>
        <form className={styles.loginForm}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className={styles.input}
          />
          <button className={styles.button}>Login</button>
          <p>
            Not registered? <a href="/register">Register here</a>
          </p>
        </form>
        <button className={styles.googleButton} onClick={loginWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;