import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadPhotos } from "../actions/actions";
import { unsplashGetListPhotos } from "../unsplash/unsplash";
import getFormattedDate from "../utils";
import FullPhoto from "./FullPhoto";
import "simplebar/dist/simplebar.min.css";

let clearValue = null;

function Photos(props) {
  const loadPhotos = props.loadPhotos;
  const page = localStorage.getItem("page");
  useEffect(() => {
    window.onscroll = () => {
      clearTimeout(clearValue);
      const value = window.pageYOffset+100;
      if (window.scrollY <= value) {
        clearValue = setTimeout(() => {
          unsplashGetListPhotos(page).then((list) => {
            loadPhotos(list);
            localStorage.setItem("page", `${Number(page) + 1}`);
          });
        }, 1000);
      }
    };
    unsplashGetListPhotos(page).then((list) => {
      loadPhotos(list);
      localStorage.setItem("page", `${Number(page) + 1}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
