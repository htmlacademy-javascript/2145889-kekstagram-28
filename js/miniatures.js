/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
//import {createPhotoDescriptions} from './data.js';
import {photoData} from './data.js';
import {openBigPicture, closeBigPicture} from './big-pictures.js';

export const picturesContainer = document.querySelector('.pictures');
picturesContainer.querySelector('.pictures__title').classList.remove('visually-hidden');

const similarPicturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPicturesFragment = document.createDocumentFragment();

photoData.forEach((photo) => {
  const similarPictureElement = similarPicturesTemplate.cloneNode(true);
  similarPictureElement.querySelector('.picture__img').src = photo.url;
  similarPictureElement.querySelector('.picture__likes').textContent = photo.likes;
  similarPictureElement.querySelector('.picture__comments').textContent = photo.comments.message.length;
  similarPicturesFragment.append(similarPictureElement);
  openBigPicture(similarPictureElement, photo);
  closeBigPicture();
});

picturesContainer.append(similarPicturesFragment);
