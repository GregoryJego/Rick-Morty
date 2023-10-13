import { useEffect, useCallback } from "react"
import { Card } from "../../components/Card/Card"
import { Error } from "../../components/Error/Error"
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import styles from "./Characters.module.css"
import { config } from "../../config"
import {
  getCharactersAsync,
  selectCharactersList,
  selectCharactersError,
  selectCharactersCurrentPage,
  setCharactersCurrentPage,
} from "../../store/charactersSlice"
import { useSelector } from "react-redux"

export const Characters = () => {
  const charactersList = useAppSelector(selectCharactersList)
  const error = useSelector(selectCharactersError)
  const currentPage = useSelector(selectCharactersCurrentPage)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // First fetch when the user arrives on the page
    if (!charactersList && currentPage) {
      dispatch(getCharactersAsync(currentPage))
    }
  }, [charactersList, currentPage, dispatch])

  const handleclick = useCallback(
    (page: number) => {
      if (!charactersList?.[page]?.data) {
        // We do not have the data stored, so we have to fetch them
        dispatch(getCharactersAsync(page))
      } else {
        // In this case, we have already the data stored, so we just have to change the current page
        dispatch(setCharactersCurrentPage(page))
      }
    },
    [charactersList, dispatch],
  )

  return (
    <>
      {error?.length ? (
        <Error error={error} />
      ) : (
        <>
          <div className={styles.nav}>
            <button
              className={styles.btn}
              disabled={!charactersList?.[currentPage]?.info?.prev}
              onClick={() => {
                !isNaN(currentPage) && handleclick(currentPage - 1)
              }}
            >
              {config.prevStr}
            </button>
            <div
              className={styles.page}
            >{`${config.pageStr}${currentPage}`}</div>
            <button
              className={styles.btn}
              disabled={!charactersList?.[currentPage]?.info?.next}
              onClick={() =>
                !isNaN(currentPage) && handleclick(currentPage + 1)
              }
            >
              {config.nextStr}
            </button>
          </div>
          <div className={styles.wrapper}>
            {charactersList?.[currentPage]?.data?.map((character, index) => (
              <Card card={character} key={index} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
