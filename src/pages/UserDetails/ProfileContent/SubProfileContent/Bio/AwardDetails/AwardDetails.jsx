import AwardCard from './AwardCard/AwardCard';
import BioPagination from '../Components/Pagination/BioPagination';
import useFetch from '../BioDetails/apiServices/useFetch';
import { API } from '../../../../../../helpers/apiEndpoints';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const AwardDetails = ({  setAwardCount }) => {
    const params = useParams()
    const { userCode } = params

    const { data: awardData, count: totalAwardsCount, activePage, setActivePage, itemsPerPage, loading: awardDetailsLoader } = useFetch(API.USER_AWARDS, userCode, 'awards');
    useEffect(() => {
        setAwardCount(totalAwardsCount);
    }, [totalAwardsCount]);

    return (
        <div className='awardContainer'>
            {awardDetailsLoader ? <div className="award-details-spinner-container">
                    <Spinner animation="border" variant="danger" className="award-details-spinner-loader"/>
                </div> : 
                awardData && awardData.length > 0 ?
                    awardData?.map((item, id) => (
                        <AwardCard data={item} key={id}/>
                    ))
                    : <div className="no-awards-data-found">No awards and certificates added yet</div>
            }

            {totalAwardsCount > 0 ? <BioPagination activePage={activePage} setActivePage={setActivePage} totalAwardsCount={totalAwardsCount} 
            itemsPerPage={itemsPerPage} showAwards="awards"/> : null}
        </div>
    )
}

export default AwardDetails;
