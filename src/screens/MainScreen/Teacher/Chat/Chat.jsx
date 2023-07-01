import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import { Avatar } from '@mui/material';
import { Send } from '@mui/icons-material';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

import Loading from '../../../../components/LoadingSpinner';

const host = 'http://localhost:8080';

const cx = classNames.bind(styles);

const Message = ({ message, user }) => {
    return (
        <div
            className={cx('chat-message', {
                me: message.userId === user.userIdTeacher,
            })}
        >
            {message.userId === user.userIdStudent ? (
                <React.Fragment>
                    <Avatar className={cx('chat-object-avatar', 'message')} src={user.image} />
                    <span>
                        <h6 className={cx('chat-time')}>{message.sentTime}</h6>
                        {message.content}
                    </span>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <span>
                        <h6 className={cx('chat-time')}>{message.sentTime}</h6>
                        {message.content}
                    </span>
                </React.Fragment>
            )}
        </div>
    );
};

const Chat = () => {
    const [students, setStudents] = useState([]);
    const [mess, setMess] = useState([]);
    const [chatContentIndex, setChatContentIndex] = useState(0);
    const [message, setMessage] = useState(null);
    const [attachFile, setAttachFile] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const loadStudent = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .get('/chat/student', { headers: { authentication: token } })
            .then((res) => setStudents(res.data))
            .then(() => setLoaded(true))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadStudent();
    }, []);

    useEffect(() => {
        loadMessage();
    }, [chatContentIndex, students]);

    const loadMessage = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        if (students.length > 0) {
            axios
                .get(`/chat/message/${students[chatContentIndex].studentId}`, { headers: { authentication: token } })
                .then((res) => setMess(res.data))
                .catch((err) => console.log(err));
        }
    };

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient.connect(host);
    }, []);

    useEffect(() => {
        socketRef.current = socketIOClient.connect(host);

        socketRef.current.on('sendDataServer', (dataGot) => {
            setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
            console.log(dataGot);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        const now = new Date();
        const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
        const sentTime = vietnamTime.toISOString().replace(/T/, ' ').substr(0, 19);
        if (message !== null) {
            const msg = {
                content: message,
                userId: students[chatContentIndex].userIdTeacher,
                studentId: students[chatContentIndex].studentId,
                attachFile: attachFile,
                teacherId: students[chatContentIndex].teacherId,
                sentTime: sentTime,
            };
            socketRef.current.emit('sendDataClient', msg);

            setMessage('');
        }
    };

    const messageBody = useRef();

    const scrollToBottom = () => {
        messageBody.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [mess]);

    return (
        <React.Fragment>
            {loaded ? (
                students.length > 0 ? (
                    <div className={cx('wrapper')}>
                        <div className={cx('user-list')}>
                            {students.map((student, index) => (
                                <div
                                    key={index}
                                    className={cx('user-item', {
                                        active: index === chatContentIndex,
                                    })}
                                    onClick={() => setChatContentIndex(index)}
                                >
                                    <Avatar src={student.image} className={cx('user-avt')} />
                                    <span>{student.fullName}</span>
                                </div>
                            ))}
                        </div>
                        <div className={cx('main-chat')}>
                            <div className={cx('chat-container')}>
                                <div className={cx('chat-object')}>
                                    <Avatar
                                        className={cx('chat-object-avatar')}
                                        src={
                                            students[chatContentIndex]?.image ||
                                            'https://kenh14cdn.com/thumb_w/660/2020/6/6/583808735902613047891358253770177506705408n-15592399250171833547164-1591434336975414105459-crop-1591434346991904928321.jpg'
                                        }
                                    />
                                    <span className={cx('chat-object-name')}>
                                        {students[chatContentIndex]?.fullName}
                                    </span>
                                </div>
                                <div className={cx('chat-content')}>
                                    {mess.length > 0 &&
                                        mess.map((message) => (
                                            <Message
                                                key={message.id}
                                                message={message}
                                                user={students[chatContentIndex]}
                                            />
                                        ))}
                                    <div ref={messageBody}></div>
                                </div>
                                <div className={cx('chat-area-text')}>
                                    <input
                                        type="text"
                                        className={cx('chat-input')}
                                        placeholder="Nhập nội dung tin nhắn..."
                                        value={message}
                                        onChange={(e) => {
                                            setMessage(e.target.value);
                                        }}
                                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    />
                                    <Send className={cx('btn-send')} onClick={sendMessage} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={cx('notice')}>
                        <span>Bạn không có dữ liệu Chat nào</span>
                    </div>
                )
            ) : (
                <Loading />
            )}
        </React.Fragment>
    );
};

export default Chat;
