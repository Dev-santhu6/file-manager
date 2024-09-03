
// import React, { useState } from "react";
// import "./SignIn.css";
// import { Link } from "react-router-dom";
// import axios from 'axios';

// import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//     const [signInDetails, setsignInDetails] = useState({ email: "", password: "" });
//     const [error, setError] = useState("");

//     const handleOnChange = ({ currentTarget: input }) => {
//         setsignInDetails({ ...signInDetails, [input.name]: input.value });
//     };
//     // const URL =process.env.REACT_APP_URL;

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = `http://localhost:3001/api/user/login`;
//             const { data } = await axios.post(url, signInDetails);
//             console.log(data);

//             // Store user info in localStorage
//             localStorage.setItem("userinfo", JSON.stringify(signInDetails.email));

//             // Check if the user is an admin
//             const adminEmail =process.env.REACT_APP_ADMIN_EMAIL;
            



//             if (signInDetails.email === adminEmail) {
//                 localStorage.setItem("isAdmin", true);
//             }


//             // if (data.role === "admin") {
//             //     localStorage.setItem("isAdmin", true);
//             // }

//             window.location = "/";
//             window.location.href = document.referrer;
//             toast();
//         } catch (error) {
//             if (
                
//                 error.response &&
//                 error.response.status >= 400 &&
//                 error.response.status <= 500
//             ) {
//                 setError(error.response.data.message);
//                 toast(error.response.data.message);
//             }
//         }
//     };

//     return (
//         <div className="logindiv">
//             <main className="main-sign_in_container">
//                 <form onSubmit={handleSubmit} className="sign-in-container">
//                     <h3>Sign in</h3>
//                     <div className="input-div">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             name="email"
//                             id="email"
//                             type="email"
//                             placeholder="Enter your email"
//                             onChange={handleOnChange}
//                             value={signInDetails.email}
//                         />
//                         <span><p className="error-paragraph">{error !== '' ? `Error: ${error}` : null}</p></span>
//                     </div>
//                     <div className="input-div">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             name="password"
//                             id="password"
//                             type="password"
//                             placeholder="Enter your password"
//                             onChange={handleOnChange}
//                             value={signInDetails.password}
//                         />
//                                                 <span><p className="error-paragraph">{error !== '' ? `Error: ${error}` : null}</p></span>
//                     </div>
//                     <button className="sign-in-button running-border">Sign in</button>
//                     <p className="sign-in-redirect-p">Don't have an account? <Link to="/sign-up">Sign up</Link></p>
//                 </form>
//             </main>
//         </div>
//     );
// };

