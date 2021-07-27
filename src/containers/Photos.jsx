import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadPhotos } from "../actions/actions";
import { unsplash } from "../unsplash/unsplash";
import getFormattedDate from "../utils";
import FullPhoto from "./FullPhoto";
import "simplebar/dist/simplebar.min.css";

let checkTest = true;

function Photos(props) {
  useEffect(() => {
    unsplash.photos
      .list({
        page: localStorage.getItem("page"),
      })
      .then(async (answer) => answer.response.results)
      .then((list) => {
        const page = localStorage.getItem("page");
        props.loadPhotos(list);
        localStorage.setItem("page", `${Number(page) + 1}`);
      });
  }, []);

  window.onscroll = () => {
    let scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    const value = window.pageYOffset + 800;
    if (scrollHeight <= value) {
      if (checkTest) {
        checkTest = false;
        unsplash.photos
          .list({
            page: localStorage.getItem("page"),
          })
          .then(async (answer) => answer.response.results)
          .then((list) => {
            const page = localStorage.getItem("page");
            props.loadPhotos(list);
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
