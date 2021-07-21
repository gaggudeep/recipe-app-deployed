import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      handler(+btn.dataset.goto);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // one page and there are other
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupPageButton(curPage + 1);
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupPageButton(curPage - 1, true);
    }

    // other pages
    if (curPage < numPages) {
      return this._generateMarkupPageButton(curPage + 1).concat(
        this._generateMarkupPageButton(curPage - 1, true)
      );
    }

    // only 1 page
    return '';
  }

  _generateMarkupPageButton(pageNum, isPrev) {
    return `
        <button data-goto="${pageNum}" class="btn--inline pagination__btn--${
      isPrev ? 'prev' : 'next'
    }">
            ${!isPrev ? `<span>Page ${pageNum}</span>` : ''}
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-${
      isPrev ? 'left' : 'right'
    }"></use>
            </svg>
            ${isPrev ? `<span>Page ${pageNum}</span>` : ''}
        </button>
    `;
  }
}

export default new PaginationView();
