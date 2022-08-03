import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const mailEl = document.querySelector('[name="email"]');
const messageEl = document.querySelector('[name="message"]');

const formData = {};
const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();


function onFormSubmit(event) {
  event.preventDefault();
  if (mailEl.value === '' || messageEl.value === '') {
    return alert('Please, fill in form fields and push the button «Submit»');
  }
  console.log(formData);
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(event) {
  formData[mailEl.name] = mailEl.value;
  formData[messageEl.name] = messageEl.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}


function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);
  if (!parsedMessage) {
    return;
  }
  mailEl.value = parsedMessage.email;
  messageEl.value = parsedMessage.message;
}
