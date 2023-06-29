import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageDepartment.module.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';

import SearchBox from '../../../../components/SearchBox';
import NewDepartment from './NewDepartment';
import DepartmentItem from './DepartmentItem/DepartmentItem';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const HEADINGS = ['Mã khoa', 'Tên khoa', 'Trưởng khoa'];

const Department = () => {
    const admin = useSelector((state) => state.user);
    const [school, setSchool] = useState({});
    const [departments, setDepartments] = useState([]);
    const [chosedDepartment, setChosedDepartment] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        const email = admin.email;
        axios
            .get('/admin/school', {
                params: {
                    email,
                },
            })
            .then((res) => {
                setSchool(res.data.responseData);
            });
    }, [admin.email]);

    useEffect(() => {
        if (Object.keys(school).length !== 0) {
            axios
                .get('/admin/department', {
                    params: {
                        schoolId: school.id,
                    },
                })
                .then((res) => {
                    setDepartments(res.data.responseData);
                })
                .then(() => setIsLoading(false));
        }
    }, [chosedDepartment, school]);

    return (
        <div className={cx('wrapper')}>
            {isLoading === true ? (
                <LoadingSpinner />
            ) : (
                <React.Fragment>
                    <h3 className={cx('list-heading')}>DANH SÁCH KHOA</h3>
                    <SearchBox className={cx('search')} />
                    <div className={cx('btn-options')}>
                        <button
                            className={cx('btn-add')}
                            onClick={() => {
                                setChosedDepartment({
                                    id: null,
                                    department_name: '',
                                    department_head: '',
                                    school_id: Object.keys(school).length > 0 && school.id,
                                });
                                setEditable(true);
                            }}
                        >
                            Thêm mới
                        </button>
                    </div>

                    <div className={cx('department-list')}>
                        <div className={cx('department-heading-list')}>
                            <ul className={cx('main-heading-list')}>
                                {HEADINGS.map((heading, index) => (
                                    <li className={cx('main-heading')} key={index}>
                                        {heading}
                                    </li>
                                ))}
                            </ul>
                            <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5>
                        </div>

                        {departments.length > 0 &&
                            departments.map((department) => (
                                <DepartmentItem
                                    key={department.id}
                                    department={department}
                                    setChosedDepartment={setChosedDepartment}
                                    setEditable={setEditable}
                                />
                            ))}
                    </div>

                    {Object.keys(chosedDepartment).length > 0 && (
                        <NewDepartment show={setChosedDepartment} editable={editable} department={chosedDepartment} />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default Department;
