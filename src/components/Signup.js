import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = '6LeqYw4qAAAAAHjlGavlzCzpiSLeAMz4SGbQ6gwu';

const SignUp = ({ setUserEmail }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [recaptchaValue, setRecaptchaValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const collectData = async () => {
        if (!name || !email || !password || !recaptchaValue) {
            return; 
        }
    
        console.warn(name, email, password, recaptchaValue);
        let result = await fetch('https://quiz-mu-bice.vercel.app/signup', { 
            method: 'post',
            body: JSON.stringify({ name, email, password, token: recaptchaValue }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        if (result) {
            setUserEmail(email);
            localStorage.setItem('userEmail', email); 
            navigate('/');
        }
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        if (!isValidEmail(emailValue)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

    const onChange = value => {
        setRecaptchaValue(value)
    }

    const isValidEmail = (email) => {
        // Basic email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className="grid justify-items-center mt-40">
            <h1 className="text-xl font-sans font-semibold text-teal-900">Register</h1>
            <input 
                className="inputbox block m-4 p-2 w-80 border-2 border-teal-700" 
                type="text"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter Name" 
                required 
            />
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
            <div>
                <ReCAPTCHA
                    sitekey={SITE_KEY}
                    onChange={onChange}
                />
            </div>

            <button 
                onClick={collectData} 
                className={`m-6 p-3 w-36 ${name && email && password && !emailError ? 'bg-teal-700 border-teal-700 cursor-pointer text-white' : 'border-2 bg-teal-700 border-teal-700 cursor-not-allowed text-white'} border-2 font-semibold hover:bg-white hover:text-teal-700`} 
                type="button"
                disabled={!name || !email || !password || emailError}
            > 
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;
