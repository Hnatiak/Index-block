import React, { useState, useEffect } from 'react';
import './App.css';

// Зразок JSON даних
const rulesData = {
  "1": [
    {
      "rule": "1.1 - Use of inappropriate language detected in the message",
      "key-words": ["f*ck", "sh*t", "d*mn", "a**hole", "freak", "bastard", "с*ка", "б*ять", "х*й", "п*здець", "сука", "блять", "хуй", "піздець", "пиздець"]
    },
    {
      "rule": "1.2 - A threat was detected in the message",
      "key-words": ["kill", "destroy", "burn", "eliminate", "murder", "вб'ю", "уб'ю", "знищу", "спалю", "вбю", "убю"]
    }
  ],
  "2": [
    {
      "rule": "2.1 - Nude content was detected in the sent photo",
      "key-words": ["nude photo", "nudes", "sexual photo", "оголене фото", "ню", "сексуальні фото", "голий", "голою", "гола"]
    },
    {
      "rule": "2.2 - Publication of personal information without consent",
      "key-words": ["phone number", "address", "passport details", "номер телефону", "адреса", "паспортні дані"]
    }
  ]
};

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    // Функція для оновлення голосів
    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log("Available voices:", voices); // Перевірка доступних голосів
      const maleVoice = voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('male'));
      setVoice(maleVoice || voices.find(v => v.lang === 'en-US')); // Використовуємо перший доступний англійський голос, якщо чоловічий не знайдений
    };

    // Спочатку оновлюємо голоси
    updateVoices();

    // Перевіряємо, чи є голоси після асинхронного завантаження
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }, []);

  const sendMessage = () => {
    for (let category in rulesData) {
      for (const ruleObj of rulesData[category]) {
        if (ruleObj['key-words'].some(word => message.toLowerCase().includes(word))) {
          showError(ruleObj['rule']);
          speakError(ruleObj['rule']);
          return; // Зупиняємо процес відправки повідомлення, якщо є порушення
        }
      }
    }

    // Додаємо повідомлення тільки якщо немає порушень
    const messageBox = document.getElementById("message-box");
    const newMessage = document.createElement("p");
    newMessage.textContent = message;
    messageBox.appendChild(newMessage);

    setMessage('');
    setError('');
  };

  const showError = (ruleDescription) => {
    setError(ruleDescription);
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
  };

  const speakError = (ruleDescription) => {
    if (window.speechSynthesis && voice) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = `Rule violation! ${ruleDescription}`;
      speech.voice = voice;
      speech.lang = 'en-US'; // Установлюємо мову на англійську
      window.speechSynthesis.speak(speech);
    } else {
      console.error('No voice available for speech synthesis.');
    }
  };

  return (
    <div className="App">
      <h2>Message Sending</h2>
      <div id="message-box"></div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send</button>

      {error && (
        <div id="error" className="error">
          <strong>Error: Rule violation!</strong>
          <p>{error}</p>
        </div>
      )}

      {overlayVisible && (
        <div className="overlay">
          <div>
            <p><strong>Rule Violation</strong></p>
            <p>{error}</p>
            <button onClick={closeOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;