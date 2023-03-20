/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
//import {createPhotoDescriptions} from './data.js';
import {photoData} from './data.js';

const picturesContainer = document.querySelector('.pictures');
picturesContainer.querySelector('.pictures__title').classList.remove('visually-hidden');

const similarPicturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPicturesFragment = document.createDocumentFragment();

photoData.forEach(({url, likes, comments}) => {
  const similarPictureElement = similarPicturesTemplate.cloneNode(true);
  similarPictureElement.querySelector('.picture__img').src = url;
  similarPictureElement.querySelector('.picture__likes').textContent = likes;
  similarPictureElement.querySelector('.picture__comments').textContent = comments.message.length;
  similarPicturesFragment.append(similarPictureElement);
});

picturesContainer.append(similarPicturesFragment);
