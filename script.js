// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'white';
        navLinks.style.padding = '1rem';
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        navLinks.style.display = 'none';
        menuOpen = false;
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (menuOpen) {
            menuBtn.click();
        }
    });
});

// Typing animation for terminal commands
function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        setTimeout(() => typeWriter(element, text, i + 1), 50);
    }
}

// Initialize terminal typing animation
document.addEventListener('DOMContentLoaded', () => {
    const commands = document.querySelectorAll('.command');
    commands.forEach((cmd, index) => {
        setTimeout(() => {
            cmd.textContent = '';
            typeWriter(cmd, cmd.getAttribute('data-text') || cmd.textContent);
        }, index * 1000);
    });
});

// Counter animation for security stats
const counter = document.querySelector('.counter');
let count = 0;
const target = parseInt(counter.textContent);
const speed = 50;

const updateCount = () => {
    const increment = target / (1000 / speed);
    if (count < target) {
        count = Math.ceil(count + increment);
        counter.innerText = count;
        setTimeout(updateCount, speed);
    } else {
        counter.innerText = target;
    }
};

// Start counter animation when element is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateCount();
        }
    });
});

observer.observe(counter);

// Random "hacking" effect for cyber-text
const cyberText = document.querySelector('.cyber-text');
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let interval = null;

const startHackingEffect = () => {
    let iteration = 0;
    const originalText = cyberText.dataset.value || cyberText.innerText;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
        cyberText.innerText = originalText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
        
        if(iteration >= originalText.length){ 
            clearInterval(interval);
        }
        
        iteration += 1/3;
    }, 30);
}

cyberText.addEventListener('mouseover', startHackingEffect);

// Form submission with "encryption" effect
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add encryption animation
    const formData = new FormData(contactForm);
    const messageElement = document.createElement('div');
    messageElement.classList.add('encryption-message');
    messageElement.innerHTML = 'Encrypting message...';
    contactForm.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.innerHTML = 'Message encrypted and sent securely!';
        contactForm.reset();
        
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }, 1500);
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});
