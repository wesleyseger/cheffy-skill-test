
export default function animate(animation, classes) {
  const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add(animation);
      }
    });
  });

  classes.map((name) => {
    observer.observe(document.querySelector(`.${name}`));
  })
}
