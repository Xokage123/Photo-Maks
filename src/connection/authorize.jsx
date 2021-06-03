import { useHistory } from "react-router-dom";

export default function Authorize () {
  const history = useHistory();
  history.push("/photos");  
  return (
    <div>Загрузка...</div>
  )
}

export const authorizationUser = (addres) => {
  window.location.assign(addres)
}