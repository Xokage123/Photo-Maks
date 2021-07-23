import { useHistory } from "react-router-dom";

export default function Authorize () {
  const history = useHistory();
  history.push("/photos");  
  return (
    <div>Загрузка...</div>
  )
}

// Авторизация пользователя
export const authorizationUser = (addres) => {
  window.location.assign(addres)
}

// Выйти из аккаунта
 export function unauthorizationUser() {
   localStorage.clear();
   window.location.reload();
 }