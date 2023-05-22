import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageStudent.module.scss';

import SearchBox from '../../../../components/SearchBox';
import StudentItem from './StudentItem';
import NewStudent from './NewStudent';
import axios from 'axios';

const cx = classNames.bind(styles);
const HEADINGS = ['Ảnh', 'Mã số sinh viên', 'Họ và tên', 'Lớp', 'Tình trạng'];

const ManageStudent = () => {
    const [showNewStudent, setShowNewStudent] = useState(false);
    const [studentlist, setStudentList] = useState([]);
    const [academicYear, setAcademicYear] = useState([]);
    const [year, setYear] = useState(null);

    useEffect(() => {
        axios
            .get('/class/academicyear')
            .then((res) => setAcademicYear(res.data))
            .catch((err) => console.log({err: err}));
    }, []);

    useEffect(() => {
        getAllStudent();
    }, []);

    const getAllStudent = () => {
        axios
            .get('/student')
            .then((res) => {setStudentList(res.data);
                console.log(studentlist);})
            .catch((err) => console.log({err: err}));
    }

    const getSudentOfYear = () => {
        axios
            .get(`/student/year?year='${year}'`)
            .then((res) => {setStudentList(res.data);
                console.log(studentlist);})
            .catch((err) => console.log({err: err}));
    }

    
    useEffect(() => {
        if (year === ""){
            getAllStudent();
        }else if (year !== null){
            getSudentOfYear();
        }
    }, [year]);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('list-heading')}>DANH SÁCH SINH VIÊN</h3>
            <SearchBox className={cx('search')} />
            <div className={cx('filters')}>
                <select value={year} className={cx('filter-select-item')} 
                    onChange={(e) => {
                        setYear(e.target.value)

                        }} >
                    <option value="" > Tất cả </option>
                    {academicYear.map((years) => (
                        <option
                            key={years.academic_year}
                            value={years.academic_year}
                            className={cx('option-value')}
                        >
                            {years.academic_year}
                        </option>
                    ))}
                </select>
                <select className={cx('filter-select-item')}>
                    <option value="">Học kỳ</option>
                    <option value="">Học kỳ 1</option>
                    <option value="">Học kỳ 2</option>
                </select>
                <button className={cx('btn-add')} onClick={() => setShowNewStudent(true)}>
                    Thêm mới
                </button>
                <button className={cx('btn-add', 'btn-export')}>Xuất File</button>
            </div>

            <div className={cx('student-list')}>
                <div className={cx('student-heading-list')}>
                    <ul className={cx('main-heading-list')}>
                        {HEADINGS.map((heading, index) => (
                            <li className={cx('main-heading')} key={index}>
                                {heading}
                            </li>
                        ))}
                    </ul>
                    <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5>
                </div>

                {studentlist.length > 0 && studentlist.map((student) => <StudentItem key={student.student_id} student={student} />)}
            </div>
            {showNewStudent === true && <NewStudent show={setShowNewStudent} editable={true} />}
        </div>
    );
};

export default ManageStudent;
