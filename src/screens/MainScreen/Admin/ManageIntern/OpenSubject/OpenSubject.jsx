/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './OpenSubject.module.scss';
import { Close } from '@mui/icons-material';
import ViewSubjects from './ViewSubjects/ViewSubjects';

const cx = classNames.bind(styles);

const OpenSubject = ({ close }) => {
    const initSubject = {
        unit: null,
        sessions: null,
        max_students: null,
        teacher_id: null,
        department_id: null,
        academic_year: null,
        semester_id: null,
    };
    const admin = useSelector((state) => state.user);
    const [academicYears, setAcademicYears] = useState([]);
    const [school, setSchool] = useState({});
    const [departments, setDepartments] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState(initSubject);
    const [showViewSubject, setShowViewSubject] = useState(false);

    const getAcademicYears = async () => {
        await axios
            .get('/admin/academic-year')
            .then((res) => res.data.statusCode === 200 && setAcademicYears(res.data.responseData))
            .catch((err) => alert('Lỗi: ', err));
    };

    const getSchool = async () => {
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
    };

    useEffect(() => {
        getSchool();
        getAcademicYears();
    }, []);

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
        if (subject.department_id) {
            axios
                .get('/admin/department/teachers', {
                    params: {
                        departmentId: subject.department_id,
                    },
                })
                .then((res) => {
                    setTeachers(res.data.responseData);
                });
        }
    }, [subject.department_id]);

    const handleOpenNewSubject = () => {
        axios.post('/admin/subject/new', subject).then((res) => {
            alert(res.data.responseData);
            if (res.data.statusCode === 200) {
                setSubject(initSubject);
            }
        });
    };

    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => close(false)} />
            <h3 className={cx('main-heading')}>Quản lý môn học thực tập</h3>
            <div className={cx('subject-detail')}>
                <div className={cx('subject-form')}>
                    <div className={cx('subject-data-item')}>
                        <h5 className={cx('input-title')}>Năm học</h5>
                        <select
                            className={cx('input-item')}
                            name="academic_year"
                            onChange={(e) =>
                                setSubject((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    };
                                })
                            }
                            value={subject.academic_year}
                        >
                            <option value="0">Chọn Năm học</option>
                            {academicYears.length > 0 &&
                                academicYears.map((academicYearItem) => (
                                    <option key={academicYearItem.id} value={academicYearItem.id}>
                                        {academicYearItem.current_year}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className={cx('subject-data-item')}>
                        <h5 className={cx('input-title')}>Chọn kỳ học</h5>
                        <select
                            className={cx('input-item')}
                            name="semester_id"
                            value={subject.semester_id}
                            onChange={(e) =>
                                setSubject((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    };
                                })
                            }
                        >
                            <option value="0">Chọn kỳ học</option>
                            <option value="1">Học kỳ 1</option>
                            <option value="2">Học kỳ 2</option>
                        </select>
                    </div>
                    <div className={cx('subject-data-item')}>
                        <h5 className={cx('input-title')}>Số tín chỉ</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="unit"
                            value={subject.unit}
                            onChange={(e) =>
                                setSubject((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    };
                                })
                            }
                        />
                    </div>
                    <div className={cx('subject-data-item')}>
                        <h5 className={cx('input-title')}>Số tiết học</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="sessions"
                            value={subject.sessions}
                            onChange={(e) =>
                                setSubject((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    };
                                })
                            }
                        />
                    </div>
                    <div className={cx('subject-data-item')}>
                        <h5 className={cx('input-title')}>Số học sinh tối đa</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="max_students"
                            value={subject.max_students}
                            onChange={(e) =>
                                setSubject((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    };
                                })
                            }
                        />
                    </div>
                    <div className={cx('subject-data-item')}>
                        <h5 className={cx('input-title')}>Khoa</h5>
                        <select
                            className={cx('input-item')}
                            name="department_id"
                            value={subject.department_id}
                            onChange={(e) =>
                                setSubject((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    };
                                })
                            }
                        >
                            <option value="0">Chọn khoa</option>
                            {departments.length > 0 &&
                                departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.department_name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className={cx('subject-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Giảng viên</h5>
                        <select
                            className={cx('input-item')}
                            name="teacher_id"
                            value={subject.teacher_id}
                            onChange={(e) =>
                                setSubject((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    };
                                })
                            }
                        >
                            <option value="0">Chọn giảng viên</option>
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
                <button className={cx('view-subject-btn')} onClick={() => setShowViewSubject(true)}>
                    Xem danh sách môn học
                </button>
                <button className={cx('save-btn')} onClick={handleOpenNewSubject}>
                    Lưu
                </button>
            </div>
            {showViewSubject && <ViewSubjects close={setShowViewSubject} />}
        </div>
    );
};

export default OpenSubject;
