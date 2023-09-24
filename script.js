  //hey there dynamic typing function
  const text = "Hey there!";
  let index = 0;
  let direction = 1;
  let typingTimer;
  let clearingTimer;
  let delay = 150; // Initial delay for typing and clearing (in milliseconds)
  const clearingSpeedFactor = 1.8; // Speed factor for clearing text
  
  function typeText() {
    if (direction === 1) {
      if (index < text.length) {
        document.getElementById("typing-text").textContent += text.charAt(index);
        index++;
      } else {
        direction = -1;
        delay /= clearingSpeedFactor; // Increase the clearing speed
      }
    } else {
      if (index >= 0) {
        document.getElementById("typing-text").textContent = text.substring(0, index);
        index--;
      } else {
        direction = 1;
        delay *= clearingSpeedFactor; // Increase the typing speed
      }
    }
  
    typingTimer = setTimeout(typeText, delay); // Adjust typing speed here (in milliseconds)
  }
  
  function startTypingAnimation() {
    typeText();
  }
  
  // Call startTypingAnimation function when needed
  startTypingAnimation();
  