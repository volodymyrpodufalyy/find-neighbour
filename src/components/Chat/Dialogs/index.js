import React from "react";
import orderBy from "lodash/orderBy";
import { Input, Empty } from "antd";

import { DialogItem } from "components";

import "./Dialogs.scss";

const Dialogs = ({
  author,
  items,
  userId,
  onSearch,
  inputValue,
  currentDialogId,
}) => (
  <div className="dialogs">
    <div className="dialogs__search">
      <Input.Search
        placeholder="Search among contacts"
        onChange={(e) => onSearch(e.target.value)}
        value={inputValue}
      />
    </div>
    {items.length ? (
      orderBy(items, ["created_at"], ["desc"]).map((item) => (
        <div>
          <DialogItem
            key={item._id}
            isMe={item.author.id === userId}
            userId={userId}
            currentDialogId={currentDialogId}
            {...item}
          />
        </div>
      ))
    ) : (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Nothing was found"
      />
    )}
  </div>
);

export default Dialogs;
