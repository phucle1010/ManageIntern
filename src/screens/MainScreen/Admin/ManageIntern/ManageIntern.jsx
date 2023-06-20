import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ManageIntern.module.scss';

import SearchBox from '../../../../components/SearchBox';
import InternItem from './InternItem';
import OpenSubject from './OpenSubject';
import InternMark from './InternMark';
import InternshipItem from './InternshipItem';
import Loading from '../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const WAITING_CONFIRM = ['Ảnh', 'Mã số sinh viên', 'Họ và tên', 'Giảng viên hướng dẫn'];
const WAITING_HEADINGS = ['Ảnh', 'Mã số sinh viên', 'Họ và tên', 'Vị trí thực tập'];
const INTERNED_HEADINGS = [...WAITING_HEADINGS, 'Điểm tổng kết'];
const INTERNING_HEADINGS = [...WAITING_HEADINGS, 'Thời gian thực tập'];

const INTERNED_LIST = [
    {
        id: 1,
        name: 'Đỗ Nguyên Triết',
        position: 'Tester',
        img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
        score: 9,
        internTime: '3 tháng',
    },
    {
        id: 2,
        name: 'Đặng Hồng Phong',
        position: 'Design',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        score: 8,
        internTime: '4 tháng',
    },
];
const INTERNING_LIST = [
    {
        id: 1,
        name: 'Lê Hoài Thương',
        position: 'Back End Dev',
        img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
        internTime: '3 tháng',
    },
    {
        id: 2,
        name: 'Nguyễn Minh Trí',
        position: 'Front End Dev',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        internTime: '4 tháng',
    },
];

const Filter = () => {
    return (
        <div className={cx('filters')}>
            <div className={cx('main-filter')}>
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
            </div>
            <SearchBox />
        </div>
    );
};

