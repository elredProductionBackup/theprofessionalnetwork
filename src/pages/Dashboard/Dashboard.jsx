import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './dashboard.scss'
import DashboardMenu from '../../components/DashboardMenu/DashboardMenu'
import { Images } from '../../assets/Images/Images'
import { Icons } from '../../assets/Icons/Icons'
import TopBar from '../../components/TopBar/TopBar'


const Dashboard = () => {

    return (
        <div className='dashboard'>
            <div className="content_col">
                <TopBar />
                <div className="content_div">
                    <div className="sidebar_col">
                        <div className="menus">
                            <DashboardMenu />
                        </div>
                    </div>
                    <div className="content_area">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard


{/* <div className="sidebar_col">
                <div className="menus">
                    <DashboardMenu/>
                </div>
            </div> */}