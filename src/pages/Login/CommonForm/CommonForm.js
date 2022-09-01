import React from 'react';
import classes from '../../../styles/login.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import { Config } from '../../../Config/Config';
import { useNavigate } from 'react-router-dom';
import SpinnerCustom from '../../../components/SpinnerCustom/SpinnerCustom';

const validationSchema = Yup.object().shape({
	username: Yup.string().required('Your Username is required'),
	password: Yup.string().required('Passsword is required'),
});

function CommonForm({ handleUserButton }) {
	const [loading, setLoading] = useState(false);
	const router = useNavigate();
	const [activeForm, setActiveForm] = useState('common');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
		mode: 'onSubmit',
	});

	const onUserFormSubmit = (data) => {
		const myFormData = {
			username: data.username,
			password: data.password
		};
		setLoading(true);
		console.log(myFormData)
		axios
			.post(`${Config.url.API_URL}/auth/login`, myFormData)
			.then((res) => {

				console.log(res)
				const userData = JSON.stringify({
					token: res.data.token,
				});
				//set token to session storage might change to context or redux later
				sessionStorage.setItem('cpUser', userData);
				toast.success('Login Successfully');
				router('/user');
			})
			.catch((err) => {

				const errMsg = err?.name
					? err?.response.data
					: 'Failed to Login!';
				toast.error(errMsg);
				setLoading(false);
				console.log(err)

			});
	};

	return (
		<div className={classes.body}>
			<section className={classes.login} id="login">
				<div className={classes.Lorem}>
					<img
						src="https://res.cloudinary.com/naijakids/image/upload/v1662028652/image001_ihlem9.png"
						alt="Acesss"
						width={200}
						height={100}
					/>
				</div>
				<div className={classes.head}>
					<h1 className={classes.company}>Login</h1>
				</div>
				<div className={classes.form}>
					<form onSubmit={handleSubmit(onUserFormSubmit)} className={classes.FormWidth}>
						<label htmlFor="username">Username:</label>
						<br />

						<input
							type="text"
							placeholder="Username"
							className={classes.text}
							id="username"
							{...register('username')}
							required
						/>
						<br />
						{errors.username && (
							<p className={classes.ErrorMsg}>{errors.username?.message}</p>
						)}

						<br />
						<label htmlFor="password">Password:</label>
						<br />
						<input
							type="password"
							id="password"
							placeholder="Your Password"
							className={classes.password}
							{...register('password')}
							required
						/>
						<br />
						{errors.password && (
							<p className={classes.ErrorMsg}>{errors.password?.message}</p>
						)}

						<div className={classes.RadioDiv}>
							<div className={classes.radioLeft}>
								<input
									id="common"
									style={{ backgroundColor: activeForm === 'admin' ? 'var(--color-blue)' : '' }}
									type="radio"
									// make default form once page load
									defaultChecked
								/>{' '}
								User
							</div>
							<div className={classes.radioRight}>
								<input
									id="admin"
									onClick={handleUserButton}
									style={{ backgroundColor: activeForm === 'admin' ? 'var(--color-blue)' : '' }}
									type="radio"
								/>{' '}
								Admin
							</div>
						</div>
						<div className={classes.sign}>
							{!loading ? (
								<button type="submit" className={classes.btn_login} id="do-login">
									SIGN IN
								</button>
							) : (
								<>
									<div className={classes.loginLoading}>
										<SpinnerCustom />
									</div>
								</>
							)}
						</div>
					</form>
				</div>
			</section>
		</div>
	);
}

export default CommonForm;
