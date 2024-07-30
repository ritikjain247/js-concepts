
// Event delegation

const container = document.querySelector('#container');
const categories = document.querySelector('#categories');

container.addEventListener('click', function (e) {
  // const categories = Array.from(this.children).find(child => child.id === 'categories');

  if (e.target.tagName === 'LI') {
    window.location.href = "/" + e.target.id;
  }
  if (e.target.tagName === 'SPAN' && e.target.id === 'create-new') {
    let name = prompt('Enter the category name:', 'New Category');
    if (name !== null && name.trim() !== '') {
      const newCategory = document.createElement('li');
      newCategory.id = name;
      newCategory.innerText = name;

      newCategory.innerHTML += '<span class="delete">X</span>';

      categories.appendChild(newCategory);
    }
  }
  if (e.target.tagName === 'SPAN' && e.target.classList.contains('delete')) {
    categories.removeChild(e.target.parentElement);
  }
}, false);

