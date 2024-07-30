
// Capturing - top down (Trickling down)
// Bubbling - bottom up (bubble up)

document.querySelector('#grandparent').addEventListener('click', (e) => {
  console.log('Grandparent clicked');
  // e.stopPropagation();
}, false); // bubbling

document.querySelector('#parent').addEventListener('click', (e) => {
  console.log('Parent clicked');
  // e.stopPropagation();
}, true); // capturing

document.querySelector('#child').addEventListener('click', (e) => {
  e.stopPropagation();
  // e.stopImmediatePropagation();
  console.log('Child clicked');
}, false ); // last child will be called in both cycles 

