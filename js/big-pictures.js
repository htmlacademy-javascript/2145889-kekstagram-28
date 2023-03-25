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
const comments = [];

const renderComments = () => {
  openedComments += VISIBLE_COMMENTS;
  console.log(openedComments);
  if (openedComments > comments.length) {
    commentsLoader.classList.add('hidden');
    openedComments = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < openedComments; i++) {
    const commentElement = createCommentItem [i];
    fragment.append(commentElement);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentCount.innerHTML = `${openedComments} из <span class="comments-count">${comments.length}</span>`;
};

//Открывает большую фотографию миниатюры
const openBigPicture = (item, photo) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('body').classList.add('modal-open');
    document.querySelector('.big-picture').classList.remove('hidden');
    document.querySelector('.big-picture .big-picture__img img').setAttribute('src', photo.url);
    document.querySelector('.big-picture .likes-count').textContent = photo.likes;
    document.querySelector('.big-picture .comments-count').textContent = photo.comments.length;
    document.querySelector('.big-picture .social__caption').textContent = photo.description;
    renderComments();
  });
};

//Закрывает большую фотографию
const closeBigPicture = () => {
  const closeBigPictureButton = bigPictureContainer.querySelector('.big-picture__cancel');
  closeBigPictureButton.addEventListener('click', (evt) => {
    evt.preventDefault();
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

export {openBigPicture, closeBigPicture};
