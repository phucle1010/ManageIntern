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
const HISTORY_MENU = ['STT', 'Ảnh', 'Họ và tên', 'Trường đại học', 'Vị trí ứng tuyển', 'Thời điểm xác nhận'];

const Requirement = () => {
    const [chosedStudent, setChosedStudent] = useState({});
    const [studentRequest, setStudentRequest] = useState([]);
    const [submitHistory, setSubmitHistory] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [searchRequest, setSearchRequest] = useState(null);

    const loadRequestData = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .get(`/business/job/request`, { params: { searchRequest }, headers: { Authorization: token } })
            .then((res) => {
                setStudentRequest(res.data);
            })
            .catch((err) => console.log(err));
    };

    const getSubmitHistory = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .get(`/business/interns/submit/history`, { headers: { Authorization: token } })
            .then((res) => {
                setSubmitHistory(res.data);
                setLoaded(true);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadRequestData();
        getSubmitHistory();
    }, [searchRequest]);

    return (
        <React.Fragment>
            {loaded ? (
                <div className={cx('wrapper')}>
                    <div className={cx('requirement-category')}>
                        <h3 className={cx('main-heading')}>Danh sách chờ xác nhận</h3>
                        <SearchBox className={cx('search')} search={searchRequest} setSearch={setSearchRequest} />
                        {studentRequest.length > 0 ? (
                            <React.Fragment>
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
                                            <StudentItem
                                                key={index}
                                                student={student}
                                                order={index}
                                                loadData={loadRequestData}
                                                getSubmitHistory={getSubmitHistory}
                                                isSubmitable={true}
                                            />
                                        ))}
                                </div>
                            </React.Fragment>
                        ) : (
                            <span className={cx('notice')}>Không có bất kỳ dữ liệu nào đang chờ xác nhận</span>
                        )}
                    </div>
                    <div className={cx('requirement-category')}>
                        <h3 className={cx('main-heading')}>Lịch sử xác nhận</h3>
                        <div className={cx('menu-list')}>
                            {HISTORY_MENU.map((item, index) => (
                                <h3 key={index} className={cx('menu-item')}>
                                    {item}
                                </h3>
                            ))}
                        </div>
                        <div className={cx('pending-list')}>
                            {submitHistory.length > 0 &&
                                submitHistory.map((student, index) => (
                                    <StudentItem
                                        key={index}
                                        student={student}
                                        order={index}
                                        loadData={() => {}}
                                        getSubmitHistory={() => {}}
                                        isSubmitable={false}
                                    />
                                ))}
                        </div>
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
