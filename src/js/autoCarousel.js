function setStyles(element, styles) {
  Object.entries(styles).forEach(([key, val]) => {
    element.style[key] = val;
  });
}

const UL_STYLES = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '200%',
  display: 'flex',
  height: '100%',
  listStyle: 'none',
};

const WRAPPER_STYLES = {
  overflow: 'hidden',
  position: 'relative',
};

function attrInt(element, attr) {
  return parseInt(element.getAttribute(attr), 10);
}

function autoCarousel(wrapper, period, slideDuration, itemsPerView) {
  function removeFirstItems(n) {
    Array.from(ul.children)
      .slice(0, n)
      .forEach(child => child.parentElement.removeChild(child));
    setStyles(ul, { transition: 'left 0s ease', left: '0' });
  }
  function addChild() {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.innerText = textContents[currentIdx++ % textContents.length];
    li.appendChild(p);
    ul.appendChild(li);
    li.style.width = liWidth;
  }
  function addChildren(n) {
    let count = 0;
    while (count++ < n) {
      addChild(ul);
    }
  }
  function slide() {
    addChildren(itemsPerView, ul);
    ul.style.transition = `left ` + String(slideDuration / 1000) + 's ease';
    setTimeout(function () {
      removeFirstItems(itemsPerView, ul);
    }, slideDuration);
    ul.style.left = '-100%';
  }
  function applyStyles() {
    setStyles(wrapper, WRAPPER_STYLES);
    setStyles(
      ul,
      Object.assign(UL_STYLES, {
        transition: `left ` + String(slideDuration / 1000) + 's ease',
      }),
    );
    listItems.forEach(function (listItem) {
      setStyles(listItem, { width: liWidth });
    });
  }

  let currentIdx = itemsPerView;
  const ul = wrapper.querySelector('ul');
  const listItems = Array.from(ul.children);
  const liWidth = (100 / (itemsPerView * 2)).toFixed(3) + '%';
  applyStyles();
  const textContents = listItems.map(function (li) {
    return li.textContent;
  });
  listItems.slice(itemsPerView).forEach(child => child.parentElement.removeChild(child));
  setInterval(slide, period);
}
function fitItems(wrapper) {
  const wrapperWidth = parseInt(getComputedStyle(wrapper).width, 10);
  const minItemWidth = attrInt(wrapper, 'data-min-item-width');
  const maxItemsPerView = attrInt(wrapper, 'data-items-per-view');
  return Math.min(Math.floor(wrapperWidth / minItemWidth), maxItemsPerView);
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.autocarousel');

  const period = attrInt(element, 'data-period');
  const slideDuration = attrInt(element, 'data-slide-duration');
  autoCarousel(element, period, slideDuration, fitItems(element));
});
