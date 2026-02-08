/* Auto-trending and heatmap glow for Threads embeds */
function updateTrending() {
  const wrappers = document.querySelectorAll('.iframe-wrapper');

  fetch('YOUR_GOOGLE_SHEET_WEB_APP_URL')
    .then(res => res.json())
    .then(data => {
      const posts = data.posts; // each post: { iframeIndex, score }
      const topCount = data.topCount || 2;
      const sorted = posts.sort((a,b) => b.score - a.score).slice(0, topCount);
      const maxScore = Math.max(...posts.map(p => p.score));

      wrappers.forEach((wrapper,index) => {
        const iframe = wrapper.querySelector('iframe');
        
        iframe.addEventListener('load', () => {
          iframe.classList.add('loaded');
          iframe.classList.add('new-post');
          setTimeout(()=>iframe.classList.remove('new-post'), 1200);

          const postData = posts.find(p => p.iframeIndex === index);
          if(postData && sorted.some(p => p.iframeIndex === index)) {
            const intensity = postData.score / maxScore;
            wrapper.style.boxShadow = `0 0 ${15 + 30*intensity}px ${2 + 6*intensity}px rgba(255,0,0,${0.5 + 0.4*intensity})`;
            // remove glow after 10s
            setTimeout(()=> wrapper.style.boxShadow = 'none', 10000);
          } else {
            wrapper.style.boxShadow = 'none';
          }
        });
      });
    })
    .catch(err => console.error('Failed to load trending:', err));
}

// Run on page load and every 60 seconds
window.addEventListener('load', () => {
  updateTrending();
  setInterval(updateTrending, 60000);
});