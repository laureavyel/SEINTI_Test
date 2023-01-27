window.onload = init;

function init() {
  if (!localStorage.getItem("token")) {
    document
      .querySelector("#singUp-button")
      .addEventListener("click", function () {
        window.location.href = "Registro.html";
      });

    document.querySelector("#singUp-button").addEventListener("click", login);
  } else {
    window.location.href = "Principal.html";
  }
}

function login() {
  var user_name = document.getElementById("input_username").value;
  var pass = document.getElementById("input_password").value;

  const user = {
    user_name: user_name,
    user_password: pass,
  };

  const req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/User/login");
  req.setRequestHeader("Content-Type", "application/json");

  req.addEventListener("load", function () {
    const res = JSON.parse(req.responseText);
    localStorage.setItem("token", res.message);
    localStorage.setItem("username", res.user_name);
  });

  req.send(JSON.stringify(user));
}
