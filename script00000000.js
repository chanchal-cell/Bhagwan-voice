userForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const language = document.querySelector('input[name="language"]:checked').value;
    localStorage.setItem('userName', name);
    localStorage.setItem('userLanguage', language);
    greetUser(name, language, 'greet');
    popup.style.display = 'none';
});
});

function greetUser(name, language, type) {
const synth = window.speechSynthesis;
let greetingText = '';
if (type === 'new') {
    greetingText = 'क्या मैं आपसे कुछ पूछ सकता हूँ? आपका क्या नाम है, प्लीज? Can I ask you something? What is your name, please?';
} else if (type === 'returning') {
    if (language === 'hindi') {
        greetingText = `${name} जी, आपका बहुत बहुत स्वागत है। आपको देखकर बहुत खुशी हुई।`;
    } else {
        greetingText = `Hello ${name}, welcome back! It's wonderful to see you again.`;
    }
} else if (type === 'greet') {
    if (language === 'hindi') {
        greetingText = `${name} जी, आपका बहुत बहुत स्वागत है। आपको देखकर बहुत खुशी हुई।`;
    } else {
        greetingText = `Hello ${name}, welcome! It's wonderful to meet you.`;
    }
}
const utterThis = new SpeechSynthesisUtterance(greetingText);
utterThis.lang = language === 'hindi' ? 'hi-IN' : 'en-IN';
synth.speak(utterThis);
}
