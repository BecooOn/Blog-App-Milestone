// import { useSelector } from "react-redux"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = () => {
  const { _id } = useSelector((state) => state.auth)

  return _id ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRouter
