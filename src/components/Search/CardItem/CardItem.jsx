import React from 'react';

const CardItem = ({ card }) => {
    return (
        <div className="users__list-card">
            <img src={card.image} alt={card.title}></img>
                <b>{card.title}</b>
            <div className="users__list-card-description">
                <div className="users__list-card-description-info">
                    <span>ВІК</span>
                    <p>{card.description}</p>
                </div>
                {/* <div className="users__list-card-description-info">
                    <span>MICTO</span>
                    <p>{card.availableSizes}</p>
                </div> */}
                <div className="users__list-card-description-info">
                    <span>SEX</span>
                    <p>{card.sex === true ? "male" : "female"}</p>
                </div>
            </div>
        </div>
    );
};

export default CardItem;
