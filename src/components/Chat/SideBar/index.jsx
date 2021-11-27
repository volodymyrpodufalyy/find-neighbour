import React from "react";
import {  Button, Modal, Select, Input, Form } from "antd";
import { Dialogs } from "containers";
import { TeamOutlined, FormOutlined } from '@ant-design/icons';
import "./SideBar.scss";

const { Option } = Select;
const { TextArea } = Input;

const SideBar = ({
  user,
  visible,
  inputValue,
  messageText,
  selectedUserId,
  isLoading,
  users,
  onShow,
  onClose,
  onSearch,
  onChangeInput,
  onSelectUser,
  onChangeTextArea,
  onModalOk
}) => {
  const options = users.map(user => (
    <Option key={user.id}>{user.fullname}</Option>
  ));

  return (
    <div className="chat__sidebar">
      <div className="chat__sidebar-header">
        <div>
        <TeamOutlined />
          <span>Список діалогів</span>
        </div>
        <Button onClick={onShow} icon={<FormOutlined />}/>
      </div>

      <div className="chat__sidebar-dialogs">
        <Dialogs userId={user && user.id} />
      </div>
      <Modal
        title="Створити діалог"
        visible={visible}
        footer={[
          <Button key="back" onClick={onClose}>
            Закрити
          </Button>,
          <Button
            disabled={!messageText}
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={onModalOk}
          >
            Cтворити
          </Button>
        ]}
      >
        <Form className="add-dialog-form">
          <Form.Item label="Введіть ім'я користувача або E-Mail">
            <Select
              value={inputValue}
              onSearch={onSearch}
              onChange={onChangeInput}
              onSelect={onSelectUser}
              notFoundContent={null}
              style={{ width: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              showSearch
            >
              {options}
            </Select>
          </Form.Item>
          {selectedUserId && (
            <Form.Item label="Введіть текст повідомлення">
              <TextArea
                autosize={{ minRows: 3, maxRows: 10 }}
                onChange={onChangeTextArea}
                value={messageText}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

SideBar.defaultProps = {
  users: []
};

export default SideBar;