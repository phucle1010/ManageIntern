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

const WAITING_CONFIRM = ['Ảnh', 'Mã sinh viên', 'Họ và tên', 'Giảng viên hướng dẫn'];
const WAITING_HEADINGS = ['Ảnh', 'Mã sinh viên', 'Họ và tên', 'Vị trí thực tập'];
const INTERNED_HEADINGS = [...WAITING_HEADINGS, 'Điểm tổng kết'];
const INTERNING_HEADINGS = [...WAITING_HEADINGS, 'Lựa chọn'];

const Filter = ({ setAcademic, setSemester, setSearchStudentInternRequestJob, searchStudentInternRequestJob }) => {
    const [academics, setAcademics] = useState([{}]);
    const [semesters, setSemesters] = useState([{}]);

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

    useEffect(() => {
        loadAcademics();
        loadSemester();
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
            </div>
            <SearchBox search={searchStudentInternRequestJob} setSearch={setSearchStudentInternRequestJob} />
        </div>
    );
};

const FilterComfirm = ({ setAcademic, setSemester, setTeacher, setSearchStudentIntern, searchStudentIntern }) => {
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
            <SearchBox search={searchStudentIntern} setSearch={setSearchStudentIntern} />
        </div>
    );
};

const ManageIntern = () => {
    const [openSubjectScreen, setOpenSubjectScreen] = useState(false);
    const [internMarkScreen, setInternMarkScreen] = useState(false);
    const [academic, setAcademic] = useState(0);
    const [semester, setSemester] = useState(0);
    const [teacher, setTeacher] = useState(0);
    const [studentSignUpIntern, setStudentSignUpIntern] = useState([{}]);
    const [studentRequestJobIntern, setStudentRequestJobIntern] = useState([]);
    const [interningStudents, setInterningStudents] = useState([]);
    const [internedStudents, setInternedStudents] = useState([]);
    const [academicRequestJob, setAcademicRequestJob] = useState(0);
    const [semesterRequestJob, setSemesterRequestJob] = useState(0);
    const [searchStudentIntern, setSearchStudentIntern] = useState(null);
    const [searchStudentInternRequestJob, setSearchStudentInternRequestJob] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadStudentSignUpIntern = async () => {
        await axios
            .get('/admin/student/signup_intern', {
                params: { academic, semester, teacher, searchStudentIntern: searchStudentIntern || null },
            })
            .then((res) => setStudentSignUpIntern(res.data))

            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadStudentSignUpIntern();
    }, [academic, semester, teacher, searchStudentIntern]);

    const loadStudentRequestJobIntern = () => {
        axios
            .get('/admin/student/request_job', {
                params: {
                    academic: academicRequestJob,
                    semester: semesterRequestJob,
                    search: searchStudentInternRequestJob || null,
                },
            })
            .then((res) => setStudentRequestJobIntern(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadStudentRequestJobIntern();
    }, [academicRequestJob, semesterRequestJob, searchStudentInternRequestJob]);

    const loadInterningStudents = async () => {
        await axios
            .get('/admin/intern/students', {
                params: {
                    searchIntern: '',
                },
            })
            .then((res) => res.data.statusCode === 200 && setInterningStudents(res.data.responseData))
            .catch((err) => alert(err));
    };

    const loadInternedStudents = async () => {
        await axios
            .get('/admin/intern/students/completed')
            .then((res) => res.data.statusCode === 200 && setInternedStudents(res.data.responseData))
            .then(() => setIsLoaded(true))
            .catch((err) => alert(err));
    };

    useEffect(() => {
        loadInterningStudents();
        loadInternedStudents();
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
                        <FilterComfirm
                            setAcademic={setAcademic}
                            setSemester={setSemester}
                            setTeacher={setTeacher}
                            setSearchStudentIntern={setSearchStudentIntern}
                            searchStudentIntern={searchStudentIntern}
                        />
                        {studentSignUpIntern.length > 0 ? (
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
                                        <InternItem
                                            key={student.id}
                                            student={student}
                                            interned={false}
                                            waiting={true}
                                            loadStudentSignUpIntern={loadStudentSignUpIntern}
                                        />
                                    ))}
                            </div>
                        ) : (
                            <span className={cx('notice')}>Không có bất kỳ dữ liệu đang chờ xử lý nào</span>
                        )}
                    </div>
                    <div className={cx('intern-category')}>
                        <h4 className={cx('list-heading')}>Danh sách đang chờ xử lý yêu cầu đăng ký thực tập</h4>
                        <Filter
                            setAcademic={setAcademicRequestJob}
                            setSemester={setSemesterRequestJob}
                            setSearchStudentInternRequestJob={setSearchStudentInternRequestJob}
                            searchStudentInternRequestJob={searchStudentInternRequestJob}
                        />
                        {studentRequestJobIntern.length > 0 ? (
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
                                            loadStudentRequestJobIntern={loadStudentRequestJobIntern}
                                        />
                                    ))}
                            </div>
                        ) : (
                            <span className={cx('notice')}>Không có bất kỳ dữ liệu đang chờ xử lý nào</span>
                        )}
                    </div>
                    <div className={cx('intern-category')}>
                        <h4 className={cx('list-heading')}>Danh sách sinh viên đang thực tập</h4>
                        {interningStudents.length > 0 ? (
                            <React.Fragment>
                                <div className={cx('intern-list')}>
                                    <div className={cx('intern-heading-list')}>
                                        <ul className={cx('main-heading-list')}>
                                            {INTERNING_HEADINGS.map((heading, index) => (
                                                <li className={cx('main-heading')} key={index}>
                                                    {heading}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {interningStudents.map((student) => (
                                        <InternItem
                                            key={student.id}
                                            student={student}
                                            interned={false}
                                            waiting={false}
                                            loadStudentSignUpIntern={loadStudentSignUpIntern}
                                        />
                                    ))}
                                </div>
                                <button className={cx('btn-mark')} onClick={() => setInternMarkScreen(true)}>
                                    Xem hội đồng chấm thi
                                </button>
                            </React.Fragment>
                        ) : (
                            <span className={cx('notice')}>Không có bất kỳ dữ liệu sinh viên nào</span>
                        )}
                    </div>
                    <div className={cx('intern-category')}>
                        <h4 className={cx('list-heading')}>Danh sách sinh viên đã hoàn thành thực tập</h4>
                        {internedStudents.length > 0 ? (
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
                                {internedStudents.map((student) => (
                                    <InternItem
                                        key={student.id}
                                        student={student}
                                        interned={true}
                                        waiting={false}
                                        loadStudentSignUpIntern={loadStudentSignUpIntern}
                                    />
                                ))}
                            </div>
                        ) : (
                            <span className={cx('notice')}>Không có bất kỳ dữ liệu sinh viên nào</span>
                        )}
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
