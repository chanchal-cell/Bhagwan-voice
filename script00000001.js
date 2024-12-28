// Function to set the background image based on the day
function setDailyBackground() {
    const totalBackgrounds = 32; // Total number of background images
    const today = new Date();
    const dayIndex = (today.getDate() - 1) % totalBackgrounds + 1; // Cycle through 1 to 32
    const backgroundImage = `assets/images/background_image_${String(dayIndex).padStart(2, '0')}.png`;
    document.body.style.backgroundImage = `url('${backgroundImage}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
}

// Function to generate the audio playlist
function generatePlaylist() {
    const playlistContainer = document.getElementById("playlist");
    // Ensure we have a valid container
    if (!playlistContainer) {
        console.error("Playlist container not found.");
        return;
    }
    for (let i = 1; i <= 16; i++) { // Update to 16 for your audio count
        const audioFileName = `Sambhog_Se_Samadhi_Ki_Aur_${String(i).padStart(2, '0')}.mp3`;
        const audioElement = document.createElement("div");
        audioElement.classList.add("audio-item");
        // HTML for each audio element
        audioElement.innerHTML = `
            <h3>Audio ${i}</h3>
            <audio controls>
                <source src="assets/audio/${audioFileName}" type="audio/mp3">
                Your browser does not support the audio element.
            </audio>
            <div class="audio-actions">
                <input type="checkbox" class="audio-checkbox" data-audio="${audioFileName}">
                <label for="${audioFileName}">Select for Download</label>
                <a href="assets/audio/${audioFileName}" download class="glow-button">Download</a>
                <button class="glow-button" onclick="shareAudio('${audioFileName}')">Share</button>
            </div>`;
        playlistContainer.appendChild(audioElement);
    }
}

// Function to download selected audio files
function downloadSelected() {
    const checkboxes = document.querySelectorAll('.audio-checkbox:checked');
    const audioFiles = Array.from(checkboxes).map(checkbox => checkbox.dataset.audio);
    if (audioFiles.length === 0) {
        alert("No audio files selected.");
        return;
    }
    audioFiles.forEach(audioFile => {
        const link = document.createElement('a');
        link.href = `assets/audio/${audioFile}`;
        link.download = audioFile;
        link.click();
    });
}

// Function to download a single audio file
function downloadSingleAudio(audioFileName) {
    const link = document.createElement('a');
    link.href = `assets/audio/${audioFileName}`;
    link.download = audioFileName;
    link.click();
}

// Function to handle audio sharing
function shareAudio(audioFileName) {
    const shareText = `Listen to this audio: ${window.location.origin}/assets/audio/${audioFileName}`;
    if (navigator.share) {
        navigator.share({
            title: "Bhagwan Audio Experiences",
            text: shareText,
            url: `${window.location.origin}/assets/audio/${audioFileName}`,
        })
        .then(() => alert("Audio shared successfully!"))
        .catch((error) => console.error("Error sharing audio:", error));
    } else {
        alert(`Copy and share this link: ${shareText}`);
    }
}

// Initialize the website features
function initializeWebsite() {
    setDailyBackground();
    generatePlaylist();
    // Add event listener for the download button
    document.getElementById('download-selected').addEventListener('click', downloadSelected);
}

// Call the initialize function after the DOM content is loaded
document.addEventListener("DOMContentLoaded", initializeWebsite);
