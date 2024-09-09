import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
    const [userDetails, setuserDetails] = useState({name:"", email: "", password: "",confirm_password:"" });
	const [error, setError] = useState("");
const Base_URL = "https://file-manager-server.vercel.app/"
	const handleOnchange = ({ currentTarget: input }) => {
		setuserDetails({ ...userDetails, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
       

        if (userDetails.password !== userDetails.confirm_password) {
            setError("doesn't match confirm_password")
            return;
        }
        if (userDetails.password.length<8) {
            setError("password must be at least 8 characters long")
            return;
        }
		try {
			const url = `${Base_URL}api/user/register`;
			const { data } = await axios.post(url, userDetails);
            console.log(data);
			// localStorage.setItem("userinfo", JSON.stringify(userDetails.name));
			window.location = "/login";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

  return (
    <div className="signupdiv">
    <main className="main-sign_up_container">
    
    <form onSubmit={handleSubmit} className="sign-up-container">
        <p className="error-paragraph">{error !== '' ? `Error: ${error}` : null}</p>
        <h3>Sign up</h3>
        <div className="inputs">

        </div>
            <div className="input-div">
            <label htmlFor="name">
               UserName
            </label>
            <input name="name" id="name" type="text"  
            placeholder="Enter Your UserName"
            onChange={handleOnchange}
            value={userDetails.name}
            />
            </div>
            <div className="input-div">
            <label htmlFor="email">
                Email
            </label>
            <input name="email" id="email" type="email"  
            onChange={handleOnchange}
            value={userDetails.email}
            placeholder="Enter Your Email"

            />
            </div>
            <div className="input-div">
            <label htmlFor="password">
                password
            </label>
            <input name="password" id="password" type="text"  
            onChange={handleOnchange}
            value={userDetails.password}
            placeholder="Enter Your Password"

            />
            </div>
            <div className="input-div">
            <label htmlFor="confirm_password">
                Confirm Password
            </label>
            <input name="confirm_password" id="confirm_password" type="password"  
            onChange={handleOnchange}
            value={userDetails.confirm_password}
            placeholder="Enter Your Confirm Password"

            required
            />
            </div>
            <button className="sign-up-button running-border">
                Sign up
            </button>
            <p className="sign-up-redirect-p">Already have an account? <Link to="/login">Sign in</Link></p>
    </form>
    </main>
</div>
  );

};

export default SignUp;