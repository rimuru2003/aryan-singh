import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');

  const generateReply = () => {
    setGeneratedReply("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
  };

  const insertReply = () => {
    const messageBox = document.querySelector('div[role="textbox"]');
    if (messageBox) {
      messageBox.innerHTML = generatedReply;
    }
  };

  return (
    <div className="App">
      <h2>Generate Reply</h2>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your command"
        className="input-box"
      />
      <button className="generate-btn" onClick={generateReply}>Generate</button>

      {generatedReply && (
        <div className="reply-section">
          <p>{generatedReply}</p>
          <button className="insert-btn" onClick={insertReply}>Insert</button>
        </div>
      )}

      <button className="close-btn" onClick={() => window.close()}>Close</button>
    </div>
  );
};

export default App;
