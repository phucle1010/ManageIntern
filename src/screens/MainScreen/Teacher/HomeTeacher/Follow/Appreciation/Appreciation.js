/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Appreciation.module.scss';
import { Close } from '@mui/icons-material';

import Loading from '../../../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const Appreciation = ({ setSelectedTodo, todo }) => {
    const [appreciations, setAppreciations] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const formattedDate = (date) => {
        const convertedDate = new Date(Date.parse(date));
        return `${convertedDate.getDate()}/${convertedDate.getMonth() + 1}/${convertedDate.getUTCFullYear()}`;
    };

    const getAllApprications = async () => {
        await axios
            .get('/teacher/todo/appreciation/all', {
                params: {
                    todo_id: todo.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setAppreciations(res.data.responseData);
                    setLoaded(true);
                }
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getAllApprications();
    }, []);
    console.log(appreciations);

    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => setSelectedTodo(null)} />
            <h3 className={cx('title-heading')}>{todo.todo_name}</h3>
            <div className={cx('deadline-info')}>
                <span>
                    <b>Ngày bắt đầu: </b>
                    {`${formattedDate(todo.start_date)}`}
                </span>
                <span>
                    <b>Ngày kết thúc: </b>
                    {`${formattedDate(todo.end_date)}`}
                </span>
            </div>
            {loaded ? (
                <div className={cx('appreciation-list')}>
                    {appreciations.length > 0 ? (
                        <div
                            style={{
                                marginTop: '30px',
                            }}
                        >
                            <h5 className={cx('title-heading', 'extra')}>Danh sách các đánh giá</h5>
                            {appreciations.map((appreciation, index) => (
                                <span key={index}>{`- ${appreciation.content}`}</span>
                            ))}
                        </div>
                    ) : (
                        <span
                            style={{
                                display: 'block',
                                marginTop: '30px',
                            }}
                        >
                            Chưa có đánh giá nào ở công việc này
                        </span>
                    )}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default Appreciation;
