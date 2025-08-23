// Contact form handler - Sends form data to AWS Lambda
const LAMBDA_URL = 'https://5srurdxepxpvlq4ez7nsnsvqj40dtfld.lambda-url.ca-central-1.on.aws/'; // Replace with your Function URL

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form-container');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = form.querySelector('.contact-submit-btn');
        const messageDiv = document.getElementById('form-message');

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        messageDiv.style.display = 'none';

        // Get form data
        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        try {
          const response = await fetch(LAMBDA_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });

          console.log('Response status:', response.status);

          if (response.ok) {
            showMessage('Message sent successfully! Thank you for reaching out.', 'success');
            form.reset();
          } else {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            showMessage('Failed to send message. Please try again.', 'error');
          }
        } catch (error) {
          console.error('Fetch error:', error);
          showMessage('Network error. Please check your connection and try again.', 'error');
        }

        // Reset button
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    });
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('form-message');
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';

    // Auto-hide after 10 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 10000);
}
