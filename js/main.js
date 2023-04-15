import './miniatures.js';
import './big-pictures.js';
import './scale-image.js';
import './user-photo.js';

import { onFormSubmit, closeModal, showSuccessMessage, showErrorMessage } from './user-form.js';
import { getData, sendData } from './api.js';
import { renderData } from './big-pictures.js';
import { executeFilterButtons } from './miniatures-filter.js';
import { ERROR_MESSAGE_DELAY, debounce } from './util.js';
import { renderMiniatures } from './miniatures.js';
//import { showAlert } from './util.js';

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
  executeFilterButtons (data, debounce(renderMiniatures, ERROR_MESSAGE_DELAY));
});
