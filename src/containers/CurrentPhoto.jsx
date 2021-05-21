import React, { useEffect } from "react";
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
  useEffect(() => {
    document.body.style.overflow = "hidden";
    unsplashGetPhoto(id).then(photo => {
      props.getPhoto(photo);
    });
    return () => {
      document.body.style.overflow = "auto";
    }
  }, [id, props]);

  function likePhoto(id) {
    if (props.photo.liked_by_user) {
      unsplashUnlikePhoto(id).then(info => {
        info.photo.user = info.user;
        props.unlikePhoto(info.photo.likes, info.photo.liked_by_user);
        props.getPhoto(info.photo);
        props.updateArrayPhoto(info.photo);
      });
    } else {
      unsplashLikePhoto(id).then(info => {
        console.log(info);
        info.photo.user = info.user;
        props.likePhoto(info.photo.likes, info.photo.liked_by_user);
        props.getPhoto(info.photo);
        props.updateArrayPhoto(info.photo);
      });
    }
  }
  const url = props.photo.links.html;
  const author = props.photo.user.name;
  const image = props.photo.urls.small;
  const likesCount = props.photo.likes;
  const date = getFormattedDate(props.photo.updated_at);
  // Основной контент
  const mainContent = <article className="full-photo">
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
      <a href={url}>{author}</a>
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
        props.photo.id ? mainContent : loadContent
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    photo: state.currentPhoto,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getPhoto: (photo) => dispatch(getPhoto(photo)),
    likePhoto: (like, check) => dispatch(likePhoto(like, check)),
    unlikePhoto: (like, check) => dispatch(unlikePhoto(like, check)),
    updateArrayPhoto: (photo) => dispatch(updateArrayPhoto(photo)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentPhoto);
