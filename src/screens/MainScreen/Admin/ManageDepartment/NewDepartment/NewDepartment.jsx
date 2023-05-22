/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './NewDepartment.module.scss';
import { Close } from '@mui/icons-material';
import axios from 'axios';

const Major = React.lazy(() => import('../Major'));

const cx = classNames.bind(styles);

const NewDepartment = ({ show, editable, department }) => {
    const [departmentItem, setDepartmentItem] = useState(department);
    const [teachers, setTeachers] = useState([]);
    const [addedMajorList, setAddedMajorList] = useState([]);
    const [majorClicked, setMajorClicked] = useState(false);

    const getTeachers = async () => {
        await axios
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
    };

    useEffect(() => {
        if (departmentItem.id !== null) {
            getTeachers();
        }
    }, []);

    const handlePostDepartment = () => {
        const showResponse = (response, status, afftedRows) => {
            alert(response);
            if (editable === true) {
                console.log(afftedRows);
            }
            if (status === 200) {
                show({});
                setAddedMajorList([]);
            }
        };

        if (editable === true) {
            const major_list = [...addedMajorList];
            if (departmentItem.id === null) {
                axios
                    .post('/admin/department/new', { ...departmentItem, major_list })
                    .then((res) => showResponse(res.data.responseData, res.data.statusCode, 0));
            } else {
                axios
                    .put('/admin/department/edit', { ...departmentItem, major_list })
                    .then((res) => showResponse(res.data.responseData, res.data.statusCode, res.data.afftedRows));
            }
        } else {
            alert('Bạn không thể thêm dữ liệu khi ở chế độ chỉ xem');
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
                            // placeholder="Công nghệ phần mềm"
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
                            disabled={!editable}
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
                </div>
            </div>
            <div className={cx('btn-options')}>
                <button className={cx('view-major-btn')} onClick={() => setMajorClicked(true)}>
                    Quản lý ngành học
                </button>
                <button className={cx('save-btn')} onClick={handlePostDepartment}>
                    Lưu
                </button>
            </div>
            {majorClicked === true && (
                <Major
                    department_id={department.id}
                    show={setMajorClicked}
                    setAddedMajorList={setAddedMajorList}
                    addedMajorList={addedMajorList}
                    editable={editable}
                />
            )}
        </div>
    );
};

export default NewDepartment;
