import { useCallback, useContext, useEffect, useState } from "react";
import FeedbacksTableCard from "./FeedbacksTableCard/FeedbacksTableCard";
import {
  onBoardingStatus,
  filterOptions,
  feedbackTableheaderText,
} from "./FeedbacksTableCard/data";
import { axiosInstanceHeader } from "../../helpers/axiosInstance";
import { API } from "../../helpers/apiEndpoints";
import _ from "lodash";
import { SessionExpired } from "../../App";

const Feedbacks = () => {
  const { setSessionExpired } = useContext(SessionExpired);
  const [feedbacksData, setFeedbacksData] = useState([]);
  const [feedbacksError, setFeedbacksError] = useState("");
  const [totalFeedbacks, setTotalFeedbacks] = useState("");
  const [activePage, setActivePage] = useState(0);
  const [onboardingStatus, setOnboardingStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchKey, setSearchKey] = useState(filterOptions[0]?.value);
  const [feedbacksLoader, setFeedbacksLoader] = useState(true);
  const [sortBy, setSortBy] = useState("date");
  const [feedbackSort, setFeedbackSort] = useState("des");
  const [dateSort, setDateSort] = useState("des");
  const itemsPerPage = 10;

  useEffect(() => {
    deBouncedfetchFeedbacks(
      searchKey,
      searchText,
      onboardingStatus,
      sortBy,
      feedbackSort,
      dateSort
    );
  }, [activePage, searchText, onboardingStatus, feedbackSort, dateSort]); //eslint-disable-line

  const deBouncedfetchFeedbacks = useCallback(
    _.debounce(
      (
        searchKey,
        searchText,
        onboardingStatus,
        sortBy,
        feedbackSort,
        dateSort
      ) => {
        if (searchText?.toLowerCase() !== debouncedSearch?.toLowerCase())
          setActivePage(0);
        fetchFeedbacks(
          searchKey,
          searchText,
          onboardingStatus,
          sortBy,
          feedbackSort,
          dateSort
        );
        setDebouncedSearch(searchText);
      },
      300
    ),
    [activePage]
  );

  const fetchFeedbacks = (
    searchKey,
    searchVal,
    onboardingStatus,
    sortBy,
    feedbackSort,
    dateSort
  ) => {
    setFeedbacksError("");
    setFeedbacksLoader(true);
    axiosInstanceHeader
      .get(
        `${
          API.ALL_FEEDBACKS
        }?filterBy=${onboardingStatus}&searchBy=${searchKey}&search=${searchVal?.toLowerCase()}&sortBy=${sortBy}&sort=${
          sortBy === "date" ? dateSort : feedbackSort
        }&start=${activePage * itemsPerPage + 1}&offset=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        setTotalFeedbacks(res?.data?.totalFeedbackCount);
        setFeedbacksData(res?.data?.result);
        setFeedbacksLoader(false);
      })
      .catch((err) => {
        console.log("Error, ", err);
        if (err?.response?.data?.errorCode === 1) {
          setSessionExpired(true);
          setFeedbacksError("Session Expired");
        } else {
          setFeedbacksError("Something went wrong! Please try again");
        }
        setFeedbacksLoader(false);
      });
  };

  return (
    <>
      <FeedbacksTableCard
        feedbackTableheaderText={feedbackTableheaderText}
        searchText={searchText}
        setSearchText={setSearchText}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        onBoardingStatus={onBoardingStatus}
        setOnboardingStatus={setOnboardingStatus}
        filterOptions={filterOptions}
        feedbacksLoader={feedbacksLoader}
        feedbacksData={feedbacksData}
        feedbacksError={feedbacksError}
        itemsPerPage={itemsPerPage}
        count={totalFeedbacks}
        activePage={activePage}
        setActivePage={setActivePage}
        feedbackSort={feedbackSort}
        setFeedbackSort={setFeedbackSort}
        dateSort={dateSort}
        setDateSort={setDateSort}
        setSortBy={setSortBy}
      />
    </>
  );
};

export default Feedbacks;
