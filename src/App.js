import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useCookies } from 'react-cookie';


function App() {
  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const user = {
    name: "admin",
    password: "admin",
  };

  async function getUsers() {
    const response = await axios.get("http://localhost:8000/users");
    return response.data;
  }
  const hundelSubmit = (e) => {
    e.preventDefault();
    if (name === user.name && password === user.password) {
      setIsLogin(true);
      console.log(users);
    } else {
      alert("Login Failed");
    }
  };

  return (
    <div className="container">
      {!isLogin && (
        <form className="login-form">
          <div>
            <label htmlFor="name">Name </label>
            <input
              id="name"
              type="text"
              placeholder="Eren Buruk"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn--form"
            type="submit"
            value="Log in"
            onClick={hundelSubmit}
          >
            Log in
          </button>
        </form>
      )}
      {isLogin && (
        <div className="login-success">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom et Prenom</th>
                <th scope="col">Telephone</th>
                <th scope="col">Email</th>
                <th scope="col">Fournisseur</th>
                <th scope="col">Adresse</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    <b>No data found to display.</b>
                  </td>
                </tr>
              )}
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.fournisseur}</td>
                  <td>{user.addresse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
