import { useState, useEffect } from "react";
import { axiosInstanceHeader } from "../../../../../../../helpers/axiosInstance";

const useFetch = (url, userCode, type ) => {
    const [data, setData] = useState(null);
    const [count , setCount] = useState(null);
    const [activePage, setActivePage] = useState(0);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 10

  const fetchAwardData = () => {
   
    if (userCode) {
      setLoading(true)
      axiosInstanceHeader.post(`${url}?start=${(activePage * itemsPerPage) + 1}&offset=${itemsPerPage}`, { userCode })
          .then(res => {
            console.log(res)
              setData(res?.data?.result)
              setCount(type==='awards' ? res?.data?.totalAwardsCount : type === 'education' ? res?.data?.totalEducationDetailsCount :
               res?.data?.totalCompanyDetailsCount)
               setLoading(false);
          })
          .catch(err => {console.log(err, 'fffffff'); setLoading(false)})
  }
  };

  useEffect(() => {
  
    fetchAwardData();
  }, [activePage]);

  return {
    data,
    count,
    activePage,
    setActivePage,
    itemsPerPage,
    loading
  };
};

export default useFetch;
