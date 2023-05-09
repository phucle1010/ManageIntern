import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageTeacher.module.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';

import SearchBox from '../../../../components/SearchBox';
import TeacherItem from './TeacherItem';
import NewTeacher from './NewTeacher';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const HEADINGS = ['Ảnh', 'Mã giảng viên', 'Họ và tên', 'Khoa', 'Tình trạng'];

const ManageTeacher = () => {
    const admin = useSelector((state) => state.user);
    const [school, setSchool] = useState({});
    const [departments, setDepartments] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [chosedTeacher, setChosedTeacher] = useState({});
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
                });
        }
    }, [school]);

    useEffect(() => {
        axios
            .get('/admin/teacher')
            .then((res) => {
                setTeachers(res.data.responseData);
            })
            .then(() => setIsLoading(false));
    }, [chosedTeacher]);

    return (
        <div className={cx('wrapper')}>
            {isLoading === true ? (
                <LoadingSpinner />
            ) : (
                <React.Fragment>
                    <h3 className={cx('list-heading')}>DANH SÁCH GIẢNG VIÊN</h3>
                    <SearchBox className={cx('search')} />
                    <div className={cx('filters')}>
                        <select className={cx('filter-select-item')}>
                            <option value="">Năm học</option>
                            <option value="">2020</option>
                            <option value="">2021</option>
                            <option value="">2022</option>
                        </select>
                        <select className={cx('filter-select-item')}>
                            <option value="">Học kỳ</option>
                            <option value="">Học kỳ 1</option>
                            <option value="">Học kỳ 2</option>
                        </select>
                        <button
                            className={cx('btn-add')}
                            onClick={() => {
                                setChosedTeacher({
                                    id: null,
                                    full_name: '',
                                    image: '',
                                    phone: '',
                                    email: '',
                                    address: '',
                                    dob: new Date().toLocaleString(),
                                    start_date: new Date().toLocaleString(),
                                    education_level: null,
                                    current_status: {
                                        data: [-1],
                                    },
                                    user_id: null,
                                    department_id: null,
                                });
                                setEditable(true);
                            }}
                        >
                            Thêm mới
                        </button>
                        <button className={cx('btn-add', 'btn-export')}>Xuất File</button>
                    </div>

                    <div className={cx('teacher-list')}>
                        <div className={cx('teacher-heading-list')}>
                            <ul className={cx('main-heading-list')}>
                                {HEADINGS.map((heading, index) => (
                                    <li className={cx('main-heading')} key={index}>
                                        {heading}
                                    </li>
                                ))}
                            </ul>
                            <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5>
                        </div>

                        {teachers.length > 0 &&
                            teachers.map((teacher) => (
                                <TeacherItem
                                    key={teacher.id}
                                    departments={departments}
                                    teacher={teacher}
                                    setChosedTeacher={setChosedTeacher}
                                    setEditable={setEditable}
                                />
                            ))}
                    </div>

                    {Object.keys(chosedTeacher).length > 0 && (
                        <NewTeacher
                            show={setChosedTeacher}
                            editable={editable}
                            teacher={chosedTeacher}
                            departments={departments}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default ManageTeacher;
