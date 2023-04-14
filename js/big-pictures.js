import {isEscapeKey} from './util.js';
import { createCommentItem } from './create-comment.js';
import { renderMiniatures } from './miniatures.js';

const bigPictureContainer = document.querySelector('.big-picture');
const commentList = document.querySelector('.social__comments');

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
  const closeBigPictureButton = bigPictureContainer.querySelector('.big-picture__cancel');
  closeBigPictureButton.addEventListener('click', () => {
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


const renderData = (dataCard) => {
  renderMiniatures(dataCard);
  const openBigPicture = (data) => {
    if (!data) {
      return;
    }
    const photo = dataCard.find((item) => item.id === +data.dataset.photoId);
    document.querySelector('body').classList.add('modal-open');
    document.querySelector('.big-picture').classList.remove('hidden');
    document.querySelector('.big-picture .big-picture__img img').setAttribute('src', photo.url);
    document.querySelector('.big-picture .likes-count').textContent = photo.likes;
    document.querySelector('.big-picture .comments-count').textContent = photo.comments.length;
    document.querySelector('.big-picture .social__caption').textContent = photo.description;
    document.querySelector('.big-picture .showing-comments').textContent = openCommentCount;
    commentArr(photo.comments, commentList);
  };

  onClick(document, openBigPicture, 'picture__img');
  onClick(document, closeBigPicture, 'big-picture__cancel');
};

export {renderData};
