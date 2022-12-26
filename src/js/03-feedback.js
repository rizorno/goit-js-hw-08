import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector("[name='email']");
const message = document.querySelector("[name='message']");

email.addEventListener('input', throttle(onFormData, 500));
message.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onSubmitForm);

let formData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

function onFormData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSubmitForm(e) {
  e.preventDefault();

  const {
    elements: { email, message },
  } = e.currentTarget;

  if (email.value === '' || message.value === '') {
    alert('Please fill in all the fields!');
    return;
  }

  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));

  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function dataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (data === null) {
    email.value = '';
    message.value = '';
    return;
  }

  if (data.email === undefined && data.message) {
    email.value = '';
    message.value = data.message;
  } else if (data.message === undefined && data.email) {
    email.value = data.email;
    message.value = '';
  } else {
    email.value = data.email;
    message.value = data.message;
  }
}

dataFromLocalStorage();
