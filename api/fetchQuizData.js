const fetchQuizData = async () => {
    try {
      const { ipcRenderer } = window.require('electron');
  
      const data = await ipcRenderer.invoke('fetch-quiz-data');
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

