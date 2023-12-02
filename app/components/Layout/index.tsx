import { NavLink } from "@remix-run/react";
import type { IconType } from "react-icons";
import { IoExitOutline } from "react-icons/io5/index.js";
import { useLocation } from "react-router-dom";
import * as styles from "./styles.css";

type NavItem = {
  to: string;
  title: string;
  icon?: IconType;
};

type LayoutProps = {
  navItems: NavItem[];
  userInfo: UserInfo;
};

type UserInfo = {
  uid: string;
  name: string;
};

const Layout = (props: LayoutProps) => {
  const location = useLocation();
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          {props.navItems.map((item, key) => {
            const Icon = item.icon;
            return (
              <li className={styles.li} key={key}>
                <NavLink
                  className={styles.navItem({
                    isCurrentPath: location.pathname === item.to,
                  })}
                  to={item.to}
                >
                  <div className={styles.iconContainer}>
                    {Icon && (
                      <Icon
                        fill={
                          location.pathname === item.to ? "#e5bdff" : "white"
                        }
                      />
                    )}
                    <label className={styles.tooltipText}>{item.title}</label>
                  </div>
                </NavLink>
              </li>
            );
          })}
          <li className={styles.li}>
            <NavLink
              className={styles.navItem({ isCurrentPath: false })}
              to={"/logout"}
            >
              <div className={styles.iconContainer}>
                <IoExitOutline />
                <label className={styles.tooltipText}>Logout</label>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Layout;
