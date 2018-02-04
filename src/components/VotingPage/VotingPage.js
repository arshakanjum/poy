import React, {
    Component
} from 'react';
import './VotingPage.css';

import {
    provider,
    auth,
    database
} from '../../fire.js';

import PersonCard from '../../components/PersonCard/PersonCard';

class VotingPage extends Component {



    componentWillMount() {
        var authData = auth().currentUser;
        //  console.log(this.props.location.state.userid);
        var user;


        //var userid = this.props.location.state.userid;
        const {
            history
        } = this.props

        try {
          var userid = this.props.location.state.userid;
        } catch (e) {
          history.push('/')
        }

        if (authData) {

            var idRef = database.ref('/voted/' + userid);
            var idQuery = idRef.child('voted');
            //console.log(userid);
            idQuery.once("value", function(snapshot) {
                //console.log(snapshot.val());
                if (snapshot.val() == 1)
                    history.push('/thanks');
                else if (snapshot.val() == null) {
                    idRef.set({
                        voted: 0
                    });
                }
                var newname = authData.displayName.replace(".", " ")
                console.log(newname);
                var userRef = database.ref('/users')
                var userQuery = userRef.child(newname);
                userQuery.once("value", function(snapshot) {
                    console.log(snapshot.val())
                    if (!snapshot.val()) {
                        history.push('/sorry');
                    }
                });
            })
        } else {
            history.push('/');
        }
    }



    constructor(props) {
        super(props)

        this.personChosen = this.personChosen.bind(this)
        this.madeVote = this.madeVote.bind(this)
        this.isSelected = this.isSelected.bind(this)

        this.state = {
            loading: 1,
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
        this.setState({
            loading: 0
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
        var userid = this.props.location.state.userid;

        var idRef = database.ref('/voted/' + userid);
        if (id == -1) {
            alert("Please select a candidate")
        } else {

            var idQuery = idRef.child('voted');
            //console.log(userid);
            idQuery.once("value", (snapshot) => {
                console.log("Value " + snapshot.val());
                if (snapshot.val()==1) {
                    alert("You have already voted")
                    this.props.history.replace('/thanks')
                } else {
                    console.log('Vote made: ', id)

                    idRef.set({
                        voted: 1
                    });

                    var canRef = database.ref('candidates/').child(id).child('votes');
                    canRef.transaction(function(votes) {

                        return (votes || 0) + 1;
                    });
                    var TotRef = database.ref('/').child('TotalVotes');
                    TotRef.transaction(function(TotalVotes) {

                        return (TotalVotes || 0) + 1;
                    });
                    this.props.history.push('/thanks')
                }

            })

        }


    }


    isSelected(id) {
        return this.state.selected && this.state.id === id
    }

    render() {
        return ( <
            div >

            <
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
            Vote <
            /button> < /
            div > <
            /div> < /
            div >
        )

    }
}

export default VotingPage
