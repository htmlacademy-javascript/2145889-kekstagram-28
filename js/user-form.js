/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { isEscapeKey } from './util.js';
import { resetEffects } from './effects.js';
import { scaleReset } from './scale-image.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const success = document.querySelector('#success').content.querySelector('.success');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const error = document.querySelector('#error').content.querySelector('.error');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');

const HASHTAG_COUNT_MAX = 5;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT = 'Не правильно заполнены хэштэги';

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
  resetEffects();
  scaleReset();
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
  return isValid;
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

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const showSuccess = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(success);
    } else {
      const successClone = document.querySelector('.success');
      successClone.classList.remove('hidden');
    }
  };
};
const showSuccessMessage = showSuccess();

const showError = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(error);
    } else {
      const errorClone = document.querySelector('.error');
      errorClone.classList.remove('hidden');
    }
  };
};
const showErrorMessage = showError();

const hideModalMessage = () => {
  success.classList.add('hidden');
  error.classList.add('hidden');
};

const closeModalWithEsc = (evt) => {
  if (isEscapeKey(evt)) {
    hideModalMessage();
  }
};

const closeModalWithButton = () => {
  hideModalMessage();
};

const closeModalWithBody = (evt) => {
  evt.stopPropagation();
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    hideModalMessage();
  }
};

const onFormSubmit = (cb) => {
  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValidated = pristine.validate();
    if (isValidated) {
      blockSubmitButton();
      successButton.addEventListener('click', closeModalWithButton);
      errorButton.addEventListener('click', closeModalWithButton);
      document.addEventListener('keydown', closeModalWithEsc);
      document.addEventListener('click', closeModalWithBody);
      await cb(new FormData(imgUploadForm));
      unblockSubmitButton();
    }
  });
};
//
//
uploadFile.addEventListener('change', onInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
export {onFormSubmit, closeModal , showSuccessMessage, showErrorMessage};
