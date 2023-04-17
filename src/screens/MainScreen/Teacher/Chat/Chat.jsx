import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import { Avatar } from '@mui/material';
import { Send } from '@mui/icons-material';

const cx = classNames.bind(styles);

const messages = [
    [
        {
            id: 1,
            img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
            content: 'Từ khi gặp em, anh mới biết những ngôi sao trên trời đều là giả',
            opponent: true,
            time: '09:00',
        },
        {
            id: 2,
            img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
            content: 'Sao dị ạ',
            opponent: false,
            time: '09:05',
        },
        {
            id: 3,
            img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
            content: 'Vì lực hút của Trái đất đã kéo ánh sáng đó vào trong đôi mắt của em !!',
            opponent: true,
            time: '09:07',
        },
        {
            id: 4,
            img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
            content: 'Em biết còn tại sao nữa không ??',
            opponent: true,
            time: '09:08',
        },
        {
            id: 5,
            img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
            content: 'Dạ khum',
            opponent: false,
            time: '09:10',
        },
        {
            id: 6,
            img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
            content: 'Vì cả thế giới bỗng chốc thu bé lại vừa bằng một cô gái <3',
            opponent: true,
            time: '09:12',
        },
        {
            id: 7,
            img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
            content: 'Eo gục ngã hic :(((',
            opponent: false,
            time: '09:15',
        },
        {
            id: 8,
            img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
            content: 'Anh có một bờ vai đủ rộng :V',
            opponent: true,
            time: '9:18',
        },
    ],
    [
        {
            id: 1,
            img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
            content: 'Từ khi gặp em, anh mới biết những ngôi sao trên trời đều là giả',
            opponent: true,
            time: '09:00',
        },
        {
            id: 2,
            img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
            content: 'Sao dị ạ',
            opponent: false,
            time: '09:05',
        },
        {
            id: 3,
            img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
            content: 'Vì lực hút của Trái đất đã kéo ánh sáng đó vào trong đôi mắt của em !!',
            opponent: true,
            time: '09:07',
        },
    ],
];

const STUDENTS = [
    {
        id: 1,
        name: 'Lê Bảo Dương',
        img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
    },
    {
        id: 2,
        name: 'Nguyễn Trọng Nhân',
        img: 'https://animalslook.com/media/very-cute-and-funny-dog-selfies/very-cute-and-funny-dog-selfies-1.jpg?ezimgfmt=rs:700x933/rscb1/ngcb1/notWebP',
    },
];

var date = new Date();

const Message = ({ message }) => {
    return (
        <div
            className={cx('chat-message', {
                me: message.opponent === false,
            })}
        >
            {message.opponent === true ? (
                <React.Fragment>
                    <Avatar className={cx('chat-object-avatar', 'message')} src={message.img} />
                    <span>
                        <h6 className={cx('chat-time')}>{message.time}</h6>
                        {message.content}
                    </span>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <span>
                        <h6 className={cx('chat-time')}>{message.time}</h6>
                        {message.content}
                    </span>
                </React.Fragment>
            )}
        </div>
    );
};

const Chat = () => {
    const [messageList, setMessageList] = useState(messages[0]);
    const [messageContent, setMessageContent] = useState('');
    const [chatContentIndex, setChatContentIndex] = useState(0);

    const messageBody = useRef();

    const scrollToBottom = () => {
        messageBody.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        setMessageList(messages[chatContentIndex]);
    }, [chatContentIndex]);

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const handleSendMessage = () => {
        const lastMessageID = messageList[messageList.length - 1].id;
        const message = {
            id: lastMessageID + 1,
            img: 'https://i.pinimg.com/originals/96/6c/e1/966ce14ec7fad178425e68bd333fbf99.jpg',
            content: messageContent,
            opponent: false,
            time: `${date.getHours() >= 0 ? date.getHours() : `0${date.getHours()}`}:${
                date.getMinutes() >= 0 ? date.getMinutes() : `0${date.getMinutes()}`
            }`,
        };

        setMessageList((prevList) => [...prevList, message]);
        setMessageContent('');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-list')}>
                {STUDENTS.map((student, index) => (
                    <div
                        key={index}
                        className={cx('user-item', {
                            active: index === chatContentIndex,
                        })}
                        onClick={() => setChatContentIndex(index)}
                    >
                        <Avatar src={student.img} className={cx('user-avt')} />
                        <span>{student.name}</span>
                    </div>
                ))}
            </div>
            <div className={cx('main-chat')}>
                <div className={cx('chat-container')}>
                    <div className={cx('chat-object')}>
                        <Avatar className={cx('chat-object-avatar')} src={STUDENTS[chatContentIndex].img} />
                        <span className={cx('chat-object-name')}>{STUDENTS[chatContentIndex].name}</span>
                    </div>
                    <div className={cx('chat-content')}>
                        {messageList.length > 0 &&
                            messageList.map((message) => <Message key={message.id} message={message} />)}
                        <div ref={messageBody}></div>
                    </div>
                    <div className={cx('chat-area-text')}>
                        <input
                            type="text"
                            className={cx('chat-input')}
                            placeholder="Nhập nội dung tin nhắn..."
                            value={messageContent}
                            onChange={(e) => {
                                setMessageContent(e.target.value);
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Send className={cx('btn-send')} onClick={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
