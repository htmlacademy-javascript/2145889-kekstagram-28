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
const commentsLoader = document.querySelector('.comments-loader');
const postCommentsCount = document.querySelector('.comments-count');

let currentPostComments = [];
let openCommentCount = 0;
const VISIBLE_COMMENT_COUNT = 5;

const isShowCommentsLoader = (comment, count) => {
  if (comment.length <= count) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const commentArr = (comment, count) => {
  if (count === 0) {
    openCommentCount = count;
    while (commentList.firstChild) {
      commentList.removeChild(commentList.firstChild);
    }
  }
  bigPictureShowingComments.textContent = Math.min(comment.length, openCommentCount + VISIBLE_COMMENT_COUNT);
  comment.slice(openCommentCount, openCommentCount + VISIBLE_COMMENT_COUNT).forEach((item) => {
    commentList.appendChild(createCommentItem(item));
  });
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

const loadComments = () => {
  commentArr(currentPostComments, openCommentCount);
  openCommentCount += 5;
  isShowCommentsLoader(currentPostComments, openCommentCount);
  document.removeEventListener('click', loadComments);
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
  document.removeEventListener('click', loadComments);
  document.removeEventListener('click', closeBigPicture);
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
    postCommentsCount.textContent = photo.comments.length;
    currentPostComments = photo.comments;
    commentArr(currentPostComments, 0);
  };

  onClick(document, openBigPicture, 'picture__img');
  onClick(closeBigPictureButton, closeBigPicture, 'big-picture__cancel');
  onClick(document, loadComments, 'comments-loader');
};

export {renderData};
