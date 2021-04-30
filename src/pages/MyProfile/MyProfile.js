import React, {Component} from 'react';
import s from "./Profile.module.css"
import MainInfo from "./ProfileAbout/MainInfo";


const Profile = (props) => {


    //
    // let people = props.peopleData.post.map(people => {
    //     if ((people.id % 2) - 1) {
    //         if (people.id !== 0)
    //             return (<Posts username={people.username} about={people.abouts} img={people.img}/>)
    //     }
    // })
    //
    // let people2 = props.peopleData.post.map(people => {
    //     if ((people.id % 2)) {
    //         if (people.id !== 0)
    //
    //             return (<Posts username={people.username} about={people.abouts} img={people.img}/>)
    //     }
    // })
    debugger

    return (

        <div className={s.main}>

            <div className={s.info}>
                <div><MainInfo profile={props.profile}/></div>
            </div>
            <h1>Recommended to You</h1>
            <div className={s.posts}>
                <table>
                    <tr>
                        <th>
                            people
                        </th>
                        <th>
                            people2
                        </th>
                    </tr>
                </table>
            </div>

        </div>
    )
}
export default Profile
