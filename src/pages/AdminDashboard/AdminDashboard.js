import React, { useState } from 'react'
import ViewUsers from './ViewUsers';
import AddUsers from './AddUsers';
import classes from '../../styles/Dashboard.module.css';

import AdminDashboardHeader from './AdminDashboardHeader';
const AdminDashboard = () => {
    // set page id to view current viewing component
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 0
    );
    // map pages to render different page with same header
    const pages = [

        {
            id: 1,
            title: 'View Users',
            Icon: Error,
            page: <ViewUsers />,
        },
        {
            id: 2,
            title: 'Add Users',
            Icon: Error,
            page: <AddUsers />,
        },
    ];

    return (
        <div>
            <AdminDashboardHeader setCurrentPage={setCurrentPage} pages={pages} />
            <div className={classes.PageWrapper}>
                {pages.map((page, index) =>
                    currentPage === index ? <div key={index}>{page.page}</div> : ''
                )}
            </div>
        </div>
    )
}

export default AdminDashboard
