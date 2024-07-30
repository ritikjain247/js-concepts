

// HTML Binding

const container = document.querySelector('#container');
const categories = document.querySelector('#categories');

class CategoriesBinding {
  constructor(element) {
    this.categoriesList = element;
  }

  static createCategoryItem(category) {
    const newCategory = document.createElement('li');
    newCategory.innerText = category;
    newCategory.id = category;
    newCategory.innerHTML += '<span class="delete">X</span>';
    return newCategory;
  }

  addCategory(category) {
    this.categoriesList.appendChild(CategoriesBinding.createCategoryItem(category));
  }

  deleteCategory(elementToRemove) {
    // const elementToRemove = document.querySelector(`#${name}`);
    this.categoriesList.removeChild(elementToRemove);
  }
}

const categoriesBinding = new CategoriesBinding(categories);

container.addEventListener('click', function (e) {
  // const categories = Array.from(this.children).find(child => child.id === 'categories');

  if (e.target.tagName === 'LI') {
    window.location.href = "/" + e.target.id;
  }
  if (e.target.tagName === 'SPAN' && e.target.id === 'create-new') {
    let name = prompt('Enter the category name:', 'New Category');
    if (name !== null && name.trim() !== '') {
      categoriesBinding.addCategory(name);
    }
  }
  if (e.target.tagName === 'SPAN' && e.target.classList.contains('delete')) {
    categoriesBinding.deleteCategory(e.target.parentElement);
  }
}, false);
