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
  const pictureImg = similarPictureElement.querySelector('.picture__img');
  pictureImg.src = photo.url;
  pictureImg.dataset.photoId = photo.id;
  similarPictureElement.querySelector('.picture__likes').textContent = photo.likes;
  similarPictureElement.querySelector('.picture__comments').textContent = photo.description;
  similarPicturesFragment.append(similarPictureElement);
});

picturesContainer.append(similarPicturesFragment);
