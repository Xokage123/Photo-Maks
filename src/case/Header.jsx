import React, { useState, useEffect } from "react";
import icon from "../assets/pictures.svg";
import { authorizationUser } from "../connection/authorize";
import options from "../CONST";
import { getTheToken } from "../connection/token";

// Адрес, куда нужно перекинуть пользователя
const authorizationAddress = `https://unsplash.com/oauth/authorize?client_id=${options.access_key}&redirect_uri=${options.URI}&response_type=${options.response_type}&scope=${options.scope}`;
// Считываем код
const code = window.location.search.split("code=")[1];
const FETCH_URL = `https://unsplash.com/oauth/token?client_id=${options.access_key}&client_secret=${options.secret_key}&redirect_uri=${options.URI}&code=${code}&grant_type=${options.grant_type}`;
export default function Header() {
  const [mode, setMode] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("access_token") && code) {
      getTheToken(FETCH_URL).then(() => {
        setMode(true);
      });
    } else {
      setMode(true);
    }
    return () => {
      localStorage.clear();
    }
  }, []);
  return (
    <header className="header">
      <img className="header__icon" alt="icon" src={icon} />
      <button
        type="button"
        className={`btn ${mode ? "btn-success" : "btn-secondary"}`}
        onClick={
          mode
            ? () => alert("Вы уже зарегестрировались!")
            : () => authorizationUser(authorizationAddress)
        }
      >
        {mode ? "Вы авторизированы" : "Аторизация пользователя"}
      </button>
    </header>
  );
}
