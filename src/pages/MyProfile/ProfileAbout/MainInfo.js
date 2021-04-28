import React, {Component} from 'react';
import "./MainInfo.css"
import {NavLink} from "react-router-dom";

let info = React.createRef();

const MainInfo = (props)=>{



    // let info = props.profile.map(people => {
    //     if (people.id === 0) {
    //         return (<Info abouts={people.aboutMe}
    //                               img={people.photos.large}
    //                               username={people.fullName}
    //                               gmail={people.contacts.instagram}
    //                               number={people.userId}/>)
    //     }
    //
    // })


    return(
        <div>
            <Info profile ={props.profile} />
        </div>
    )
}


const Info = (props) => {


    const ChangeBtn = () => {
        props.abouts = info.current.value
        alert(props.abouts)
    }

    return (

        <div>
            <div className="div1">
                <div className='user_img'><p><a href={props.profile.photos.large}><img src={props.profile.photos.large}/></a></p></div>
                <div className='user_name'><p>{props.profile.fullName}</p></div>
                <div><NavLink to={"/Settings"} className='settings' >Settings</NavLink></div>
                <div className="mail"><p>{props.profile.instagram}</p></div>
                <div className='kind_of_activity'><p>Kind of activity: {props.profile.userId}</p></div>
                <div >
                    <div><p className='About_p'>About:</p></div>
                    <textarea className='textarea' ref={info} readOnly maxLength={300}>{props.profile.userId}</textarea>
                </div>
            </div>

        </div>
    )
}

export default MainInfo
