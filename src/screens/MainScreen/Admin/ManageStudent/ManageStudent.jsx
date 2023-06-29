/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ManageStudent.module.scss';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import SearchBox from '../../../../components/SearchBox';
import StudentItem from './StudentItem';
import NewStudent from './NewStudent';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);
const HEADINGS = ['Ảnh', 'Mã số sinh viên', 'Họ và tên', 'Lớp', 'Tình trạng'];
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ManageStudent = () => {
    const [showNewStudent, setShowNewStudent] = useState(false);
    const [studentlist, setStudentList] = useState([]);
    const [academicYear, setAcademicYear] = useState([]);
    const [year, setYear] = useState(null);
    const [chosedStudent, setChosedStudent] = useState({});
    const [editable, setEditable] = useState(true);
    const [loaded, setLoaded] = useState(false);

    const getAcademicYear = async () => {
        await axios
            .get('/class/academicyear')
            .then((res) => setAcademicYear(res.data))
            .catch((err) => console.log({ err: err }));
    };

    const getAllStudent = async () => {
        await axios
            .get('/student')
            .then((res) => {
                setStudentList(res.data);
            })
            .catch((err) => console.log({ err: err }));
    };

    useEffect(() => {
        getAcademicYear();
        getAllStudent();
        setLoaded(true);
    }, [showNewStudent]);

    const getSudentOfYear = async () => {
        await axios
            .get(`/student/year?year='${year}'`)
            .then((res) => {
                setStudentList(res.data);
            })
            .catch((err) => console.log({ err: err }));
    };

    useEffect(() => {
        if (year === '') {
            getAllStudent();
        } else if (year !== null) {
            getSudentOfYear();
        }
    }, [year]);

    const generatePDF = () => {
        const newData = studentlist.map((student) => {
            const date = new Date(Date.parse(student.dob));
            const day = ('0' + date.getDate()).slice(-2);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const birth = day + '-' + month + '-' + date.getFullYear();

            return [
                {
                    image: student.image,
                    width: 40,
                    height: 40,
                    marginTop: 10,
                    marginBottom: 10,
                },
                {
                    text: student.full_name,
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                    textAlign: 'center',
                },
                {
                    text: student.email,
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                },
                {
                    text: birth,
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                },
                {
                    text: student.class_name,
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                },
                {
                    text: student.current_status.data[0] === 1 ? 'Đang học' : 'Tốt nghiệp',
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                    bold: true,
                    fontStyle: 'italic',
                },
            ];
        });

        const headers = ['Ảnh', 'Họ và tên', 'Email', 'Ngày sinh', 'Lớp', 'Tình trạng'];

        const mergedBody = () => {
            const initBody = [];
            initBody.push(headers.map((heading) => ({ text: heading, bold: true })));
            newData.filter((data) => initBody.push(data));
            return initBody;
        };

        const docDefinition = {
            content: [
                {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        headerRows: 1,
                        widths: [50, 90, '*', 70, 'auto', '*'],
                        body: mergedBody(),
                    },
                },
            ],
        };

        pdfMake.createPdf(docDefinition).download('Danh sách sinh viên');
    };

    return (
        <React.Fragment>
            {loaded === true ? (
                <div className={cx('wrapper')}>
                    <h3 className={cx('list-heading')}>DANH SÁCH SINH VIÊN</h3>
                    <SearchBox className={cx('search')} />
                    <div className={cx('filters')}>
                        <select
                            value={year}
                            className={cx('filter-select-item')}
                            onChange={(e) => {
                                setYear(e.target.value);
                            }}
                        >
                            <option value=""> Tất cả </option>
                            {academicYear.map((year) => (
                                <option key={year.id} value={year.current_year} className={cx('option-value')}>
                                    {year.current_year}
                                </option>
                            ))}
                        </select>
                        <button
                            className={cx('btn-add')}
                            onClick={() => {
                                setChosedStudent({
                                    student_id: null,
                                    image: '',
                                    full_name: '',
                                    dob: '',
                                    email: '',
                                    address: '',
                                    department_id: null,
                                    class_id: '',
                                    major_id: '',
                                });
                                setShowNewStudent(true);
                            }}
                        >
                            Thêm mới
                        </button>
                        <button className={cx('btn-add', 'btn-export')} onClick={generatePDF}>
                            Xuất File
                        </button>
                    </div>

                    <div id="#my-table" className={cx('student-list')}>
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

                        {studentlist.length > 0 &&
                            studentlist.map((student) => (
                                <StudentItem
                                    key={student.student_id}
                                    student={student}
                                    setChosedStudent={setChosedStudent}
                                    setEditable={setEditable}
                                    setShowNewStudent={setShowNewStudent}
                                />
                            ))}
                    </div>
                    {showNewStudent === true && (
                        <NewStudent open={setShowNewStudent} editable={editable} studentinfo={chosedStudent} />
                    )}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </React.Fragment>
    );
};

export default ManageStudent;
