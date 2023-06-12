import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './NewInternMark.module.scss';
import { Close } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const NewInternMark = ({ close, newInternMark, isEdit }) => {
    const admin = useSelector((state) => state.user);
    const [school, setSchool] = useState({});
    const [departments, setDepartments] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [internMarkItem, setInternMarkItem] = useState(newInternMark);
    const [teachers, setTeachers] = useState([]);

    const getSemesters = async () => {
        await axios
            .get('/admin/semester')
            .then((res) => res.data.statusCode === 200 && setSemesters(res.data.responseData))
            .catch((err) => alert('Lỗi: ', err));
    };

    const getAcademicYears = async () => {
        await axios
            .get('/admin/academic-year')
            .then((res) => res.data.statusCode === 200 && setAcademicYears(res.data.responseData))
            .catch((err) => alert('Lỗi: ', err));
    };

    const getDepartments = async () => {
        await axios
            .get('/admin/department', {
                params: {
                    schoolId: school.id,
                },
            })
            .then((res) => {
                setDepartments(res.data.responseData);
            });
        // .then(() => setIsLoading(false));
    };

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
            getDepartments();
            getSemesters();
            getAcademicYears();
        }
    }, [school]);

    const getAllTeachersInDepartment = async () => {
        await axios
            .get('/admin/department/teachers/active', {
                params: {
                    departmentId: internMarkItem.department_id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setTeachers(res.data.responseData);
                }
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        if (internMarkItem.department_id) {
            getAllTeachersInDepartment();
        }
    }, [internMarkItem.department_id]);

    const postInternMark = async () => {
        await axios
            .post('/admin/intern/board/new', internMarkItem)
            .then((res) => {
                alert(res.data.responseData);
                if (res.data.statusCode === 200) {
                    close({});
                }
            })
            .catch((err) => alert(err));
    };

    const putInternMark = async () => {
        await axios
            .put('/admin/intern/board/edit', internMarkItem)
            .then((res) => {
                alert(res.data.responseData);
                if (res.data.statusCode === 200) {
                    close({});
                }
            })
            .catch((err) => alert(err));
    };

    const handleInternMark = async () => {
        if (isEdit) {
            putInternMark();
        } else {
            postInternMark();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => close({})} />
            <h3 className={cx('main-heading')}>Thông tin hội đồng chấm thi</h3>
            <h4 className={cx('title-heading')}>{`${isEdit ? 'Chỉnh sửa' : 'Tạo mới'}`}</h4>
            <div className={cx('board-form')}>
                <div className={cx('board-data-item')}>
                    <h5 className={cx('input-title')}>Năm học</h5>
                    <select
                        className={cx('input-item')}
                        name="academic_year"
                        value={internMarkItem.academic_year}
                        onChange={(e) =>
                            e.target.value !== '' &&
                            setInternMarkItem((prev) => {
                                return {
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                };
                            })
                        }
                    >
                        <option value="">Chọn Năm học</option>
                        {academicYears.length > 0 &&
                            academicYears.map((academicYearItem) => (
                                <option key={academicYearItem.id} value={academicYearItem.id}>
                                    {academicYearItem.current_year}
                                </option>
                            ))}
                    </select>
                </div>
                <div className={cx('board-data-item')}>
                    <h5 className={cx('input-title')}>Học kỳ</h5>
                    <select
                        className={cx('input-item')}
                        name="semester_id"
                        value={internMarkItem.semester_id}
                        onChange={(e) =>
                            e.target.value !== '' &&
                            setInternMarkItem((prev) => {
                                return {
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                };
                            })
                        }
                    >
                        <option value="">Chọn Học kỳ</option>
                        {semesters.length > 0 &&
                            semesters.map((semesterItem) => (
                                <option key={semesterItem.id} value={semesterItem.id}>
                                    {semesterItem.semester_name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className={cx('board-data-item', 'full-width')}>
                    <h5 className={cx('input-title')}>Khoa</h5>
                    <select
                        className={cx('input-item')}
                        name="department_id"
                        value={internMarkItem.department_id}
                        onChange={(e) =>
                            e.target.value !== '' &&
                            setInternMarkItem((prev) => {
                                return {
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                };
                            })
                        }
                    >
                        <option value="">Chọn Khoa</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.department_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('board-data-item', 'full-width')}>
                    <h5 className={cx('input-title')}>Chủ tịch</h5>
                    <select
                        className={cx('input-item')}
                        name="president"
                        value={internMarkItem.president}
                        onChange={(e) =>
                            e.target.value !== '' &&
                            setInternMarkItem((prev) => {
                                return {
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                };
                            })
                        }
                    >
                        <option value="">Chọn Giảng viên</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.full_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('board-data-item', 'full-width')}>
                    <h5 className={cx('input-title')}>Thư ký</h5>
                    <select
                        className={cx('input-item')}
                        name="secretary"
                        value={internMarkItem.secretary}
                        onChange={(e) =>
                            e.target.value !== '' &&
                            setInternMarkItem((prev) => {
                                return {
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                };
                            })
                        }
                    >
                        <option value="">Chọn Giảng viên</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.full_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('board-data-item', 'full-width')}>
                    <h5 className={cx('input-title')}>Người phản biện</h5>
                    <select
                        className={cx('input-item')}
                        name="asker"
                        value={internMarkItem.asker}
                        onChange={(e) =>
                            e.target.value !== '' &&
                            setInternMarkItem((prev) => {
                                return {
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                };
                            })
                        }
                    >
                        <option value="">Chọn Giảng viên</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.full_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className={cx('btn-save')} onClick={handleInternMark}>
                    Lưu thông tin
                </button>
            </div>
        </div>
    );
};

export default NewInternMark;
