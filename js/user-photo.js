const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadedFile = document.querySelector('.img-upload__input[type=file]');
const imgDefault = document.querySelector('.img-upload__preview img');

uploadedFile.addEventListener('change', () => {
  const file = uploadedFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgDefault.src = URL.createObjectURL(file);
  }
});
