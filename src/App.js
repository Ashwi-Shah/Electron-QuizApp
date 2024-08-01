// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import FantasyQuiz from './components/FantasyQuiz';
// import SignUp from './components/Signup'; // Assuming you have a SignUp component
// import Login from './components/Login'; // Assuming you have a Login component
// import Admin from './components/Admin';
// import ResultsTable from './components/Resultstable';
// import ResultsModal from './components/ResultsModel';
// import HeaderButtons from './components/HeaderButtons';

// const Home = ({ userEmail }) => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         if (userEmail) {
//             navigate('/0');
//         } else {
//             navigate('/Login');
//         }
//     };

//     return (
//         <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
//             {userEmail && (
//                 <div className="mb-4">
//                     <h1 className="text-2xl">Welcome, {userEmail}!</h1>
//                 </div>
//             )}
//             <button
//                 onClick={handleClick}
//                 className={`w-80 py-2 text-white text-xl rounded-lg transition ${
//                     userEmail ? 'bg-teal-700 hover:bg-teal-800' : 'bg-teal-700 cursor-not-allowed'
//                 }`}
//                 disabled={!userEmail}
//             >
//                 Welcome to the Fantasy Quiz!
//             </button>
//         </div>
//     );
// };

// const App = () => {
//     const [userEmail, setUserEmail] = useState('');

//     useEffect(() => {
//         const storedUserEmail = localStorage.getItem('userEmail');
//         if (storedUserEmail) {
//             setUserEmail(storedUserEmail);
//         }
//     }, []);

//     return (
//         <Router>
//             <div>
//                 <HeaderButtons setUserEmail={setUserEmail} />
//                 <Routes>
//                     <Route path='/SignUp' element={<SignUp setUserEmail={setUserEmail} />} />
//                     <Route path='/Login' element={<Login setUserEmail={setUserEmail} />} />
//                     <Route path="/results" element={<ResultsModal />} />
//                     <Route path='/Admin' element={<Admin />} />
//                     <Route path='/Resultstable' element={<ResultsTable />} />
//                     <Route path="/:questionIndexParam" element={<FantasyQuiz userEmail={userEmail} />} />
//                     <Route path="/" element={<Home userEmail={userEmail} />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// };

// export default App;


// App.js

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import FantasyQuiz from './components/FantasyQuiz';
// import SignUp from './components/Signup';
// import Login from './components/Login';
// import Admin from './components/Admin';
// import ResultsModal from './components/ResultsModel';
// import HeaderButtons from './components/HeaderButtons';

// const Home = ({ userEmail }) => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         if (userEmail) {
//             navigate('/0');
//         } else {
//             navigate('/Login');
//         }
//     };

//     return (
//         <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
//             {userEmail && (
//                 <div className="mb-4">
//                     <h1 className="text-2xl">Welcome, {userEmail}!</h1>
//                 </div>
//             )}
//             <button
//                 onClick={handleClick}
//                 className={`w-80 py-2 text-white text-xl rounded-lg transition ${
//                     userEmail ? 'bg-teal-700 hover:bg-teal-800' : 'bg-teal-700 cursor-not-allowed'
//                 }`}
//                 disabled={!userEmail}
//             >
//                 Welcome to the Fantasy Quiz!
//             </button>
//         </div>
//     );
// };

// const App = () => {
//     const [userEmail, setUserEmail] = useState('');

//     useEffect(() => {
//         const storedUserEmail = localStorage.getItem('userEmail');
//         if (storedUserEmail) {
//             setUserEmail(storedUserEmail);
//         }
//     }, []);

//     return (
//         <Router>
//             <div>
//                 <HeaderButtons setUserEmail={setUserEmail} />
//                 <Routes>
//                     <Route path='/SignUp' element={<SignUp setUserEmail={setUserEmail} />} />
//                     <Route path='/Login' element={<Login setUserEmail={setUserEmail} />} />
//                     <Route path="/results" element={<ResultsModal />} />
//                     <Route path='/Admin' element={<Admin />} />
//                     <Route path="/:questionIndexParam" element={<FantasyQuiz userEmail={userEmail} />} />
//                     <Route path="/" element={<Home userEmail={userEmail} />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import FantasyQuiz from './components/FantasyQuiz';
import SignUp from './components/Signup';
import Login from './components/Login';
import Admin from './components/Admin';
import ResultsModal from './components/ResultsModel';
import HeaderButtons from './components/HeaderButtons';

const Home = ({ userEmail }) => {
    const [apiData, setApiData] = useState(null);
    const navigate = useNavigate();

    const handleClick = () => {
        if (userEmail) {
            navigate('/0');
        } else {
            navigate('/Login');
        }
    };

    const fetchApiData = async () => {
        try {
            const response = await fetch('https://practical.mytdigital.tech/', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Fetched data:', data);
            setApiData(data); // Store the fetched data in state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            {userEmail && (
                <div className="mb-4">
                    <h1 className="text-2xl">Welcome, {userEmail}!</h1>
                </div>
            )}
            <button
                onClick={handleClick}
                className={`w-80 py-2 text-white text-xl rounded-lg transition ${
                    userEmail ? 'bg-teal-700 hover:bg-teal-800' : 'bg-teal-700 cursor-not-allowed'
                }`}
                disabled={!userEmail}
            >
                Welcome to the Fantasy Quiz!
            </button>
            <button
                onClick={fetchApiData}
                className="w-80 py-2 text-white text-xl rounded-lg bg-blue-500 hover:bg-blue-600 mt-4"
            >
                Fetch API Data
            </button>
            {apiData && (
                <div className="mt-4">
                    <pre>{JSON.stringify(apiData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

const App = () => {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const storedUserEmail = localStorage.getItem('userEmail');
        if (storedUserEmail) {
            setUserEmail(storedUserEmail);
        }
    }, []);

    return (
        <Router>
            <div>
                <HeaderButtons setUserEmail={setUserEmail} />
                <Routes>
                    <Route path='/SignUp' element={<SignUp setUserEmail={setUserEmail} />} />
                    <Route path='/Login' element={<Login setUserEmail={setUserEmail} />} />
                    <Route path="/results" element={<ResultsModal />} />
                    <Route path='/Admin' element={<Admin />} />
                    <Route path="/:questionIndexParam" element={<FantasyQuiz userEmail={userEmail} />} />
                    <Route path="/" element={<Home userEmail={userEmail} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
