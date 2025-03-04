import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [redirect, setRedirect] = useState(false)
const {setUser}=useContext(UserContext)
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(data)
      alert("login successful");
      setRedirect(true)
    } catch (e) {
      alert("login Failed");
    }
  }
  if (redirect){
    return <Navigate to = {"/"}/>
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center">Login</h1>
        <form
          action=""
          className="max-w-md mx-auto "
          onSubmit={handleLoginSubmit}
        >
          <input
            type="text"
            placeholder="your@mail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            dont have an account yet?
            <Link to={"/register"} className="underline text-black">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
