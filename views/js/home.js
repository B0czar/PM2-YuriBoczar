// Home page initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('shadow');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('shadow');
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
            }, 150);
        });
    });
}); 