const FilterComfirm = ({ setAcademic, setSemester, setTeacher }) => {
    const [academics, setAcademics] = useState([{}]);
    const [semesters, setSemesters] = useState([{}]);
    const [teachers, setTeachers] = useState([{}]);

    const loadAcademics = () => {
        axios
            .get('/admin/academic-year')
            .then((res) => setAcademics(res.data.responseData))
            .catch((err) => console.log(err));
    };

    const loadSemester = () => {
        axios
            .get('/admin/semester')
            .then((res) => setSemesters(res.data.responseData))
            .catch((err) => console.log(err));
    };

    const loadTeacher = () => {
        axios
            .get('/admin/teacher')
            .then((res) => setTeachers(res.data.responseData))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadAcademics();
        loadSemester();
        loadTeacher();
    }, []);

    return (
        <div className={cx('filters')}>
            <div className={cx('main-filter')}>
                <select className={cx('filter-select-item')} onChange={(e) => setAcademic(e.target.value)}>
                    <option value={0}>Năm học</option>
                    {academics.map((academic) => (
                        <option key={academic.current_year} value={academic.id} className={cx('option-value')}>
                            {academic.current_year}
                        </option>
                    ))}
                </select>
                <select className={cx('filter-select-item')} onChange={(e) => setSemester(e.target.value)}>
                    <option value={0}>Học kỳ</option>
                    {semesters.map((semester) => (
                        <option key={semester.semester_name} value={semester.id} className={cx('option-value')}>
                            {semester.semester_name}
                        </option>
                    ))}
                </select>
                <select className={cx('filter-select-item')} onChange={(e) => setTeacher(e.target.value)}>
                    <option value={0}>Giảng viên</option>
                    {teachers.map((teacher) => (
                        <option key={teacher.full_name} value={teacher.id} className={cx('option-value')}>
                            {teacher.full_name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

const ManageIntern = () => {
    const [openSubjectScreen, setOpenSubjectScreen] = useState(false);
    const [internMarkScreen, setInternMarkScreen] = useState(false);
    const [studentSignUpIntern, setStudentSignUpIntern] = useState([{}]);
    const [academic, setAcademic] = useState(0);
    const [semester, setSemester] = useState(0);
    const [teacher, setTeacher] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [studentRequestJobIntern, setStudentRequestJobIntern] = useState([]);

    const loadStudentSignUpIntern = async () => {
        await axios
            .get('/admin/student/signup_intern', { params: { academic, semester, teacher } })
            .then((res) => setStudentSignUpIntern(res.data))
            .then(() => setIsLoaded(true))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadStudentSignUpIntern();
    }, [academic, semester, teacher]);

    const loadStudentRequestJobIntern = () => {
        axios
            .get('/admin/student/request_job')
            .then((res) => setStudentRequestJobIntern(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadStudentRequestJobIntern();
    }, []);

    return (
        <React.Fragment>
            {isLoaded ? (
                <div className={cx('wrapper')}>
                    <h3 className={cx('title-heading')}>THỰC TẬP</h3>
                    <div className={cx('options')}>
                        <button className={cx('btn-add')} onClick={() => setOpenSubjectScreen(true)}>
                            Mở môn học
                        </button>
                    </div>
                    <div className={cx('intern-category')}>
                        <h4 className={cx('list-heading')}>
                            Danh sách đang chờ xử lý yêu cầu đăng ký tín chỉ thực tập
                        </h4>
                        <FilterComfirm setAcademic={setAcademic} setSemester={setSemester} setTeacher={setTeacher} />
                        <div className={cx('intern-list')}>
                            <div className={cx('intern-heading-list')}>
                                <ul className={cx('main-heading-list')}>
                                    {WAITING_CONFIRM.map((heading, index) => (
                                        <li className={cx('main-heading')} key={index}>
                                            {heading}
                                        </li>
                                    ))}
                                </ul>
                                <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5>
                            </div>
                            {studentSignUpIntern.length > 0 &&
                                studentSignUpIntern.map((student) => (
                                    <InternItem key={student.id} student={student} interned={false} waiting={true} />
                                ))}
                        </div>
                    </div>
                    <div className={cx('intern-category')}>
                        <h4 className={cx('list-heading')}>Danh sách đang chờ xử lý yêu cầu đăng ký thực tập</h4>
                        <div className={cx('intern-list')}>
                            <div className={cx('intern-heading-list')}>
                                <ul className={cx('main-heading-list')}>
                                    {WAITING_HEADINGS.map((heading, index) => (
                                        <li className={cx('main-heading')} key={index}>
                                            {heading}
                                        </li>
                                    ))}
                                </ul>
                                <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5>
                            </div>
                            {studentRequestJobIntern.length > 0 &&
                                studentRequestJobIntern.map((student) => (
                                    <InternshipItem
                                        key={student.id}
                                        student={student}
                                        interned={false}
                                        waiting={true}
                                        // setInternInfoScreen={setInternInfoScreen}
                                        // setInternMarkScreen={() => {}}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className={cx('intern-category')}>
                        <h4 className={cx('list-heading')}>Danh sách sinh viên đang thực tập</h4>
                        <Filter />
                        <div className={cx('intern-list')}>
                            <div className={cx('intern-heading-list')}>
                                <ul className={cx('main-heading-list')}>
                                    {INTERNING_HEADINGS.map((heading, index) => (
                                        <li className={cx('main-heading')} key={index}>
                                            {heading}
                                        </li>
                                    ))}
                                </ul>
                                {/* <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5> */}
                            </div>
                            {INTERNING_LIST.length > 0 &&
                                INTERNING_LIST.map((student) => (
                                    <InternItem
                                        key={student.id}
                                        student={student}
                                        interned={false}
                                        waiting={false}
                                        // setInternInfoScreen={() => {}}
                                        // setInternMarkScreen={setInternMarkScreen}
                                    />
                                ))}
                        </div>
                        <button className={cx('btn-mark')} onClick={() => setInternMarkScreen(true)}>
                            Xem hội đồng chấm thi
                        </button>
                    </div>
                    <div className={cx('intern-category')}>
                        <h4 className={cx('list-heading')}>Danh sách sinh viên đã hoàn thành thực tập</h4>
                        <Filter />
                        <div className={cx('intern-list')}>
                            <div className={cx('intern-heading-list')}>
                                <ul className={cx('main-heading-list', 'interned')}>
                                    {INTERNED_HEADINGS.map((heading, index) => (
                                        <li className={cx('main-heading')} key={index}>
                                            {heading}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {INTERNED_LIST.length > 0 &&
                                INTERNED_LIST.map((student) => (
                                    <InternItem key={student.id} student={student} interned={true} waiting={false} />
                                ))}
                        </div>
                    </div>

                    {openSubjectScreen && <OpenSubject close={setOpenSubjectScreen} />}
                    {internMarkScreen && <InternMark close={setInternMarkScreen} />}
                </div>
            ) : (
                <Loading />
            )}
        </React.Fragment>
    );
};

export default ManageIntern;
