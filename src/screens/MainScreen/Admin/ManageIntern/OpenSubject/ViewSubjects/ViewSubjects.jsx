/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ViewSubjects.module.scss';
import { Close } from '@mui/icons-material';

import SubjectItem from './SubjectItem';
import LoadingSpinner from '../../../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const ViewSubjects = ({ close }) => {
    const [subjects, setSubjects] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [filter, setFilter] = useState({
        semester_id: 0,
        academic_year: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [successfulEdit, setSuccessfulEdit] = useState(false);

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

    const getSubjects = async () => {
        axios
            .get('/admin/subject', {
                params: filter,
            })
            .then((res) => setSubjects(res.data.responseData))
            .then(() => setIsLoading(false))
            .catch((err) => alert('Lỗi: ', err));
    };

    useEffect(() => {
        getSemesters();
        getAcademicYears();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getSubjects();
        setSuccessfulEdit(false);
    }, [filter]);

    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => close(false)} />
            <h3 className={cx('main-heading')}>Danh sách môn học đã mở</h3>
            <div className={cx('filters')}>
                <select
                    className={cx('filter-select-item')}
                    name="academic_year"
                    onChange={(e) => setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
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
                    onChange={(e) => setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                >
                    <option value="0">Học kỳ</option>
                    {semesters.length > 0 &&
                        semesters.map((semesterItem) => (
                            <option key={semesterItem.id} value={semesterItem.id}>
                                {semesterItem.semester_name}
                            </option>
                        ))}
                </select>
            </div>
            {isLoading === true ? (
                <LoadingSpinner />
            ) : (
                <div className={cx('subject-list')}>
                    {subjects.length > 0 &&
                        subjects.map((subject) => (
                            <SubjectItem subject={subject} key={subject.id} setSuccessfulEdit={setSuccessfulEdit} />
                        ))}
                </div>
            )}
        </div>
    );
};

export default ViewSubjects;
