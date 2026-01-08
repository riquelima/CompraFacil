// Helper to handle navigation delay for animations
// Helper to handle navigation delay for animations
window.navigate = function (url, skipAnimation = false) {
    if (skipAnimation || !document.body) {
        window.location.href = url;
        return;
    }
    const content = document.querySelector('main');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(-10px)';
        content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    } else {
        // Fallback if no main (e.g., login page might function differently, or just fade body)
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
    }

    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    // Other initialization if needed in the future
});
