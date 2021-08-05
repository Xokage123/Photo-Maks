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
  const getListPhotosWithPage = (page) => {
    unsplashGetListPhotos(page).then((list) => {
      loadPhotos(list);
      localStorage.setItem("page", `${page + 1}`);
    });
  };
  useEffect(() => {
    window.onscroll = () => {
      clearTimeout(clearValue);
      if (window.scrollY === window.pageYOffset+300) {
        clearValue = setTimeout(() => {
          getListPhotosWithPage(+localStorage.getItem("page"));
        }, 500);
      }
    };
    getListPhotosWithPage(+localStorage.getItem("page"));
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
