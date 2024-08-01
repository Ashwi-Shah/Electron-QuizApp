// api/fetchQuizData.js

export default async function handler(req, res) {
    const response = await fetch('https://practical.mytdigital.tech/', {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        res.status(response.status).json({ message: 'Error fetching quiz data' });
        return;
    }

    const data = await response.json();
    res.status(200).json(data);
}
