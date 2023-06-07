import { VerticalNav } from "../styles"

type Props = {
  children: JSX.Element[]
}

const VerticalNavbar = ({ children }: Props) => {
  return (
    <VerticalNav>
      {children}
    </VerticalNav>
  )
}

export default VerticalNavbar