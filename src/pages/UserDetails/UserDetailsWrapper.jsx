import React, { useEffect, useState } from 'react'
import UpperProfile from './UpperProfile/UpperProfile'
import Header from '../../components/Header/Header'
import LowerProfileDetails from './ProfileContent/LowerProfileDetails'
import { useLocation } from 'react-router-dom';
import NoGamification from './UpperProfile/NoGamification/NoGamification';
import DefaultStaticTooltip from '../../components/DefaultStaticTooltip/DefaultStaticTooltip';
import DefaultStaticPopover from '../../components/DefaultStaticPopover/DefaultStaticPopover';

const UserDetailsWrapper = ({ user }) => {
    const [selectedTab, setSelectedTab] = useState('Userdetails')
    const [selectedTitle, setSelectedTitle] = useState('Users')
    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tabFromQuery = queryParams.get('tab');
        const titleFromQuery = queryParams.get('title');

        if (tabFromQuery) {
            setSelectedTab(tabFromQuery);
        }
        if (titleFromQuery) {
            setSelectedTitle(titleFromQuery);
        }
    }, [location.search]);

    return (
        <div>
            <div className="main-content app-content">
                <div className="side-app">

                    <div className="main-container container-fluid  padding-wrapper">
                        <Header title={selectedTitle || "Users"} subTitle={"User profile"} />

                        {/* <div className="col-md-6 mt-4">
                            <DefaultStaticPopover position="top" headerText="Popover top"
                                bodyText="Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum." />
                        </div> */}

                        <div className="row" id="user-profile">
                            {user?.onBoardingStatus === "pending" && <NoGamification />}
                            <UpperProfile setSelectedTab={setSelectedTab} selectedTab={selectedTab} user={user} />
                        </div>
                        <LowerProfileDetails setSelectedTab={setSelectedTab} selectedTab={selectedTab} user={user} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetailsWrapper
