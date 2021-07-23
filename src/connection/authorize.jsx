import { useHistory } from "react-router-dom";

export default function Authorize() {
  const history = useHistory();
  history.push("/photos");
  return <div>Загрузка...</div>;
}

// Авторизация пользователя
export const authorizationUser = (addres) => {
  localStorage.setItem("authUser", "true");
  window.location.assign(addres);
};

// Выйти из аккаунта
export function unauthorizationUser() {
  localStorage.setItem("access_token", "");
  localStorage.setItem("refresh_token", "");
  localStorage.setItem("authUser", "");
  window.location.reload();
}
