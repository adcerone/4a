let difficulty = 0; 
let turnNumber = 0;
let turnmax = 0;
let userName = null;
let cards = [];
let turnsLeft = 0;
/*  
let cardsSet = 0;
*/
let bestScores = [];

document.getElementById("postStart").style.display = "none";

//tabla de posiciones------------------------------------------

const addBestScores = (user, score, diff) => {
    let newScore = {
        user,
        score,
        diff,
    };
    bestScores.push(newScore)
};

const addScore = () => {
    addBestScores(userName, turnsLeft, difficulty);
    localStorage.setItem('players', JSON.stringify(bestScores));
};

const createTable = () => {
    {
        const Table = document.getElementById("playersTable");
        Table.innerHTML = "";
        
    };
    bestScores.forEach((score, index) => {
        const newTr = document.createElement("tr");

        const newTh = document.createElement("th");
        newTh.scope = "row";
        newTh.textContent = index + 1;

        const newTd = document.createElement("td");
        newTd.textContent = score.user;

        const newTd2 = document.createElement("td");
        newTd2.textContent = score.score;

        newTr.appendChild(newTh);
        newTr.appendChild(newTd);
        newTr.appendChild(newTd2);

        document.getElementById("playersTable").appendChild(newTr);
        localStorage.setItem('players', JSON.stringify(bestScores));
    });
};

const restoreFromStorage = () => {
    const players = localStorage.getItem('players');
    if (players != null) {
        try {
            bestScores = JSON.parse(players);
        } catch (error) {
            console.error("Error:", error);
    }
}};

restoreFromStorage();
createTable();



// Crea la lista de cartas ----------------------------------------------------

const generateCardData = difficulty => {
    const cardData = [];

    for (let i = 1; i <= difficulty; i++) {
        const value = String.fromCharCode(64 + i);
        cardData.push({ id: i * 2 - 1, value, flipped: false, matched: false });
        cardData.push({ id: i * 2, value, flipped: false, matched: false });
    }

    return cardData;
};

// Baraja las cartas -----------------------------------------------------

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// Genera cartas -------------------------------------------------------

const createCards = () => {
    cards.forEach((element) => {
    const newDiv = document.createElement("div");
    newDiv.className = "col";
 
    const cardDiv = document.createElement("div");
    cardDiv.className = "cardDsp";
    cardDiv.setAttribute("data-card-id", element.id);
    cardDiv.style.width = "9rem";
    cardDiv.style.height = "9rem";
 
    const cardFront = document.createElement("div");
    cardFront.className = "card-front";
    cardFront.style.display = "none";
 
    const cardBack = document.createElement("div");
    cardBack.className = "card-back";
 
    const cardImg = document.createElement("img");
    cardImg.src = `./img/${element.value}.bmp`;
    cardImg.className = "card-img img-fluid";
 
    const cardBackImg = document.createElement("img");
    cardBackImg.src = `./img/00.bmp`;
    cardBackImg.className = "card-img img-fluid card-back-img";
 
    cardFront.appendChild(cardImg);
    cardBack.appendChild(cardBackImg);
    cardDiv.appendChild(cardFront);
    cardDiv.appendChild(cardBack);
 
    cardDiv.addEventListener("click", () => {
        const cardId = parseInt(cardDiv.getAttribute("data-card-id"));
        const clickedCard = cards.find(card => card.id === cardId);
 
        if (!clickedCard.flipped) {
            clickedCard.flipped = true;
            flipCard(cardDiv);
            checkMatch();
        } else {

        }
    });

    newDiv.appendChild(cardDiv);
    document.getElementById("gameDsp").appendChild(newDiv);
    }) 
};

// Logica de turno -------------------------------------------------------
//gira cartas----------
const flipCard = (card) =>{

    const cardFront = card.querySelector(".card-front");
    const cardBack = card.querySelector(".card-back");

    cardFront.style.display = "block";
    cardBack.style.display = "none";

};
const flipBack = (card) =>{

    const cardFront = card.querySelector(".card-front");
    const cardBack = card.querySelector(".card-back");

    cardFront.style.display = "none";
    cardBack.style.display = "block";

};
const flipMatch = (card) =>{

    const cardFront = card.querySelector(".card-front");
    const cardBackImg = card.querySelector(".card-back-img");
    const cardBack = card.querySelector(".card-back");

    cardFront.style.display = "none";
    cardBack.style.display = "block";
    cardBackImg.src = `./img/01.bmp`;

};
//comprueba coincidencia----------

