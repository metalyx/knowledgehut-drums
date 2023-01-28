const buttons = document.getElementsByClassName('color');
const center = document.getElementsByClassName('center')[0];

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseover', (e) => {
        // Fetch color of the button
        const buttonColor = e.target.classList[1];

        // Set the backround color of the center div
        center.classList.add(buttonColor);
    });

    buttons[i].addEventListener('mouseout', (e) => {
        // Set the backround color of the center div
        const buttonColor = e.target.classList[1];
        center.classList.remove(buttonColor);
    });
}