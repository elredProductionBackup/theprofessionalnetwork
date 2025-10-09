import "./Pagination.scss";

const BioPagination = ({ pagesCount, activePage, setActivePage }) => {
    console.log(pagesCount)
    return (
        <div >
            <div className="award-table-pagination">
                <div onClick={() => setActivePage(prev => prev > 0 ? prev - 1 : prev)}
                    className={`award-table-prev ${activePage === 0 ? "award-table-disabled" : ""}`}>
                        <div className="award-table-page-link">Prev</div>
                </div>
                {[...Array(Number(pagesCount)).keys()]?.map(item => 
                    <div key={item} onClick={() => setActivePage(item)} className={`award-table-page-item ${activePage === item ? "award-table-active" : ""}`}>
                        <div className="award-table-page-link">{item + 1}</div>
                    </div>
                )}
                <div onClick={() => setActivePage(prev => prev <= pagesCount - 2 ? prev + 1 : prev)} 
                    className={`award-table-next ${activePage === pagesCount - 1 ? "award-table-disabled" : ""}`}>
                        <div className="award-table-page-link">Next</div>
                </div>
            </div>
        </div>
    )
}

export default BioPagination;