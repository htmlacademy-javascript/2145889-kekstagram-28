// Создает данные комментатора
const createCommentImg = (data) => {
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture');
  avatarImg.setAttribute('src', data.avatar);
  avatarImg.setAttribute('alt', data.name);
  avatarImg.setAttribute('width', 35);
  avatarImg.setAttribute('height', 35);
};

const createCommentText = (data) => {
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = data.message;
};

const createCommentFragment = document.createDocumentFragment();

const createCommentItem = (data) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  commentItem.append(createCommentImg(data));
  commentItem.append(createCommentText(data));
  createCommentFragment.append(commentItem);
};

export {createCommentItem};
