// Toggle policy
function togglePolicy(btn){
  const details = btn.nextElementSibling;
  details.style.display = details.style.display === 'block' ? 'none' : 'block';
}

// RSVP System
const events = [
  { title:"Volunteer Rally", date:"March 15, 2026", description:"Join the grassroots movement!" },
  { title:"Town Hall Meeting", date:"March 22, 2026", description:"Share your ideas directly with Neil." }
];
const eventsGrid = document.getElementById('events-grid');
const modal = document.getElementById('rsvp-modal');
const modalTitle = document.getElementById('modal-event-title');
const rsvpForm = document.getElementById('rsvp-form');
const rsvpFeedback = document.getElementById('rsvp-feedback');
let currentEvent = "";

// Render events
events.forEach(event=>{
  const card=document.createElement('div'); card.className='event-card';
  card.innerHTML=`<h3>${event.title}</h3><p><strong>Date:</strong> ${event.date}</p><p>${event.description}</p><button onclick="openRSVP('${event.title}')">RSVP</button>`;
  eventsGrid.appendChild(card);
});

function openRSVP(title){ currentEvent=title; modal.style.display='flex'; modalTitle.textContent=title; }
function closeRSVP(){ modal.style.display='none'; rsvpForm.reset(); rsvpFeedback.style.display='none'; }

rsvpForm.addEventListener('submit', function(e){
  e.preventDefault();
  const formData = new FormData(rsvpForm);
  formData.append("EVENT", currentEvent);
  fetch("YOUR_CRM_ENDPOINT", { method:"POST", body:formData, mode:"no-cors" })
    .then(()=>{ rsvpFeedback.style.display='block'; rsvpFeedback.style.color='green'; rsvpFeedback.textContent=`Thanks for RSVPing to ${currentEvent}!`; rsvpForm.reset(); })
    .catch(()=>{ rsvpFeedback.style.display='block'; rsvpFeedback.style.color='red'; rsvpFeedback.textContent='Oops! Something went wrong. Try again.'; });
}

);

// News
async function loadNews(){
  try{
    const res = await fetch('news.json');
    const newsItems = await res.json();
    const container = document.getElementById('press-grid');
    newsItems.forEach(item=>{
      const card=document.createElement('div'); card.className='press-card';
      card.innerHTML=`<h3>${item.title}</h3><p><strong>Date:</strong> ${item.date}</p><p>${item.snippet}</p><a href="${item.link}" target="_blank">Read More</a><div class="share-buttons"><a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(item.link)}" target="_blank">Twitter</a><a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(item.link)}" target="_blank">Facebook</a></div>`;
      container.appendChild(card);
    });
  } catch(err){ console.error('Failed to load news:', err); }
}

// Signup
const form = document.getElementById('signup-form'); const feedback=document.getElementById('signup-feedback');
form.addEventListener('submit', e=>{
  e.preventDefault();
  const formData=new FormData(form);
  fetch(form.action,{ method:'POST', body:formData, mode:'no-cors' })
    .then(()=>{ feedback.style.display='block'; feedback.style.color='green'; feedback.textContent='Thank you! You are now signed up.'; form.reset(); })
    .catch(()=>{ feedback.style.display='block'; feedback.style.color='red'; feedback.textContent='Oops! Something went wrong. Try again.'; });
});

document.addEventListener('DOMContentLoaded', loadNews);
window.onclick=function(e){ if(e.target===modal) closeRSVP(); }
