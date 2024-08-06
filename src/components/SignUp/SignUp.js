import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIS from "../../constants/api";

export default function SignUp(props) {
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/", {replace: true});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (cred.password !== cred.cpassword) {
      alert("Both password must be same");
      return;
    }

    try {
      const response = await fetch(APIS.auth.signUp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cred),
      });

      if (!response.ok) {
        throw new Error(response.status);
      }

      const json = await response.json();
      if (json.status === "OK") {
        props.showAlert(json.msg, "success");
        await localStorage.setItem("token", json.token);
        navigate("/", { replace: true });
      }
      return;
    } catch (error) {
      console.log(error);
      if (error.message === "400") {
        props.showAlert("Email already exist", "danger");
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Name
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            name="name"
            minLength={3}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            required
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
