const formEl = document.querySelector("#signup-form");
const emailEl = formEl.querySelector("#email");

const isRequired = (value) => (value === "" ? false : true);

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const showError = (element, message) => {
  const parentEl = element.parentElement;

  parentEl.classList.add("error");
  parentEl.querySelector("small").innerText = message;
};

const hideError = (element) => {
  const parentEl = element.parentElement;

  parentEl.classList.remove("error");
  parentEl.querySelector("small").innerText = "";
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();

  if (!isRequired) {
    showError(emailEl, "Email cannot be blank");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Oops! Please check your email");
  } else {
    hideError(emailEl);
    valid = true;
  }

  return valid;
};

const debounce = (fn, delay = 500) => {
  let timeoutId;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  let isEmailValid = checkEmail();

  if (isEmailValid) {
    alert("Form submitted");
    formEl.reset();
  }
});

formEl.addEventListener("input", debounce(checkEmail, 500));
