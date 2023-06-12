import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Requirement.module.scss';

import SearchBox from '../../../../../components/SearchBox';
import StudentItem from './StudentItem';
import ViewStudent from '../Student/ViewStudent';
import Loading from '../../../../../components/LoadingSpinner/LoadingSpinner';

const cx = classNames.bind(styles);

const INTERNING_MENU = ['STT', 'Ảnh', 'Họ và tên', 'Trường đại học', 'Vị trí ứng tuyển', 'Lựa chọn'];

const Requirement = () => {
    const [chosedStudent, setChosedStudent] = useState({});
    const [studentRequest, setStudentRequest] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const loadData = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .get(`/business/job/request`, { headers: { Authorization: token } })
            .then((res) => {
                setStudentRequest(res.data);
                setLoaded(true);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        loadData();
    }, []);

    return (
        <React.Fragment>
            {loaded ? (
                <div className={cx('wrapper')}>
                    <div className={cx('requirement-category')}>
                        <h3 className={cx('main-heading')}>Danh sách chờ xác nhận</h3>
                        <SearchBox className={cx('search')} />
                        <div className={cx('menu-list')}>
                            {INTERNING_MENU.map((item, index) => (
                                <h3 key={index} className={cx('menu-item')}>
                                    {item}
                                </h3>
                            ))}
                        </div>
                        <div className={cx('pending-list')}>
                            {studentRequest.length > 0 &&
                                studentRequest.map((student, index) => (
                                    <StudentItem key={index} student={student} order={index} loadData={loadData} />
                                ))}
                        </div>
                    </div>
                    <div className={cx('requirement-category')}>
                        <h3 className={cx('main-heading')}>Lịch sử xác nhận</h3>
                    </div>
                    {Object.keys(chosedStudent).length > 0 && (
                        <ViewStudent student={chosedStudent} setChosedStudent={setChosedStudent} />
                    )}
                </div>
            ) : (
                <Loading />
            )}
        </React.Fragment>
    );
};

export default Requirement;
