// // import React, { useState, useEffect } from 'react';
// // import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// // import FantasyQuiz from './components/FantasyQuiz';
// // import SignUp from './components/Signup'; // Assuming you have a SignUp component
// // import Login from './components/Login'; // Assuming you have a Login component
// // import Admin from './components/Admin';
// // import ResultsTable from './components/Resultstable';
// // import ResultsModal from './components/ResultsModel';
// // import HeaderButtons from './components/HeaderButtons';

// // const Home = ({ userEmail }) => {
// //     const navigate = useNavigate();

// //     const handleClick = () => {
// //         if (userEmail) {
// //             navigate('/0');
// //         } else {
// //             navigate('/Login');
// //         }
// //     };

// //     return (
// //         <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
// //             {userEmail && (
// //                 <div className="mb-4">
// //                     <h1 className="text-2xl">Welcome, {userEmail}!</h1>
// //                 </div>
// //             )}
// //             <button
// //                 onClick={handleClick}
// //                 className={`w-80 py-2 text-white text-xl rounded-lg transition ${
// //                     userEmail ? 'bg-teal-700 hover:bg-teal-800' : 'bg-teal-700 cursor-not-allowed'
// //                 }`}
// //                 disabled={!userEmail}
// //             >
// //                 Welcome to the Fantasy Quiz!
// //             </button>
// //         </div>
// //     );
// // };

// // const App = () => {
// //     const [userEmail, setUserEmail] = useState('');

// //     useEffect(() => {
// //         const storedUserEmail = localStorage.getItem('userEmail');
// //         if (storedUserEmail) {
// //             setUserEmail(storedUserEmail);
// //         }
// //     }, []);

// //     return (
// //         <Router>
// //             <div>
// //                 <HeaderButtons setUserEmail={setUserEmail} />
// //                 <Routes>
// //                     <Route path='/SignUp' element={<SignUp setUserEmail={setUserEmail} />} />
// //                     <Route path='/Login' element={<Login setUserEmail={setUserEmail} />} />
// //                     <Route path="/results" element={<ResultsModal />} />
// //                     <Route path='/Admin' element={<Admin />} />
// //                     <Route path='/Resultstable' element={<ResultsTable />} />
// //                     <Route path="/:questionIndexParam" element={<FantasyQuiz userEmail={userEmail} />} />
// //                     <Route path="/" element={<Home userEmail={userEmail} />} />
// //                 </Routes>
// //             </div>
// //         </Router>
// //     );
// // };

// // export default App;


// // App.js

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
    const navigate = useNavigate();

    const handleClick = () => {
        if (userEmail) {
            navigate('/0'); // Navigate to the first question
        } else {
            navigate('/Login');
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
                    <Route path='/Admin' element={<Admin />} />
                    <Route path='/results' element={<ResultsModal userEmail={userEmail} />} />
                    <Route path="/:questionIndexParam" element={<FantasyQuiz userEmail={userEmail} />} />
                    <Route path="/" element={<Home userEmail={userEmail} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
