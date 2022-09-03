import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import classes from '../../styles/ViewUsers.module.css'
import common from '../../styles/common.module.css'
import axios from 'axios'
import { Config } from '../../Config/Config'
import toast from 'react-hot-toast'
import { DeleteOutline, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Swal from 'sweetalert2'
import EditUserModal from './EditUserModal'
import SpinnerCustom from '../../components/SpinnerCustom/SpinnerCustom'
const ViewUsers = () => {
    const [allUsers, setAllUsers] = useState();
    const [editModal, setEditModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [loading, setLoading] = useState(null)
    const getUsers = () => {
        setLoading(true)
        axios
            .get(`${Config.url.API_URL}/users`)
            .then((res) => {
                setAllUsers(res.data)
                setLoading(false)
            })
            .catch((err) => {
                const errMsg = 'try again'
                    ? err?.message
                    : 'Failed to fetch';
                toast.error(errMsg);
            });
    }
    const deleteUser = (id) => {
        toast.loading('deleting')
        axios
            .delete(`${Config.url.API_URL}/users/${id}`)
            .then((res) => {
                toast.remove()
                toast.success(`successfully deleted user with ${res.data.email} email`)
            })
            .catch((err) => {
                const errMsg = 'try again'
                    ? err?.message
                    : 'Failed to fetch';
                toast.error(errMsg);
            });
    }

    useEffect(() => {
        if (!allUsers) {
            getUsers()
        }
    }, [allUsers])

    const header = [
        'actions',
        'id',
        'email',
        'username',
        'First Name',
        'Last Name',
        'Phone',
    ]

    const onEditModal = (user) => {
        setSelectedUser(user)
        setEditModal(true)
    }

    const hideEditModal = () => {
        setEditModal(false)
        setSelectedUser({})
    }

    const handleDeleteRoleplayUser = (user) => {
        Swal.fire({
            title: 'PLEASE CONFIRM!!!',
            text: `Are you sure you want to delete: ${user.name.firstname} ${user.name.lastname} ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-blue)',
            cancelButtonColor: 'red',
            confirmButtonText: 'YES',
            cancelButtonText: 'NO',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(user.id)
            }
        })
    }

    return (
        <div>
            <>
                <h3 className={common.SectionTitle}>
                    All Users
                </h3>
                <section className={common.SectionContainer}>
                    <div className={common.TableWrapper} style={{ margin: '0 10px' }}>
                        <div className={common.TableExtras}>
                            <h3>
                                Total Count:{' '}
                                {loading === true ?
                                    <Spinner animation="border" variant="primary" />
                                    : allUsers?.length}
                            </h3>
                        </div>

                        {
                            loading === true ?
                                <div className={classes.spinner}>
                                    <SpinnerCustom />
                                </div> :
                                <Table className={common.Table} hover responsive>
                                    <thead>
                                        <tr>
                                            {header.map((n) => (
                                                <th key={n}> {n.split('_').join(' ')} </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allUsers?.length >= 1 &&
                                            allUsers?.map((allUserData) => (
                                                <tr key={allUserData?.id}>
                                                    <td>
                                                        <IconButton
                                                            className={classes.ActionButton}
                                                            onClick={() => handleDeleteRoleplayUser(allUserData)}
                                                        >
                                                            <DeleteOutline
                                                                style={{ fontSize: '17px', color: 'red' }}
                                                            />
                                                        </IconButton>
                                                        <IconButton
                                                            className={classes.ActionButton}
                                                            onClick={() => onEditModal(allUserData)}
                                                        >
                                                            <Edit
                                                                style={{
                                                                    fontSize: '17px',
                                                                    color: 'var(--color-blue)',
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </td>
                                                    <td>{allUserData?.id}</td>
                                                    <td>{allUserData?.email}</td>
                                                    <td>{allUserData?.username}</td>
                                                    <td>{allUserData?.name.firstname}</td>
                                                    <td>{allUserData?.name.lastname}</td>
                                                    <td>{allUserData?.phone}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                        }
                    </div>
                </section>
                <EditUserModal
                    editModal={editModal}
                    selectedUser={selectedUser}
                    hideEditModal={hideEditModal}
                    setEditModal={setEditModal}
                />
            </>
        </div>
    )
}

export default ViewUsers
