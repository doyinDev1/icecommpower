import AdminForm from './AdminForm/AdminForm'
import CommonForm from './CommonForm/CommonForm';
import classes from '../../styles/login.module.css'
import { useState } from 'react';

function Login() {

// set active form to be user login form 
	const [activeForm, setActiveForm] = useState('common');
	
	const handleUserButton = (e) => {
		//changes form from user to admin 
		setActiveForm(e.target.id);
	};
	return (
		<>
			<div className={classes.image}>
				<div className={classes.overlay}>
					<section >
						<div className={classes.LoginType}>
							{activeForm === 'admin' && <AdminForm handleUserButton={handleUserButton} />} {/* ADMIN FORM TO ADMINDASHBOARD TO HANDLE ADD, UPDATE AND VIEW USERS*/}
							{activeForm === 'common' && <CommonForm handleUserButton={handleUserButton} />} {/* USERS INTERFACE*/}
						</div>
					</section>
				</div>
			</div>
		</>
	)
}

export default Login
