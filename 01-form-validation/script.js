const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// if we have error
function showError(node, message) {
  const formControl = node.parentElement;
  formControl.className = "form-control error";

  const small = formControl.querySelector("small");
  small.innerText = message;
}

// if we have success
function showSuccess(node) {
  const formControl = node.parentElement;
  formControl.className = "form-control success";
}

// if we have  ValidEmail
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value.trim().toLowerCase()))) { 
    showSuccess(inputs)
  } else {
    showError(input, 'Email in not valid')
  }
}

// get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check value in inputs
function checkRequire(inputs) {
  inputs.forEach(input => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// check length inputs value
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// match passwords fields
function matchPassword(pass, pass2) {
  if(pass.value !== pass2.value) {
    showError(pass2, 'Passwords do not match')
  }
}

// add event to form
form.addEventListener("submit", function(e) {
  e.preventDefault();

  checkRequire([username, email, password, password2]);
  checkLength(username, 3, 20);
  checkLength(password, 6, 16);
  checkEmail(email);
  matchPassword(password, password2)
});
