// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ResultsModal = ({ userEmail, correctAnswers, totalQuestions, onClose }) => {
//     const navigate = useNavigate();
//     const score = correctAnswers * 10; 

//     const handleOkayClick = () => {
//         onClose();
//         navigate('/'); 
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-[#EDE8E3] rounded-lg shadow-lg p-6 w-full max-w-sm">
//                 <div className="flex justify-end">
//                     <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
//                 </div>
//                 <div className="flex flex-col items-center">
//                     <img src="/img/giftt.jpg" alt="Reward" className="mb-4 aspect-[3/2] mix-blend-color-burn object-contain" />
//                     <h2 className="text-2xl font-semibold text-[#191D63]">Results of Fantasy Quiz</h2>
//                     <p className="text-lg font-medium mb-4">Congratulations, {userEmail}!</p>
//                     <div className="w-full mt-4 p-8 bg-gray-100 rounded-lg">
//                         <div className="flex justify-between items-center mb-2 text-lg font-medium">
//                             <span className="font-bold">SCORE GAINED</span>
//                             <span>{score}</span>
//                         </div>
//                         <div className="flex justify-between items-center text-lg font-medium">
//                             <span className="font-bold">CORRECT PREDICTIONS</span>
//                             <span>{correctAnswers} / {totalQuestions}</span>
//                         </div>
//                     </div>
//                     <button
//                         onClick={handleOkayClick}
//                         className="mt-6 py-2 px-36 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//                     >
//                         OKAY
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ResultsModal;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultsModal = ({ userEmail, correctAnswers, totalQuestions, elapsedTime, onClose }) => {
    const navigate = useNavigate();
    const score = correctAnswers * 10;

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}m ${seconds}s`;
    };

    const handleOkayClick = () => {
        onClose();
        navigate('/');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#EDE8E3] rounded-lg shadow-lg p-6 w-full max-w-sm">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <div className="flex flex-col items-center">
                    <img src="/img/giftt.jpg" alt="Reward" className="mb-4 aspect-[3/2] mix-blend-color-burn object-contain" />
                    <h2 className="text-2xl font-semibold text-[#191D63]">Results of Fantasy Quiz</h2>
                    <p className="text-lg font-medium mb-4">Congratulations, {userEmail}!</p>
                    <div className="w-full mt-4 p-8 bg-gray-100 rounded-lg">
                        <div className="flex justify-between items-center mb-2 text-lg font-medium">
                            <span className="font-bold">SCORE GAINED</span>
                            <span>{score}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-medium">
                            <span className="font-bold">CORRECT PREDICTIONS</span>
                            <span>{correctAnswers} / {totalQuestions}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-medium">
                            <span className="font-bold">TIME TAKEN</span>
                            <span>{formatTime(elapsedTime)}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleOkayClick}
                        className="mt-6 py-2 px-36 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        OKAY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultsModal;
