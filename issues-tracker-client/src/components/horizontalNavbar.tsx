import { HorizontalNav } from "../styles";
;
type Props = {
  children: JSX.Element[]
}

const HorizontalNavbar = ({ children }: Props) => {
  return (
    <HorizontalNav>
      {children}
    </HorizontalNav>
  )
}

export default HorizontalNavbar