const tasks = [
    { question: "gestern die Hausaufgaben machen", answer: "Hast du / Haben Sie gestern die Hausaufgaben gemacht?" },
    { question: "gestern kochen", answer: "Hast du / Haben Sie gestern gekocht?" },
    { question: "gestern arbeiten", answer: "Hast du / Haben Sie gestern gearbeitet?" },
    { question: "früher allein wohnen", answer: "Hast du / Haben Sie früher allein gewohnt?" },
    { question: "am Samstag Freunde treffen", answer: "Hast du / Haben Sie am Samstag Freunde getroffen?" },
    { question: "letzte Woche Sport machen", answer: "Hast du / Haben Sie letzte Woche Sport gemacht?" },
    { question: "gestern Tee trinken", answer: "Hast du / Haben Sie gestern Tee getrunken?" },
    { question: "gestern am Computer spielen", answer: "Hast du / Haben Sie gestern am Computer gespielt?" },
    { question: "gestern ein Buch lesen", answer: "Hast du / Haben Sie gestern ein Buch gelesen?" },
    { question: "gestern gut schlafen", answer: "Hast du / Haben Sie gestern gut geschlafen?" },
    { question: "mir heute Morgen eine SMS schreiben", answer: "Hast du / Haben Sie mir heute Morgen eine SMS geschrieben?" },
    { question: "gestern viel essen", answer: "Hast du / Haben Sie gestern viel gegessen?" },
    { question: "gestern Musik hören", answer: "Hast du / Haben Sie gestern Musik gehört?" },
    { question: "zu Hause frühstücken", answer: "Hast du / Haben Sie zu Hause gefrühstückt?" },
    { question: "gestern Brot kaufen", answer: "Hast du / Haben Sie gestern Brot gekauft?" },
    { question: "in der Schule Englisch lernen", answer: "Hast du / Haben Sie in der Schule Englisch gelernt?" },
    { question: "früher Fußball spielen", answer: "Hast du / Haben Sie früher Fußball gespielt?" },
    { question: "im Sommer grillen", answer: "Hast du / Haben Sie im Sommer gegrillt?" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);