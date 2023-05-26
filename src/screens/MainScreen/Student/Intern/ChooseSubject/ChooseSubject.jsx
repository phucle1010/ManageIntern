/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ChooseSubject.module.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../../../../components/LoadingSpinner/LoadingSpinner';

const cx = classNames.bind(styles);

const MENU_HEADINGS = ['STT', 'Tên môn học', 'Số tín chỉ', 'Số buổi học', 'GVHD', 'Khoa', 'Lựa chọn'];

const Subject = ({ subject, index, chooseSubject }) => {
    return (
        <div className={cx('subject-info')}>
            <span className={cx('subject-info-item')}>{index}</span>
            <span className={cx('subject-info-item')}>Thực tập tốt nghiệp</span>
            <span className={cx('subject-info-item')}>{subject.unit}</span>
            <span className={cx('subject-info-item')}>{subject.sessions}</span>
            <span className={cx('subject-info-item')}>{subject.full_name}</span>
            <span className={cx('subject-info-item')}>{subject.department_name}</span>
            <button className={cx('subject-info-item', 'btn-choose')} onClick={() => chooseSubject(subject)}>
                Chọn
            </button>
        </div>
    );
};

const SelectedSubject = ({ subject, setSelectedSubject, currentUser, getRegistedSubject }) => {
    const sendRegistSubject = async () => {
        await axios
            .post('/student/intern/subject/regist/check', {
                student_id: currentUser.id,
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    sendRelativeInformation(res.data.responseData);
                } else {
                    alert(res.data.responseData);
                }
            })
            .catch((err) => alert(`Lỗi ${err}`));
    };

    const sendRelativeInformation = async (student_id) => {
        await axios
            .post('/student/intern/subject/regist', {
                student_id,
                subject_id: subject.id,
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    alert(res.data.responseData);
                    setSelectedSubject(null);
                    getRegistedSubject();
                } else {
                    alert(res.data.responseData);
                }
            })
            .catch((err) => alert(`Lỗi ${err}`));
    };

    const handleRegistLearnSubject = () => {
        sendRegistSubject();
    };

    return (
        <React.Fragment>
            <h4 className={cx('main-heading')}>Môn học đã chọn</h4>
            <div className={cx('chosed-subject')}>
                <div className={cx('chosed-subject-item')}>
                    <h4>Tên môn học: </h4>
                    <span>Thực tập tốt nghiệp</span>
                </div>
                <div className={cx('chosed-subject-item')}>
                    <h4>Số tín chỉ: </h4>
                    <span>{subject.unit}</span>
                </div>
                <div className={cx('chosed-subject-item')}>
                    <h4>Số buổi học: </h4>
                    <span>{subject.sessions}</span>
                </div>
                <div className={cx('chosed-subject-item')}>
                    <h4>Giảng viên hướng dẫn: </h4>
                    <span>{subject.full_name}</span>
                </div>
                <div className={cx('chosed-subject-item')}>
                    <h4>Khoa: </h4>
                    <span>{subject.department_name}</span>
                </div>
                <div className={cx('options-btn')}>
                    <button className={cx('btn-regist')} onClick={handleRegistLearnSubject}>
                        Đăng ký
                    </button>
                    <button className={cx('btn-cancel')} onClick={() => setSelectedSubject(null)}>
                        Hủy bỏ
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

const RegistedSubject = ({ subject, getRegistedSubject }) => {
    const date = new Date(Date.parse(subject.regist_date));
    const regist_date = `${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`;

    const registSubject = {
        id: subject.id,
        name: 'Thực tập tốt nghiệp',
        score: subject.score || 'Chưa chấm điểm',
        passed_status: subject.passed_status.data[0] === 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành',
        regist_status: subject.regist_status.data[0] === 1 ? 'Đã xác nhận' : 'Chưa xác nhận',
        regist_date,
        teacher_name: subject.full_name,
    };

    const removeSubject = async () => {
        await axios
            .delete('/student/intern/subject/delete/id', {
                params: {
                    id: registSubject.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    alert(res.data.responseData);
                    getRegistedSubject();
                } else {
                    alert(res.data.responseData);
                }
            })
            .catch((err) => alert(`Lỗi ${err}`));
    };

    const handleRemoveRegistedSubject = () => {
        const notice = 'Bạn chắc chắn muốn gỡ đăng ký môn học chứ ?';
        if (window.confirm(notice)) {
            removeSubject();
        }
    };

    return (
        <React.Fragment>
            <h4 className={cx('main-heading')}>Thông tin môn học đã đăng ký</h4>
            <div className={cx('chosed-subject', 'registed')}>
                <div className={cx('chosed-subject-item')}>
                    <h4>Tên môn học: </h4>
                    <span>Thực tập tốt nghiệp</span>
                </div>
                <div className={cx('chosed-subject-item')}>
                    <h4>Điểm số: </h4>
                    <span>{registSubject.score}</span>
                </div>
                <div className={cx('chosed-subject-item')}>
                    <h4>Trạng thái môn học: </h4>
                    <span>{registSubject.passed_status}</span>
                </div>
                <div className={cx('chosed-subject-item')}>
                    <h4>Trạng thái xác nhận đăng ký: </h4>
                    <span>{registSubject.regist_status}</span>
                </div>
                <div className={cx('chosed-subject-item')}>
                    <h4>Ngày đăng ký: </h4>
                    <span>{registSubject.regist_date}</span>
                </div>
                <div className={cx('chosed-subject-item')}>
                    <h4>Giảng viên hướng dẫn: </h4>
                    <span>{registSubject.teacher_name}</span>
                </div>
                {subject.regist_status.data[0] === 0 && (
                    <div className={cx('options-btn')}>
                        <button className={cx('btn-cancel')} onClick={handleRemoveRegistedSubject}>
                            Gỡ yêu cầu
                        </button>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

const ChooseSubject = () => {
    const currentUser = useSelector((state) => state.user);
    const [subjects, setSubjects] = useState([]);
    const [registedSubjectInfo, setRegistedSubjectInfo] = useState(null);
    const [departmentId, setDepartmentId] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const getDepartmentOfCurrentStudent = async () => {
        await axios
            .get('/student/department/student_id', {
                params: {
                    user_id: currentUser.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setDepartmentId(res.data.responseData.id);
                }
            })
            .catch((err) => alert(`Lỗi ${err}`));
    };

    const getAllOpeningSubjects = async () => {
        await axios
            .get('/student/intern/subject', {
                params: {
                    department_id: departmentId,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setSubjects(res.data.responseData);
                    setLoaded(true);
                }
            })
            .catch((err) => alert(`Lỗi ${err}`));
    };

    const getRegistedSubject = async () => {
        await axios
            .get('/student/intern/subject/info', {
                params: {
                    user_id: currentUser.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setRegistedSubjectInfo(res.data.responseData);
                }
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getDepartmentOfCurrentStudent();
    }, []);

    useEffect(() => {
        if (departmentId !== null) {
            getRegistedSubject();
            getAllOpeningSubjects();
        }
    }, [departmentId]);

    return (
        <React.Fragment>
            {loaded ? (
                <div className={cx('wrapper')}>
                    <h4 className={cx('main-heading')}>Danh sách các môn hiện có</h4>
                    <div className={cx('menu-heading')}>
                        {MENU_HEADINGS.map((menuItem) => (
                            <h5 className={cx('menu-item')} key={menuItem}>
                                {menuItem}
                            </h5>
                        ))}
                    </div>
                    <div className={cx('subject-list')}>
                        {subjects.length > 0 &&
                            subjects.map((subject, index) => (
                                <Subject
                                    key={subject.id}
                                    index={index + 1}
                                    subject={subject}
                                    chooseSubject={setSelectedSubject}
                                />
                            ))}
                    </div>
                    {registedSubjectInfo && (
                        <RegistedSubject subject={registedSubjectInfo} getRegistedSubject={getRegistedSubject} />
                    )}
                    {selectedSubject !== null && (
                        <SelectedSubject
                            subject={selectedSubject}
                            setSelectedSubject={setSelectedSubject}
                            currentUser={currentUser}
                            getRegistedSubject={getRegistedSubject}
                        />
                    )}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </React.Fragment>
    );
};

export default ChooseSubject;
