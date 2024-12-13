document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formEntries = Object.fromEntries(formData);
    
    // Verify reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        document.getElementById('form-status').innerHTML = 'Please complete the reCAPTCHA';
        return;
    }

    // Add timestamp to prevent caching
    const endpoint = `https://formspree.io/f/${btoa('xovqzoep').split('').reverse().join('')}?t=${Date.now()}`;
    
    // Rate limiting
    const lastSubmission = localStorage.getItem('lastFormSubmission');
    const now = Date.now();
    if (lastSubmission && now - parseInt(lastSubmission) < 60000) { // 1 minute cooldown
        document.getElementById('form-status').innerHTML = 'Please wait a moment before submitting again';
        return;
    }

    // Send form data
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(formEntries),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            localStorage.setItem('lastFormSubmission', now.toString());
            window.location.href = '/thank-you.html';
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        document.getElementById('form-status').innerHTML = 'There was a problem sending your message. Please try again.';
        console.error('Error:', error);
    });
});
