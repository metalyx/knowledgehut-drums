const drums = ['w', 'a', 's', 'd', 'j', 'k', 'l'];
const drumButtons = document.getElementsByClassName('drum');

// Loop through the buttons
for (let i = 0; i < drumButtons.length; i++) {
    // Bind click listeners
    drumButtons[i].addEventListener('click', handleButtonClicks);
}

function handleButtonClicks (event) {
    const buttonText = event.target.innerText;

    // If clicked button's inner Text matches with one of the element of the array of drums
    // then set mathcedKey as our button string
    const matchedKey = drums.find((item) => item === buttonText);

    if (matchedKey) {
        new Audio(`sounds/${getSoundNameByDrumName(matchedKey)}`).play();
        console.log(`${matchedKey} drum was clicked!`);
    }
}

// Checking our keyboard pressings
document.addEventListener('keypress', handleKeyPressed);

// Handle keyboard pressings
function handleKeyPressed (event) {

    const key = event.key;

    // If pressed key matches with array of drums
    // then set mathcedKey as our key
    const matchedKey = drums.find((item) => item === key);

    if (matchedKey) {
        new Audio(`sounds/${getSoundNameByDrumName(matchedKey)}`).play();
        console.log(`${matchedKey} drum was pressed!`);
    } else {
        console.log(`${key} is not a drum key...`);
    }
}

function getSoundNameByDrumName (drumString) {
    switch (drumString) {
        case 'w':
            return 'tom-1.mp3';
        case 'a':
            
            return 'tom-2.mp3';
        case 's':
            
            return 'tom-3.mp3';
        case 'd':
            
            return 'tom-4.mp3';
        case 'j':
            
            return 'snare.mp3';
        case 'k':
            
            return 'crash.mp3';
        case 'l':
            
            return 'kick-bass.mp3';
        default:
            throw new Error('Unexpected drumString...');
    }
}
