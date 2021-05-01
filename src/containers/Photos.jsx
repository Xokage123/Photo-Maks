import React from "react";
import { connect } from "react-redux";
import { loadPhotos } from "../actions/actions";
import { unsplashGetListPhotos } from "../unsplash/unsplash";
import getFormattedDate from "../utils";
import { getTheToken } from "../connection/token"
import Header from "../case/Header";
import FullPhoto from "./FullPhoto";
import Footer from "../case/Footer";
import 'simplebar/dist/simplebar.min.css';
import options from "../CONST";


let checkStart = true;
// Считываем код
const code = window.location.search.split('code=')[1];
const FETCH_URL = `https://unsplash.com/oauth/token?client_id=${options.access_key}&client_secret=${options.secret_key}&redirect_uri=${options.URI}&code=${code}&grant_type=${options.grant_type}`;
getTheToken(FETCH_URL);

function Photos(props) {
  const loadPhotos = () => {
    const page = localStorage.getItem("page");
    unsplashGetListPhotos(page).then((answer) => {
      props.loadPhotos(answer);
      localStorage.setItem("page", `${Number(page) + 1}`)
    });
  }

  if (checkStart) {
    checkStart = false;
    loadPhotos();
  }

  return (
    <>
      <Header />
      <main className={'main'}>
        <ul className={'photos-list'}>
          {
            props.photos.map((element, index) => {
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
              )
            })
          }
        </ul>
        <button
          className={'button-more'}
          onClick={() => {
            loadPhotos();
          }}
        >
          Show More
        </button>
      </main>
      <Footer />
    </>
  )
}

// Создаем хранилище состояний
const mapStateToProps = (state) => ({ photos: state.photos });
// Привязываем функцию к хранилищу
function mapDispatchToProps(dispatch) {
  return {
    loadPhotos: (photos) => dispatch(loadPhotos(photos))
  };
}
// Экспортируем с привязкой
export default connect(mapStateToProps, mapDispatchToProps)(Photos);