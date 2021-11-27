import React from "react";
import orderBy from "lodash/orderBy";
import { Input, Empty } from "antd";

import { DialogItem } from "components";

import "./Dialogs.scss";

const Dialogs = ({ author, items, userId, onSearch, inputValue, currentDialogId }) => (
  <div className="dialogs">
    <div className="dialogs__search">
      <Input.Search
        placeholder="Пошук серед контактів"
        onChange={e => onSearch(e.target.value)}
        value={inputValue}
      />
    </div>
    {items.length ? (
      orderBy(items, ["created_at"], ["desc"]).map(item => (
        <DialogItem
          key={item.id}
          isMe={item.author.id === userId}
          userId={userId}
          currentDialogId={currentDialogId}
          {...item}
        />
      ))
    ) : (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Нічого не знайдено"
      />
    )}
  </div>
);

export default Dialogs;
