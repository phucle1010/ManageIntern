import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ScoreTable.module.scss';
import { Avatar } from '@mui/material';
import { Save, Restore, Edit, AttachFile } from '@mui/icons-material';

import SearchBox from '../../../../components/SearchBox';
import Loading from '../../../../components/LoadingSpinner/LoadingSpinner';
import SendFile from './SendFile';

const cx = classNames.bind(styles);

const MENU_HEADINGS = ['Ảnh', 'Mã số sinh viên', 'Họ và tên', 'Lớp', 'Điểm', 'Lựa chọn'];

const ScoreTable = () => {
    const [students, setStudents] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [academics, setAcademics] = useState([]);

    const [academic, setAcademic] = useState();
    const [semester, setSemester] = useState();
    const [editedScores, setEditedScores] = useState({});
    const [searchStudent, setSearchStudent] = useState(null);
    const [showSendFile, setShowSendFile] = useState({});
    const [loaded, setLoaded] = useState(false);

    const loadData = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .get('/teacher/student', {
                params: { academic, semester, searchStudent: searchStudent || null },
                headers: { Authorization: token },
            })
            .then((res) => {
                setStudents(res.data);
                setStudents(res.data.map((student) => ({ ...student, editable: false })));
            })
            .then(() => setLoaded(true))
            .catch((err) => console.log(err));
    };

    const loadSemester = () => {
        axios
            .get('/admin/semester')
            .then((res) => setSemesters(res.data.responseData))
            .catch((err) => console.log(err));
    };

    const loadAcademics = () => {
        axios
            .get('/admin/academic-year')
            .then((res) => setAcademics(res.data.responseData))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadAcademics();
        loadSemester();
    }, []);

    useEffect(() => {
        loadData();
    }, [academic, semester, searchStudent]);

    const handleSave = (studentId, score, id) => {
        setEditedScores({
            ...editedScores,
            [studentId]: score,
        });
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .put(`/teacher/save_score/${studentId}`, [{ studentId, score, id }], { headers: { Authorization: token } })
            .then((res) => {
                setStudents(res.data);
            })
            .catch((err) => console.log(err));
    };

    const handleRestore = (studentId) => {
        setEditedScores({
            ...editedScores,
            [studentId]: undefined,
        });
    };
    const handleSaveAll = () => {
        const editedStudents = students.filter((student) => editedScores[student.studentId] !== undefined);
        const editedStudentScores = editedStudents.map((student) => ({
            studentId: student.studentId,
            score: editedScores[student.studentId],
            id: student.studentLearnInternId,
        }));
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .put('/teacher/save_score', editedStudentScores, { headers: { Authorization: token } })
            .then((res) => {
                setStudents(res.data);
                setEditedScores({});
            })
            .catch((err) => console.log(err));
    };

    const handleScoreChange = (event, studentId) => {
        const score = event.target.value;
        setEditedScores({
            ...editedScores,
            [studentId]: score,
        });
    };

    return (
        <React.Fragment>
            {loaded ? (
                <div className={cx('wrapper')}>
                    <h3 className={cx('title-heading')}>BẢNG ĐIỂM</h3>
                    <SearchBox className={cx('search')} search={searchStudent} setSearch={setSearchStudent} />
                    <h4 className={cx('main-heading')}>Danh sách sinh viên</h4>
                    <div className={cx('filters')}>
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
                    <div className={cx('student-container')}>
                        <div className={cx('menu-list')}>
                            {MENU_HEADINGS.map((menu, index) => (
                                <span className={cx('menu-item')} key={index}>
                                    {menu}
                                </span>
                            ))}
                        </div>
                        <div className={cx('student-list')}>
                            {students?.map((student) => (
                                <div key={student.studentId} className={cx('student-item')}>
                                    <div className={cx('student-item-detail')}>
                                        <Avatar src={student.image} />
                                    </div>
                                    <div className={cx('student-item-detail')}>
                                        <span>{student.studentId}</span>
                                    </div>
                                    <div className={cx('student-item-detail')}>
                                        <span>{student.full_name}</span>
                                    </div>
                                    <div className={cx('student-item-detail')}>
                                        <span>{student.class_name}</span>
                                    </div>
                                    <div className={cx('student-item-detail')}>
                                        {/* <input type="text" className={cx('score-input')} placeholder="Nhập điểm" value={student.score} /> */}
                                        {editedScores[student.studentId] !== undefined ? (
                                            <input
                                                type="number"
                                                min="0"
                                                max="10"
                                                value={editedScores[student.studentId]}
                                                onChange={(event) => handleScoreChange(event, student.studentId)}
                                            />
                                        ) : (
                                            student.score
                                        )}
                                    </div>
                                    <div className={cx('student-item-detail')}>
                                        <Save
                                            className={cx('btn-save')}
                                            onClick={() =>
                                                handleSave(
                                                    student.studentId,
                                                    editedScores[student.studentId],
                                                    student.studentLearnInternId,
                                                )
                                            }
                                            disabled={!editedScores[student.studentId]}
                                        />
                                        <Restore
                                            className={cx('btn-restore')}
                                            onClick={() => handleRestore(student.studentId)}
                                        />
                                        <Edit
                                            className={cx('btn-edit')}
                                            onClick={() => handleSave(student.studentId, student.score)}
                                        />
                                        <AttachFile
                                            className={cx('btn-gif')}
                                            onClick={() => setShowSendFile(student)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('option')}>
                        <button
                            className={cx('btn-save-all')}
                            disabled={Object.keys(editedScores).length === 0}
                            onClick={handleSaveAll}
                        >
                            Lưu bảng điểm
                        </button>
                    </div>
                    {Object.keys(showSendFile).length > 0 && <SendFile show={setShowSendFile} student={showSendFile} />}
                </div>
            ) : (
                <Loading />
            )}
        </React.Fragment>
    );
};

export default ScoreTable;
