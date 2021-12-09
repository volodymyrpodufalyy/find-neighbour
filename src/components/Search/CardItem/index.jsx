import React from "react";
import { Avatar } from "components";
import { useHistory } from "react-router";

const CardItem = ({ card }) => {
  const address = card && card.address.split(",");
  const history =  useHistory();


  const navigateToProfile = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    history.push(`/user/${card.user.id}`, {
      info: card
    })
  }

  return (
    <div onClick={navigateToProfile} className="users__list-card">
      {card && (
        <>
          <div className="users__list-card-image">
            <Avatar user={card.user} image={card.avatarUrl}  />
          </div>

          <div className="users__list-card-info">
            <div className="users__list-card-info-top">
              <p className="item_card_text_name">{card.user.fullname}</p>
            </div>

            <div className="users__list-card-info-bottom">
              <div className="users__list-card-info-bottom-item">
                <h5>AGE</h5>
                <h6 className="item_card_text">{card.age}</h6>
              </div>
              <div className="users__list-card-info-bottom-item">
                <h5>CITY</h5>
                <h6 className="item_card_text">{address[0]}</h6>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardItem;
