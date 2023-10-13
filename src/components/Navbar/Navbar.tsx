import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import { useLocation } from "react-router-dom"
import { config } from "../../config"

export const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <nav className={styles.navbar}>
      {config.links.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className={link.path === pathname ? styles.activeLink : styles.link}
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  )
}
