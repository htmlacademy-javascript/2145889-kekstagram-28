/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
// Данные
const MAX_ID = 25;
const MAX_COMMENT_ID = 25;
const MAX_URL_ID = 25;
const MAX_AVATAR_ID = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 250;
const DESCRIPTION = [
  'Я в Пориже, ем курасон',
  'На небе только и разговоров что о море...',
  'Нет, у них метрическая система, и они не знают, что такое четверть фунта… Они называют его “Роял Чизбургер”',
  'Мне сделали предложение от которого я не смог отказаться',
  'Этот ковёр задавал стиль всей стене',
  'Обожаю запах кофе по утрам',
  'Это ты Джон Уэйн???',
  'Нарисовал картину как одну из своих француженок',
];
const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAME = [
  'Лоуренс Аравийский',
  'Форест Гамп',
  'Мартин Брест',
  ' Руди Вурлитцер',
  'Эммет Браун',
  'Рик Декард',
  'Дейв Боумен',
  'Дейл Купер',
  'Селина Кайл',
];

// Функция для случайного числа (мин, макс)
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для уникального ID
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// Функция для отбора случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция для создания уникального ID фото
const generatePhotoId = createRandomIdFromRangeGenerator(1, MAX_ID);

// Функция для создания уникального ID комментария
const generateCommentId = createRandomIdFromRangeGenerator(1, MAX_COMMENT_ID);

//Функция для создания уникального URL фотографии
const generatePhotoUrl = createRandomIdFromRangeGenerator(1, MAX_URL_ID);


//Функция для создания комментария
const createComments = () => {
  return {
    id: generateCommentId(),
    avatar: `${'img/avatar-'}${getRandomInteger(1, MAX_AVATAR_ID)}${'.svg'}`,
    message:getRandomArrayElement(COMMENTS_MESSAGE),
    name: getRandomArrayElement(NAME),
  };
};

//Функция для создания массива
const createPhotoDescription = () => {
  return {
    id: generatePhotoId(),
    url: `${'photos/'}${generatePhotoUrl()}${'.jpg'}`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: createComments(),
  };
};

const createSimilarPhotoDescription = Array.from({length: 25}, createPhotoDescription);
