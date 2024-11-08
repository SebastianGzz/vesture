const loginForm = document.getElementById("login-form");

const customers = [
  {
    email: "admin@gmail.com",
    password: "admin",
    rol: "admin",
  },
  {
    email: "sebastiangzzcor@gmail.com",
    password: "123456",
    rol: "user",
  },
];

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");

  if (emailInput.value === "" || passwordInput.value === "") {
    return elert("Por favor, rellena todos los campos");
  }

  // Validar el email y la contraseña
  const email = emailInput.value;
  const password = passwordInput.value;

  const customer = customers.find((customer) => {
    if (customer.email === email && customer.password === password) {
      localStorage.setItem("customer", JSON.stringify(customer));
      return customer;
    }
  });

  const redirection = {
    admin: "/views/admin/admin.html",
    user: "/",
  };

  if (customer) window.location.href = redirection[customer.rol];
});