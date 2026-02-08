const form = document.getElementById("signupForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const data = new FormData(form);

  fetch("https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse", {
    method: "POST",
    mode: "no-cors",
    body: data
  }).then(() => {
    message.innerText = "Welcome to the movement. We'll be in touch soon.";
    form.reset();
  });
});