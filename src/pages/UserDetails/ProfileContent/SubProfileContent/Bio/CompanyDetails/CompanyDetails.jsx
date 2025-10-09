import './CompanyDetails.scss'
import CompanyCard from './CompanyCard/CompanyCard';
import BioPaginations from '../Components/Pagination/BioPagination';
import useFetch from '../BioDetails/apiServices/useFetch';
import { API } from '../../../../../../helpers/apiEndpoints';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const CompanyDetails = ({ setCompanyCount }) => {
    const params = useParams()
    const { userCode } = params
    const { data: companyData, count, activePage, setActivePage, itemsPerPage, loading: companyDetailsLoader } = useFetch(API.USER_COMPANY_DETAILS, userCode, 'company');
    useEffect(() => {
        setCompanyCount(count);
    }, [count]);

    return(
        <div className='companyContainer'>
        {companyDetailsLoader ? <div className="company-details-spinner-container">
                    <Spinner animation="border" variant="danger" className="company-details-spinner-loader"/>
                </div> : 
                companyData && companyData.length > 0 ?
                companyData?.map((item, id) => (
                        <CompanyCard data={item} key={id}/>
                    ))
                    : <div className="no-company-data-found">No company details added yet</div>
            }
        {count > 0 ? <BioPaginations activePage={activePage} setActivePage={setActivePage} totalCompanyDetailsCount={count} 
            itemsPerPage={itemsPerPage} showAwards="company"/> : null}
    </div> 
    )
}
export default CompanyDetails;
