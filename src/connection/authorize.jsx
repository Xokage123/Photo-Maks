import { useEffect } from "react";
import options from "../CONST";


// Адрес, куда нужно перекинуть пользователя
const authorizationAddress = `https://unsplash.com/oauth/authorize?client_id=${options.access_key}&redirect_uri=${options.URI}&response_type=${options.response_type}&scope=${options.scope}`;

export default function Authorize () {
  useEffect(()=> {
    window.location.assign(authorizationAddress)
  },[])

  return (
    <div>Загрузка...</div>
  )
}