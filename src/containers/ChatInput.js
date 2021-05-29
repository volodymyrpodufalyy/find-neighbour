import React, { useEffect, useState } from "react";
import { ChatInput as ChatInputBase } from "components";
import { connect } from "react-redux";
import { messagesActions, attachmentsActions } from "redux/actions";
import { filesApi } from "utils/api"
import socket from 'core/socket';
import reactStringReplace from 'react-string-replace';
import { Emoji } from 'emoji-mart';


const ChatInput = (props) => {
  const {
      dialogs: {currentDialogId}, 
      attachments,
      fetchSendMessage,
      setAttachments, 
      removeAttachment, user } = props;
  
  window.navigator.getUserMedia = (
    window.navigator.getUserMedia ||
    window.navigator.mozUserMedia ||
    window.navigator.msUserMedia ||
    window.navigator.webkitUserMedia
  );

  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState([]);
  const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
  const [isLoading, setLoading] = useState(false);
  
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!emojiPickerVisible);
  };

  const handleOutSideClick = (el, e) => {
    if (el && !el.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  const onRecord = () => {
    if(navigator.getUserMedia) {
      navigator.getUserMedia( { audio: true } , onRecording, onError);
    }
  };

  const onRecording = (stream) => {
    const recorder = new MediaRecorder(stream, { MimeType: "audio/webm" })
    setMediaRecorder(recorder);
    recorder.start();

    recorder.onstart = () => {
      setIsRecording(true);
    }

    recorder.onstop = (e) => {
      setIsRecording(false);
    };

    recorder.ondataavailable = (e) => {
      const file =  new File([e.data], "audio.webm");
      setLoading(true);
      filesApi.upload(file).then(({ data }) => {
        sendAudio(data.file._id)
        setLoading(false);
    });
    };
  };

  const onError = (err) => {
    console.log('error occured' +  err);
  };

  const onStopRecording = () => {
    mediaRecorder.stop();
  }

  const onHideRecording = () => {
    setIsRecording(false);
  }

  const addEmoji = ({ colons }) => {
    setValue((value + '' + colons).trim())
    console.log(colons);
  }
  
  const sendAudio = (audioId) => {
    fetchSendMessage({
      text: null,
      dialogId: currentDialogId,
      attachments: [audioId]
    });
  } 
  
  const sendMessage = () => {
    if (isRecording) {
      mediaRecorder.stop();
    } else if (value || attachments.length) {
    fetchSendMessage({
      text: value, dialogId: currentDialogId,attachments: attachments.map(file => file.uid)
    });
    setValue("");
    setAttachments([]);
    }
  }

  const handleSendMessage = e => {
    socket.emit('DIALOGS:TYPING', { dialogId: currentDialogId, user });
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  useEffect(() => {
    const el = document.querySelector('.chat-input__smile-btn');
    document.addEventListener("click", handleOutSideClick.bind(this, el));
      return () => {
      document.removeEventListener("click", handleOutSideClick(this, el));            
    }

  }, []);

  const onSelectFiles = async files => {
    let uploaded = [];
    for (let i = 0; i < files.length; i++ ) {
      const file = files[i];
      const uid = Math.round( Math.random() * 1000);
      uploaded = [
        ...uploaded,
        {
          uid,
          name: file.name,
          status: 'uploading',
        }
      ];
      setAttachments(uploaded);
      // eslint-disable-next-line no-loop-func
      await filesApi.upload(file).then(({ data }) => {
        uploaded = uploaded.map(item => {
          if (item.uid === uid) {
            item = {
              uid: data.file._id,
              name: data.file.filename,
              status: 'done',
              url: data.file.url
            };
          }
          return item;
        });
      });
    }
    setAttachments(uploaded);
  };

  if (!currentDialogId) {
    return null;
  }
  
  return (
    <ChatInputBase
      value={value}
      toggleEmojiPicker={toggleEmojiPicker}
      setValue={setValue}
      addEmoji={addEmoji}
      handleSendMessage={handleSendMessage}
      handleOutSideClick={handleOutSideClick}
      emojiPickerVisible={emojiPickerVisible}
      sendMessage={sendMessage}
      attachments={attachments}
      onSelectFiles={onSelectFiles}
      isRecording={isRecording}
      onRecord={onRecord}
      onStopRecording={onStopRecording}
      onHideRecording={onHideRecording}
      isLoading={isLoading}
      removeAttachment={removeAttachment}
      />
  );
};

export default connect(
  ({ dialogs, attachments, user }) => ({dialogs, attachments: attachments.items, user: user.data}),
  {...messagesActions, ...attachmentsActions}
)(ChatInput);