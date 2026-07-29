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