import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import reactLogo from '@/assets/react.svg'
import { apiClient } from "@/services/apiClient";

interface User {
  displayName: string;
  email?: string;
  photo?: string;
}

const Header: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await apiClient.get('/auth/login/success');
        setUserData(res.data.user);
      }
      catch (err) {
        // 400 = not authenticated yet — expected when no Google session exists
        setUserData(null);
        return err
      }
    };

    getUser();
  }, []);

  const handleLogout = () => {
    window.open(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, "_self");

  };

  return (
    <div className={styles.header}>
      <nav>
        <div className={styles.left}>
          <NavLink to="/">
            <img src={reactLogo} alt="Logo" className={styles.logo} />
          </NavLink>
        </div>
        <div className={styles.center}>
          <h1>My React App</h1>
        </div>
        <div className={styles.right}>

          <ul className={styles.navLinks}>
            {userData && (
              <>
                <li className={styles.userName}>Hello {userData.displayName}</li>
                <li><a onClick={handleLogout}>Logout</a></li>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              </>
            )}
            {!userData && (
              <li><NavLink to="/login">Login</NavLink></li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Header;