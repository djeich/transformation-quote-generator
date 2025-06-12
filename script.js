const quotes = {
  career: [
    '"Success is following your own path, not the one laid out for you." - Roger Osorio',
    '"In this era of mass layoffs, burnout, and global shift, we want our work to matter." - Roger Osorio',
    '"The only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle." - Steve Jobs',
    '"Your life does not get better by chance, it gets better by change." - Jim Rohn',
    '"The biggest risk is not taking any risk. In a world that\'s changing quickly, the only strategy that is guaranteed to fail is not taking risks." - Mark Zuckerberg',
    '"Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work." - Steve Jobs',
    '"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt',
    '"Don\'t be afraid to give up the good to go for the great." - John D. Rockefeller',
    '"The harder you work for something, the greater you\'ll feel when you achieve it." - Roger Osorio',
    '"Your career is a journey, not a destination. Enjoy the ride and learn from every step." - Roger Osorio'
  ],
  mindset: [
    '"The greatest discovery of all time is that a person can change his future by merely changing his attitude." - Oprah Winfrey',
    '"When you change the way you look at things, the things you look at change." - Wayne Dyer',
    '"Change is inevitable. Growth is optional." - John C. Maxwell',
    '"The first step toward change is awareness. The second step is acceptance." - Nathaniel Branden',
    '"Whether you think you can or you think you can\'t, you\'re right." - Henry Ford',
    '"The mind is everything. What you think you become." - Buddha',
    '"Your mindset is the lens through which you view the world. Change the lens, change your world." - Roger Osorio',
    '"The only limits in your life are those you create in your mind." - Roger Osorio',
    '"Believe you can and you\'re halfway there." - Theodore Roosevelt',
    '"The quality of your life is a direct reflection of the quality of your thoughts." - Tony Robbins'
  ],
  resilience: [
    '"We all have a story. The key is turning setbacks into life-changing opportunities." - Roger Osorio',
    '"When we are no longer able to change a situation, we are challenged to change ourselves." - Viktor E. Frankl',
    '"Sometimes good things fall apart so better things can fall together." - Marilyn Monroe',
    '"The secret of change is to focus all of your energy, not on fighting the old, but on building the new." - Socrates',
    '"Rock bottom became the solid foundation on which I rebuilt my life." - J.K. Rowling',
    '"The human capacity for burden is like bamboo – far more flexible than you\'d ever believe at first glance." - Jodi Picoult',
    '"Resilience is knowing that you are the only one that has the power and the responsibility to pick yourself up." - Mary Holloway',
    '"The strongest people are not those who show strength in front of us but those who win battles we know nothing about." - Roger Osorio',
    '"When everything seems to be going against you, remember that the airplane takes off against the wind, not with it." - Henry Ford',
    '"The greatest glory in living lies not in never falling, but in rising every time we fall." - Nelson Mandela'
  ],
  community: [
    '"We don\'t have to reinvent ourselves alone. Get support and go farther and faster with our global community." - Roger Osorio',
    '"The journey of a thousand miles begins with a single step." - Lao Tzu',
    '"Life is a series of natural and spontaneous changes. Don\'t resist them; that only creates sorrow." - Lao Tzu',
    '"Alone we can do so little; together we can do so much." - Helen Keller',
    '"The power of community creates health." - Tom Rath',
    '"Community is not just about being together, it\'s about doing together." - Roger Osorio',
    '"Surround yourself with people who believe in your dreams." - Roger Osorio',
    '"A community is like a ship; everyone ought to be prepared to take the helm." - Henrik Ibsen',
    '"The strength of the team is each individual member. The strength of each member is the team." - Phil Jackson',
    '"We rise by lifting others." - Robert Ingersoll'
  ],
  transformation: [
    '"Starting over just got easy. Your roadmap to becoming who you really are and building your best life." - Roger Osorio',
    '"The only way to make sense out of change is to plunge into it, move with it, and join the dance." - Alan Watts',
    '"Change is hard at first, messy in the middle and gorgeous at the end." - Robin Sharma',
    '"Transformation is a process, and as life happens there are tons of ups and downs. It\'s a journey of discovery." - Rachel Brathen',
    '"The only person you are destined to become is the person you decide to be." - Ralph Waldo Emerson',
    '"Transformation isn\'t about adding something to yourself, it\'s about removing the layers that hide your true self." - Roger Osorio',
    '"Every moment is a fresh beginning." - T.S. Eliot',
    '"You must be the change you wish to see in the world." - Mahatma Gandhi',
    '"The caterpillar does all the work, but the butterfly gets all the publicity." - George Carlin',
    '"Transformation is not a future event, it\'s a present activity." - Jillian Michaels'
  ]
};

