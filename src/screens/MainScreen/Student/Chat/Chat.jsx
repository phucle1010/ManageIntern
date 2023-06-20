import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import { Avatar } from '@mui/material';
import { Send } from '@mui/icons-material';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const host = 'http://localhost:8080';

const cx = classNames.bind(styles);

const Message = ({ message, user }) => {
    return (
        <div
            className={cx('chat-message', {
                me: message.userId === user.userIdStudent,
            })}
        >
            {message.userId === user.userIdTeacher ? (
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
    const [mess, setMess] = useState([]);
    const [message, setMessage] = useState(null);
    const [attachFile, setAttachFile] = useState(null);
    const [chatPerson, setChatPerson] = useState({});
    const loadData = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .get('/chat/teacher', { headers: { authentication: token } })
            .then((res) => setChatPerson(res.data))
            .catch((err) => console.log(err));

        axios
            .get('/chat/message', { headers: { authentication: token } })
            .then((res) => setMess(res.data))
            .catch((err) => console.log(err));
    };
    useEffect(() => loadData(), []);

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
        if (message !== null) {
            const now = new Date();
            const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
            const sentTime = vietnamTime.toISOString().replace(/T/, ' ').substr(0, 19);
            const msg = {
                content: message,
                userId: chatPerson.userIdStudent,
                studentId: chatPerson.studentId,
                attachFile: attachFile,
                teacherId: chatPerson.teacherId,
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
        <div className={cx('wrapper')}>
            <div className={cx('chat-container')}>
                <div className={cx('chat-object')}>
                    <Avatar
                        className={cx('chat-object-avatar')}
                        src={
                            chatPerson.image ||
                            'https://kenh14cdn.com/thumb_w/660/2020/6/6/583808735902613047891358253770177506705408n-15592399250171833547164-1591434336975414105459-crop-1591434346991904928321.jpg' ||
                            'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg'
                        }
                    />
                    <span className={cx('chat-object-name')}>{chatPerson.teacherName}</span>
                </div>
                <div className={cx('chat-content')}>
                    {mess.length > 0 &&
                        mess.map((message) => <Message key={message.id} message={message} user={chatPerson} />)}
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
                    <Send className={cx('btn-send')} onClick={() => sendMessage()} />
                </div>
            </div>
        </div>
    );
};

export default Chat;
