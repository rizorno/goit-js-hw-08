import throttle from 'lodash.throttle';

// * ========== Варіант з імпортом ==========

// import { loadFromLS, saveToLS } from './helpers.js';

// * ========== Варіант без імпорту ==========

const form = document.querySelector('.feedback-form');

// Функція збереження даних до Local Storage

function saveToLS(key, value) {
  const jsonFormat = JSON.stringify(value);

  localStorage.setItem(key, jsonFormat);
}

// Функція отримання даних від Local Storage

function loadFromLS(key) {
  const dataVelue = localStorage.getItem(key);

  try {
    const result = JSON.parse(dataVelue);
    return result;
  } catch {
    return dataVelue;
  }
}

// Виклик функції отримання значень для кожного з полів форми

loadData();

// Функція отримання значень для кожного з полів форми

function loadData() {
  const data = loadFromLS('feedback-form-state') || {};

  for (let key of Object.keys(data)) {
    form.elements[key].value = data[key];
  }
}

// Прослуховувач 'input' до полів форми

form.addEventListener('input', throttle(onFormData, 500));

// Функція під час 'input' до полів форми

function onFormData(e) {
  const data = loadFromLS('feedback-form-state') || {};
  const nameElem = e.target.name;

  data[nameElem] = e.target.value;
  saveToLS('feedback-form-state', data);
}

// Прослуховувач на 'submit'

form.addEventListener('submit', onSubmitForme);

// Функція під час 'submit'

function onSubmitForme(e) {
  e.preventDefault();

  for (let key of Object.keys(e.target.elements)) {
    if (Number.isNaN(Number(key))) {
      const elem = e.target.elements[key];

      if (elem.value.trim() === '') {
        alert('Please fill in all the fields!');
        return;
      }
    }
  }

  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
  e.target.reset();
}
