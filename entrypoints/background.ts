export default defineContentScript({
  matches: ["https://www.linkedin.com/*"], // URL patterns where the content script will run
  runAt: "document_idle", // When the content script runs
  main() {
    console.log("Content script is running on LinkedIn");
  }
});
