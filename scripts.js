/* -------------------------
   TOGGLE POLICY DETAILS
------------------------- */
function togglePolicy(button) {
  const card = button.parentElement;
  const details = card.querySelector('.policy-details');
  if (details.style.display === 'block') {
    details.style.display = 'none';
    button.textContent = 'Learn More';
  } else {
    details.style.display = 'block';
    button.textContent = 'Show Less';
  }
}

/* -------------------------
   DYNAMIC NEWS / PRESS
------------------------- */
document.addEventListener("DOMContentLoaded", function() {
  const pressGrid = document.getElementById('press-grid');
  fetch('news.json')
    .then(response => response.json())
    .then(newsItems => {
      newsItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'press-card';
        card.innerHTML = `
          <h3>${item.title}</h3>
          <p><em>${item.date}</em></p>
          <p>${item.snippet}</p>
          <a href="${item.link}" target="_blank" class="btn-secondary">Read More</a>
        `;
        pressGrid.appendChild(card);
      });
    })
    .catch(err => console.error('Error loading news:', err));
});

/* -------------------------
   RSVP MODAL
------------------------- */
function openRSVP(title) {
  document.getElementById('modal-event-title').textContent = title;
  document.getElementById('rsvp-modal').style.display = 'block';
}

function closeRSVP() {
  document.getElementById('rsvp-modal').style.display = 'none';
}

/* Close modal when clicking outside */
window.onclick = function(event) {
  const modal = document.getElementById('rsvp-modal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* -------------------------
   RSVP FORM SUBMISSION
------------------------- */
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const feedback = document.getElementById('rsvp-feedback');
    // Here you can integrate with a real backend / CRM
    feedback.style.display = 'block';
    feedback.textContent = "Thank you! Your RSVP has been submitted.";
    rsvpForm.reset();
    setTimeout(() => {
      feedback.style.display = 'none';
      closeRSVP();
    }, 3000);
  });
}

/* -------------------------
   SIGNUP FORM FEEDBACK
------------------------- */
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const feedback = document.getElementById('signup-feedback');
    feedback.style.display = 'block';
    feedback.textContent = "Thank you! You’re now part of the campaign.";
    signupForm.reset();
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 3000);
  });
}
