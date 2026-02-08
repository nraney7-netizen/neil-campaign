// Timeline animation
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineLine = document.querySelector(".timeline-line");

function animateTimeline(){
  const triggerBottom = window.innerHeight * 0.85;
  let maxIndexVisible = -1;
  timelineItems.forEach((item,index)=>{
    const top = item.getBoundingClientRect().top;
    if(top<triggerBottom && !item.classList.contains("show")){
      setTimeout(()=>{ item.classList.add("show"); item.classList.remove("hidden"); }, index*250);
      maxIndexVisible = index;
    }
  });
  if(maxIndexVisible>=0){
    const totalHeight = timelineItems[maxIndexVisible].offsetTop+18;
    timelineLine.style.height = totalHeight+"px";
  }
}

// Cards animation
const cards = document.querySelectorAll(".cards-grid .card");
function animateCards(){
  const triggerBottom = window.innerHeight*0.85;
  cards.forEach((card,index)=>{
    const top = card.getBoundingClientRect().top;
    if(top<triggerBottom && !card.classList.contains("show")){
      setTimeout(()=>{ card.classList.add("show"); card.classList.remove("hidden"); }, index*200);
    }
  });
}

window.addEventListener("scroll",()=>{ animateTimeline(); animateCards(); });
window.addEventListener("load",()=>{ animateTimeline(); animateCards(); });

// Floating CTA scroll hide/show
let lastScroll = window.scrollY;
const floatingCTA = document.getElementById('floating-cta');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if(currentScroll > lastScroll + 50){ 
    floatingCTA.style.transform = 'translateY(100px)';
    floatingCTA.style.opacity = '0';
  } else if(currentScroll < lastScroll - 50){
    floatingCTA.style.transform = 'translateY(0)';
    floatingCTA.style.opacity = '1';
  }
  lastScroll = currentScroll;
});