const checkMatch = () => {
    const flippedCards = cards.filter(card => card.flipped);
    turnLeft();

    if (flippedCards.length === 2) {
        const firstCardValue = flippedCards[0].value;
        const allHaveSameValue = flippedCards.every(card => card.value === firstCardValue);

        if (allHaveSameValue) {
            flippedCards.forEach(card => {
                card.matched = true;
                card.flipped = false;
            });

            const matchedCardDivs = flippedCards.map(card => document.querySelector(`[data-card-id="${card.id}"]`));

            matchedCardDivs.forEach(cardDiv => {
                flipMatch(cardDiv);
            });
            turnCheck();
        } else {

            const unMatchedCardDivs = flippedCards.map(card => document.querySelector(`[data-card-id="${card.id}"]`));

            
            setTimeout(() => {
                turnNumber += 1;
                unMatchedCardDivs.forEach(cardDiv => {
                    flipBack(cardDiv);
                });


                flippedCards.forEach(card => {
                    card.flipped = false;
                });
                turnCheck();  
            }, 500);
        }
    }
};

//pasa el turno-------------

const turnCheck = () => {
    const matchedCards = cards.filter(card => card.matched);
        
        if(matchedCards.length === cards.length - 2){
            victoryMsj();
            addScore();
            createTable();
            }
        else{
            const unmatchedCards = cards.filter(card => !card.matched);
            const unMatchedCardDivs = unmatchedCards.map(card => document.querySelector(`[data-card-id="${card.id}"]`));

            if (turnNumber === turnmax){
                setTimeout(() => {
                    defeatMsj();
                    unMatchedCardDivs.forEach(cardDiv => {
                        flipCard(cardDiv);
                    });
                }, 500);
            }
        };
};

//mensaje victoria o derrota------------------------

const victoryMsj = () => {
    const newDiv = document.createElement("div");

    const newP = document.createElement("p");
    newP.className = "fs-3 fw-bolder text-success";
    newP.textContent = "Victoria!";

    newDiv.appendChild(newP);

    document.getElementById("postStart").appendChild(newDiv);
};

const defeatMsj = () => {
    const newDiv = document.createElement("div");

    const newP = document.createElement("p");
    newP.className = "fs-3 fw-bolder text-danger";
    newP.textContent = "Derrota!";

    newDiv.appendChild(newP);

    document.getElementById("postStart").appendChild(newDiv);
};

//diplay de turnos restantes----------------------------

const turnLeft = () => {
    turnsLeft = turnmax - turnNumber - 1;

    const turnsDsp = document.getElementById("turnsDsp");
    turnsDsp.innerHTML = "";

    const newDiv = document.createElement("div");

    const newP = document.createElement("p");
    newP.className = "fs-3 fw-bolder text-success";
    newP.textContent = turnsLeft.toString() + " / " + turnmax.toString();

    newDiv.appendChild(newP);

    document.getElementById("turnsDsp").appendChild(newDiv);
};
 
//start------------------------------------------------------------------

const restartGame = () => {
    turnNumber = 0;
    userName = null;
    cards = [];

    const gameDsp = document.getElementById("gameDsp");
    gameDsp.innerHTML = "";

    document.getElementById("postStart").style.display = "none";
    document.getElementById("preStart").style.display = "block";
};

const settings = () => {

    difficulty = parseInt(document.getElementById("difficulty").value);
    userName = document.getElementById("userNameInput").value
        if(difficulty <= 6){
            turnmax = 6;
        }else{
            turnmax = 8;
        };
    startGame();
    document.getElementById("postStart").style.display = "block";
    document.getElementById("preStart").style.display = "none";
};

const startGame = () => {
    cards = generateCardData(difficulty);
    shuffleArray(cards);
    restoreFromStorage();  
    createTable();         
    createCards();        
};

