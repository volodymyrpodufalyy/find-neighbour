import React, { useEffect, useRef } from "react";
import { Messages as BaseMessages } from "components";
import { connect } from 'react-redux';
import { messagesActions } from 'redux/actions';
import socket from "core/socket";
import { Empty } from "antd";


const Dialogs = ({
  currentDialogId,
  fetchMessages,
  addMessage,
  items,
  user,
  isLoading,
  removeMessageById
}) => {


  const messagesRef = useRef(null);

  const onNewMessage = data => {
    addMessage(data);
  };

  useEffect(() => {
    if (currentDialogId) {
      fetchMessages(currentDialogId);
    

    socket.on("SERVER:NEW_MESSAGE", onNewMessage);

    return () => socket.removeListener("SERVER:NEW_MESSAGE", onNewMessage);
    }
  }, [currentDialogId]);

  useEffect(() => {
    if (currentDialogId) { 
      messagesRef.current.scrollTo(0, 999999);
    }
  }, [items]);

  if (!currentDialogId) {
    return <Empty  description="Відкрийте діалог,щоб почати спілкування" />;
  }

  return (
    <BaseMessages
      user={user}
      blockRef={messagesRef}
      items={items}
      isLoading={isLoading}
      onRemoveMessage={removeMessageById}
    />
  );
};

export default connect(
  ({ dialogs, messages, user }) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    isLoading: messages.isLoading,
    user: user.data
  }),
  messagesActions
)(Dialogs);