import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ScoreTable.module.scss';
import { Avatar } from '@mui/material';
import { Save, Restore, Edit, AttachFile } from '@mui/icons-material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import SearchBox from '../../../../components/SearchBox';
import Loading from '../../../../components/LoadingSpinner/LoadingSpinner';
import SendFile from './SendFile';

const cx = classNames.bind(styles);

const MENU_HEADINGS = ['Ảnh', 'Mã số sinh viên', 'Họ và tên', 'Lớp', 'Điểm', 'Lựa chọn'];
const SUBMENU_HEADINGS = ['Ảnh', 'Mã số sinh viên', 'Họ và tên', 'Vị trí thực tập', 'Điểm cuối kì'];
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ScoreTable = () => {
    const [students, setStudents] = useState([]);
    const [completedInternStudents, setCompletedInternStudents] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [academics, setAcademics] = useState([]);

    const [academic, setAcademic] = useState();
    const [semester, setSemester] = useState();
    const [editedScores, setEditedScores] = useState({});
    const [searchStudent, setSearchStudent] = useState(null);
    const [showSendFile, setShowSendFile] = useState({});
    const [clickedSubmit, setClickedSubmit] = useState(false);
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

    const loadInternedStudents = async () => {
        await axios
            .get('/admin/intern/students/completed')
            .then((res) => res.data.statusCode === 200 && setCompletedInternStudents(res.data.responseData));
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
        loadInternedStudents();
    }, [academic, semester, searchStudent, showSendFile, clickedSubmit]);

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

    const handleSubmitCompleteInternProcess = (id, internJobId) => {
        axios
            .put('/teacher/student/intern/completed', {
                intern_id: id,
                intern_job_id: internJobId,
            })
            .then((res) => {
                alert(res.data);
                setClickedSubmit((prev) => !prev);
            })
            .catch((err) => alert(err.toString()));
    };

    const generatePDF = () => {
        const newData = completedInternStudents.map((student) => {
            return [
                {
                    image: student.studentImage,
                    width: 40,
                    height: 40,
                    marginTop: 10,
                    marginBottom: 10,
                },
                {
                    text: student.id,
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                    textAlign: 'center',
                },
                {
                    text: student.studentName,
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                },
                {
                    text: student.job_name,
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                },
                {
                    text: student.score,
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                },
            ];
        });

        const mergedBody = () => {
            const initBody = [];
            initBody.push(SUBMENU_HEADINGS.map((heading) => ({ text: heading, bold: true })));
            newData.filter((data) => initBody.push(data));
            return initBody;
        };

        const docDefinition = {
            content: [
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        headerRows: 1,
                        widths: [50, 90, '*', '*', '*'],
                        body: mergedBody(),
                    },
                },
            ],
        };

        pdfMake.createPdf(docDefinition).download('Bảng điểm sinh viên');
    };

    return (
        <React.Fragment>
            {loaded ? (
                <div className={cx('wrapper')}>
                    <h3 className={cx('title-heading')}>BẢNG ĐIỂM</h3>
                    <SearchBox className={cx('search')} search={searchStudent} setSearch={setSearchStudent} />
                    <h4 className={cx('main-heading')}>Danh sách sinh viên đang thực tập</h4>
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
                                        {editedScores[student.studentId] !== undefined ? (
                                            <input
                                                className={cx('score-input')}
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
                                        <button
                                            className={cx('btn-completed')}
                                            onClick={() =>
                                                handleSubmitCompleteInternProcess(
                                                    student.studentLearnInternId,
                                                    student.internJobId,
                                                )
                                            }
                                        >
                                            Hoàn thành
                                        </button>
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

                    {completedInternStudents.length > 0 && (
                        <React.Fragment>
                            <h4 className={cx('main-heading')}>Danh sách sinh viên đã hoàn thành thực tập</h4>
                            <div className={cx('student-container')}>
                                <div className={cx('menu-list')}>
                                    {SUBMENU_HEADINGS.map((menu, index) => (
                                        <span className={cx('menu-item', 'sub')} key={index}>
                                            {menu}
                                        </span>
                                    ))}
                                </div>
                                <div className={cx('student-list')}>
                                    {completedInternStudents?.map((student) => (
                                        <div key={student.studentId} className={cx('student-item')}>
                                            <div className={cx('student-item-detail', 'sub')}>
                                                <Avatar src={student.studentImage} />
                                            </div>
                                            <div className={cx('student-item-detail', 'sub')}>
                                                <span>{student.id}</span>
                                            </div>
                                            <div className={cx('student-item-detail', 'sub')}>
                                                <span>{student.studentName}</span>
                                            </div>
                                            <div className={cx('student-item-detail', 'sub')}>
                                                <span>{student.job_name}</span>
                                            </div>
                                            <div className={cx('student-item-detail', 'sub')}>{student.score}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className={cx('option')}>
                                    <button className={cx('btn-save-all', 'export')} onClick={generatePDF}>
                                        Xuất bảng điểm
                                    </button>
                                </div>
                            </div>
                        </React.Fragment>
                    )}

                    {Object.keys(showSendFile).length > 0 && <SendFile show={setShowSendFile} student={showSendFile} />}
                </div>
            ) : (
                <Loading />
            )}
        </React.Fragment>
    );
};

export default ScoreTable;
