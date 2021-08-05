import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadPhotos } from "../actions/actions";
import { unsplashGetListPhotos } from "../unsplash/unsplash";
import getFormattedDate from "../utils";
import FullPhoto from "./FullPhoto";
import "simplebar/dist/simplebar.min.css";

let checkTest = true;

function Photos(props) {
  const loadPhotos = props.loadPhotos;
  const page = localStorage.getItem("page");
  useEffect(() => {
    unsplashGetListPhotos(page).then((list) => {
      loadPhotos(list);
      localStorage.setItem("page", `${Number(page) + 1}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.onscroll = () => {
    const value = window.pageYOffset;
    if (window.scrollY <= value) {
      if (checkTest) {
        checkTest = false;
        unsplashGetListPhotos(page).then((list) => {
          loadPhotos(list);
          localStorage.setItem("page", `${Number(page) + 1}`);
        });
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
