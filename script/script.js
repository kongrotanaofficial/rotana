// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const mobileMenuEl = document.getElementById('mobile-menu');

        if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                if (mobileMenuEl && !mobileMenuEl.classList.contains('hidden')) {
                    mobileMenuEl.classList.add('hidden');
                }
            }
        } else if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (mobileMenuEl && !mobileMenuEl.classList.contains('hidden')) {
                mobileMenuEl.classList.add('hidden');
            }
        }
    });
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Header shrink on scroll
const header = document.getElementById('header');
if (header) { // Add null check for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('py-2', 'shadow-md');
            header.classList.remove('py-3');
        } else {
            header.classList.remove('py-2', 'shadow-md');
            header.classList.add('py-3');
        }
    });
}


// Active navigation link highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a.nav-link');
const mobileNavLinks = document.querySelectorAll('#mobile-menu a.data-section-mobile');

function changeLinkState() {
    let index = sections.length;
    while (--index >= 0 && window.scrollY + 100 < sections[index].offsetTop) { }

    navLinks.forEach((link) => link.classList.remove('active'));
    mobileNavLinks.forEach((link) => link.classList.remove('bg-blue-100', 'text-blue-600'));

    if (index >= 0) {
        const currentSectionId = sections[index].id;
        const activeDesktopLink = document.querySelector(`nav a.nav-link[data-section="${currentSectionId}"]`);
        const activeMobileLink = document.querySelector(`#mobile-menu a.data-section-mobile[data-section="${currentSectionId}"]`);

        if (activeDesktopLink) activeDesktopLink.classList.add('active');
        if (activeMobileLink) activeMobileLink.classList.add('bg-blue-100', 'text-blue-600');
    } else if (sections.length > 0 && navLinks.length > 0 && mobileNavLinks.length > 0) { // Ensure sections[0] exists
        const firstSectionId = sections[0].id;
        const activeDesktopLink = document.querySelector(`nav a.nav-link[data-section="${firstSectionId}"]`);
        const activeMobileLink = document.querySelector(`#mobile-menu a.data-section-mobile[data-section="${firstSectionId}"]`);
        if (activeDesktopLink) activeDesktopLink.classList.add('active');
        if (activeMobileLink) activeMobileLink.classList.add('bg-blue-100', 'text-blue-600');
    }
}
if (sections.length > 0) { // Only run if sections exist
    changeLinkState();
    window.addEventListener('scroll', changeLinkState);
}


// Contact form submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nameInput = document.getElementById('name');
        const name = nameInput ? nameInput.value : "there"; // Fallback name
        if (formMessage) {
            formMessage.innerHTML = `<p class="text-green-600 font-medium">Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.</p>`;
            setTimeout(() => { formMessage.innerHTML = ''; }, 5000);
        }
        contactForm.reset();
    });
}

// Fade-in animation for sections
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// --- Toggle Content for "Learn More" and "More About Me" buttons ---
function toggleContentVisibility(outputElementId, buttonElement) {
    const outputElement = document.getElementById(outputElementId);
    const buttonTextElement = buttonElement.querySelector('.btn-text');

    if (!outputElement) return;

    // Predefined content
    const contentStore = {
        'gemini-summary-1': "This intelligent Telegram bot suite, built with Python and the python-telegram-bot library, offers diverse tools to simplify daily life. From task management and reminders to solving chemistry problems, performing math calculations, providing English synonyms, converting text to MP3, auto-reacting with emojis, and sharing useful information—each bot uses smart automation and natural language processing to create seamless, engaging interactions.",
        'gemini-summary-2': "A portfolio of graphic design projects, highlighting skills in branding, illustration, and visual communication. Expertise in Adobe Creative Suite (Photoshop, Illustrator) is used to develop compelling visual narratives and marketing assets.",
        'gemini-summary-3': "This showcase highlights practical SAP Business One development projects focused on enhancing business processes and user workflows. It includes custom reports, transaction notifications, FMS logic, and seamless system integrations—crafted to support real-world ERP needs with a focus on usability, efficiency, and business impact.",
        'gemini-summary-4': "A detailed look into the creation of Chhuk Krapom Font, a distinctive Khmer typeface carefully crafted to celebrate and preserve the beauty of the Khmer script. This project documents the entire journey—from initial concept and character design to a fully functional digital font—designed to improve readability and support modern Khmer typography across digital and print platforms.",
        'gemini-bio-snippet': "Kong Rotana is a versatile developer with expertise in ERP development, full-stack web applications, and Telegram bot creation. With strong skills in SAP Business One customization, MVC web development, and Python-based automation, Kong builds practical and impactful solutions that streamline business processes and enhance user experiences. Beyond coding, Kong is a passionate graphic designer and the creator of the Chhuk Krapom Khmer font, blending technology and creativity to support the Khmer language in the digital world."
    };

    const newContent = contentStore[outputElementId] || "More details will appear here.";

    // Toggle visibility and content
    if (outputElement.classList.contains('hidden') || outputElement.innerHTML !== newContent) {
        outputElement.innerHTML = newContent; 
        outputElement.classList.remove('hidden');
        // Optional: Change button text to "Show Less"
        // if (buttonTextElement) buttonTextElement.textContent = 'Show Less';
    } else {
        outputElement.classList.add('hidden');
        // Optional: Change button text back to "Learn More"
        // if (buttonTextElement) buttonTextElement.textContent = 'Learn More';
    }
}

