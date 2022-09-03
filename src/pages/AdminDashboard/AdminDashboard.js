import React, { useState } from 'react'
import ViewUsers from './ViewUsers';
import AddUsers from './AddUsers';
import classes from '../../styles/Dashboard.module.css';

import AdminDashboardHeader from './AdminDashboardHeader';
const AdminDashboard = () => {
    // set current page id to current viewing component
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 0
    );
    // map pages to render different page with same header
    const pages = [

        {
            id: 0,
            title: 'View Users',
            page: <ViewUsers />,
        },
        {
            id: 1,
            title: 'Add Users',
            page: <AddUsers setCurrentPage={setCurrentPage} />,
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
