import React, {
  useEffect, useState
} from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

import {
  getPhoto,
  likePhoto,
  unlikePhoto,
  updateArrayPhoto
} from "../actions/actions";

import {
  unsplashGetPhoto,
  unsplashLikePhoto,
  unsplashUnlikePhoto
} from "../unsplash/unsplash";

import getFormattedDate from "../utils";

import liked from "../assets/001-like.png";
import unliked from "../assets/002-heart.png";
import close from "../assets/003-left-arrow.png";
import arrow from "../assets/next.png"

const bgImages = {
  liked: {
    backgroundImage: "url(" + liked + ")",
  },
  unliked: {
    backgroundImage: "url(" + unliked + ")",
  },
  close: {
    backgroundImage: "url(" + close + ")",
  },
};
const styleBack = {
  display: "flex",
  alignItems: "center"
}

function CurrentPhoto(props) {
  let { id } = useParams();
  const getPhotoCurrent = props.getPhoto;
  const listPhoto = props.list;
  const [infoUser, setInfoUser] = useState({});
  useEffect(() => {
    document.body.style.overflow = "hidden";
    unsplashGetPhoto(id).then(photo => {
      setInfoUser({
        name: photo.user.name,
        link: photo.user.links.html
      });
      getPhotoCurrent(photo);
    });
    return () => {
      document.body.style.overflow = "auto";
    }
  }, [getPhotoCurrent, id]);

  function likePhoto(id) {
    if (props.photo.liked_by_user) {
      unsplashUnlikePhoto(id).then(info => {
        const photo = info.photo;
        props.unlikePhoto(photo.likes, photo.liked_by_user);
        props.updateArrayPhoto(photo);
        props.getPhoto(photo);
      });
    } else {
      unsplashLikePhoto(id).then(info => {
        const photo = info.photo;
        props.likePhoto(photo.likes, photo.liked_by_user);
        props.updateArrayPhoto(photo);
        props.getPhoto(photo);
      });
    }
  }
  const image = props.photo.urls.small;
  const likesCount = props.photo.likes;
  const date = getFormattedDate(props.photo.updated_at);
  // Основной контент
  const mainContent =
    <article className="full-photo">
      <Link to="/photos">
        <div style={styleBack}>
          <button
            className="full-photo__close-button"
            style={bgImages.close}
          />
          <span>Назад</span>
        </div>
      </Link>
      <h2 className="full-photo__heading">
        <a target="_blank" href={infoUser.link} rel="noreferrer">{infoUser.name}</a>
      </h2>
      <img alt="test" className="full-photo__image" src={image} />
      <p className="full-photo__likes-count">Нравится: {likesCount}</p>
      <button onClick={() => likePhoto(id)} className="like-photo__button" style={props.photo.liked_by_user ? bgImages.liked : bgImages.unliked} />
      <time className="full-photo__time">{date}</time>
    </article>
  // Контекнт при загрузке
  const loadContent = <div>Подождите...</div>;
  return (
    <div className="overlay-modal">
      {
        listPhoto.map((element, index) => {
          if (element.id === id) {
            if (index !== 0) {
              return (
                <Link to={`/photos/${listPhoto[index - 1].id}`}>
                  <img className="photos__prev" src={arrow} alt="arrow" />
                </Link>
              )
            } else {
              return "";
            }
          } else {
            return "";
          }
        })
      }
      {
        props.photo.id ? mainContent : loadContent
      }
      {
        props.list.map((element, index) => {
          if (element.id === id) {
            if (index !== listPhoto.length-1) {
              return (
                <Link to={`/photos/${listPhoto[index + 1].id}`}>
                  <img className="photos__next" src={arrow} alt="arrow" />
                </Link>
              )
            } else {
              return "";
            }
          } else {
            return "";
          }
        })
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    photo: state.currentPhoto,
    list: state.photos
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getPhoto: (photo) => dispatch(getPhoto(photo)),
    likePhoto: (like, check) => dispatch(likePhoto(like, check)),
    unlikePhoto: (like, check) => dispatch(unlikePhoto(like, check)),
    updateArrayPhoto: (photo) => dispatch(updateArrayPhoto(photo))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentPhoto);
