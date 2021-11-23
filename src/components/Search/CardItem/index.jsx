import React from 'react';
import { Avatar } from "components";

const CardItem = ({ card }) => {
    const address = card.address.split(',');
    return (
        <div className="users__list-card">

            <div className="users__list-card-image">
                <Avatar user={card.user} />
            </div>

            <div className="users__list-card-info">
                <div className="users__list-card-info-top">
                    <p className='item_card_text_name'>{card.user.fullname}</p>
                </div>

                <div className="users__list-card-info-bottom">
                    <div className="users__list-card-info-bottom-item">
                        <h5>ВІК</h5>
                        <h6 className='item_card_text'>{card.age}</h6>
                    </div>
                    <div className="users__list-card-info-bottom-item">
                        <h5>MICTO</h5>
                        <h6 className='item_card_text'>{address[0]}</h6>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CardItem;