const images = [
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", // Sunrise over mountains
  "https://images.unsplash.com/photo-1501854140801-50d01698950b", // Sunset over ocean
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", // Forest path
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e", // Mountain landscape
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // Beach sunset
  "https://images.unsplash.com/photo-1470770903676-69b98201ea1c", // Mountain lake
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d", // Forest stream
  "https://images.unsplash.com/photo-1472396961693-142e6e269027", // Mountain peaks
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e", // Forest lake
  "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f"  // Mountain valley
];

let isGenerating = false;
let nextImage = null;
let lastQuote = null;
let currentCategory = 'all';

// Get all quotes as a flat array
function getAllQuotes() {
  return Object.values(quotes).flat();
}

// Get quotes for current category
function getCurrentQuotes() {
  return currentCategory === 'all' ? getAllQuotes() : quotes[currentCategory];
}

// Preload the next image
function preloadNextImage() {
  const img = new Image();
  const randomImage = images[Math.floor(Math.random() * images.length)];
  img.src = randomImage;
  return new Promise((resolve) => {
    img.onload = () => {
      nextImage = randomImage;
      resolve();
    };
    img.onerror = () => {
      // If image fails to load, resolve anyway but with a default image
      nextImage = images[0];
      resolve();
    };
  });
}

// Initialize by preloading first image
preloadNextImage();

function shareQuote() {
  const quote = document.getElementById("quote").textContent;
  if (navigator.share) {
    navigator.share({
      title: 'Inspirational Quote',
      text: quote,
      url: window.location.href
    }).catch(console.error);
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(quote)
      .then(() => {
        const shareBtn = document.getElementById("shareBtn");
        const originalText = shareBtn.textContent;
        shareBtn.textContent = "Copied!";
        setTimeout(() => {
          shareBtn.textContent = originalText;
        }, 2000);
      })
      .catch(console.error);
  }
}

function setCategory(category) {
  currentCategory = category;
  lastQuote = null; // Reset last quote when changing categories
  generateQuote();
  
  // Update active state of category buttons
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
}

async function generateQuote() {
  if (isGenerating) return; // Prevent rapid clicking
  isGenerating = true;
  
  const quoteElement = document.getElementById("quote");
  const button = document.querySelector("button");
  
  // Disable button and show loading state
  button.disabled = true;
  button.classList.add("loading");

  // Step 1: Fade out
  quoteElement.style.opacity = 0;

  // Step 2: Wait for fade out and prepare next content
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Get new quote and use preloaded image
  const currentQuotes = getCurrentQuotes();
  let quote;
  do {
    quote = currentQuotes[Math.floor(Math.random() * currentQuotes.length)];
  } while (quote === lastQuote && currentQuotes.length > 1); // Keep trying until we get a different quote
  
  lastQuote = quote; // Store the current quote
  const currentImage = nextImage || images[0];
  
  // Start preloading next image for future use
  preloadNextImage();

  // Step 3: Change text and background
  quoteElement.textContent = quote;
  document.body.style.backgroundImage = `url(${currentImage})`;

  // Step 4: Fade back in
  quoteElement.style.opacity = 1;
  
  // Re-enable button and remove loading state
  setTimeout(() => {
    button.disabled = false;
    button.classList.remove("loading");
    isGenerating = false;
  }, 500);
}

// Add keyboard accessibility
document.addEventListener('keydown', (e) => {
  if ((e.code === 'Space' || e.code === 'Enter') && !isGenerating) {
    e.preventDefault();
    generateQuote();
  }
});