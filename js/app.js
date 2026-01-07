document.addEventListener('DOMContentLoaded', () => {
    // Helper to handle navigation delay for animations
    window.navigate = function(url) {
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(-10px)';
        document.body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }
});
