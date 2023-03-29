/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { isEscapeKey } from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const HASHTAG_COUNT_MAX = 5;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT = 'Не правильно заполнены хэштэги';
//console.log(VALID_HASHTAG.test('#1'));

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__wrapper',
  errorTextParent: 'img-upload__wrapper',
  errorTextClass: 'img-upload__error-text',
});

const openModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  imgUploadForm.reset();
  pristine.reset();
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isInTextFieldset = () =>
  document.activeElement === hashtagsInput || document.activeElement === commentInput;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isInTextFieldset()) {
    evt.preventDefault();
    closeModal();
  }
}

const onCancelButtonClick = () => {
  closeModal();
};

const onInputChange = () => {
  openModal();
};

const isValid = (hashtag) => {
  VALID_HASHTAG.test(hashtag);
};

const isValidCount = (hashtags) => hashtags.length <= HASHTAG_COUNT_MAX;

const hasUniqueHashtags = (hashtags) => {
  const lowerCaseTags = hashtags.map((hashtag) => hashtag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const hashtags = value.trim().split(' ').filter((hashtag) => hashtag.trim().length);
  return isValidCount(hashtags) && hasUniqueHashtags(hashtags) && hashtags.every(isValid);
};

pristine.addValidator(
  hashtagsInput,
  validateTags,
  HASHTAG_ERROR_TEXT
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

uploadFile.addEventListener('change', onInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
imgUploadForm.addEventListener('submit', onFormSubmit);
