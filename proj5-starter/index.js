// Fetch all cards
let cards = document.getElementsByClassName('card');

// Fetch the Shuffle button
const shuffleButton = document.getElementById('shuffle');

// Define lastFlipped card as undefined
let lastFlipped = undefined;

// Loop through the all cards and attach handler function on click
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => cardClick(cards[i]))
}

shuffleButton.addEventListener('click', () => shuffleCards(cards))

function cardClick (card) {
    // Fetch the first <img> tags from cards
    const cardFrontImage = card.childNodes[1];

    // If the card is already green (means is already matched with the other card)
    // then do nothing
    if (cardFrontImage.classList.contains('green')) {
        return;
    }

    // If we click on the same card twice (doubleclick for example)
    if (card.isSameNode(lastFlipped)) {
        card.classList.toggle('flip');
        lastFlipped = undefined;
        return;
    }

    // If we already have one flipped card
    if (lastFlipped) {
        const lastFlippedFrontImage = lastFlipped.childNodes[1];

        // If src is equal, that means that we have a match
        if (compareSrc(card, lastFlipped)) {
            // Set green color and freeze the cards
            cardFrontImage.classList.add('green');
            lastFlippedFrontImage.classList.add('green');

            // Force flip the cards (to see the front side)
            card.classList.add('flip');
            lastFlipped.classList.add('flip')

            // Clear the lastFlipper card
            lastFlipped = undefined;

            // Exit from function
            return;

        // Cards doesn't match
        } else {
            // Firstly show the card to user
            card.classList.add('flip');

            // Color the cards into red
            cardFrontImage.classList.add('red');
            lastFlippedFrontImage.classList.add('red');

            // Save lastFlipped into temp variable
            const temp = lastFlipped;
            const tempFrontImage = temp.childNodes[1];

            // Clear the lastFlipped (so user can continue flipping other cards)
            lastFlipped = undefined;

            // Remove red colors and flip down the cards after a delay
            setTimeout(() => {
                // Return back regular color
                cardFrontImage.classList.remove('red');
                tempFrontImage.classList.remove('red');

                // We cannot flip down the green cards, because they are already done
                if (!cardFrontImage.classList.contains('green')) {
                    card.classList.remove('flip');
                }

                if (!tempFrontImage.classList.contains('green')) {
                    temp.classList.remove('flip');
                }
                
            }, 1500);

            // Exit from function
            return;
        }
    }

    // If we don't have any flipped cards at the moment
    if (!lastFlipped) {
        // Remember lastFlipped card
        lastFlipped = card;

        // Flipping the card
        lastFlipped.classList.add('flip')
    }
}

// If the two cards have the same front image -> return true
function compareSrc (aCard, bCard) {
    if (aCard.childNodes[1].src === bCard.childNodes[1].src) {
        return true;
    }

    return false;
}

function shuffleCards (cards) {
    // Fetch the container for cards
    const cardsContainer = document.getElementById('cardsContainer');

    // Create an array from set of cards
    const arrayOfCards = [...cards];

    // Create an array of deep copies of cards
    const arrayOfCopiedCards = arrayOfCards.map((item) => item.cloneNode(true));

    // Remove all the cards from the DOM
    cardsContainer.innerHTML = '';

    // Shuffle the result array
    const shuffledCards = arrayOfCopiedCards.sort(() => 0.5 - Math.random());

    // Clear all classnames (return to initial state)
    const cardsToRender = shuffledCards.map((item) => {
        item.className = 'card';
        item.childNodes[1].className = 'front';
        return item;
    });

    // Append obtained cards to the container
    cardsToRender.forEach((card) => {
        cardsContainer.appendChild(card);
    });

    
    cards = document.getElementsByClassName('card');

    // Loop through the all cards and attach handler function on click
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => cardClick(cards[i]))
    }
}
