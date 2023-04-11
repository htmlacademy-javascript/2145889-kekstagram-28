/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {openBigPicture, closeBigPicture} from './big-pictures.js';

export const picturesContainer = document.querySelector('.pictures');
picturesContainer.querySelector('.pictures__title').classList.remove('visually-hidden');

const similarPicturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPicturesFragment = document.createDocumentFragment();

const renderMiniatures = (data) => {
  data.forEach((photo) => {
    const similarPictureElement = similarPicturesTemplate.cloneNode(true);
    const pictureImg = similarPictureElement.querySelector('.picture__img');
    pictureImg.src = photo.url;
    pictureImg.dataset.photoId = photo.id;
    similarPictureElement.querySelector('.picture__likes').textContent = photo.likes;
    similarPictureElement.querySelector('.picture__comments').textContent = photo.description.length;
    similarPicturesFragment.append(similarPictureElement);
  });

  picturesContainer.append(similarPicturesFragment);
};

export {renderMiniatures};
