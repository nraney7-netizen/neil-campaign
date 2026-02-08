// Highlight top 2 trending Threads posts
function highlightTopPosts(posts) {
  const wrappers = document.querySelectorAll('.iframe-wrapper');
  const topPosts = posts.sort((a,b)=>b.score-a.score).slice(0,2);
  const maxScore = Math.max(...posts.map(p=>p.score));

  wrappers.forEach(wrapper=>{
    wrapper.classList.remove('trending');
    wrapper.style.boxShadow='none';
  });

  topPosts.forEach(post=>{
    const wrapper = document.querySelector(`.iframe-wrapper[data-index='${post.iframeIndex}']`);
    if(wrapper){
      wrapper.classList.add('trending');
      const intensity = post.score/maxScore;
      wrapper.style.boxShadow=`0 0 ${15+30*intensity}px ${2+6*intensity}px rgba(255,0,0,${0.5+0.4*intensity})`;
    }
  });
}

// Example usage:
// highlightTopPosts([{iframeIndex:0, score:50},{iframeIndex:1, score:35},{iframeIndex:2, score:20}]);