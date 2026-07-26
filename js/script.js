/* -------------------------------------------------------------------------- */
/* InfinityLab Silence - Landing Page JavaScript                              */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Setup Console Simulator
    initConsoleSimulator();

    // 2. Setup FAQ Accordion
    initFaqAccordion();

    // 3. Setup Floating WhatsApp Button
    initFloatingWhatsapp();
});

/**
 * Manages the interactive action-range simulation panel
 */
function initConsoleSimulator() {
    const simulatorCard = document.querySelector(".range-simulator-card");
    const btnToggle = document.getElementById("btn-toggle-sim");
    const statusTags = document.querySelectorAll(".target-status-tag");
    const centralNode = document.querySelector(".silence-central-node");

    if (!btnToggle || !simulatorCard) return;

    let simulationActive = false;

    // Toggle on button click
    btnToggle.addEventListener("click", toggleSimulation);

    // Toggle on central device click
    if (centralNode) {
        centralNode.addEventListener("click", toggleSimulation);
    }

    function toggleSimulation() {
        simulationActive = !simulationActive;

        if (simulationActive) {
            simulatorCard.classList.add("sim-active");
            
            // Update button
            btnToggle.innerText = "Apagar Señal de Silencio";
            btnToggle.classList.remove("btn-off");
            btnToggle.classList.add("btn-on");

            // Update status tags dynamically
            statusTags.forEach(tag => {
                const deviceType = tag.getAttribute("data-device");
                if (deviceType === "speaker") {
                    tag.innerText = "SILENCIADO";
                } else if (deviceType === "gaming") {
                    tag.innerText = "MANDO PS4/PS5 APAGADO";
                } else if (deviceType === "wifi") {
                    tag.innerText = "SIN SEÑAL 2.4G";
                } else if (deviceType === "tv") {
                    tag.innerText = "SIN WIFI / PAUSADO";
                }
            });

        } else {
            simulatorCard.classList.remove("sim-active");
            
            // Update button
            btnToggle.innerText = "Encender Dispositivo Silence";
            btnToggle.classList.remove("btn-on");
            btnToggle.classList.add("btn-off");

            // Reset status tags
            statusTags.forEach(tag => {
                const deviceType = tag.getAttribute("data-device");
                if (deviceType === "speaker") {
                    tag.innerText = "REPRODUCIENDO";
                } else if (deviceType === "gaming") {
                    tag.innerText = "JUGANDO / PS5";
                } else if (deviceType === "wifi") {
                    tag.innerText = "WiFi CONECTADO";
                } else if (deviceType === "tv") {
                    tag.innerText = "TRANSMITIENDO HD";
                }
            });
        }
    }
}


/**
 * Setup accordion behavior for FAQs
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        if (!question) return;
        
        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            
            // Close all items first for accordion effect
            faqItems.forEach(i => i.classList.remove("active"));
            
            // Toggle the clicked one
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
}

/**
 * Initializes the floating WhatsApp button link
 */
function initFloatingWhatsapp() {
    const floatBtn = document.getElementById("whatsapp-float-btn");
    if (!floatBtn) return;
    
    const phoneNumber = "51991468197"; // Owner phone number
    const message = "Hola InfinityLab, tengo una duda sobre el dispositivo Silence. ¿Me podrían ayudar?";
    const encodedMessage = encodeURIComponent(message);
    
    floatBtn.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Handles product orders by redirecting the user to WhatsApp with pre-filled, customized messages
 * @param {string} version - The version of the product ('escritorio' or 'portatil')
 */
function comprarProducto(version) {
    const phoneNumber = "51991468197"; // Owner phone number
    let message = "";

    if (version === "escritorio") {
        message = "Hola InfinityLab, me interesa adquirir el *Silence - Versión Escritorio* (S/ 99.00). ¿Cuáles son los pasos para realizar el envío?";
    } else if (version === "portatil") {
        message = "Hola InfinityLab, me interesa adquirir el *Silence - Versión Portátil* (S/ 169.00). ¿Cuáles son los pasos para realizar el envío?";
    } else {
        message = "Hola InfinityLab, me gustaría consultar por el dispositivo Silence.";
    }

    // URL encode the message
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab/app window
    window.open(whatsappUrl, "_blank");
}
