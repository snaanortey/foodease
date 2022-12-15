import React from "react";
import { backendService } from "../../services/backend";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const formEventHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const email = form.email.value;
    const password = form.password.value;

    const userLoginData = {
      username: email,
      password: password,
    };

    const isLoggedIn = await backendService.login(userLoginData);
    if (isLoggedIn) {
      form.reset();
      navigate("/profile");
    } else {
      alert("Login failed. Please try again.");
    }
  };
  return (
    <>
      <form onSubmit={formEventHandler}>
        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          placeholder="type your email"
          required
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="type your email"
          required
        />
        <button>Submit</button>
      </form>
    </>
  );
}
