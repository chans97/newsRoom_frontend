
import { useMediaQuery } from "react-responsive"
import Navigation_for_pc from './navbar_pc'
import Navigation_for_mobile from './navbar_mobile'
const Navigation = () => {
  const isPc = useMediaQuery({
    query: "(min-width:900px)"
  });
  return (
    <>
      {isPc ? <Navigation_for_pc></Navigation_for_pc> : <Navigation_for_mobile></Navigation_for_mobile>}
    </>
  )
}

export default Navigation
