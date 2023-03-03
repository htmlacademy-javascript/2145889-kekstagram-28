/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable no-console */

//Проверяет кол-во символов в строке (с учетом пробелов)
function countSymbol (text) {
  if (text.length <= 20) {
    console.log('В проверяемой строке 20 символов или меньше');
    console.log('В введённой строке ' + text.length + ' символов');
    return true;
  } else {
    console.log('Проверяемая строка больше 20 символов');
    console.log('В введённой строке ' + text.length + ' символов');
    return false;
  }
}

// console.log(countSymbol ('а тут сколько?'));

//Проверяет является ли строка палиндромом
function isPolyndrom (text) {
  const reverseText = text.split('').reverse().join('');
  if (text === reverseText) {
    console.log('Строка "' + text + '" является палиндромом');
    console.log('Оригинальный текст: ' + text);
    console.log('Текст задом наперёд: ' + reverseText);
    return true;
  } else {
    console.log('Строка "' + text + '" НЕ является палиндромом');
    console.log('Оригинальный текст: ' + text);
    console.log('Текст задом наперёд: ' + reverseText);
    return false;
  }
}

//console.log(isPolyndrom('топот'));
//console.log(isPolyndrom('Машинка'));

//Проверяет является ли строка палиндромом (не учитывая пробелы)
function isPolyndromWithoutSpaces (text) {

  const reverseText = text.split('').reverse().join('').replaceAll(' ','').toLowerCase();
  if (text.replaceAll(' ','').toLowerCase() === reverseText) {
    console.log('Строка "' + text + '", если не учитывать регистр и пробелы, является палиндромом');
    console.log('Оригинальный текст: ' + text);
    console.log('Текст задом наперёд: ' + reverseText);
    return true;
  } else {
    console.log('Строка "' + text + '", если не учитывать регистр и пробелы, НЕ является палиндромом');
    console.log(text.replaceAll(' ','').toLowerCase());
    console.log('Оригинальный текст: ' + text);
    console.log('Текст задом наперёд: ' + reverseText);
    return false;
  }
}

//console.log(isPolyndromWithoutSpaces('Лёша на полке клопа нашёл '));
//console.log(isPolyndromWithoutSpaces('Лёша на полке клопа придавил '));

//Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их
//в виде целого положительного числа.
//Если в строке нет ни одной цифры, функция должна вернуть NaN

function getNumbers (text) {
  let numbersFromText = '';
  for (const index in text) {
    if (!isNaN(parseInt(text[index], 10))) {
      numbersFromText += text[index];
    }
  }
  return console.log(parseInt(numbersFromText, 10));
}

//getNumbers ('Пятница 13');
//getNumbers ('2023 год');
//getNumbers ('ECMAScript 2022');
//getNumbers ('1 кефир, 0.5 батона');
//getNumbers ('агент 007');
//getNumbers ('а я томат');

function addText (originalText, minWidth, extraText) {
  if (Number(originalText.length) >= minWidth) {
    console.log(Number(originalText.length));
    console.log ('Оригинальный текст: ' + originalText);
    return true;
  } else {
    console.log ('Оригинальный текст: ' + originalText);
    while (Number(extraText.length) - (minWidth - Number(originalText.length))) {
      extraText = extraText.substring(0, extraText.length - 1);
    }
    originalText = extraText + originalText;
    console.log('Изменённый текст: ' + originalText);
    return false;
  }
}

//console.log(addText('Привет', 9, 'qwe'));
