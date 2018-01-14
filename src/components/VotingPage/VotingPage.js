import React, {
    Component
} from 'react';
import './VotingPage.css';
import fire from '../../fire.js';
import {
    withRouter
} from "react-router-dom";
import {
    provider,
    auth,
    database
} from '../../fire.js';

import PersonCard from '../../components/PersonCard/PersonCard';

class VotingPage extends Component {



    componentWillMount() {
        var authData = auth().currentUser;
        var user;
        const {
            history
        } = this.props

        var userRef = database.ref('/users/');
        var userQuery = userRef.orderByChild("UserName").equalTo(authData.displayName);
        userQuery.once("value", function(snapshot) {
            console.log(snapshot.val())
            if (!snapshot.val()) {
                console.log('go thanks')
                history.push('/sorry');
            }
            else if (snapshot.val().status == 1)
                history.push('/thanks');
        });

if (authData) {

} else {

    console.log("User is logged out");
    this.props.history.push('/')

}
}



constructor(props) {
    super(props)

    this.personChosen = this.personChosen.bind(this)
    this.madeVote = this.madeVote.bind(this)
    this.isSelected = this.isSelected.bind(this)

    this.state = {
        user: "arshal",
        selected: false,
        id: -1,
        people: []
    };
}

componentDidMount() {
    var authData = auth().currentUser;
    var canRef = database.ref();
    var can = canRef.child('candidates').orderByKey();
    //var userQuery = userRef.orderByChild("UserName");
    can.once("value", snap => {
        snap.forEach(child => {
            this.setState({
                people: this.state.people.concat([child.val()])
            });
        })
    })
}


personChosen(id) {
    console.log('Chosen person: ', id)
    this.setState({
        ...this.state,
        selected: true,
        id,
    })
}

madeVote() {
    let id = this.state.id
    if (id == -1) {
        alert("Please select a candidate")
    } else {

        console.log('Vote made: ', id)
        var authData = auth().currentUser;
        var userRef = database.ref('users/').child(id).orderByChild("UserName").equalTo(authData.displayName).child('status')
        userRef.transaction(function(status) {
            if (!status) {
                status = 1;
            }
            return (status)
        });
        //var userQuery = userRef.orderByChild("UserName").equalTo(authData.displayName);
        //userRef.update({
        //    "status": 1
        //})
        var canRef = database.ref('candidates/').child(id).child('votes');
        canRef.transaction(function(votes) {
            if (votes) {
                votes = votes + 1;
            }
            return (votes || 0) + 1;
        });
        this.props.history.push('/thanks')
    }
    // do the post selection code here

}

isSelected(id) {
    return this.state.selected && this.state.id === id
}

render() {
    return ( <
        div className = "VotingPage" >
        <
        div className = "App-header" > Person of the year < /div> <
        div className = "App-content" >
        <
        div className = "App-people" >
        <
        br / > {
            this.state.people.map(person => ( <
                div key = {
                    person.id
                }
                className = "App-people-container"
                onClick = {
                    () => this.personChosen(person.id)
                } >
                <
                PersonCard person = {
                    person
                }
                selected = {
                    this.isSelected(person.id)
                }
                /> < /
                div >
            ))
        } <
        /div> <
        button className = "App-vote"
        onClick = {
            this.madeVote
        } >
        Make vote <
        /button> < /
        div > <
        /div>
    )
}
}

export default VotingPage
