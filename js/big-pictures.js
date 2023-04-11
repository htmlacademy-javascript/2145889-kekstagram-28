/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {isEscapeKey} from './util.js';
import { createCommentItem } from './create-comment.js';
import {photoData} from './data.js';

const bigPictureContainer = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');

const VISIBLE_COMMENTS = 5;
let openedComments = 0;

const renderComments = (comments, node) => {
  openedComments += VISIBLE_COMMENTS;
  comments.forEach((item) => {
    node.appendChild(createCommentItem(item));
  });
};

//Открывает большую фотографию миниатюры
const openBigPicture = (data) => {
  if (!data) {
    return;
  }
  const photo = photoData.find((item) => item.id === +data.dataset.photoId);
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('.big-picture .big-picture__img img').setAttribute('src', photo.url);
  document.querySelector('.big-picture .likes-count').textContent = photo.likes;
  document.querySelector('.big-picture .comments-count').textContent = photo.comments.length;
  document.querySelector('.big-picture .social__caption').textContent = photo.description;
  renderComments(photo.comments.slice(0,3), commentList);
};

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
  const closeBigPictureButton = bigPictureContainer.querySelector('.big-picture__cancel');
  closeBigPictureButton.addEventListener('click', (evt) => {
    document.querySelector('.big-picture').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });
  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      document.querySelector('.big-picture').classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });
};

onClick(document, openBigPicture, 'picture__img');

onClick(document, closeBigPicture, 'big-picture__cancel');

export {openBigPicture, closeBigPicture};
