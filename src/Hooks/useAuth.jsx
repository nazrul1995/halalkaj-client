import { useContext } from "react"
import { AuthContext } from "../Components/Provider/AuthContext"

const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

export default useAuth
