import classes from '../../styles/AdminDashboardHeader.module.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

const AdminDashboardHeader = ({ setCurrentPage, pages }) => {
	const navigate = useNavigate();

	const logUserOut = () => {
		sessionStorage.removeItem('cpAdmin');
		toast.success('Admin Logout Successfully');
		navigate('/');
	};
	const [activeTabId, setActiveTabId] = useState(
		localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 0
	);

	const handleClickTabLink = (id) => {
		setCurrentPage(id);
		localStorage.setItem('currentPage', id);
		setActiveTabId(id);
	};
	return (
		<header className={classes.DashboardHeader}>
			<a href="/" className={classes.Brand}>
				<img alt="Ice Commerce" src="https://res.cloudinary.com/naijakids/image/upload/v1662028652/image001_ihlem9.png" className={classes.Logo} />
			</a>

			<nav className={classes.DashboardNav}>
				<ul>
					{pages.map((page, index) => (
						<li
							key={page.id}
							onClick={() => handleClickTabLink(index)}
							className={`${activeTabId === index ? classes.ActiveTab : ''}`}
						>
							<span> {page.title} </span>
						</li>
					))}
				</ul>
				<button className={classes.LogOutBtn} onClick={logUserOut}>
					sign out
				</button>
			</nav>
		</header>
	);
};

export default AdminDashboardHeader;
