import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageDepartment.module.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';

import SearchBox from '../../../../components/SearchBox';
import NewDepartment from './NewDepartment';
import DepartmentItem from './DepartmentItem/DepartmentItem';

const cx = classNames.bind(styles);

const HEADINGS = ['Mã khoa', 'Tên khoa', 'Trưởng khoa', 'Số ngành học'];

const Department = () => {
    const admin = useSelector((state) => state.user);
    const [school, setSchool] = useState({});
    const [departments, setDepartmens] = useState([]);
    const [chosedDepartment, setChosedDepartment] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [editable, setEditable] = useState(true);

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
                    setDepartmens(res.data.responseData);
                })
                .then(() => setIsLoading(false));
        }
    }, [chosedDepartment, school]);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('list-heading')}>DANH SÁCH KHOA</h3>
            <SearchBox className={cx('search')} />
            <div className={cx('btn-options')}>
                <button
                    className={cx('btn-add')}
                    onClick={() =>
                        setChosedDepartment({
                            id: null,
                            department_name: '',
                            department_head: '',
                            majors: null,
                            school_id: Object.keys(school).length > 0 && school.id,
                        })
                    }
                >
                    Thêm mới
                </button>
                <button className={cx('btn-add', 'btn-export')}>Xuất File</button>
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
        </div>
    );
};

export default Department;
