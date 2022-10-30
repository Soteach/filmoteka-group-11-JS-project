const ulTag = document.querySelector('.pagination');

//onSelectPage возвращает номер страницы которую нужно загрузить
export function renderPager(currentPage, totalPages, onSelectPage) {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  window.onSelectPage = onSelectPage;
  let liTag = '';
  let activLi;
  if (currentPage > 1) {
    liTag += `<li class="btn prev" onclick="element(${
      currentPage - 1
    }, totalPages)">
  
<svg class="icon icon-left"><use xlink:href="#icon-left"></use>
<symbol id="icon-left" viewBox="0 0 32 32">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M25.333 16h-18.667"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M16 25.333l-9.333-9.333 9.333-9.333"></path>
</symbol></svg>
              </li>`;
  }
  const pages = getPages(currentPage, totalPages);
  for (let i = 0; i < pages.length; i++) {
    if (pages[i] === currentPage) {
      activLi = 'active';
      liTag += `<li class="numb ${activLi}">${pages[i]}</li>`;
    } else if (pages[i] === '...') {
      liTag += `<li class="dots"><span>...</span></li>`;
    } else {
      liTag += `<li class="numb" onclick="element(${pages[i]}, totalPages)">${pages[i]}</li>`;
    }
  }
  if (currentPage < totalPages) {
    liTag += `<li class="btn next" onclick="element(${
      currentPage + 1
    }, totalPages)"><svg class="icon icon-right"><use xlink:href="#icon-right"></use>
    <symbol id="icon-right" viewBox="0 0 32 32">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M6.667 16h18.667"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M16 25.333l9.333-9.333-9.333-9.333"></path>
</symbol></svg></li>`;
  }
  ulTag.innerHTML = liTag;
}

function getPages(currentPage, totalPages) {
  let elements = [];
  const pageLimit = 5;
  const threshold = Math.ceil(pageLimit / 2);

  if (totalPages <= pageLimit + threshold) {
    addPageRange(elements, 1, totalPages);
    return elements;
  }

  if (currentPage <= threshold) {
    addPageRange(elements, 1, pageLimit);
    addEllipsis(elements);
    addPageRange(elements, totalPages, totalPages);
    return elements;
  }

  if (currentPage > threshold && currentPage <= totalPages - threshold) {
    addPageRange(elements, 1, 1);
    addEllipsis(elements);
    addPageRange(elements, currentPage - 2, currentPage + 2);
    addEllipsis(elements);
    addPageRange(elements, totalPages, totalPages);
    return elements;
  }

  if (currentPage + 1 > totalPages - threshold) {
    addPageRange(elements, 1, 1);
    addEllipsis(elements);
    addPageRange(elements, totalPages - (threshold + 1), totalPages);
    return elements;
  }
}

function addPageRange(elements, start, end) {
  for (let i = start; i <= end; i++) {
    elements.push(i);
  }
}

function addEllipsis(elements) {
  elements.push('...');
}
