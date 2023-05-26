/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './SubjectItem.module.scss';
import { Edit } from '@mui/icons-material';

const cx = classNames.bind(styles);

const SubjectItem = ({ subject, setSuccessfulEdit }) => {
    const admin = useSelector((state) => state.user);
    const [subjectItem, setSubjectItem] = useState(subject);
    const [academicYears, setAcademicYears] = useState([]);
    const [school, setSchool] = useState({});
    const [departments, setDepartments] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [showEdit, setShowEdit] = useState(false);

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
        if (subjectItem.department_id) {
            axios
                .get('/admin/department/teachers', {
                    params: {
                        departmentId: subjectItem.department_id,
                    },
                })
                .then((res) => {
                    setTeachers(res.data.responseData);
                });
        }
    }, [subjectItem.department_id]);

    const handleEditSubject = () => {
        axios
            .put('/admin/subject/edit', subjectItem)
            .then((res) => {
                alert(res.data.responseData);
                if (res.data.statusCode === 200) {
                    setSuccessfulEdit(true);
                }
            })
            .catch((err) => console.log('Lỗi: ', err));
    };

    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('subject-name')}>Môn học Thực tập tốt nghiệp</h4>
            <div className={cx('subject-desc')}>
                <span className={cx('desc-item')}>
                    <b>Số tín chỉ: </b>
                    {`${subjectItem.unit}`}
                </span>
                <span className={cx('desc-item')}>
                    <b>Số buổi học: </b>
                    {`${subjectItem.sessions}`}
                </span>
                <span className={cx('desc-item')}>
                    <b>Số lượng sinh viên: </b>
                    {` ${subjectItem.max_students}`}
                </span>
            </div>
            <div className={cx('subject-ref')}>
                <span className={cx('ref-item')}>
                    <b>Giảng viên: </b>
                    <i>{`${subjectItem.teacher_id}`}</i>
                </span>
                <span className={cx('ref-item')}>
                    <b>Khoa: </b>
                    {`${subjectItem.department_id}`}
                </span>
            </div>
            <Edit className={cx('edit-btn')} onClick={() => setShowEdit((prev) => !prev)} />
            {showEdit && (
                <React.Fragment>
                    <div className={cx('subject-form')}>
                        <div className={cx('subject-data-item')}>
                            <h5 className={cx('input-title')}>Năm học</h5>
                            <select
                                className={cx('input-item')}
                                name="academic_year"
                                onChange={(e) =>
                                    setSubjectItem((prev) => {
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
                                value={subjectItem.semester_id}
                                onChange={(e) =>
                                    setSubjectItem((prev) => {
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
                                value={subjectItem.unit}
                                onChange={(e) =>
                                    setSubjectItem((prev) => {
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
                                value={subjectItem.sessions}
                                onChange={(e) =>
                                    setSubjectItem((prev) => {
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
                                value={subjectItem.max_students}
                                onChange={(e) =>
                                    setSubjectItem((prev) => {
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
                                value={subjectItem.department_id}
                                onChange={(e) =>
                                    setSubjectItem((prev) => {
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
                                value={subjectItem.teacher_id}
                                onChange={(e) =>
                                    setSubjectItem((prev) => {
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
                    <div className={cx('btn-options')}>
                        <button className={cx('save-btn')} onClick={handleEditSubject}>
                            Lưu thay đổi
                        </button>
                        <button className={cx('close-btn')} onClick={() => setShowEdit(false)}>
                            Đóng
                        </button>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default SubjectItem;
