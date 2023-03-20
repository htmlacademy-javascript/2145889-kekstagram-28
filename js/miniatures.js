/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {createPhotoDescriptions} from './data.js';

const picturesContainer = document.querySelector('.pictures');
picturesContainer.querySelector('.pictures__title').classList.remove('visually-hidden');

const similarPicturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPhotos = createPhotoDescriptions();

const similarPicturesFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, likes, comments}) => {
  const similarPictureElement = similarPicturesTemplate.cloneNode(true);
  similarPictureElement.querySelector('.picture__img').src = url;
  similarPictureElement.querySelector('.picture__likes').textContent = likes;
  similarPictureElement.querySelector('.picture__comments').textContent = comments.message.length;
  picturesContainer.append(similarPictureElement);
});

console.log(similarPhotos);
