import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './InternMark.module.scss';
import { Close } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

import NewInternMark from './NewInternMark';
import LoadingSpinner from '../../../../../components/LoadingSpinner/LoadingSpinner';

const cx = classNames.bind(styles);

const InternMark = ({ close }) => {
    const admin = useSelector((state) => state.user);
    const [school, setSchool] = useState({});
    const [departments, setDepartments] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [filter, setFilter] = useState({
        semester_id: 0,
        academic_year: 0,
        department_id: 0,
    });
    const [isEdit, setIsEdit] = useState(true);
    const [newInternMark, setNewInternMark] = useState({});
    const [internMarkBoard, setInternMarkBoard] = useState({});
    const [teachers, setTeachers] = useState([]);
    const [loaded, setLoaded] = useState(false);

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

    const getAllInternBoards = async () => {
        await axios
            .get('/admin/intern/board/all', {
                params: filter,
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setInternMarkBoard(res.data.responseData);
                }
                if (res.data.statusCode === 404) {
                    setInternMarkBoard({
                        msg: 'Not found',
                    });
                }
            })
            .catch((err) => alert(err));
    };

    const getAllTeachers = async () => {
        await axios
            .get('/admin/teacher')
            .then((res) => res.data.statusCode === 200 && setTeachers(res.data.responseData))
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getAllTeachers();
        if (filter.academic_year !== 0 && filter.department_id !== 0 && filter.semester_id !== 0) {
            getAllInternBoards();
        }
        setLoaded(true);
    }, [newInternMark, filter]);

    const getName = (id) => {
        return teachers.filter((teacher) => teacher.id === id)[0]?.full_name;
    };

    const getEmail = (id) => {
        return teachers.filter((teacher) => teacher.id === id)[0]?.email;
    };

    const getAvavatar = (id) => {
        return teachers.filter((teacher) => teacher.id === id)[0]?.image;
    };

    const handleRemoveInternBoard = async () => {
        const notice = 'Bạn chắc chắn muốn xóa thông tin hội đồng chấm thi này chứ ?';
        if (window.confirm(notice)) {
            await axios
                .delete('/admin/intern/board/delete', {
                    params: {
                        id: internMarkBoard.id,
                    },
                })
                .then((res) => {
                    alert(res.data.responseData);
                    if (res.data.statusCode === 200) {
                        getAllInternBoards();
                    }
                })
                .catch((err) => alert(err));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => close(false)} />
            <h3 className={cx('title-heading')}>Thông tin chấm điểm</h3>
            {loaded ? (
                <div className={cx('list-info')}>
                    <h4 className={cx('list-heading')}>Thông tin hội đồng chấm thi</h4>
                    <div className={cx('filters')}>
                        <select
                            className={cx('filter-select-item')}
                            name="academic_year"
                            value={filter.academic_year}
                            onChange={(e) =>
                                e.target.value !== '' &&
                                setFilter((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    };
                                })
                            }
                        >
                            <option value="0">Năm học</option>
                            {academicYears.length > 0 &&
                                academicYears.map((academicYearItem) => (
                                    <option key={academicYearItem.id} value={academicYearItem.id}>
                                        {academicYearItem.current_year}
                                    </option>
                                ))}
                        </select>
                        <select
                            className={cx('filter-select-item')}
                            name="semester_id"
                            value={filter.semester_id}
                            onChange={(e) =>
                                e.target.value !== '' &&
                                setFilter((prev) => {
                                    return {
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    };
                                })
                            }
                        >
                            <option value="0">Học kỳ</option>
                            {semesters.length > 0 &&
                                semesters.map((semesterItem) => (
                                    <option key={semesterItem.id} value={semesterItem.id}>
                                        {semesterItem.semester_name}
                                    </option>
                                ))}
                        </select>
                        <select
                            className={cx('filter-select-item')}
                            name="department_id"
                            value={filter.department_id}
                            onChange={(e) =>
                                e.target.value !== '' &&
                                setFilter((prev) => {
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
                        <button
                            className={cx('btn-add')}
                            onClick={() => {
                                setIsEdit(false);
                                setNewInternMark({
                                    id: null,
                                    president: null,
                                    secretary: null,
                                    asker: null,
                                    academic_year: null,
                                    semester_id: null,
                                    department_id: null,
                                });
                            }}
                        >
                            Tạo mới
                        </button>
                    </div>
                    {Object.keys(internMarkBoard).length > 0 ? (
                        internMarkBoard.msg ? (
                            <h4>Chưa có dữ liệu đối với bộ lọc này</h4>
                        ) : (
                            <React.Fragment>
                                <div className={cx('list-detail', 'community')}>
                                    <div className={cx('list-detail-item')}>
                                        <Avatar
                                            src={
                                                getAvavatar(internMarkBoard.president) ||
                                                'https://icons.veryicon.com/png/o/business/bitcoin-icon/anonymous-4.png'
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <span className={cx('list-detail-item')}>{getName(internMarkBoard.president)}</span>
                                    <span className={cx('list-detail-item')}>Chủ tịch</span>
                                    <span className={cx('list-detail-item')}>
                                        {getEmail(internMarkBoard.president)}
                                    </span>
                                </div>
                                <div className={cx('list-detail', 'community')}>
                                    <div className={cx('list-detail-item')}>
                                        <Avatar
                                            src={
                                                getAvavatar(internMarkBoard.secretary) ||
                                                'https://icons.veryicon.com/png/o/business/bitcoin-icon/anonymous-4.png'
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <span className={cx('list-detail-item')}>{getName(internMarkBoard.secretary)}</span>
                                    <span className={cx('list-detail-item')}>Thư ký</span>
                                    <span className={cx('list-detail-item')}>
                                        {getEmail(internMarkBoard.secretary)}
                                    </span>
                                </div>
                                <div className={cx('list-detail', 'community')}>
                                    <div className={cx('list-detail-item')}>
                                        <Avatar
                                            src={
                                                getAvavatar(internMarkBoard.asker) ||
                                                'https://icons.veryicon.com/png/o/business/bitcoin-icon/anonymous-4.png'
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <span className={cx('list-detail-item')}>{getName(internMarkBoard.asker)}</span>
                                    <span className={cx('list-detail-item')}>Người phản biện</span>
                                    <span className={cx('list-detail-item')}>{getEmail(internMarkBoard.asker)}</span>
                                </div>
                                <div className={cx('btn-options')}>
                                    <button
                                        className={cx('btn-add', 'btn-edit')}
                                        onClick={() => {
                                            setIsEdit(true);
                                            setNewInternMark(internMarkBoard);
                                        }}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button className={cx('btn-add', 'btn-delete')} onClick={handleRemoveInternBoard}>
                                        Xóa
                                    </button>
                                </div>
                            </React.Fragment>
                        )
                    ) : (
                        <h4>Vui lòng lựa chọn thông tin bộ lọc</h4>
                    )}
                    {Object.keys(newInternMark).length > 0 && (
                        <NewInternMark close={setNewInternMark} newInternMark={newInternMark} isEdit={isEdit} />
                    )}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
};

export default InternMark;
