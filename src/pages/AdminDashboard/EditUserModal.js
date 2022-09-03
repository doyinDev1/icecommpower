import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import classes from '../../styles/UserModal.module.css'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import { Config } from '../../Config/Config'
import toast from 'react-hot-toast'
const EditUserModal = ({ editModal, selectedUser, hideEditModal, setEditModal }) => {
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()


	const onEditUserFormSubmit = (data) => {
		const params = {
			email: data.email,
			username: data.username,
			password: data.password,
			name: {
				firstname: data.firstname,
				lastname: data.lastname
			},
			address: {
				city: data.city,
				street: data.street,
				number: data.number,
				zipcode: data.zipcode,
				// dummy geolocation data to make form request work
				geolocation: {
					lat: '-37.3159',
					long: '81.1496'
				}
			},
			phone: data.phone
		}
		setLoading(true);
		axios
			.put(`${Config.url.API_URL}/users/${data.id}`,
				params
			)
			.then((res) => {
				// although users lists won't be updatd but we return a success message
				toast.success('User Successfully updated');
				reset();
				setLoading(false);
				setEditModal(false)
			})
			.catch((err) => {
				const errMsg = err.response.statusText
					? err.code
					: 'Failed to fetch';
				setLoading(false);
				toast.error(errMsg);
			});

	}
	useEffect(() => {
		if (selectedUser) {
			reset({
				firstname: selectedUser?.name?.firstname,
				lastname: selectedUser?.name?.lastname,
				username: selectedUser?.username,
				email: selectedUser?.email,
				password: selectedUser?.password,
				city: selectedUser?.address?.city,
				street: selectedUser?.address?.street,
				number: selectedUser?.address?.number,
				phone: selectedUser?.phone,
				zipcode: selectedUser?.address?.zipcode,
			})
		} else {
			reset({})
		}
	}, [reset, selectedUser])

	return (
		<Modal
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
			show={editModal}
			onHide={hideEditModal}>
			<Modal.Header closeButton>
				<Modal.Title
					id='contained-modal-title-vcenter'
					className={classes.ModalTitle}>
					UPDATE USER
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form
					className={classes.FormArea}
					onSubmit={handleSubmit(onEditUserFormSubmit)}>
					<div className={classes.InputField}>
						<label htmlFor="firstName">User First Name</label>
						<input
							type="text"
							name="firstname"
							id="name"
							placeholder="User First Name"
							autoFocus
							{...register('firstname', {
								required: true,
							})}
						/>
						{errors.firstname && (
							<p className={classes.ErrorMessage}>Please enter First Name!</p>
						)}
					</div>

					<div className={classes.InputField}>
						<label htmlFor="lastname">User Last Name</label>
						<input
							type="text"
							name="lastname"
							id="lastname"
							placeholder="User Last Name"
							{...register('lastname', {
								required: true,
							})}
						/>
						{errors.lastname && (
							<p className={classes.ErrorMessage}>Please enter user Last name!</p>
						)}
					</div>

					<div className={classes.InputField}>
						<label htmlFor="email">User Email</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="User Email Address"
							autoComplete="false"
							{...register('email', {
								required: true,
							})}
						/>
						{errors.email && <p className={classes.ErrorMessage}>Please enter user email!</p>}
					</div>

					<div className={classes.InputField}>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							autoComplete="false"
							{...register('username', {
								required: true,
							})}
						/>
						{errors.username && <p className={classes.ErrorMessage}>Please enter username!</p>}
					</div>
					<div className={classes.InputField}>
						<label htmlFor="password">Password</label>
						<input
							type="text"
							name="password"
							id="password"
							placeholder="Password"
							autoComplete="false"
							{...register('password', {
								required: true,
							})}
						/>
						{errors.password && <p className={classes.ErrorMessage}>Please enter password!</p>}
					</div>

					<div className={classes.InputField}>
						<label htmlFor="phone">Phone Number</label>
						<input
							type="number"
							name="phone"
							id="phone"
							placeholder="Phone Number"
							autoComplete="false"
							{...register('phone', {
								required: true,
							})}
						/>
						{errors.phone && <p className={classes.ErrorMessage}>Please enter phone number!</p>}
					</div>
					<div className={classes.InputBoxMain} >
						<div className={classes.InputField}>
							<label htmlFor="houseNumber">House Number</label>
							<input
								type="number"
								name="number"
								id="number"
								placeholder="House Number"
								autoComplete="false"
								{...register('number', {
									required: true,
								})}
							/>
							{errors.number && <p className={classes.ErrorMessage}>Please enter House Number!</p>}
						</div>
						<div className={classes.InputField}>
							<label htmlFor="street">Street</label>
							<input
								type="text"
								name="street"
								id="street"
								placeholder="Street"
								autoComplete="false"
								{...register('street', {
									required: true,
								})}
							/>
							{errors.street && <p className={classes.ErrorMessage}>Please enter Street!</p>}
						</div>
					</div>
					<div className={classes.InputBoxMain} >
						<div className={classes.InputField}>
							<label htmlFor="city">City</label>
							<input
								type="text"
								name="city"
								id="city"
								placeholder="City"
								autoComplete="false"
								{...register('city', {
									required: true,
								})}
							/>
							{errors.city && <p className={classes.ErrorMessage}>Please enter City!</p>}
						</div>
						<div className={classes.InputField}>
							<label htmlFor="zipcode">Zipcode</label>
							<input
								type="number"
								name="zipcode"
								id="zipcode"
								placeholder="Zipcode"
								autoComplete="false"
								{...register('zipcode', {
									required: true,
								})}
							/>
							{errors.zipcode && <p className={classes.ErrorMessage}>Please enter Zip code!</p>}
						</div>
					</div>
					<button type='submit'
						disabled={loading === true}
					>
						{loading === true ?
							'Saving Changes' :
							'Save Change'
						}
					</button>
				</form>
			</Modal.Body>
		</Modal>
	)
}

export default EditUserModal
