// Функція збереження даних до Local Storage

export function saveToLS(key, value) {
  const jsonFormat = JSON.stringify(value);
  localStorage.setItem(key, jsonFormat);
}

// Функція отримання даних від Local Storage

export function loadFromLS(key) {
  const dataVelue = localStorage.getItem(key);
  try {
    const result = JSON.parse(dataVelue);
    return result;
  } catch {
    return dataVelue;
  }
}
