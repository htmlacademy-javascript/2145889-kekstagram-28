import './miniatures.js';
import './big-pictures.js';
import './scale-image.js';
import './user-photo.js';

import { onFormSubmit, closeModal, showSuccessMessage, showErrorMessage } from './user-form.js';
import { getData, sendData } from './api.js';
import { renderData } from './big-pictures.js';

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

getData().then((data) => {
  renderData(data);
});
