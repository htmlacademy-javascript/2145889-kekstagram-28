import {isEscapeKey} from './util.js';
import { createCommentItem } from './create-comment.js';
import { renderMiniatures } from './miniatures.js';

const documentBody = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentList = document.querySelector('.social__comments');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = document.querySelector('.big-picture .big-picture__img img');
const bigPictureLikes = document.querySelector('.big-picture .likes-count');
const bigPictureSocialCaption = document.querySelector('.big-picture .social__caption');
const bigPictureShowingComments = document.querySelector('.big-picture .showing-comments');

const VISIBLE_COMMENT_COUNT = 5;
let openCommentCount = 5;

const commentArr = (comments, node) => {
  openCommentCount += VISIBLE_COMMENT_COUNT;
  while(commentList.firstChild) {
    commentList.removeChild(commentList.firstChild);
  }
  comments.slice(0,openCommentCount).forEach((item) => {
    node.appendChild(createCommentItem(item));
  });
};

//Открывает большую фотографию миниатюры
const onClick = (element, func, className) => {
  element.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(className)) {
      evt.preventDefault();
      func(evt.target);
    } else {
      func();
    }
  });
};

//Закрывает большую фотографию
const closeBigPicture = () => {
  closeBigPictureButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    documentBody.classList.remove('modal-open');
  });
  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      bigPicture.classList.add('hidden');
      documentBody.classList.remove('modal-open');
    }
  });
};


const renderData = (dataCard) => {
  renderMiniatures(dataCard);
  const openBigPicture = (data) => {
    if (!data) {
      return;
    }
    const photo = dataCard.find((item) => item.id === +data.dataset.photoId);
    documentBody.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPictureImage.setAttribute('src', photo.url);
    document.querySelector('.big-picture .likes-count').textContent = photo.likes;
    bigPictureLikes.textContent = photo.comments.length;
    bigPictureSocialCaption.textContent = photo.description;
    bigPictureShowingComments.textContent = openCommentCount;
    commentArr(photo.comments, commentList);
  };

  onClick(document, openBigPicture, 'picture__img');
  onClick(document, closeBigPicture, 'big-picture__cancel');
};

export {renderData};