// export default Login;
// import React, { useState } from "react";
// import "./SignIn.css";
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Login({ onLogin ,email, password}) {
//     const [signInDetails, setsignInDetails] = useState({ email: "", password: "" });
//     const [error, setError] = useState("");

//     const handleOnChange = ({ currentTarget: input }) => {
//         setsignInDetails({ ...signInDetails, [input.name]: input.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = `http://localhost:3001/api/user/login`;
//             const { data } = await axios.post(url, signInDetails);
//             console.log(data);

//             // Store user info in localStorage
//             // localStorage.setItem("userinfo", JSON.stringify(signInDetails.email));
//  // Store the user name in localStorage
//  localStorage.setItem('userName', userName);

//  // You can also store other user info or tokens if needed
//  localStorage.setItem('userToken', response.data.token);

//             // Call onLogin after successful login
//             onLogin();
//             toast.success("Login successful!");

//         } catch (error) {
//             if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//                 setError(error.response.data.message);
//                 toast.error(error.response.data.message);
//             }
//         }
//     };

//     return (
//         <div className="logindiv">
//             <main className="main-sign_in_container">
//                 <form onSubmit={handleSubmit} className="sign-in-container">
//                     <h3>Sign in</h3>
//                     <div className="input-div">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             name="email"
//                             id="email"
//                             type="email"
//                             placeholder="Enter your email"
//                             onChange={handleOnChange}
//                             value={signInDetails.email}
//                         />
//                         <span><p className="error-paragraph">{error !== '' ? `Error: ${error}` : null}</p></span>
//                     </div>
//                     <div className="input-div">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             name="password"
//                             id="password"
//                             type="password"
//                             placeholder="Enter your password"
//                             onChange={handleOnChange}
//                             value={signInDetails.password}
//                         />
//                         <span><p className="error-paragraph">{error !== '' ? `Error: ${error}` : null}</p></span>
//                     </div>
//                     <button className="sign-in-button running-border">Sign in</button>
//                     <p className="sign-in-redirect-p">Don't have an account? <Link to="/signup">Sign up</Link></p>
//                 </form>
//             </main>
//         </div>
//     );
// }

// export default Login;


// import React, { useState } from "react";
// import "./SignIn.css";
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Login({ onLogin }) {
//     const [signInDetails, setsignInDetails] = useState({ email: "", password: "", name: "" });
//     const [error, setError] = useState("");

//     const handleOnChange = ({ currentTarget: input }) => {
//         setsignInDetails({ ...signInDetails, [input.name]: input.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = `http://localhost:3001/api/user/login`; // Ensure URL matches backend route
//             const { data } = await axios.post(url, signInDetails);

//             // Store user info in localStorage
//             localStorage.setItem('userName', data.name); // Store the user name from the response
//             // localStorage.setItem('userToken', data.token); // Store the JWT token from the response
//             const userName = localStorage.getItem('userName');
//             console.log(`${userName}`);
//             // Call onLogin after successful login
//             onLogin();
//             toast.success("Login successful!");

//         } catch (error) {
//             if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//                 setError(error.response.data.message);
//                 toast.error(error.response.data.message);
//             }
//         }
//     };

//     return (
//         <div className="logindiv">
//             <main className="main-sign_in_container">
//                 <form onSubmit={handleSubmit} className="sign-in-container">
//                     <h3>Sign in</h3>
//                     <div className="input-div">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             name="email"
//                             id="email"
//                             type="email"
//                             placeholder="Enter your email"
//                             onChange={handleOnChange}
//                             value={signInDetails.email}
//                         />
//                     </div>
//                     <div className="input-div">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             name="password"
//                             id="password"
//                             type="password"
//                             placeholder="Enter your password"
//                             onChange={handleOnChange}
//                             value={signInDetails.password}
//                         />
//                     </div>
//                     <div className="input-div">
//                         <label htmlFor="name">Name</label>
//                         <input
//                             name="name"
//                             id="name"
//                             type="text"
//                             placeholder="Enter your name"
//                             onChange={handleOnChange}
//                             value={signInDetails.name}
//                         />
//                     </div>
//                     <button className="sign-in-button running-border">Sign in</button>
//                     <p className="sign-in-redirect-p">Don't have an account? <Link to="/signup">Sign up</Link></p>
//                     {error && <p className="error-paragraph">Error: {error}</p>}
//                 </form>
//             </main>
//         </div>
//     );
// }

// export default Login;










// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import cookies from 'js-cookie';


// function Login({ onLogin }) {
//     const [signInDetails, setsignInDetails] = useState({ email: "", password: "", name: "" });
//     const [error, setError] = useState("");

//     const handleOnChange = ({ currentTarget: input }) => {
//         setsignInDetails({ ...signInDetails, [input.name]: input.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
            
//             const url = 'http://localhost:3001/api/user/login'; // Ensure URL matches backend route

// // Include userName in headers
// try {
//   const userName = localStorage.getItem('userName'); // Ensure this line is correctly placed

//   if (!userName) {
//     throw new Error('User name not found in localStorage');
//   }

//   const headers = {
//     'Content-Type': 'application/json', // or 'application/x-www-form-urlencoded' if that's what your backend expects
//     'x-username': userName // Add userName to the headers
//   };

//   // Make login request
//   const response = await axios.post(url, signInDetails, { headers });
  
//   // Store userName in cookies
//   cookies.set('userName', userName);
//   console.log('Login successful:', response.data);

//   // You may store other user information or token from the response here
//   // localStorage.setItem('userName', response.data.name); // Store the user name from the response if needed
//   // localStorage.setItem('userToken', response.data.token); // Store the JWT token from the response if needed

//   // Trigger login success actions
//   onLogin();
//   toast.success("Login successful!");
  
// } catch (error) {
//   console.error('Error logging in:', error);
//   toast.error("Login failed!");
// }

//         } catch (error) {
//             if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//                 setError(error.response.data.message);
//                 toast.error(error.response.data.message);
//             }
//         }
//     };

//     return (
//         <div className="logindiv">
//             <main className="main-sign_in_container">
//                 <form onSubmit={handleSubmit} className="sign-in-container">
//                     <h3>Sign in</h3>
//                     <div className="input-div">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             name="email"
//                             id="email"
//                             type="email"
//                             placeholder="Enter your email"
//                             onChange={handleOnChange}
//                             value={signInDetails.email}
//                         />
//                     </div>
//                     <div className="input-div">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             name="password"
//                             id="password"
//                             type="password"
//                             placeholder="Enter your password"
//                             onChange={handleOnChange}
//                             value={signInDetails.password}
//                         />
//                     </div>
//                     <div className="input-div">
//                         <label htmlFor="name">Name</label>
//                         <input
//                             name="name"
//                             id="name"
//                             type="text"
//                             placeholder="Enter your name"
//                             onChange={handleOnChange}
//                             value={signInDetails.name}
//                         />
//                     </div>
//                     <button className="sign-in-button running-border">Sign in</button>
//                     <p className="sign-in-redirect-p">Don't have an account? <Link to="/signup">Sign up</Link></p>
//                     {error && <p className="error-paragraph">Error: {error}</p>}
//                 </form>
//             </main>
//         </div>
//     );
// }

// export default Login;













// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
// import cookies from 'js-cookie'; // Assuming you're using js-cookie to handle cookies

// function Login({ onLogin }) {
//     const [signInDetails, setsignInDetails] = useState({ email: "", password: "", name: "" });
//     const [error, setError] = useState("");

//     const handleOnChange = ({ currentTarget: input }) => {
//         setsignInDetails({ ...signInDetails, [input.name]: input.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = 'http://localhost:3001/api/login'; // Ensure URL matches backend route
//             // Make login request

//             localStorage.setItem('jwtToken', token);

//             const token = localStorage.getItem('jwtToken'); // Assuming the token is stored in localStorage

//             const response = await axios.post(url, signInDetails, {

//                 headers: {
//                     'Content-Type': 'application/json',
//                     'x-username': signInDetails.name,
//                     'Authorization': `Bearer ${token}` // Ensure this is correctly formatted

//                 }
//             });

//             localStorage.setItem('userName', signInDetails.name);
// // console.log(signInDetails.name);

//             // Assuming the backend responds with a userName and a token
//             // const { userName, token } = response.data;

//             // Store userName in localStorage and in cookies
//             // localStorage.setItem('userName', userName);
//             const userName = localStorage.getItem('userName');
//             cookies.set('userName', userName);
//             // console.log(userName);
            

//             console.log('Login successful:', response.data);

//             // Trigger login success actions
//             onLogin();
//             toast.success("Login successful!");

//         } catch (error) {
//             console.error('Error logging in:', error);
//             if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//                 setError(error.response.data.message);
//                 toast.error(error.response.data.message);
//             }
//         }
//     };

//     return (
//         <div className="logindiv">
//             <main className="main-sign_in_container">
//                 <form onSubmit={handleSubmit} className="sign-in-container">
//                     <h3>Sign in</h3>
//                     <div className="input-div">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             name="email"
//                             id="email"
//                             type="email"
//                             placeholder="Enter your email"
//                             onChange={handleOnChange}
//                             value={signInDetails.email}
//                         />
//                     </div>
//                     <div className="input-div">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             name="password"
//                             id="password"
//                             type="password"
//                             placeholder="Enter your password"
//                             onChange={handleOnChange}
//                             value={signInDetails.password}
//                         />
//                     </div>
//                     <div className="input-div">
//                         <label htmlFor="name">Name</label>
//                         <input
//                             name="name"
//                             id="name"
//                             type="text"
//                             placeholder="Enter your name"
//                             onChange={handleOnChange}
//                             value={signInDetails.name}
//                         />
//                     </div>
//                     <button className="sign-in-button running-border">Sign in</button>
//                     <p className="sign-in-redirect-p">Don't have an account? <Link to="/signup">Sign up</Link></p>
//                     {error && <p className="error-paragraph">Error: {error}</p>}
//                 </form>
//             </main>
//         </div>
//     );
// }

// export default Login;





import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookies from 'js-cookie';
import "../SignIn/SignIn.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ onLogin }) {
    const [signInDetails, setsignInDetails] = useState({ email: "", password: "", name: "" });
    const [error, setError] = useState("");

    const handleOnChange = ({ currentTarget: input }) => {
        setsignInDetails({ ...signInDetails, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:3001/api/login';
            const response = await axios.post(url, signInDetails, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-username': signInDetails.name
                }
            });        

            const { token, userName } = response.data;

            // Store token and username
            localStorage.setItem('userName', signInDetails.name);
            localStorage.setItem('jwtToken', token);

            if (userName) {
                cookies.set('userName', userName, { path: '/' });
                console.log('UserName set in cookie:', cookies.get('userName'));
            } else {
                console.error('userName is undefined, cannot set cookie');
            }

            // Trigger any additional login success actions
            onLogin();
            // Show success toast
            toast.success("Login successful!");

        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
                // Show error toast
                toast.error(error.response.data.message);
            }
        }
    };

    return (
        <div className="logindiv">
            <main className="main-sign_in_container">
                <form onSubmit={handleSubmit} className="sign-in-container">
                    <h3>Sign in</h3>
                    <div className="input-div">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleOnChange}
                            value={signInDetails.email}
                        />
                    </div>
                    <div className="input-div">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={handleOnChange}
                            value={signInDetails.password}
                        />
                    </div>
                    <div className="input-div">
                        <label htmlFor="name">Name</label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            onChange={handleOnChange}
                            value={signInDetails.name}
                            required
                        />
                    </div>
                    <button className="sign-in-button running-border">Sign in</button>
                    <p className="sign-in-redirect-p">Don't have an account? <Link to="/signup">Sign up</Link></p>
                    {error && <p className="error-paragraph">Error: {error}</p>}
                </form>
            </main>
            <ToastContainer />
        </div>
    );
}

export default Login;
