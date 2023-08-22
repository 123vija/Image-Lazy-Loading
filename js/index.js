/** First we get all the non-loaded image elements **/
const lazyImages = document.querySelectorAll(".lazy-load");
/** Then we set up a intersection observer watching over those images and whenever any of those becomes visible on the view then replace the placeholder image with actual one, remove the non-loaded class and then unobserve for that element **/
const lazyImageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy-load");
            lazyImageObserver.unobserve(lazyImage);
        }
    });
});
/** Now observe all the non-loaded images using the observer we have setup above **/
lazyImages.forEach(lazyImage => {
    lazyImageObserver.observe(lazyImage);
});