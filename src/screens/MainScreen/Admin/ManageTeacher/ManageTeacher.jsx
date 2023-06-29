import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageTeacher.module.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import SearchBox from '../../../../components/SearchBox';
import TeacherItem from './TeacherItem';
import NewTeacher from './NewTeacher';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const HEADINGS = ['Ảnh', 'Mã giảng viên', 'Họ và tên', 'Khoa', 'Tình trạng'];
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ManageTeacher = () => {
    const admin = useSelector((state) => state.user);
    const [school, setSchool] = useState({});
    const [departments, setDepartments] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [chosedTeacher, setChosedTeacher] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [editable, setEditable] = useState(false);

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
        axios
            .get('/admin/teacher')
            .then((res) => {
                setTeachers(res.data.responseData);
            })
            .then(() => setIsLoading(false));
    }, [chosedTeacher]);

    const generatePDF = () => {
        const newData = teachers.map((teacher) => {
            return [
                {
                    image: teacher.image,
                    width: 40,
                    height: 40,
                    marginTop: 10,
                    marginBottom: 10,
                },
                {
                    text: teacher.full_name,
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                },
                {
                    text: teacher.email,
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                },
                {
                    text: departments.filter((department) => department.id === teacher.department_id)[0]
                        .department_name,
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                },
                {
                    text: teacher.current_status.data[0] === 1 ? 'Đang dạy' : 'Hết dạy',
                    marginTop: 25,
                    marginBottom: 25,
                    fontSize: 10,
                    bold: true,
                    fontStyle: 'italic',
                },
            ];
        });

        const headers = ['Ảnh', 'Họ và tên', 'Email', 'Khoa', 'Tình trạng'];

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
                        widths: [50, 90, '*', 'auto', '*'],
                        body: mergedBody(),
                    },
                },
            ],
        };

        pdfMake.createPdf(docDefinition).download('Danh sách giảng viên');
    };

    return (
        <div className={cx('wrapper')}>
            {isLoading === true ? (
                <LoadingSpinner />
            ) : (
                <React.Fragment>
                    <h3 className={cx('list-heading')}>DANH SÁCH GIẢNG VIÊN</h3>
                    <SearchBox className={cx('search')} />
                    <div className={cx('filters')}>
                        <button
                            className={cx('btn-add')}
                            onClick={() => {
                                setChosedTeacher({
                                    id: null,
                                    full_name: '',
                                    image: '',
                                    phone: '',
                                    email: '',
                                    address: '',
                                    dob: '',
                                    start_date: '',
                                    education_level: null,
                                    current_status: {
                                        data: [-1],
                                    },
                                    user_id: null,
                                    department_id: null,
                                });
                                setEditable(true);
                            }}
                        >
                            Thêm mới
                        </button>
                        <button className={cx('btn-add', 'btn-export')} onClick={generatePDF}>
                            Xuất File
                        </button>
                    </div>

                    <div className={cx('teacher-list')}>
                        <div className={cx('teacher-heading-list')}>
                            <ul className={cx('main-heading-list')}>
                                {HEADINGS.map((heading, index) => (
                                    <li className={cx('main-heading')} key={index}>
                                        {heading}
                                    </li>
                                ))}
                            </ul>
                            <h5 className={cx('option-heading-list', 'option-heading')}>Lựa chọn</h5>
                        </div>

                        {teachers.length > 0 &&
                            teachers.map((teacher) => (
                                <TeacherItem
                                    key={teacher.id}
                                    departments={departments}
                                    teacher={teacher}
                                    setChosedTeacher={setChosedTeacher}
                                    setEditable={setEditable}
                                />
                            ))}
                    </div>

                    {Object.keys(chosedTeacher).length > 0 && (
                        <NewTeacher
                            show={setChosedTeacher}
                            editable={editable}
                            teacher={chosedTeacher}
                            departments={departments}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default ManageTeacher;
