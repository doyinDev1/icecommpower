import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Config } from '../../Config/Config';
import Loader from '../../components/SpinnerCustom/SpinnerCustom';
import classes from '../../styles/CreateUsers.module.css';


const AddUsers = ({ setCurrentPage}) => {
    const { handleSubmit, register, formState, reset } = useForm();
    const { errors } = formState;
    const [loading, setLoading] = useState(false);
    const [loadingErr, setLoadingErr] = useState(false);

    const onAddUserFormSubmit = (data) => {

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
            .post(`${Config.url.API_URL}/users`,
                params
            )
            .then((res) => {
                // although users lists won't be updated but we return a success message
                toast.success('User Successfully added');
                reset();
                setLoading(false);
                setCurrentPage(0)
            })
            .catch((err) => {
                const errMsg = err.response.statusText
                    ? err.code
                    : 'Failed to fetch';
                setLoading(false);
                toast.error(errMsg);
            });

    };
    return (
        <div>
            <div className={classes.FormContainer}>
                <form className={classes.AddUserForm} onSubmit={handleSubmit(onAddUserFormSubmit)}>
                    <h2> ADD USER </h2>
                    <div className={classes.InputBox}>
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
                    <div className={classes.InputBox}>
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
                    <div className={classes.InputBox}>
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
                    <div className={classes.InputBox}>
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
                    <div className={classes.InputBox}>
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
                    <div className={classes.InputBox}>
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
                        <div className={classes.InputBox}>
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
                        <div className={classes.InputBox}>
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
                        <div className={classes.InputBox}>
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
                        <div className={classes.InputBox}>
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
                    {loading ?
                        <div className={classes.loader}>
                            <Loader />
                        </div>
                        : <button type="submit">Create User</button>}
                </form>
            </div>
        </div>
    )
}

export default AddUsers
