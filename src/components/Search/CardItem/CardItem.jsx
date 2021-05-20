import React from 'react';
import { Avatar } from "components";

const CardItem = ({ card }) => {
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
                        <p>{card.adress}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardItem;
