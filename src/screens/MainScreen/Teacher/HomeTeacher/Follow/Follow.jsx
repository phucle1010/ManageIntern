/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Follow.module.scss';
import { Close, Send } from '@mui/icons-material';

import Loading from '../../../../../components/LoadingSpinner';
import Appreciation from './Appreciation';

const cx = classNames.bind(styles);

const TodoItem = ({ todo, setSelectedTodo, getTodoList }) => {
    const [content, setContent] = useState('');

    const handleSendAppreciation = async () => {
        await axios
            .post('/teacher/todo/appreciation/new', {
                id: todo.id,
                content,
            })
            .then((res) => {
                alert(res.data.responseData);
                if (res.data.statusCode === 200) {
                    setContent('');
                }
            })
            .catch((err) => alert(err));
    };

    const handleRemoveTodo = async () => {
        const notice = 'Bạn chắc chắn gỡ công việc này chứ ?';
        if (window.confirm(notice)) {
            await axios
                .delete('/teacher/todo/remove', {
                    params: {
                        id: todo.id,
                    },
                })
                .then((res) => {
                    alert(res.data.responseData);
                    if (res.data.statusCode === 200) {
                        getTodoList();
                    }
                })
                .catch((err) => alert(err));
        }
    };

    return (
        <div
            className={cx('todo-item', {
                completed: todo.completed_status.data[0] === 1,
            })}
        >
            <div className={cx('todo-info')}>
                <span className={cx('todo-name')}>{todo.todo_name}</span>
                <span
                    className={cx('todo-status', {
                        completed: todo.completed_status.data[0] === 1,
                    })}
                >
                    {todo.completed_status.data[0] === 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                </span>
            </div>
            <div className={cx('appreciate')}>
                <input
                    type="text"
                    className={cx('appreciate-input', {
                        completed: todo.completed_status.data[0] === 1,
                    })}
                    placeholder="Nhập nội dung đánh giá..."
                    readOnly={todo.completed_status.data[0] === 1 ? true : false}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Send className={cx('btn-send')} onClick={handleSendAppreciation} />
            </div>
            <div className={cx('btn-options')}>
                <button className={cx('btn-add', 'view-appreciation')} onClick={() => setSelectedTodo(todo)}>
                    Xem đánh giá
                </button>
                <button className={cx('btn-add', 'remove-todo')} onClick={handleRemoveTodo}>
                    Gỡ công việc
                </button>
            </div>
        </div>
    );
};

const Follow = ({ setSelectedStudent, student, userId }) => {
    const initJob = {
        todo_name: '',
        start_date: '',
        end_date: '',
    };

    const [job, setJob] = useState(initJob);
    const [todos, setTodos] = useState([]);
    const [regularId, setRegularId] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const bottomRef = useRef();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [todos]);

    const getTodoList = async () => {
        await axios
            .get('/teacher/todo/list', {
                params: {
                    student_id: student.id,
                    user_id: userId,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setTodos(res.data.responseData);
                    setRegularId(res.data.extraData);
                }
                setLoaded(true);
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getTodoList();
    }, []);

    const handleAddJob = async () => {
        console.log('regular id: ', regularId);
        await axios
            .post('/teacher/todo/new', {
                regular_id: regularId,
                todo_name: job.todo_name,
                start_date: job.start_date,
                end_date: job.end_date,
            })
            .then((res) => {
                alert(res.data.responseData);
                if (res.data.statusCode === 200) {
                    getTodoList();
                    setJob(initJob);
                }
            })
            .catch((err) => alert(err));
    };

    return (
        <React.Fragment>
            {loaded ? (
                <div className={cx('wrapper')}>
                    <Close className={cx('close-main-btn')} onClick={() => setSelectedStudent(null)} />
                    <h3 className={cx('title-heading')}>THÔNG TIN THỰC TẬP</h3>
                    <div className={cx('job-category')}>
                        <h4 className={cx('main-heading')}>Cài đặt công việc</h4>
                        <div className={cx('job-item')}>
                            <input
                                className={cx('job-name')}
                                type="text"
                                name="todo_name"
                                placeholder="Nhập tên công việc"
                                value={job.todo_name}
                                onChange={(e) => setJob({ ...job, [e.target.name]: e.target.value })}
                            />
                            <div className={cx('job-deadline')}>
                                <div className={cx('deadline-info')}>
                                    <h5>Ngày bắt đầu: </h5>
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={job.start_date}
                                        onChange={(e) =>
                                            setJob((prev) => {
                                                return {
                                                    ...prev,
                                                    [e.target.name]: e.target.value,
                                                };
                                            })
                                        }
                                    />
                                </div>
                                <div className={cx('deadline-info')}>
                                    <h5>Ngày kết thúc: </h5>
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={job.end_date}
                                        onChange={(e) =>
                                            setJob((prev) => {
                                                return {
                                                    ...prev,
                                                    [e.target.name]: e.target.value,
                                                };
                                            })
                                        }
                                    />
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
                                    <TodoItem
                                        todo={todo}
                                        key={index}
                                        setSelectedTodo={setSelectedTodo}
                                        getTodoList={getTodoList}
                                    />
                                ))}
                            <div ref={bottomRef}></div>
                        </div>
                    </div>
                    {selectedTodo && Object.keys(selectedTodo).length > 0 && (
                        <Appreciation todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
                    )}
                </div>
            ) : (
                <Loading />
            )}
        </React.Fragment>
    );
};

export default Follow;
