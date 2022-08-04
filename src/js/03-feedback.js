import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

const formData = {};
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();


function onFormSubmit(event) {
  event.preventDefault();
  if (input.value === '' || textarea.value === '') {
    return alert('Please, fill in form fields and push the button «Submit»');
  }
  console.log(formData);
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(event) {
  formData[input.name] = input.value;
  formData[textarea.name] = textarea.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}


function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);
  if (!parsedMessage) {
    return;
  }
  input.value = parsedMessage.email;
  textarea.value = parsedMessage.message;
}
