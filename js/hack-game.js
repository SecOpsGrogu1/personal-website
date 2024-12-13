document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-hack');
    const hackSimulation = document.getElementById('hack-simulation');
    const hackProgress = document.getElementById('hack-progress');
    const hackAlerts = document.getElementById('hack-alerts');
    const hackResult = document.getElementById('hack-result');
    const urlBar = document.querySelector('.url-bar');
    const lockIcon = document.querySelector('.lock-icon');

    const hackingSteps = [
        { text: 'Scanning for XSS vulnerabilities...', delay: 1000 },
        { text: 'Attempting SQL injection...', delay: 1200 },
        { text: 'Bypassing CSRF protection...', delay: 800 },
        { text: 'Intercepting cookies...', delay: 1500 },
        { text: 'Exploiting zero-day vulnerability...', delay: 1000 },
        { text: 'Establishing backdoor connection...', delay: 900 },
        { text: 'Accessing admin panel...', delay: 1200 },
        { text: 'Downloading sensitive data...', delay: 1000 }
    ];

    function createAlert(message, type = 'error') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <div class="alert-icon">⚠️</div>
            <div class="alert-message">${message}</div>
        `;
        return alert;
    }

    function updateUrlBar(status) {
        if (status === 'insecure') {
            urlBar.classList.add('insecure');
            lockIcon.textContent = '🔓';
            urlBar.querySelector('.protocol').textContent = 'http://';
        } else {
            urlBar.classList.remove('insecure');
            lockIcon.textContent = '🔒';
            urlBar.querySelector('.protocol').textContent = 'https://';
        }
    }

    async function simulateHack() {
        hackSimulation.style.display = 'block';
        startButton.style.display = 'none';

        // Simulate SSL strip
        setTimeout(() => {
            updateUrlBar('insecure');
            hackAlerts.appendChild(createAlert('SSL Certificate Invalid'));
        }, 2000);

        for (const step of hackingSteps) {
            const progressStep = document.createElement('div');
            progressStep.className = 'progress-step';
            progressStep.innerHTML = `
                <div class="loader"></div>
                <span class="status">${step.text}</span>
            `;
            hackProgress.appendChild(progressStep);

            await new Promise(resolve => setTimeout(resolve, step.delay));
        }

        // Show breach alerts
        const alerts = [
            'Firewall Breach Detected',
            'Multiple Failed Login Attempts',
            'Unusual Data Transfer Detected',
            'Security Protocol Override'
        ];

        for (const alert of alerts) {
            hackAlerts.appendChild(createAlert(alert));
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Final breach
        setTimeout(() => {
            document.body.classList.add('hacked');
            hackResult.style.display = 'block';
            startMatrixRain();
        }, 1500);
    }

    function startMatrixRain() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        document.body.appendChild(canvas);

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const drops = [];
        const fontSize = 14;
        const columns = canvas.width / fontSize;

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function draw() {
            context.fillStyle = 'rgba(0, 0, 0, 0.05)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#0F0';
            context.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                context.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 33);
    }

    startButton.addEventListener('click', () => {
        if (confirm('⚠️ Warning: Suspicious activity detected. Proceed anyway?')) {
            simulateHack();
        }
    });
});
