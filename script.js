// Wait 4 seconds, then show the dashboard
setTimeout(() => {
    document.getElementById("bootScreen").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
}, 4000);

// Theme selector
const theme = document.getElementById("themeSelector");

theme.addEventListener("change", function () {

    let color = "#00ff88";

    switch (this.value) {
        case "blue":
            color = "#00bfff";
            break;

        case "purple":
            color = "#bb00ff";
            break;

        case "red":
            color = "#ff3333";
            break;

        case "gold":
            color = "#ffd700";
            break;

        default:
            color = "#00ff88";
    }

    document.documentElement.style.setProperty("--accent", color);

    document.querySelectorAll("button").forEach(btn=>{
        btn.style.background=color;
    });

    document.querySelector("select").style.borderColor=color;
    document.querySelector("select").style.color=color;

    document.querySelector(".chatBox").style.borderColor=color;

    document.body.style.color=color;

    document.querySelector(".core").style.borderColor=color;
    document.querySelector(".core").style.boxShadow=
        `0 0 20px ${color},
         0 0 60px ${color}`;

});

// ===============================
// I.N.E.O.N. AI Chat
// ===============================

const input = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatBox = document.querySelector(".chatBox");

async function sendMessage() {
    const message = input.value.trim();

    if (!message) return;

    // Show user's message
    chatBox.innerHTML += `
        <div class="userMessage">
            ${message}
        </div>
    `;

    input.value = "";

    // Show loading message
    chatBox.innerHTML += `
        <div class="botMessage" id="loading">
            I.N.E.O.N. is thinking...
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        document.getElementById("loading").remove();

        chatBox.innerHTML += `
            <div class="botMessage">
                ${data.reply}
            </div>
        `;

    } catch (err) {

        document.getElementById("loading").remove();

        chatBox.innerHTML += `
            <div class="botMessage">
                Error connecting to AI.
            </div>
        `;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});
