import { image } from './effects.js';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadedFile = document.querySelector('.img-upload__input[type=file]');
const previewImages = document.querySelector('.effects__preview');

uploadedFile.addEventListener('change', () => {
  const file = uploadedFile.files[0];
  const fileName = file.name.toLowerCase();
  const compares = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (compares) {
    image.src = URL.createObjectURL(file);
  }
  previewImages.forEach((image) => {
    image.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });

});
