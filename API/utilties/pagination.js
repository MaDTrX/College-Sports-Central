export const paginator = (data, page, rows) => {
        let pageNum = Number(page) + 1
        let rowsNum = Number(rows) || 10
        let offset = (pageNum - 1) * rowsNum,
      
        paginatedItems = data.slice(offset).slice(0, rowsNum),
        total_pages = Math.ceil(data.length / rowsNum);
        return {
        page: pageNum,
        rows: rowsNum,
        prePage: pageNum - 1 ? pageNum - 1 : null,
        nextPage: (total_pages > pageNum) ? pageNum + 1 : null,
        total: data.length,
        totalPages: total_pages,
        data: paginatedItems
        };
      }