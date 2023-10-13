import errorImg from "../../assets/error.jpeg"
import { config } from "../../config"
import styles from "./Error.module.css"

interface ErrorProps {
  error: string
}

export const Error = ({ error }: ErrorProps) => {
  return (
    <div className={styles.container}>
      <img src={errorImg} alt={"errorImg"} className={styles.img} />
      <div className={styles.errorTitleStr}>
        {config.errorTitleStr}
        <div className={styles.error}>
          {error.length > config.errorMaxLength
            ? `${error.substring(0, config.errorMaxLength)}...`
            : error}
        </div>
      </div>
    </div>
  )
}
