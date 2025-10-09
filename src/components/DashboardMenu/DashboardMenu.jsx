import React, { useState } from 'react'
import './dashboardmenu.scss'
import { menu } from './dashboardmenudata'
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';

const DashboardMenu = () => {
    const location = useLocation()
    const pathname = location?.pathname;
    const navigate = useNavigate()
    return (
        <div className='dashboard_menu'>
            {
                menu?.map((item, id) => (
                        <div className={pathname === item?.path ? 'menu_title_active' : 'menu_title'}
                            onClick={() => navigate(item?.path)}
                            key={id}>
                            <img src={pathname === item?.path ? item?.icon_dark : item?.icon} alt="" />
                            <span>{item?.title}</span>
                        </div>
                ))
            }
        </div>
    )
}

export default DashboardMenu
