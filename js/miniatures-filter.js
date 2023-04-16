const NUMBER_OF_PHOTOS = 10;

export const imgFilter = document.querySelector('.img-filters');
const defaultFilterButton = imgFilter.querySelector('#filter-default');
const randomFilterButton = imgFilter.querySelector('#filter-random');
const discussedFilterButton = imgFilter.querySelector('#filter-discussed');

const setActiveFilter = (button) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const shuffleMiniatures = () => Math.random() - 0.5;

const compareMiniatures = (photoA, photoB) => {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;
  return rankB - rankA;
};

const executeFilterButtons = (data, showMiniatures) => {
  defaultFilterButton.addEventListener('click', (evt) => {
    showMiniatures(data);
    setActiveFilter(evt.target);
  });

  randomFilterButton.addEventListener('click', (evt) => {
    showMiniatures(data.slice().sort(shuffleMiniatures).slice(0, NUMBER_OF_PHOTOS));
    setActiveFilter(evt.target);
  });

  discussedFilterButton.addEventListener('click', (evt) => {
    showMiniatures(data.slice().sort(compareMiniatures));
    setActiveFilter(evt.target);
  });
};

export { executeFilterButtons };
