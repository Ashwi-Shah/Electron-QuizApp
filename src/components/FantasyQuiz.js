
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResultsModal from './ResultsModel';

const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

const FantasyQuiz = ({ userEmail }) => {
    const { questionIndexParam } = useParams();
    const navigate = useNavigate();
    const questionIndex = parseInt(questionIndexParam) || 0;
    const [quizData, setQuizData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [selected, setSelected] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0); // Timer state

    const timerRef = useRef(null); // Timer reference

    const fetchQuizData = async () => {
        console.log(`Starting fetch request for quiz data`);
        try {
            const response = await fetch('/api/fetchQuizData', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Fetch response received:', response);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Fetched data:', data);

            // Shuffle questions once and set them in state
            const shuffledQuestions = shuffleArray(data.DATA.questions);
            setQuestions(shuffledQuestions);
            setTotalQuestions(shuffledQuestions.length);
        } catch (error) {
            console.error('Error fetching quiz data:', error);
            alert('There was an error fetching quiz data. Please try again later.');
        }
    };

    useEffect(() => {
        if (questions.length === 0) {
            fetchQuizData();
        } else if (questionIndex < questions.length) {
            const questionData = questions[questionIndex];
            const options = [
                { id: 'A', name: 'A', value: questionData.ans_a },
                { id: 'B', name: 'B', value: questionData.ans_b },
                { id: 'C', name: 'C', value: questionData.ans_c },
                { id: 'D', name: 'D', value: questionData.ans_d },
            ];

            // Shuffle only the text of options while keeping labels A, B, C, D in place
            const shuffledOptions = shuffleArray(options.map(option => option.value));
            const newOptions = options.map((option, index) => ({
                ...option,
                value: shuffledOptions[index],
            }));

            setQuizData({
                id: questionIndex + 1,  // Set the question number in sequence
                question: questionData.question,
                options: newOptions,
                correctAnswer: questionData.answer
            });
        } else {
            setShowResults(true);
            setIsLastQuestion(true);
        }
    }, [questions, questionIndex]);

    useEffect(() => {
        if (isLastQuestion) {
            const finalCorrectAnswers = correctAnswers;
            const finalSelectedAnswers = [...selectedAnswers];
            saveResults(finalCorrectAnswers, finalSelectedAnswers);
        }
    }, [isLastQuestion]);

    useEffect(() => {
        // Start timer when the component mounts
        timerRef.current = setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1);
        }, 1000);

        // Cleanup interval on component unmount
        return () => {
            clearInterval(timerRef.current);
        };
    }, []);

    const handleSelect = (optionId) => {
        setSelected(optionId);
    };

    const handleContinue = () => {
        if (selected !== null) {
            const selectedOption = quizData.options.find(option => option.id === selected);
            const selectedAnswer = selectedOption.value;
            const isCorrect = selectedAnswer === quizData.correctAnswer;

            const newSelectedAnswer = {
                questionId: quizData.id,
                selectedOption: selectedOption.name,
                isCorrect
            };

            const updatedSelectedAnswers = [...selectedAnswers, newSelectedAnswer];
            setSelectedAnswers(updatedSelectedAnswers);

            if (isCorrect) {
                setCorrectAnswers(correctAnswers + 1);
            }

            if (questionIndex < totalQuestions - 1) {
                setSelected(null);
                navigate(`/${questionIndex + 1}`);
            } else {
                setShowResults(true);
                setIsLastQuestion(true);
                clearInterval(timerRef.current); // Stop timer when quiz ends
            }
        }
    };

    const saveResults = async (finalCorrectAnswers, finalSelectedAnswers) => {
        const score = Math.round((finalCorrectAnswers) * 10);
    
        // Convert elapsedTime to minutes and seconds
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
    
        const resultsData = {
            userEmail,
            correctAnswers: finalCorrectAnswers,
            totalQuestions,
            score,
            selectedAnswers: finalSelectedAnswers,
            elapsedTime: {
                minutes,
                seconds,
            },
        };
    
        try {
            const response = await fetch('https://quiz-mu-bice.vercel.app/saveResults', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resultsData),
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Results saved successfully:', data);
        } catch (error) {
            console.error('Error saving results:', error);
        }
    };

    const closeResultsModal = () => {
        setShowResults(false);
        navigate('/quiz/0');
        setCorrectAnswers(0);
        setQuizData(null);
        setSelectedAnswers([]);
        setElapsedTime(0); // Reset timer
    };

    const handleCrossClick = () => {
        navigate('/');
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}m ${seconds}s`;
    };

    if (!quizData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-[#EDE8E3] rounded-lg shadow-lg p-6 w-full h-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">{quizData.id}</span>
                    <h1 className="text-lg font-bold">Fantasy Quiz #{quizData.id}</h1>
                    <button className="text-gray-400 hover:text-gray-600" onClick={handleCrossClick}>✖</button>
                </div>
                <div className="mb-4">
                    <div className="bg-gray-200 rounded-full h-1 w-full">
                        <div className="bg-green-500 h-1 rounded-full" style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}% `}}></div>
                    </div>
                </div>
                <h2 className="text-xl font-semibold mb-4 mt-11">{quizData.question}</h2>
                <div className="space-y-3 mt-16">
                    {quizData.options.map(option => (
                        <button
                            key={option.id}
                            onClick={() => handleSelect(option.id)}
                            className={`w-full flex justify-between items-center p-4 rounded-lg border ${
                                selected === option.id ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-200'
                            }`}
                        >
                            <span>{option.name}</span>
                            <span className="font-medium">{option.value}</span>
                        </button>
                    ))}
                </div>
                <button
                    className="w-full mt-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    disabled={!selected}
                    onClick={handleContinue}
                >
                    {questionIndex < totalQuestions - 1 ? 'CONTINUE' : 'FINISH'}
                </button>
                <div className="mt-4 text-center text-gray-600">
                    Time Elapsed: {formatTime(elapsedTime)}
                </div>
            </div>

            {showResults && (
                <ResultsModal
                    userEmail={userEmail}
                    correctAnswers={correctAnswers}
                    totalQuestions={totalQuestions}
                    elapsedTime={elapsedTime}
                    onClose={closeResultsModal}
                />
            )}
        </div>
    );
};

export default FantasyQuiz;
