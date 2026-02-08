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
          <div class="share-buttons">
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title + ' ' + item.link)}" target="_blank">Tweet</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(item.link)}" target="_blank">Share</a>
          </div>
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
window.onclick = function(event) {
  const modal = document.getElementById('rsvp-modal');
  if (event.target == modal) modal.style.display = "none";
}

const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const feedback = document.getElementById('rsvp-feedback');
    feedback.style.display = 'block';
    feedback.textContent = "Thank you! Your RSVP has been submitted.";
    rsvpForm.reset();
    setTimeout(() => { feedback.style.display = 'none'; closeRSVP(); }, 3000);
  });
}

/* -------------------------
   SIGNUP FORM
------------------------- */
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const feedback = document.getElementById('signup-feedback');
    const formData = new FormData(signupForm);
    fetch(signupForm.action, { method: 'POST', body: formData })
      .then(response => {
        feedback.style.display = 'block';
        if(response.ok){
          feedback.textContent = "Thank you! You’re now part of the campaign.";
          signupForm.reset();
        } else {
          feedback.textContent = "Oops! Something went wrong. Try again.";
        }
      })
      .catch(err => {
        console.error(err);
        feedback.style.display = 'block';
        feedback.textContent = "Error submitting form. Please try again.";
      });
    setTimeout(() => { feedback.style.display = 'none'; }, 5000);
  });
}
