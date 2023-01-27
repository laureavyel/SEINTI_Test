function Registro() {
  var user_name = document.getElementById("input_username").value;
  var pass = document.getElementById("input_password").value;
  var full_name = document.getElementById("input_fullname").value;

  const user = {
    full_name: full_name,
    user_name: user_name,
    user_password: pass,
  };

  console.log(user);

  const req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/User/signin");
  req.setRequestHeader("Content-Type", "application/json");

  req.addEventListener("load", function () {
    const res = JSON.parse(req.responseText);
    alert(res.message);
    window.location.href = "Login.html";
  });

  req.send(JSON.stringify(user));
}
