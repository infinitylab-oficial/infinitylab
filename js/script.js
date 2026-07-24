/* -------------------------------------------------------------------------- */
/* InfinityLab Silence - Landing Page JavaScript                              */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Generate Starry Night Background
    generateStars();

    // 2. Setup Console Simulator
    initConsoleSimulator();
});

/**
 * Generates random stars with twinkle animations in the background
 */
function generateStars() {
    const container = document.getElementById("stars-container");
    if (!container) return;

    const starCount = window.innerWidth < 768 ? 60 : 120; // Fewer stars on mobile for performance

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        // Random positions
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        
        // Random size (0.5px to 2.5px)
        const size = Math.random() * 2 + 0.5;
        
        // Random twinkle duration (2s to 6s)
        const duration = Math.random() * 4 + 2;

        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty("--twinkle-duration", `${duration}s`);

        container.appendChild(star);
    }
}

/**
 * Manages the interactive PlayStation simulation panel
 */
function initConsoleSimulator() {
    const simulatorCard = document.querySelector(".console-simulator");
    const btnToggle = document.getElementById("btn-toggle-sim");
    const statusText = document.getElementById("device-status-text");
    const timerDisplay = document.getElementById("sim-timer");

    if (!btnToggle || !statusText || !timerDisplay || !simulatorCard) return;

    let simulationActive = false;
    let countdownInterval = null;
    let secondsLeft = 10;

    btnToggle.addEventListener("click", () => {
        if (!simulationActive) {
            // Start blocking simulation
            simulationActive = true;
            simulatorCard.classList.add("sim-blocked");
            
            // UI Feedback
            statusText.innerText = "CONEXIÓN DESACTIVADA (APAGANDO WIFI...)";
            statusText.classList.remove("online");
            statusText.classList.add("offline");
            
            btnToggle.innerText = "RECONECTAR CONSOLA";
            btnToggle.classList.remove("active");

            // Countdown timer
            secondsLeft = 10;
            timerDisplay.innerText = `00 : ${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
            
            countdownInterval = setInterval(() => {
                secondsLeft--;
                if (secondsLeft >= 0) {
                    timerDisplay.innerText = `00 : ${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
                } else {
                    clearInterval(countdownInterval);
                    timerDisplay.innerText = "SILENCIO ACTIVO";
                    statusText.innerText = "DISPOSITIVO AISLADO CON ÉXITO";
                }
            }, 1000);

        } else {
            // Cancel simulation / Reconnect console
            simulationActive = false;
            if (countdownInterval) clearInterval(countdownInterval);
            
            simulatorCard.classList.remove("sim-blocked");
            
            statusText.innerText = "CONECTADO / JUGANDO";
            statusText.classList.remove("offline");
            statusText.classList.add("online");
            
            btnToggle.innerText = "DESACTIVAR WIFI TEMPORALMENTE";
            btnToggle.classList.add("active");
            
            timerDisplay.innerText = "-- : --";
        }
    });
}

/**
 * Handles product orders by redirecting the user to WhatsApp with pre-filled, customized messages
 * @param {string} version - The version of the product ('escritorio' or 'portatil')
 */
function comprarProducto(version) {
    // Representative WhatsApp number for sales (Standard Peru code format)
    const phoneNumber = "51900000000"; 
    let message = "";

    if (version === "escritorio") {
        message = "Hola InfinityLab, me gustaría solicitar el *InfinityLab Silence - Versión Escritorio* (S/ 99.00). ¿Cómo procedemos con el envío?";
    } else if (version === "portatil") {
        message = "Hola InfinityLab, me gustaría solicitar el *InfinityLab Silence - Versión Portátil con Batería Recargable* (S/ 169.00). ¿Cómo procedemos con el envío?";
    } else {
        message = "Hola InfinityLab, me gustaría consultar por el dispositivo InfinityLab Silence.";
    }

    // URL encode the message
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab/app window
    window.open(whatsappUrl, "_blank");
}
