/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './HomeTeacher.module.scss';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

import SearchBox from '../../../../components/SearchBox';
import Follow from './Follow';
import Loading from '../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const MENU_HEADINGS = ['Ảnh', 'Mã số sinh viên', 'Họ và tên', 'Lớp', 'Lựa chọn'];

const HomeTeacher = () => {
    const user = useSelector((state) => state.user);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getAllAssignedStudents = async () => {
        await axios
            .get('/teacher/assigned/list', {
                params: {
                    person_id: user.id,
                },
            })
            .then((res) => {
                res.data.statusCode === 200 && setStudents(res.data.responseData);
                setLoaded(true);
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getAllAssignedStudents();
    }, [user]);

    return (
        <div className={cx('wrapper')}>
            {loaded ? (
                students.length > 0 ? (
                    <React.Fragment>
                        <h3 className={cx('title-heading')}>TRANG CHỦ</h3>

                        <SearchBox className={cx('search')} />
                        <h4 className={cx('main-heading')}>Danh sách sinh viên đang được phân công</h4>
                        {/* <div className={cx('filters')}>
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
            </div> */}
                        <div className={cx('student-container')}>
                            <div className={cx('menu-list')}>
                                {MENU_HEADINGS.map((menu, index) => (
                                    <span className={cx('menu-item')} key={index}>
                                        {menu}
                                    </span>
                                ))}
                            </div>
                            <div className={cx('student-list')}>
                                {students.map((student) => (
                                    <div key={student.id} className={cx('student-item')}>
                                        <div className={cx('student-item-detail')}>
                                            <Avatar src={student.image} />
                                        </div>
                                        <div className={cx('student-item-detail')}>
                                            <span>{student.id}</span>
                                        </div>
                                        <div className={cx('student-item-detail')}>
                                            <span>{student.full_name}</span>
                                        </div>
                                        <div className={cx('student-item-detail')}>
                                            <span>{student.class_name}</span>
                                        </div>
                                        <div className={cx('student-item-detail')}>
                                            <button
                                                className={cx('btn-follow')}
                                                onClick={() => setSelectedStudent(student)}
                                            >
                                                Theo dõi
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedStudent !== null && (
                            <Follow
                                setSelectedStudent={setSelectedStudent}
                                student={selectedStudent}
                                userId={user.id}
                            />
                        )}
                    </React.Fragment>
                ) : (
                    <h4 className={cx('main-heading')}>Không có sinh viên nào đang được phân công</h4>
                )
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default HomeTeacher;
