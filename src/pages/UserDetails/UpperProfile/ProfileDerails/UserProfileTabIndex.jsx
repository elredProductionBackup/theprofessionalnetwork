import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const UserProfileTabIndex = ({ setSelectedTab, selectedTab, user }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const setSelectedTabFun = (event, tab) => {
        event.preventDefault();
        setSelectedTab(tab)
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('tab', tab);
        navigate({
            pathname: location.pathname,
            search: queryParams.toString(),
        });
    }

    console.log(user, 'jjjjjjjjjjjjjjjjj')
    return (
        <>
            <div className="TabMenus-wrapper border-top">
                <div className="wideget-user-tab">
                    <div className="tab-menu-heading">
                        <div className="tabs-menu1">
                            <div className="nav nav-companion reduce-border ">
                                <div className={selectedTab === "Userdetails" ? 'nav-menu-wrapper-active ' : 'nav-menu-wrapper '} onClick={(e) => setSelectedTabFun(e, 'Userdetails')} id='User details'>
                                    <span className={selectedTab === "Userdetails" ? "Nav-menu-Names show" : "Nav-menu-Names"} data-bs-toggle="tab" >User details</span>
                                </div>
                                {
                                    user?.onBoardingStatus !== 'pending' && <div className={selectedTab === "Profile" ? 'nav-menu-wrapper-active  margin-left-addon ' : 'nav-menu-wrapper  margin-left-addon '} onClick={(e) => setSelectedTabFun(e, 'Profile')} id='Profile'>
                                        <span data-bs-toggle="tab" className={selectedTab === "Profile" ? "Nav-menu-Names show" : "Nav-menu-Names"}>Profile</span>
                                    </div>
                                }
                                {
                                    user?.onBoardingStatus !== 'pending' && <div className={selectedTab === "Bio" ? 'nav-menu-wrapper-active  margin-left-addon ' : 'nav-menu-wrapper  margin-left-addon '} onClick={(e) => setSelectedTabFun(e, 'Bio')} id='Bio'>
                                        <span data-bs-toggle="tab" className={selectedTab === "Bio" ? "Nav-menu-Names show" : "Nav-menu-Names"}>Bio</span>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfileTabIndex
