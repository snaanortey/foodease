import React from "react";
import axios from "axios";
import { emailRegex, passwordRegex } from "../../utils/validateFormInput";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const Navigate = useNavigate();

  const submitButtonHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const userData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      password: form.password.value,
    };

    const email = form.email.value;
    const password = form.password.value;
    const verifyPassword = form.verifyPassword.value;

    if (!emailRegex.test(email)) {
      alert("Email is invalid");
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Password should have at least 8 characters, with at least a symbol, upper and lower case letters and a number"
      );
    }
    if (password !== verifyPassword) {
      alert("Passwords do not match");
    } else {
      axios
        .post("http://localhost:8000/register", userData)
        .then((userData) => {
          console.log(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    form.reset();

    alert("Registration successful");

    Navigate("/login");
  };

  return (
    <>
      <form onSubmit={submitButtonHandler}>
        <label>First Name</label>
        <input type="text" name="firstName" required />
        <label>Last Name</label>
        <input type="text" name="lastName" required />
        <label>Email</label>
        <input type="email" name="email" required />
        <label>Password</label>
        <input type="password" name="password" required />
        <label>Verify Password</label>
        <input type="password" name="verifyPassword" required />
        <button>submit</button>
      </form>
    </>
  );
}
