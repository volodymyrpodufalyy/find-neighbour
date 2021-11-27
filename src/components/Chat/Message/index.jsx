import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Message.scss';
import classNames from 'classnames';
import wave from 'assets/img/wave.svg';
import play from 'assets/img/play.svg';
import pause from 'assets/img/pause.svg';
import { Time, IconReaded, Avatar } from 'components';
import { convertCurrentTime, isAudio } from 'utils/helpers';
import { EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import { Popover, Button } from 'antd';
import { Emoji } from 'emoji-mart';
import reactStringReplace from 'react-string-replace';




const MessageAudio = ({ audioSrc }) => {
    const audioElem = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        audioElem.current.addEventListener(
            'playing',
            () => {
                setIsPlaying(true);
         },false); 
         audioElem.current.addEventListener(
            'ended',
            () => {
                setIsPlaying(false);    
                setProgress(0);
         },false); 
         audioElem.current.addEventListener(
            'pause',
            () => {
                setIsPlaying(false);    
         },false); 
         audioElem.current.addEventListener('timeupdate',() => {
             setCurrentTime(audioElem.current.currentTime);
             const duration = audioElem.current && audioElem.current.duration || 0;
             setProgress((audioElem.current.currentTime/duration) * 100);
         } ); 
    }, [])

    const togglePlay = () => {
        if(!isPlaying) {
            audioElem.current.play();
        }
        else {
            audioElem.current.pause();
        }
    };
    
    const [currentTime, setCurrentTime] = useState(0);
    return(<div className="message__audio">
    <audio id="audio" ref={audioElem}  src={audioSrc} preload="auto" />
        <div className="message__audio-progress" style={{ width: progress + '% '}}> </div>
        <div className="message__audio-info" > 
        <div className="message__audio-btn" >
            <button onClick={togglePlay}>
               {isPlaying ? (<img src={pause} alt="Pause svg"/>) : (<img src={play} alt="Play svg"/>) }
            </button>
             </div>
             <div className="message__audio-wave" > <img src={wave} alt="Wave svg"/> </div>
             <span className="message__audio-duration">
                {convertCurrentTime(currentTime)}
             </span>
        </div>
    </div>);

};

const Message = ({ avatar, 
     user,
     text, 
     date, 
     isMe,
     isReaded, 
     attachments, 
     isTyping, 
     audio,
     onRemoveMessage,
     setPreviewImage,
     readed }) => {

    const renderAttachment = item => {
            if(item.ext !== "webm") {
               return ( 
                    <div onClick={() => {setPreviewImage(item.url)}} key={item._id} className="message__attachments-item">
                    <div className="message__attachments-item-overlay">
                     <EyeOutlined style={{ color: "white", fontSize: 20 }} />
                        </div> 
                    <img src={item.url} alt={item.filename} />
                    </div>
                    );
            } else {
                return <MessageAudio key={item._id} audioSrc={item.url} />;
            }
    }

   return (
    <div className={classNames('message',
    {'message--isme': isMe,
    'message--is-typing': isTyping,
    'message--image': !isAudio(attachments) && attachments && attachments.length === 1 && !text,
    'message--is-audio': isAudio(attachments)
    })}>
       
      <div className="message__content">
        {/* <IconReaded isMe={isMe} isReaded={readed} /> */}
         <Popover              
                content={
                    <div>
                        <Button onClick={onRemoveMessage}>Видалити повідомлення</Button>
                    </div>
                }
                trigger="click"       
            >
            <div className="message__icon-actions">
                <Button icon={<EllipsisOutlined style={{ fontSize : '22px' }}   />}/>
            </div>
            </Popover>
        <div className="message__avatar">
            <Avatar user={user}/>
          </div>
          <div className="message__info">
            {(text || isTyping)
                 && (<div className="message__bubble">
                {text && (<p className="message__text">
                {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                          <Emoji emoji={match} set='apple' size={20} />
                      ))}
                </p>)}
               {isTyping && (<div className="message__typing">
                <span />
                <span />
                <span />
                </div>)}
                {false && <MessageAudio audioSrc={null} />}
                </div>)}
            
            { attachments && (<div className="message__attachments">
                {attachments.map ((item, index) => renderAttachment(item))}
                    </div>
            )} 
            {date && (<span className="message__date">
                <Time date={date}/>
            </span>)}
            </div>
        </div>
        
    </div>
   );
};

Message.defaultProps = {
    user: {}
};

Message.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.object,
    attachments: PropTypes.array,
    isTyping: PropTypes.bool,
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool,
    audio: PropTypes.string,
};

export default Message;