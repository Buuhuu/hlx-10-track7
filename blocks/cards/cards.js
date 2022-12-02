import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

function copyAttributes(from, to, attributes = ['itemscope', 'itemid', 'itemtype', 'itemprop', 'itemfilter']) {
  attributes.forEach((attribute) => {
    const value = from.getAttribute(attribute);
    if (value || value === "") {
      to.setAttribute(attribute, value);
    }
  });
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    copyAttributes(row, li);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => {
    const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    copyAttributes(img, optimizedPicture.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPicture);
  });
  block.textContent = '';
  block.append(ul);
}
