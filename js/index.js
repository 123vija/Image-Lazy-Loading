// require('intersection-observer')

const options = {
    lazyParentClass: '.lazy-load-item',
    lazyItemClass: 'img' };
  
  
  const lazyLoadParents = document.querySelectorAll(options.lazyParentClass);
  
  const lazyLoad = new IntersectionObserver(entries => {
    entries.map(entry => {
      // check if observed entry is intersecting
      if (!entry.isIntersecting) return false;
  
      // target = intersected element
      const img = entry.target.querySelector(options.lazyItemClass);
  
      if (img) {
        if (img.dataset.srcset) {
          // move data-srcset to srcset
          img.srcset = img.dataset.srcset;
          img.removeAttribute('data-srcset');
        }
        if (img.dataset.src) {
          // move data-src to src
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        // wait for image to load and addClass to fade in
        img.onload = () => img.classList.add('loaded');
      }
    });
  });
  
  lazyLoadParents.forEach(item => {
    // add items to IntersectionObserver
    lazyLoad.observe(item);
  });