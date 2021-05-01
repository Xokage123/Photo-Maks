import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import like from "../assets/001-like.png";

function FullPhoto (props) {
  const { key, id, author, url, image, likesCount, date } = props;
  const bgImageLike = {
    backgroundImage: "url(" + like + ")",
  };

  return (
    <li className="photo-gallery__item" key={key}>
      <article className="photo-gallery__wrapper">
        <h2 className="photo-gallery__heading">
          <a href={url}>{author}</a>
        </h2>
        <Link to={`/photos/${id}`}>
          <img alt={'img'} className="photo-gallery__image" src={image} />
          <div className="photo-gallery__likes-count" style={bgImageLike}>
            {likesCount}
          </div>
          <time className="photo-gallery__time">{date}</time>
        </Link>
      </article>
    </li>
  )
}

const mapStateToProps = (state) => ({ photos: state.photos });
export default connect(mapStateToProps)(FullPhoto);