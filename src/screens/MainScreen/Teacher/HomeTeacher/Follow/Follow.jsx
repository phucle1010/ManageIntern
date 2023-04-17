import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Follow.module.scss';
import { Close, Send } from '@mui/icons-material';

const cx = classNames.bind(styles);

const TODO_LIST = [
    {
        id: 1,
        name: 'Khảo sát giao diện người dùng',
        isCompleted: true,
        // Ngày bắt đầu
        // Ngày kết thúc
    },
    {
        id: 2,
        name: 'Xây dựng yêu cầu ứng dụng',
        isCompleted: true,
        // Ngày bắt đầu
        // Ngày kết thúc
    },
    {
        id: 3,
        name: 'Phân tích yêu cầu ứng dụng',
        isCompleted: false,
        // Ngày bắt đầu
        // Ngày kết thúc
    },
];

const Follow = ({ openScreen, student }) => {
    const [job, setJob] = useState({
        id: null,
        name: '',
        isCompleted: false,
        // Ngày bắt đầu
        // Ngày kết thúc
    });
    const [todos, setTodos] = useState(TODO_LIST);

    const bottomRef = useRef();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [todos]);

    const handleAddJob = () => {
        if (job.name !== '') {
            const lastId = todos[todos.length - 1].id;
            setJob((prev) => {
                return {
                    ...prev,
                    id: lastId,
                };
            });
            setTodos((prev) => [...prev, job]);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => openScreen(null)} />
            <h3 className={cx('title-heading')}>THÔNG TIN THỰC TẬP</h3>
            <div className={cx('job-category')}>
                <h4 className={cx('main-heading')}>Cài đặt công việc</h4>
                <div className={cx('job-item')}>
                    <input
                        className={cx('job-name')}
                        type="text"
                        name="name"
                        placeholder="Nhập tên công việc"
                        value={job.name}
                        onChange={(e) => setJob({ ...job, [e.target.name]: e.target.value })}
                    />
                    <div className={cx('job-deadline')}>
                        <div className={cx('deadline-info')}>
                            <h5>Ngày bắt đầu: </h5>
                            <input type="date" />
                        </div>
                        <div className={cx('deadline-info')}>
                            <h5>Ngày kết thúc: </h5>
                            <input type="date" />
                        </div>
                        <button className={cx('btn-add')} onClick={handleAddJob}>
                            Thêm
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('job-category')}>
                <h4 className={cx('main-heading')}>Danh sách các công việc</h4>
                <div className={cx('todo-list')}>
                    {todos.length > 0 &&
                        todos.map((todo, index) => (
                            <div
                                className={cx('todo-item', {
                                    active: todo.isCompleted === true,
                                })}
                                key={index}
                            >
                                <div className={cx('todo-info')}>
                                    <span className={cx('todo-name')}>{todo.name}</span>
                                    <span
                                        className={cx('todo-status', {
                                            active: todo.isCompleted === true,
                                        })}
                                    >
                                        {todo.isCompleted === true ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                                    </span>
                                </div>
                                <div className={cx('appreciate')}>
                                    <input
                                        type="text"
                                        className={cx('appreciate-input', {
                                            active: todo.isCompleted === true,
                                        })}
                                        placeholder="Nhập nội dung đánh giá..."
                                        readOnly={todo.isCompleted}
                                    />
                                    <Send className={cx('btn-send')} onClick={() => {}} />
                                </div>
                            </div>
                        ))}
                    <div ref={bottomRef}></div>
                </div>
            </div>
        </div>
    );
};

export default Follow;
