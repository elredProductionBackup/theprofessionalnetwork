import './EducationDetails.scss'
import EducationCard from './EducationCard/EducationCard';
import BioPaginations from '../Components/Pagination/BioPagination';
import useFetch from '../BioDetails/apiServices/useFetch';
import { API } from '../../../../../../helpers/apiEndpoints';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const EducationDetails = ({ setEducationCount }) => {
    const params = useParams()
    const { userCode } = params
    const { data: educationData, count: totalEducationDetailsCount, activePage, setActivePage, itemsPerPage, loading: educationDetailsLoader } = useFetch(API.USER_EDUCATION_DETAILS, userCode, 'education');
    useEffect(() => {
        setEducationCount(totalEducationDetailsCount);
    }, [totalEducationDetailsCount]);

    return(
        <div className='educationContainer'>
             {educationDetailsLoader ? <div className="education-details-spinner-container">
                    <Spinner animation="border" variant="danger" className="education-details-spinner-loader"/>
                </div> : 
                educationData && educationData.length > 0 ?
                educationData?.map((item, id) => (
                        <EducationCard data={item} key={id}/>
                    ))
                    : <div className="no-education-data-found">No education details added yet</div>
            }

        {totalEducationDetailsCount > 0 ? <BioPaginations activePage={activePage} setActivePage={setActivePage} totalEducationDetailsCount={totalEducationDetailsCount} 
            itemsPerPage={itemsPerPage} showAwards="education"/> : null}
    </div>
    )
}

export default EducationDetails;
