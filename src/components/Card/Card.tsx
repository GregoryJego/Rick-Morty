import { useState } from "react"
import styles from "./Card.module.css"

interface CardProps {
  card: { name: string; image: string }
}

export const Card = ({ card }: CardProps) => {
  const { name, image } = card
  const [loaded, setIsLoaded] = useState(false)

  return (
    <div
      className={`${styles.fadein} ${styles.container}`}
      onClick={() => {
        // Onclick, show the data in the console
        console.log(card)
      }}
    >
      {/* When the image is loading, show a square with only backgroundColor with the same size of the image to have a smoother transition */}
      {!loaded ? <div className={styles.loading} /> : null}
      <img
        src={image}
        alt={`${name}_image`}
        className={styles.img}
        onLoad={() => {
          setIsLoaded(true)
        }}
      />
      <div className={styles.name}>{name}</div>
    </div>
  )
}
