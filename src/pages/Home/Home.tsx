import homeImg from "../../assets/home.png"
import { config } from "../../config"
import styles from "./Home.module.css"

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{config.homeTitleStr}</div>
      <div className={styles.description}>{config.homeDescriptionStr}</div>
      <img alt={"home-img"} src={homeImg} className={styles.img} />
    </div>
  )
}
