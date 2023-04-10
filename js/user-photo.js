import { image } from './effects.js';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadedFile = document.querySelector('.img-upload__input[type=file]');

uploadedFile.addEventListener('change', () => {
  const file = uploadedFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    image.src = URL.createObjectURL(file);
  }
});
