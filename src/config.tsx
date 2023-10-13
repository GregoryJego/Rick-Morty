interface configProps {
  apiURL: string
  genericError: string
  errorMaxLength: number
  errorTitleStr: string
  pageStr: string
  nextStr: string
  prevStr: string
  links: { name: string; path: string }[]
  homeTitleStr: string
  homeDescriptionStr: string
}

export const config: configProps = {
  apiURL: "https://rickandmortyapi.com/api/character?page=",
  genericError: "Unknown error",
  errorMaxLength: 50,
  errorTitleStr: "Oh jeez, it's an error!",
  pageStr: "PAGE ",
  nextStr: "NEXT ",
  prevStr: "PREV ",
  links: [
    { name: "Home", path: "/" },
    { name: "Characters", path: "/characters" },
  ],
  homeTitleStr: "Do you know all the Rick and Morty characters?",
  homeDescriptionStr:
    "Click on the Characters section to see all the characters from Rick and Morty TV Show.\r\nClick on a character to see its data in the console.",
}
