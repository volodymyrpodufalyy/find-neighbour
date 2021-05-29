import React from 'react';
import { Avatar } from "components";
import { Emoji } from 'emoji-mart';

const CardItem = ({ card }) => {
    const adress = card.adress.split(',');
    return (
        <div className="users__list-card">
            <div className="users__list-card-image">
                <Avatar user={card.user} /> 
            </div>
            <div className="users__list-card-info">
                <div className="users__list-card-info-top">
                    <b>{card.user.fullname}</b> 
                </div>

                <div className="users__list-card-info-bottom">
                    <div className="users__list-card-info-bottom-item">
                        <span>ВІК</span>
                        <p>{card.age}</p>
                    </div>
                    <div className="users__list-card-info-bottom-item">
                        <span>MICTO</span>
                        <p>{adress[0]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardItem;
