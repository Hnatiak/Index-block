// let rulesData = {};

// // Завантаження JSON-файлу з правилами
// fetch('rules.json')
//     .then(response => response.json())
//     .then(data => {
//         rulesData = data;
//     })
//     .catch(error => {
//         console.error('Помилка завантаження JSON:', error);
//     });

// function sendMessage() {
//     const messageInput = document.getElementById("message-input").value.toLowerCase();

//     // Перевірка повідомлення за всіма правилами
//     for (let category in rulesData) {
//         rulesData[category].forEach(ruleObj => {
//             if (ruleObj['key-words'].some(word => messageInput.includes(word))) {
//                 showError(ruleObj['rule']);
//                 speakError(ruleObj['rule']);  // Виклик функції для озвучення
//                 return;  // Зупиняємо процес відправки повідомлення, якщо є порушення
//             }
//         });
//     }

//     // Додаємо повідомлення тільки якщо немає порушень
//     const messageBox = document.getElementById("message-box");
//     const newMessage = document.createElement("p");
//     newMessage.textContent = messageInput;
//     messageBox.appendChild(newMessage);

//     // Очистити поле вводу
//     document.getElementById("message-input").value = '';
//     hideError();
// }

// function showError(ruleDescription) {
//     document.getElementById("rule-title").textContent = "Порушення правил";
//     document.getElementById("rule-description").textContent = ruleDescription;
//     document.getElementById("overlay").classList.add("show");
// }

// function closeOverlay() {
//     document.getElementById("overlay").classList.remove("show");
// }

// function hideError() {
//     document.getElementById("error").style.display = "none";
// }

// // Функція для озвучення порушення правил
// function speakError(ruleDescription) {
//     const speech = new SpeechSynthesisUtterance();
//     speech.text = `Помилка: Порушення правил! ${ruleDescription}`;
//     speech.lang = 'uk-UA';  // Встановлюємо українську мову
//     window.speechSynthesis.speak(speech);
// }




let rulesData = {};
let maleVoice = null;

// Завантаження JSON-файлу з правилами
fetch('rules.json')
    .then(response => response.json())
    .then(data => {
        rulesData = data;
    })
    .catch(error => {
        console.error('Помилка завантаження JSON:', error);
    });

// Пошук українського чоловічого голосу
function setVoice() {
    const voices = window.speechSynthesis.getVoices();
    maleVoice = voices.find(voice => voice.lang === 'en-US' && voice.name.includes('Male'));
    
    // Якщо не знайдено чоловічого українського голосу, вибирається перший доступний український голос
    if (!maleVoice) {
        maleVoice = voices.find(voice => voice.lang === 'en-US');
    }
}

// Запускаємо пошук голосів після їх завантаження
window.speechSynthesis.onvoiceschanged = setVoice;

function sendMessage() {
    const messageInput = document.getElementById("message-input").value.toLowerCase();

    // Перевірка повідомлення за всіма правилами
    for (let category in rulesData) {
        rulesData[category].forEach(ruleObj => {
            if (ruleObj['key-words'].some(word => messageInput.includes(word))) {
                showError(ruleObj['rule']);
                speakError(ruleObj['rule']);  // Виклик функції для озвучення
                return;  // Зупиняємо процес відправки повідомлення, якщо є порушення
            }
        });
    }

    // Додаємо повідомлення тільки якщо немає порушень
    const messageBox = document.getElementById("message-box");
    const newMessage = document.createElement("p");
    newMessage.textContent = messageInput;
    messageBox.appendChild(newMessage);

    // Очистити поле вводу
    document.getElementById("message-input").value = '';
    hideError();
}

function showError(ruleDescription) {
    document.getElementById("rule-title").textContent = "Violation!";
    document.getElementById("rule-description").textContent = ruleDescription;
    document.getElementById("overlay").classList.add("show");
}

function closeOverlay() {
    document.getElementById("overlay").classList.remove("show");
}

function hideError() {
    document.getElementById("error").style.display = "none";
}

// Функція для озвучення порушення правил
function speakError(ruleDescription) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = `Violation! Rule ${ruleDescription}`;
    speech.lang = 'en-US';  // Встановлюємо українську мову

    // Використовуємо чоловічий голос, якщо він знайдений
    if (maleVoice) {
        speech.voice = maleVoice;
    }

    window.speechSynthesis.speak(speech);
}

















// let rulesData = {};

//     // Завантаження JSON-файлу з правилами
// fetch('rules.json')
//     .then(response => response.json())
//     .then(data => {
//         rulesData = data;
//     })
//     .catch(error => {
//         console.error('Помилка завантаження JSON:', error);
//     });

// function sendMessage() {
//     const messageInput = document.getElementById("message-input").value.toLowerCase();
//     const messageBox = document.getElementById("message-box");
//     // Перевірка повідомлення за всіма правилами
//     for (let category in rulesData) {
//         rulesData[category].forEach(ruleObj => {
//             if (ruleObj['key-words'].some(word => messageInput.includes(word))) {
//                 showError(ruleObj['rule']);
//                 return;
//             }
//         });
//     }
//     // Якщо порушень немає, відправляємо повідомлення
//     const newMessage = document.createElement("p");
//     newMessage.textContent = messageInput;
//     messageBox.appendChild(newMessage);
//     // Очистити поле вводу
//     document.getElementById("message-input").value = '';
//     hideError();
// }

// function showError(ruleDescription) {
//     document.getElementById("rule-title").textContent = "Порушення правил";
//     document.getElementById("rule-description").textContent = ruleDescription;
//     document.getElementById("overlay").classList.add("show");
// }

// function closeOverlay() {
//     document.getElementById("overlay").classList.remove("show");
// }