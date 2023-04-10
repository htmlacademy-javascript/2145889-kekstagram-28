/* eslint-disable no-console */
import './data.js';
import './miniatures.js';
import './big-pictures.js';
import './scale-image.js';
import './user-photo.js';

import { onFormSubmit, closeModal, showSuccessMessage, showErrorMessage } from './user-form.js';
import { sendData } from './api.js';

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
