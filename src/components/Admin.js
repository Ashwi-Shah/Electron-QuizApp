import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminResults = () => {

    const [password, setPassword] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    const [userResults, setUserResults] = useState([]);
    const [barChartData, setBarChartData] = useState(null);
    const [lineChartData, setLineChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleAdminLogin = async () => {
        try {
            const loginResponse = await fetch('https://quiz-mu-bice.vercel.app/admin', {
                method: 'POST',
                body: JSON.stringify({ email: adminEmail, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!loginResponse.ok) {
                throw new Error(`Network response was not ok: ${loginResponse.statusText}`);
            }

            const loginData = await loginResponse.json();
            localStorage.setItem("user", JSON.stringify(loginData.result));
            localStorage.setItem("token", JSON.stringify(loginData.auth));
            setIsAdminLoggedIn(true);
        } catch (error) {
            alert("Invalid credentials or error logging in.");
            console.error('Error logging in:', error);
        }
    };

    useEffect(() => {
        if (!isAdminLoggedIn) return;

        const fetchUserResults = async () => {
            try {
                const resultsResponse = await fetch(`https://quiz-mu-bice.vercel.app/results/${adminEmail}`);
                if (!resultsResponse.ok) {
                    throw new Error(`Network response was not ok: ${resultsResponse.statusText}`);
                }
                const resultsData = await resultsResponse.json();
                console.log("Fetched User Results: ", resultsData); // Debug log
                setUserResults(resultsData);
                setLoading(false);

                if (resultsData && resultsData.length > 0) {
                    const correctAnswers = resultsData.map(result => result.correctAnswers);
                    const avgTimePerQuestion = resultsData.map(result => {
                        const totalSeconds = result.elapsedTime.minutes * 60 + result.elapsedTime.seconds;
                        return (totalSeconds / 24).toFixed(2); // Calculate avg time per question and format to 2 decimal places
                    });
                    const attempts = resultsData.map((_, index) => `Attempt ${index + 1}`);

                    setBarChartData({
                        labels: attempts,
                        datasets: [
                            {
                                label: 'Correct Answers',
                                data: correctAnswers,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'Elapsed Time (s)',
                                data: resultsData.map(result => result.elapsedTime.minutes * 60 + result.elapsedTime.seconds),
                                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                                borderColor: 'rgba(255, 159, 64, 1)',
                                borderWidth: 1,
                            },
                        ],
                    });

                    const lineData = {
                        labels: attempts,
                        datasets: [
                            {
                                label: 'Correct Answers',
                                data: correctAnswers,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                                yAxisID: 'y1',
                            },
                            {
                                label: 'Average Time per Question (s)',
                                data: avgTimePerQuestion,
                                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                                borderColor: 'rgba(255, 159, 64, 1)',
                                borderWidth: 1,
                                yAxisID: 'y2',
                            },
                        ],
                    };

                    setLineChartData(lineData);
                } else {
                    setError("No results found for this user.");
                }
            } catch (error) {
                setError(`Error fetching results: ${error.message}`);
                setLoading(false);
            }
        };

        fetchUserResults();
    }, [isAdminLoggedIn, adminEmail]);

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        if (context.dataset.label === 'Correct Answers') {
                            return `Correct Answers: ${context.raw}`;
                        } else {
                            return `Avg Time: ${context.raw}s`;
                        }
                    }
                }
            },
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Attempts',
                },
            },
            y1: {
                title: {
                    display: true,
                    text: 'Correct Answers',
                },
                position: 'left',
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                },
                ticks: {
                    precision: 0,
                },
            },
            y2: {
                title: {
                    display: true,
                    text: 'Average Time per Question (s)',
                },
                position: 'right',
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                },
                ticks: {
                    precision: 2,
                },
            },
        },
    };

    return (
        <div className="p-6">
            {!isAdminLoggedIn ? (
                <div className="grid justify-items-center mt-40">
                    <h1 className="text-xl font-sans font-semibold text-teal-900">Admin</h1>
                    <input
                        className="inputbox block m-4 p-2 w-80 border-2 border-teal-700"
                        type="text"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="Enter Email"
                    />
                    <input
                        className="inputbox block m-4 p-2 w-80 border-2 border-teal-700"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                    />
                    <button
                        onClick={handleAdminLogin}
                        className="appbutton m-6 p-3 w-36 bg-teal-700 border-2 border-teal-700 cursor-pointer text-white font-semibold hover:bg-white hover:text-teal-700"
                        type="button"
                    >
                        Admin Login
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="text-3xl font-semibold mb-8 flex justify-center">Quiz Results for {adminEmail}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="mb-6 sm:mb-0">
                            <div className="h-80 w-97">
                                {loading ? (
                                    <p className="text-center">Loading Bar chart...</p>
                                ) : error ? (
                                    <p className="text-center text-red-500">{error}</p>
                                ) : (
                                    <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                                )}
                            </div>
                        </div>
                        <div className="mb-6 sm:mb-0">
                            <div className="h-80 w-97">
                                {loading ? (
                                    <p className="text-center">Loading Line chart...</p>
                                ) : error ? (
                                    <p className="text-center text-red-500">{error}</p>
                                ) : (
                                    <Line data={lineChartData} options={lineOptions} />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border-b">Attempt Number</th>
                                    <th className="py-2 px-4 border-b">Correct Answers</th>
                                    <th className="py-2 px-4 border-b">Elapsed Time (s)</th>
                                    <th className='py-2 px-4 border-b'>Time per que</th>
                                    <th className="py-2 px-4 border-b">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="py-4 text-center">Loading results...</td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="5" className="py-4 text-center text-red-500">{error}</td>
                                    </tr>
                                ) : userResults.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-4 text-center">No results found.</td>
                                    </tr>
                                ) : (
                                    userResults.map((result, index) => (
                                        <tr key={result._id || index}> {/* Ensure _id is unique */}
                                            <td className="py-2 px-4 border-b  text-center">Attempt {index + 1}</td>
                                            <td className="py-2 px-4 border-b text-center">{result.correctAnswers}</td>
                                            <td className="py-2 px-4 border-b text-center">{result.elapsedTime.minutes * 60 + result.elapsedTime.seconds}</td>
                                            <td className="py-2 px-4 border-b text-center">{((result.elapsedTime.minutes * 60 + result.elapsedTime.seconds) / 24).toFixed(2)}</td>
                                            <td className="py-2 px-4 border-b text-center">
                                                <details>
                                                    <summary>View Details</summary>
                                                    <ul>
                                                        {result.selectedAnswers.map((answer, answerIndex) => (
                                                            <li key={answerIndex}>
                                                                Question ID: {answer.questionId}, Selected Option: {answer.selectedOption}, Correct: {answer.isCorrect ? 'Yes' : 'No'}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </details>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminResults;
