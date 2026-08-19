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
 * Manages the interactive action-range simulation panel with 3 models
 */
function initConsoleSimulator() {
    const simulatorCard = document.querySelector(".range-simulator-card");
    const modelButtons = document.querySelectorAll(".btn-model-select");
    const statusTags = document.querySelectorAll(".target-status-tag");
    const centralNode = document.querySelector(".silence-central-node");

    if (!simulatorCard || modelButtons.length === 0) return;

    modelButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons
            modelButtons.forEach(b => b.classList.remove("active"));
            // Add active class to clicked button
            btn.classList.add("active");

            const model = btn.getAttribute("data-model");
            updateSimulatorState(model);
        });
    });

    // Toggle between off and max when clicking the central node
    if (centralNode) {
        centralNode.addEventListener("click", () => {
            const activeBtn = document.querySelector(".btn-model-select.active");
            const currentModel = activeBtn ? activeBtn.getAttribute("data-model") : "off";
            
            let nextModel = "off";
            if (currentModel === "off") {
                nextModel = "portatil-pro"; // Go straight to max power
            } else {
                nextModel = "off";
            }

            // Click the corresponding button to trigger the update
            const targetBtn = Array.from(modelButtons).find(b => b.getAttribute("data-model") === nextModel);
            if (targetBtn) {
                targetBtn.click();
            }
        });
    }

    function updateSimulatorState(model) {
        // Reset classes
        simulatorCard.classList.remove("sim-active", "sim-escritorio", "sim-portatil", "sim-portatil-pro");
        
        if (model === "off") {
            // Reset status tags and classes of targets
            statusTags.forEach(tag => {
                const deviceType = tag.getAttribute("data-device");
                const parent = tag.closest(".target-device-node");
                if (parent) parent.classList.remove("blocked");

                if (deviceType === "gaming") {
                    tag.innerText = "JUGANDO / PS5";
                } else if (deviceType === "speaker1") {
                    tag.innerText = "REPRODUCIENDO";
                } else if (deviceType === "speaker2") {
                    tag.innerText = "REPRODUCIENDO";
                }
            });
        } else {
            simulatorCard.classList.add("sim-active");
            simulatorCard.classList.add(`sim-${model}`);

            statusTags.forEach(tag => {
                const deviceType = tag.getAttribute("data-device");
                const parent = tag.closest(".target-device-node");
                
                let isBlocked = false;

                if (deviceType === "gaming") {
                    // Blocked by all models (10m, 15m, 30m) since it's 8m away
                    isBlocked = true;
                    tag.innerText = "MANDO APAGADO (8m)";
                } else if (deviceType === "speaker1") {
                    // Blocked by portatil (15m) and portatil-pro (30m) since it's 13m away
                    isBlocked = (model === "portatil" || model === "portatil-pro");
                    tag.innerText = isBlocked ? "SILENCIADO (13m)" : "REPRODUCIENDO";
                } else if (deviceType === "speaker2") {
                    // Blocked only by portatil-pro (30m) since it's 25m away
                    isBlocked = (model === "portatil-pro");
                    tag.innerText = isBlocked ? "SILENCIADO (25m)" : "REPRODUCIENDO";
                }

                if (parent) {
                    if (isBlocked) {
                        parent.classList.add("blocked");
                    } else {
                        parent.classList.remove("blocked");
                    }
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
 * @param {string} version - The version of the product ('escritorio', 'portatil', or 'portatil-pro')
 */
function comprarProducto(version) {
    const phoneNumber = "51991468197"; // Owner phone number
    let message = "";

    if (version === "escritorio") {
        message = "Hola InfinityLab, me interesa adquirir el *Silence - Versión Escritorio* (S/ 99.00). ¿Cuáles son los pasos para realizar el envío?";
    } else if (version === "portatil") {
        message = "Hola InfinityLab, me interesa adquirir el *Silence - Versión Portátil Avanzado* (S/ 155.00). ¿Cuáles son los pasos para realizar el envío?";
    } else if (version === "portatil-pro") {
        message = "Hola InfinityLab, me interesa adquirir el *Silence - Versión Portátil Pro Avanzado* (S/ 289.00). ¿Cuáles son los pasos para realizar el envío?";
    } else {
        message = "Hola InfinityLab, me gustaría consultar por el dispositivo Silence.";
    }

    // URL encode the message
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab/app window
    window.open(whatsappUrl, "_blank");
}

