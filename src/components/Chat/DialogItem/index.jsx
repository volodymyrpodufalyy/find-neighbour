import React from "react";
import classNames from "classnames";
import format from "date-fns/format";
import isToday from "date-fns/is_today";
import { Link } from "react-router-dom";
import { IconReaded, Avatar } from "components";

const getMessageTime = createdAt => {
  if (isToday(createdAt)) {
    return format(createdAt, "HH:mm");
  } else {
    return format(createdAt, "DD.MM.YYYY");
  }
};

const renderLastMessage = (message, userId) => {
  let text = '';
  if(!message.text && message?.attachments?.length) {
    text = 'Media';
  } else {
    text = message.text;  
  }
  return `${message?.user?.id === userId ? "Ви: " : "" }${text}`;
}


const DialogItem = ({
    _id,
    unread,
    createdAt,
    text,
    isMe,   
    currentDialogId,
    lastMessage,
    user,
    partner,
    author,
    userId
  }) => {
    
        return (<Link to={`/chat/dialog/${_id}`}>
        <div
          className={classNames("dialogs__item", {
            "dialogs__item--online": partner.isOnline,
            "dialogs__item--selected": currentDialogId === _id
          })}
        >
          <div className="dialogs__item-avatar">
            <Avatar user={author.id === userId ? partner : author} />
          </div>
          <div className="dialogs__item-info">
            <div className="dialogs__item-info-top">
              <b>{author.id === userId ? partner.fullname : author.fullname}</b>
              <span>{getMessageTime(lastMessage.createdAt)}</span>
            </div>
            <div className="dialogs__item-info-bottom">
              <p>{renderLastMessage(lastMessage, userId)}</p>
              {isMe && <IconReaded isMe={isMe} isReaded={lastMessage.readed} />}
              {unread > 0 && (
                <div className="dialogs__item-info-bottom-count">
                  {unread > 9 ? "+9" : unread}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }
 
export default DialogItem;