// Helper to handle navigation delay for animations
window.navigate = function(url) {
    if (!document.body) {
        window.location.href = url;
        return;
    }
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(-10px)';
    document.body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    // Other initialization if needed in the future
});
