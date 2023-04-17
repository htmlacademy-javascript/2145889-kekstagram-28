
export const picturesContainer = document.querySelector('.pictures');
picturesContainer.querySelector('.pictures__title').classList.remove('visually-hidden');
import { imgFilter } from './miniatures-filter.js';

const similarPicturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPicturesFragment = document.createDocumentFragment();

const renderMiniatures = (data) => {
  data.forEach((photo) => {
    const similarPictureElement = similarPicturesTemplate.cloneNode(true);
    const pictureImg = similarPictureElement.querySelector('.picture__img');
    pictureImg.src = photo.url;
    pictureImg.dataset.photoId = photo.id;
    similarPictureElement.querySelector('.picture__likes').textContent = photo.likes;
    similarPictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    similarPicturesFragment.append(similarPictureElement);
  });

  picturesContainer.append(similarPicturesFragment);

  picturesContainer.append(similarPicturesFragment);
  imgFilter.classList.remove('img-filters--inactive');
};

export {renderMiniatures};
