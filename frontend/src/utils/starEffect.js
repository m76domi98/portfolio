export function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);
  
    const numStars = window.innerWidth > 768 ? 150 : 75;
  
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
  
      // Random size between 1-3px
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
  
      // Random position
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
  
      // Random animation delay
      star.style.animationDelay = `${Math.random() * 5}s`;
  
      starsContainer.appendChild(star);
    }
  }
  