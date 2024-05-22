import axios from "axios"
import { useSelector } from "react-redux"

const useAxios = () => {
  const { token } = useSelector((state) => state.auth) //* token bilgisini globalden alıyoruz
  // console.log(token)

  const axiosToken = axios.create({ //*axios'un kendi fonksiyonudur, axios için bize bir örnek oluşturur
    baseURL: `${process.env.REACT_APP_BASE_URL}`, //*Kullancağımız yerde base url sonuna sadece endpoint eklememiz yeterli olacaktır
    headers: { Authorization: `Token ${token}` }, //* headers altında Authorization'a token bilgisini veriyoruz
  })

  const axiosPublic = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
  })

  return { axiosToken, axiosPublic } //* useApiRequest te kullanmak için dışarı açtık
}

export default useAxios
