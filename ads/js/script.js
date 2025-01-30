// Mobile menu toggle functionality
document.getElementById('mobile-menu').addEventListener('click', function () {
    document.querySelector('nav').classList.toggle('active');
});
// Close mobile menu when any navigation link is clicked
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove the active class to close the menu
        document.querySelector('nav').classList.remove('active');
    });
});