// Global function for project summaries
window.generateProjectSummary = function(descriptionElementId, outputElementId, buttonElement) {
    toggleContentVisibility(outputElementId, buttonElement);
}

// Event listener for the bio button
const generateBioButton = document.getElementById('generateBioButton');
if (generateBioButton) {
    generateBioButton.addEventListener('click', function() {
        toggleContentVisibility('gemini-bio-snippet', this);
    });
}


// QR Code Generator
const qrInput = document.getElementById('qr-input');
const qrOutput = document.getElementById('qr-output');
const qrGenerateBtn = document.getElementById('qr-generate-btn');
const qrDownloadBtn = document.getElementById('qr-download-btn');

let qrCodeInstance = null;

if (qrGenerateBtn && qrInput && qrOutput && qrDownloadBtn) {
    const generateQRCode = () => {
        const text = qrInput.value.trim();
        if (text) {
            // Clear previous QR code
            qrOutput.innerHTML = '';
            // Generate new QR code
            qrCodeInstance = new QRCode(qrOutput, {
                text: text,
                width: 200,
                height: 200,
                colorDark: "#1e1e2c",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            // Show download button after generation
            setTimeout(() => {
                const qrCanvas = qrOutput.querySelector('canvas');
                if (qrCanvas) {
                    qrDownloadBtn.href = qrCanvas.toDataURL('image/png');
                    qrDownloadBtn.classList.remove('hidden');
                    qrGenerateBtn.classList.add('bg-gray-300', 'cursor-not-allowed');
                    qrGenerateBtn.disabled = true;
                    setTimeout(() => {
                        qrGenerateBtn.classList.remove('bg-gray-300', 'cursor-not-allowed');
                        qrGenerateBtn.disabled = false;
                    }, 1000); // Re-enable after 1s to prevent rapid clicks
                }
            }, 100);
        } else {
            qrOutput.innerHTML = '<p class="text-red-600 text-center">Please enter a valid URL or text.</p>';
            qrDownloadBtn.classList.add('hidden');
            setTimeout(() => {
                qrOutput.innerHTML = '';
            }, 3000);
        }
    };

    qrGenerateBtn.addEventListener('click', generateQRCode);
    qrGenerateBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default touch behavior
        generateQRCode();
    });
}

// Barcode Generator
const barcodeInput = document.getElementById('barcode-input');
const barcodeOutput = document.getElementById('barcode-output');
const barcodeGenerateBtn = document.getElementById('barcode-generate-btn');
const barcodeDownloadBtn = document.getElementById('barcode-download-btn');

if (barcodeGenerateBtn && barcodeInput && barcodeOutput && barcodeDownloadBtn) {
    const generateBarcode = () => {
        const text = barcodeInput.value.trim();
        if (text) {
            // Generate barcode
            JsBarcode(barcodeOutput, text, {
                format: "CODE128",
                width: 2,
                height: 100,
                displayValue: true,
                background: "#ffffff",
                lineColor: "#1e1e2c",
                margin: 10
            });
            // Show download button
            setTimeout(() => {
                barcodeDownloadBtn.href = barcodeOutput.toDataURL('image/png');
                barcodeDownloadBtn.classList.remove('hidden');
                barcodeGenerateBtn.classList.add('bg-gray-300', 'cursor-not-allowed');
                barcodeGenerateBtn.disabled = true;
                setTimeout(() => {
                    barcodeGenerateBtn.classList.remove('bg-gray-300', 'cursor-not-allowed');
                    barcodeGenerateBtn.disabled = false;
                }, 1000); // Re-enable after 1s
            }, 100);
        } else {
            barcodeOutput.getContext('2d').clearRect(0, 0, barcodeOutput.width, barcodeOutput.height);
            barcodeOutput.insertAdjacentHTML('afterend', '<p class="text-red-600 text-center">Please enter valid text for barcode.</p>');
            barcodeDownloadBtn.classList.add('hidden');
            setTimeout(() => {
                const errorMsg = barcodeOutput.nextElementSibling;
                if (errorMsg && errorMsg.tagName === 'P') errorMsg.remove();
            }, 3000);
        }
    };

    barcodeGenerateBtn.addEventListener('click', generateBarcode);
    barcodeGenerateBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default touch behavior
        generateBarcode();
    });
}

// Apply fade-in animation to code generator section
const codeGeneratorSection = document.getElementById('code-generator');
if (codeGeneratorSection) {
    observer.observe(codeGeneratorSection);
}