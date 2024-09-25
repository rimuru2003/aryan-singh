// icon.ts (or your preferred file name)
let icon: HTMLElement | null = null;

// Function to add AI icon to the LinkedIn message input field
const injectIcon = () => {
  const messageInput = document.querySelector('div[role="textbox"]');

  if (messageInput && !icon) {
    // Create the AI icon element
    icon = document.createElement('div');
    icon.innerHTML = `<img src="/assets/msgicon.svg" alt="AI Icon" style="width: 24px; height: 24px; cursor: pointer;" />`;
    icon.style.position = 'absolute';
    icon.style.right = '10px';
    icon.style.bottom = '10px';
    icon.style.cursor = 'pointer';
    icon.style.zIndex = '1000';

    // Append the icon to the message input field's parent
    messageInput.parentElement?.appendChild(icon);

    // Show the modal when the icon is clicked
    icon.addEventListener('click', showModal);
  }
};

// Function to handle opening the modal
const showModal = () => {
  console.log('Showing modal'); // Log to check modal trigger
  const modal = document.createElement('div');
  modal.id = 'ai-modal';
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <h2>Generate Reply</h2>
        <input id="command-input" type="text" placeholder="Enter your command" />
        <button id="generate-btn">Generate</button>
        <div id="response-area"></div>
        <button id="insert-btn" style="display: none;">Insert</button>
        <button id="close-btn">Close</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeButton = modal.querySelector('#close-btn');
  const generateButton = modal.querySelector('#generate-btn');
  const insertButton = modal.querySelector('#insert-btn');

  // Close modal on click outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  closeButton?.addEventListener('click', () => modal.remove());
  generateButton?.addEventListener('click', handleGenerate);
  insertButton?.addEventListener('click', insertResponse);
};

// Handle generating the dummy response
const handleGenerate = () => {
  const responseArea = document.getElementById('response-area');
  const insertButton = document.getElementById('insert-btn');

  if (responseArea && insertButton) {
    responseArea.innerHTML = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`;
    insertButton.style.display = 'block';
  }
};

// Insert the generated reply into the LinkedIn message box
const insertResponse = () => {
  const messageInput = document.querySelector('div[role="textbox"]');
  const responseArea = document.getElementById('response-area');

  if (messageInput && responseArea) {
    messageInput.innerHTML = responseArea.innerText;
  }

  // Close the modal after inserting the response
  const modal = document.getElementById('ai-modal');
  modal?.remove();
};

// Define the content script for LinkedIn
export default defineContentScript({
  matches: ["https://www.linkedin.com/*"], // Match LinkedIn pages
  runAt: 'document_idle', // Run the script when the page is fully loaded
  main() {
    // Add the icon when the message input field is focused
    document.addEventListener('focusin', (event) => {
      const messageInput = event.target as HTMLElement;
      if (messageInput.getAttribute('role') === 'textbox') {
        injectIcon();
      }
    });

    // Remove the icon when the message input field is no longer focused
    document.addEventListener('focusout', (event) => {
      const messageInput = event.target as HTMLElement;
      if (messageInput.getAttribute('role') === 'textbox') {
        if (icon) {
          icon.remove();
          icon = null;
        }
      }
    });
  },
});
