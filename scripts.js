// TOGGLE POLICY DETAILS
function togglePolicy(btn){
  const details=btn.nextElementSibling;
  details.style.display = details.style.display==='block' ? 'none' : 'block';
}

// EVENTS + RSVP
const events=[
  {title:"Volunteer Rally", date:"March 15, 2026", description:"Join the grassroots movement!"},
  {title:"Town Hall Meeting", date:"March 22, 2026", description:"Share your ideas directly with Neil."}
];
const eventsGrid=document.getElementById('events-grid');
const modal=document.getElementById('rsvp-modal');
const modalTitle=document.getElementById('modal-event-title');
const rsvpForm=document.getElementById('rsvp-form');
const rsvpFeedback=document.getElementById('rsvp-feedback');
let currentEvent="";

events.forEach(event=>{
  const card=document.createElement('div'); card.className='event-card';
  card.innerHTML=`<h3>${event.title}</h3><p><strong>Date:</strong> ${event.date}</p><p>${event.description}</p><button onclick="openRSVP('${event.title}')">RSVP</button>`;
  eventsGrid.appendChild(card);
});

function openRSVP(title){ currentEvent=title; modal.style.display='flex'; modalTitle.textContent=title; }
function closeRSVP(){ modal.style.display='none'; rsvpForm.reset(); rsvpFeedback.style.display='none'; }

// RSVP FORM SUBMIT
rsvpForm.addEventListener('submit', e=>{
  e.preventDefault();
  const formData=new FormData(rsvpForm); formData.append("EVENT", currentEvent);
  fetch("YOUR_CRM_ENDPOINT",{method:"POST",body:formData,mode:"no-cors"})
    .then(()=>{ rsvpFeedback.style.display='block'; rsvpFeedback.style.color='green'; rsvpFeedback.textContent=`Thanks for RSVPing to ${currentEvent}!`; rsvpForm.reset(); })
    .catch(()=>{ rsvpFeedback.style.display='block'; rsvpFeedback.style.color='red'; rsvpFeedback.textContent='Oops! Something went wrong.'; });
});

// NEWS / PRESS
async function loadNews(){
  try{
    const res=await fetch('news.json');
    const newsItems=await res.json();
    const container=document.getElementById('press-grid');
    newsItems.forEach(item=>{
      const card=document.createElement('div'); card.className='press-card';
      card.innerHTML=`<h3>${item.title}</h3><p><strong>Date:</strong> ${item.date}</p><p>${item.snippet}</p><a href="${item.link}" target="_blank">Read More</a><div class="share-buttons"><a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(item.link)}" target="_blank">Twitter</a><a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(item.link)}" target="_blank">Facebook</a></div>`;
      container.appendChild(card);
    });
  } catch(err){ console.error('Failed to load news:',err); }
}

// SIGNUP FORM
const signupForm=document.getElementById('signup-form'); const signupFeedback=document.getElementById('signup-feedback');
signupForm.addEventListener('submit', e=>{
  e.preventDefault();
  const formData=new FormData(signupForm);
  fetch(signupForm.action,{method:'POST',body:formData,mode:'no-cors'})
    .then(()=>{ signupFeedback.style.display='block'; signupFeedback.style.color='green'; signupFeedback.textContent='Thank you! You are now signed up.'; signupForm.reset(); })
    .catch(()=>{ signupFeedback.style.display='block'; signupFeedback.style.color='red'; signupFeedback.textContent='Oops! Something went wrong. Try again.'; });
});

// ISSUE POLL
const pollForm=document.getElementById('issue-poll');
const pollFeedback=document.getElementById('poll-feedback');
pollForm.addEventListener('submit', e=>{
  e.preventDefault();
  const choice=pollForm.issue.value;
  pollFeedback.style.display='block';
  pollFeedback.style.color='green';
  pollFeedback.textContent=`Thanks! You selected "${choice}". Your input helps shape our campaign.`;
  pollForm.reset();
});

document.addEventListener('DOMContentLoaded', loadNews);
window.onclick=function(e){ if(e.target===modal) closeRSVP(); }
