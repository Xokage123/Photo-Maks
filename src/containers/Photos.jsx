import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadPhotos } from "../actions/actions";
import {
  unsplashGetListPhotos,
  API_unsplashGetListPhotos,
} from "../unsplash/unsplash";
import getFormattedDate from "../utils";
import FullPhoto from "./FullPhoto";
import "simplebar/dist/simplebar.min.css";

let checkTest = true;

  function loadPhotosMode(checkUser, setListPhoto) {
    console.log(checkUser);
    const page = localStorage.getItem("page");
    (checkUser
      ? unsplashGetListPhotos(page)
      : API_unsplashGetListPhotos(page)
    ).then((list) => {
      setListPhoto(list);
      localStorage.setItem("page", `${Number(page) + 1}`);
    });
  }

function Photos(props) {
  useEffect(() => {
    loadPhotosMode(!!localStorage.getItem("authUser"), props.loadPhotos);
  }, [props.loadPhotos]);

  window.onscroll = () => {
    let scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    const value = window.pageYOffset + 1000;
    if (scrollHeight <= value) {
      if (checkTest) {
        checkTest = false;
        loadPhotos();
      }
    }
  };

  return (
    <>
      <main className={"main"}>
        <ul className={"photos-list"}>
          {props.photos.map((element, index) => {
            return (
              <FullPhoto
                key={index}
                image={element.urls.thumb}
                id={element.id}
                author={element.user.name}
                url={element.user.links.html}
                likesCount={element.likes}
                date={getFormattedDate(element.updated_at)}
              />
            );
          })}
        </ul>
      </main>
    </>
  );
}

// Создаем хранилище состояний
const mapStateToProps = (state) => {
  console.log(state);
  return {
    photos: state.photos,
  };
};
// Привязываем функцию к хранилищу
function mapDispatchToProps(dispatch) {
  return {
    loadPhotos: (photos) => dispatch(loadPhotos(photos)),
  };
}
// Экспортируем с привязкой
export default connect(mapStateToProps, mapDispatchToProps)(Photos);
