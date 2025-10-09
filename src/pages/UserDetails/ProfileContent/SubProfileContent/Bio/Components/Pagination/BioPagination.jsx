import React, { useState } from 'react'
import BioPagination from './Pagination'

const BioPaginations = ({ activePage , setActivePage, totalAwardsCount, totalEducationDetailsCount, totalCompanyDetailsCount, 
    itemsPerPage, showAwards }) => {

    const totalCount = showAwards === 'awards' ? totalAwardsCount : showAwards === 'education'?  
    totalEducationDetailsCount : totalCompanyDetailsCount;

    const totalPages = Math.ceil(totalCount / itemsPerPage);
    return (
        <div className='award-pagination'>
            <span className='pagination-title'>
                Showing {totalCount > 0 ? ((activePage + 1) * itemsPerPage) - itemsPerPage + 1 : 0} to {(activePage + 1) * itemsPerPage > totalCount ? totalCount : (activePage + 1) * itemsPerPage} Out of {totalCount} entries</span>
                {totalCount > itemsPerPage ? <BioPagination pagesCount={totalPages} activePage={activePage} setActivePage={setActivePage} /> : null}
        </div>
    )
}
export default BioPaginations