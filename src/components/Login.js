// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ReCAPTCHA from 'react-google-recaptcha';

// const SITE_KEY = '6LeqYw4qAAAAAHjlGavlzCzpiSLeAMz4SGbQ6gwu'; // Replace with your ReCAPTCHA site key

// const Login = ({ setUserEmail }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const navigate = useNavigate();

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//         setEmailError('');
//     };

//     const handleLogin = async () => {
//         try {
//             const response = await fetch('https://backend-bay-kappa.vercel.app/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             if (!response.ok) {
//                 throw new Error('Login failed');
//             }

//             const data = await response.json();
//             setUserEmail(email); // Set the user email in App component
//             localStorage.setItem('userEmail', email); // Store user email in local storage
//             navigate('/'); // Redirect to home page
//         } catch (error) {
//             console.error('Login error:', error);
//             setLoginError('Invalid email or password');
//         }
//     };

//     const onChange = (value) => {
//         console.log('Captcha value:', value);
//     };

//     const isValidEmail = (email) => {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     };

//     return (
//         <div className="grid justify-items-center mt-40">
//             <h1 className="text-xl font-sans font-semibold text-teal-900">Login</h1>
//             <input
//                 className={`inputbox block m-4 p-2 w-80 border-2 ${emailError ? 'border-red-500' : 'border-teal-700'}`}
//                 type="email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 placeholder="Enter Email"
//                 required
//             />
//             {emailError && <p className="text-red-500">{emailError}</p>}
//             <input
//                 className="inputbox block m-4 p-2 w-80 border-2 border-teal-700"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter Password"
//                 required
//             />
//             {loginError && <p className="text-red-500">{loginError}</p>}
//             <div>
//                 <ReCAPTCHA
//                     sitekey={SITE_KEY}
//                     onChange={onChange}
//                 />
//             </div>
//             <button
//                 onClick={handleLogin}
//                 className={`m-6 p-3 w-36 ${email && password && !emailError ? 'bg-teal-700 border-teal-700 cursor-pointer text-white' : 'border-2 bg-teal-700 border-teal-700 cursor-not-allowed text-white'} border-2 font-semibold hover:bg-white hover:text-teal-700`}
//                 type="button"
//                 disabled={!email || !password || emailError}
//             >
//                 Login
//             </button>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = '6LeqYw4qAAAAAHjlGavlzCzpiSLeAMz4SGbQ6gwu'; // Replace with your ReCAPTCHA site key

const Login = ({ setUserEmail }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('https://quiz-mu-bice.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail', email);
            setUserEmail(email);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('Invalid email or password');
        }
    };

    const onChange = (value) => {
        console.log('Captcha value:', value);
    };

    // const isValidEmail = (email) => {
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // };

    return (
        <div className="grid justify-items-center mt-40">
            <h1 className="text-xl font-sans font-semibold text-teal-900">Login</h1>
            <input
                className={`inputbox block m-4 p-2 w-80 border-2 ${emailError ? 'border-red-500' : 'border-teal-700'}`}
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Email"
                required
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
            <input
                className="inputbox block m-4 p-2 w-80 border-2 border-teal-700"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
            />
            {loginError && <p className="text-red-500">{loginError}</p>}
            <div>
                <ReCAPTCHA
                    sitekey={SITE_KEY}
                    onChange={onChange}
                />
            </div>

            <button
                onClick={handleLogin}
                className={`m-6 p-3 w-36 ${email && password && !emailError ? 'bg-teal-700 border-teal-700 cursor-pointer text-white' : 'border-2 bg-teal-700 border-teal-700 cursor-not-allowed text-white'} border-2 font-semibold hover:bg-white hover:text-teal-700`}
                type="button"
                disabled={!email || !password || emailError}
            >
                Login
            </button>
        </div>
    );
};

export default Login;