
    const cards = document.querySelectorAll('.game-card');
    let isDragging = false;
    let startX;
    let scrollLeft;

    cards.forEach(card => {
        card.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - card.offsetLeft;
            scrollLeft = card.scrollLeft;
            card.style.cursor = 'grabbing'; // Change cursor to grabbing
        });

        card.addEventListener('mouseleave', () => {
            isDragging = false;
            card.style.cursor = 'grab'; // Reset cursor
        });

        card.addEventListener('mouseup', () => {
            isDragging = false;
            card.style.cursor = 'grab'; // Reset cursor
        });

        card.addEventListener('mousemove', (e) => {
            if (!isDragging) return; // Stop the fn from running
            e.preventDefault();
            const x = e.pageX - card.offsetLeft;
            const walk = (x - startX); // Calculate how far the mouse has moved
            card.scrollLeft = scrollLeft - walk; // Scroll the card
        });
    });
