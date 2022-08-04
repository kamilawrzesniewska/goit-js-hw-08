import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');


const STORAGE_KEY = 'feedback-form-state';

form.addEventListener(
    'input', throttle((event) => {
      const objInput = {
        email: form.elements.email.value,
        message: form.elements.message.value,
      };
      localStorage.setItem('feedback-form-state', JSON.stringify(objInput));
    }, 500)
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { elements: { email, message } } = event.currentTarget;
    console.log({ email: email.value, message: message.value });
    
    event.currentTarget.reset();
    localStorage.clear();
});


const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

const fillForm = () => {
  if (savedMessage) {
    input.value = parseStorage.email;
    textArea.value = parseStorage.message;
  }
};
fillForm();