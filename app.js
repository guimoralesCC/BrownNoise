// Load the audio file without playing it immediately
const audio = new Audio("brown_noise.mp3");
audio.loop = true;

// Select buttons, volume control, and timer elements
const playPauseButton = document.getElementById("playPauseBtn");
const resetButton = document.getElementById("resetBtn");
const volumeControl = document.getElementById("volumeControl");
const timerDisplay = document.getElementById("timerDisplay");

let countdownTimer = null;
let remainingTime = 0;
let isPlaying = false;

// Function to format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

// Function to parse the MM:SS input into seconds
function parseTime(input) {
    const [mins, secs] = input.split(":").map(Number);
    return (mins * 60) + (secs || 0);
}

// Play/pause button event
playPauseButton.addEventListener("click", () => {
    if (!isPlaying) {
        remainingTime = parseTime(timerDisplay.value);

        // Disable editing while countdown is active
        timerDisplay.disabled = true;

        // Update display and start audio
        timerDisplay.value = formatTime(remainingTime);
        audio.play();
        playPauseButton.textContent = "Pause";
        isPlaying = true;

        // Start countdown
        if (remainingTime > 0) {
            countdownTimer = setInterval(() => {
                remainingTime--;
                timerDisplay.value = formatTime(remainingTime);

                // Stop audio when time reaches zero
                if (remainingTime <= 0) {
                    clearInterval(countdownTimer);
                    audio.pause();
                    playPauseButton.textContent = "Play";
                    isPlaying = false;
                    timerDisplay.disabled = false;
                }
            }, 1000);
        }
    } else {
        // Pause the audio and countdown
        audio.pause();
        clearInterval(countdownTimer);
        playPauseButton.textContent = "Play";
        isPlaying = false;
        timerDisplay.disabled = false;
    }
});

// Reset button event
resetButton.addEventListener("click", () => {
    clearInterval(countdownTimer);
    audio.pause();
    playPauseButton.textContent = "Play";
    isPlaying = false;

    // Reset timer display and enable editing
    timerDisplay.value = "00:00";
    timerDisplay.disabled = false;
});

// Volume control event
volumeControl.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

// Close button for warning message
const closeWarningBtn = document.getElementById("closeWarningBtn");
const warningMessage = document.getElementById("warningMessage");

closeWarningBtn.addEventListener("click", () => {
    warningMessage.style.display = "none";  // Hide the warning message
});

// Close button for welcome message
const closeWelcomeBtn = document.getElementById("closeWelcomeBtn");
const welcomeMessage = document.getElementById("welcomeMessage");

closeWelcomeBtn.addEventListener("click", () => {
    welcomeMessage.style.display = "none";  // Hide the welcome message
});

// Restrict countdown input to only numbers and colon
timerDisplay.addEventListener("input", (e) => {
    // Remove any characters that are not numbers or a colon
    timerDisplay.value = timerDisplay.value.replace(/[^0-9:]/g, '');

    // Enforce MM:SS format by limiting length and positioning the colon
    if (timerDisplay.value.length === 2 && !timerDisplay.value.includes(":")) {
        timerDisplay.value += ":"; // Insert colon after 2 digits for MM:SS format
    }

    if (timerDisplay.value.length > 5) {
        timerDisplay.value = timerDisplay.value.slice(0, 5); // Limit to MM:SS format
    }
});

// Toggle help section
const toggleHelpBtn = document.getElementById("toggleHelpBtn");
const helpContent = document.getElementById("helpContent");

toggleHelpBtn.addEventListener("click", () => {
    if (helpContent.style.display === "none" || helpContent.style.display === "") {
        helpContent.style.display = "block";
        toggleHelpBtn.textContent = "Close Help";
    } else {
        helpContent.style.display = "none";
        toggleHelpBtn.textContent = "Help";
    }
});