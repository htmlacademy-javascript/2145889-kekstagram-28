import './data.js';
import './miniatures.js';
import './big-pictures.js';
import './scale-image.js';
import './user-photo.js';

import { onFormSubmit, closeModal, showSuccessMessage, showErrorMessage } from './user-form.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { renderMiniatures } from './miniatures.js';

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderMiniatures(data);
} catch (err) {
  showAlert(err.message);
}
