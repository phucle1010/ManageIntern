import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './NewDepartment.module.scss';
import { Close } from '@mui/icons-material';
import axios from 'axios';

const cx = classNames.bind(styles);

const NewDepartment = ({ show, editable, department }) => {
    const [departmentItem, setDepartmentItem] = useState(department);
    const [teachers, setTeachers] = useState([]);
    console.log(departmentItem);

    useEffect(() => {
        if (departmentItem.id !== null) {
            axios
                .get('/admin/department/teachers', {
                    params: {
                        departmentId: departmentItem.id,
                    },
                })
                .then((res) => {
                    if (res.data.statusCode === 200) {
                        setTeachers(res.data.responseData);
                    }
                });
        }
    }, [departmentItem.id]);

    const handlePostDepartment = () => {
        const showResponse = (response) => {
            alert(response);
            if (response === 200) {
                show({});
            }
        };

        if (departmentItem.id === null) {
            axios.post('/admin/department/new', departmentItem).then((res) => showResponse(res.data.responseData));
        } else {
            axios.put('/admin/department/edit', departmentItem).then((res) => showResponse(res.data.responseData));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => show({})} />
            <h3 className={cx('main-heading')}>Thông tin khoa</h3>
            <div className={cx('department-detail')}>
                <div className={cx('department-form')}>
                    <div className={cx('department-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Tên khoa</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="department_name"
                            value={departmentItem.department_name}
                            placeholder="KTPM2020"
                            readOnly={!editable}
                            onChange={(e) =>
                                setDepartmentItem((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    };
                                })
                            }
                        />
                    </div>
                    <div className={cx('department-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Trưởng khoa</h5>
                        <select
                            className={cx('input-item')}
                            name="department_head"
                            value={departmentItem.department_head}
                            readOnly={!editable}
                            onChange={(e) =>
                                setDepartmentItem((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    };
                                })
                            }
                        >
                            {teachers.length > 0 &&
                                teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.full_name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className={cx('department-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Số lượng ngành học</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="majors"
                            value={departmentItem.majors}
                            placeholder="100"
                            readOnly={!editable}
                            onChange={(e) =>
                                setDepartmentItem((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    };
                                })
                            }
                        />
                    </div>
                </div>
            </div>
            <button className={cx('save-btn')} onClick={handlePostDepartment}>
                Lưu
            </button>
        </div>
    );
};

export default NewDepartment;
