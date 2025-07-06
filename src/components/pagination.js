import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    // #2.3 — подготовить шаблон кнопки для страницы и очистить контейнер
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();

    return (data, state, action) => {
        // #2.1 — посчитать количество страниц, объявить переменные и константы
        const rowsPerPage = state.rowsPerPage;
        const pageCount = Math.ceil(data.length / rowsPerPage);
        let page = state.page;

        // #2.6 — обработать действия
        if (action) switch(action.name) {
            case 'prev': page = Math.max(1, page - 1); break;
            case 'next': page = Math.min(pageCount, page + 1); break;
            case 'first': page = 1; break;
            case 'last': page = pageCount; break;
        }

        // #2.4 — получить список видимых страниц и вывести их
        const visiblePages = getPages(page, pageCount, 5);
        pages.replaceChildren(...visiblePages.map(pageNumber => {
            const el = pageTemplate.cloneNode(true);
            return createPage(el, pageNumber, pageNumber === page);
        })) 

        // #2.5 — обновить статус пагинации
        fromRow.textContent = (page - 1) * rowsPerPage + 1;//(page - 1) * rowsPerPage
        toRow.textContent = Math.min((page * rowsPerPage), data.length);//(page + 1) * rowsPerPage
        totalRows.textContent = data.length;

        // #2.2 — посчитать сколько строк нужно пропустить и получить срез данных
        const skip = (page - 1) * rowsPerPage;
        return data.slice(skip, skip + rowsPerPage);
    }
}