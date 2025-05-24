const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

const successMsg = document.getElementById('successMsg');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');

const toggleDarkBtn = document.getElementById('toggleDark');

// Email regex validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Real-time validation function
function validateField(field, errorElement, validationFn, errorMessage) {
  if (!validationFn(field.value.trim())) {
    errorElement.textContent = errorMessage;
    return false;
  } else {
    errorElement.textContent = '';
    return true;
  }
}

// Validation rules for each field
function isNotEmpty(value) {
  return value !== '';
}

function realTimeValidation() {
  validateField(nameInput, nameError, isNotEmpty, 'Please enter your name');
  validateField(emailInput, emailError, validateEmail, 'Please enter a valid email');
  validateField(subjectInput, subjectError, isNotEmpty, 'Please enter the subject');
  validateField(messageInput, messageError, isNotEmpty, 'Please enter your message');
}

// Add event listeners for real-time validation
[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
  input.addEventListener('input', () => {
    if (input === emailInput) {
      validateField(emailInput, emailError, validateEmail, 'Please enter a valid email');
    } else if (input === nameInput) {
      validateField(nameInput, nameError, isNotEmpty, 'Please enter your name');
    } else if (input === subjectInput) {
      validateField(subjectInput, subjectError, isNotEmpty, 'Please enter the subject');
    } else if (input === messageInput) {
      validateField(messageInput, messageError, isNotEmpty, 'Please enter your message');
    }
  });
});

// Handle form submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Reset errors and success message
  nameError.textContent = '';
  emailError.textContent = '';
  subjectError.textContent = '';
  messageError.textContent = '';
  successMsg.classList.remove('show');
  successMsg.style.display = 'none';

  // Disable submit button and show loader
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');

  // Validate all fields
  let valid = true;

  if (!nameInput.value.trim()) {
    nameError.textContent = 'Please enter your name';
    valid = false;
  }

  if (!emailInput.value.trim()) {
    emailError.textContent = 'Please enter your email';
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email';
    valid = false;
  }

  if (!subjectInput.value.trim()) {
    subjectError.textContent = 'Please enter the subject';
    valid = false;
  }

  if (!messageInput.value.trim()) {
    messageError.textContent = 'Please enter your message';
    valid = false;
  }

  if (!valid) {
    // Focus and scroll to first error input
    const firstError = document.querySelector('.error:not(:empty)');
    if (firstError) {
      const inputField = firstError.previousElementSibling.previousElementSibling || firstError.previousElementSibling;
      inputField.focus();
      inputField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Enable submit button and hide loader
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    return;
  }

  // Simulate sending message delay
  setTimeout(() => {
    successMsg.style.display = 'flex';
    setTimeout(() => successMsg.classList.add('show'), 10);

    // Clear form after success
    form.reset();

    // Enable submit button and hide loader
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');

    // Hide success message after 4 seconds
    setTimeout(() => {
      successMsg.classList.remove('show');
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 500);
    }, 4000);
  }, 2000);
});

// Clear form handler
clearBtn.addEventListener('click', () => {
  form.reset();
  nameError.textContent = '';
  emailError.textContent = '';
  subjectError.textContent = '';
  messageError.textContent = '';
  successMsg.classList.remove('show');
  successMsg.style.display = 'none';
  submitBtn.disabled = false;
  submitBtn.classList.remove('loading');
  nameInput.focus();
});

// Dark mode toggle
toggleDarkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    toggleDarkBtn.textContent = '☀️';
    toggleDarkBtn.title = 'Switch to Light Mode';
  } else {
    toggleDarkBtn.textContent = '🌙';
    toggleDarkBtn.title = 'Switch to Dark Mode';
  }
});
