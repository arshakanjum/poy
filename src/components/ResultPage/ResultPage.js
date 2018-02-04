import React, {
    Component
} from 'react';
import './ResultPage.css';


import {
    auth,
    database
} from '../../fire.js';

import ResultPersonCard from '../../components/ResultPersonCard/ResultPersonCard';

class ResultPage extends Component {



    constructor(props) {
        super(props)


        this.state = {
            total: '',
            people: []
        };
    }

    componentDidMount() {
        var canRef = database.ref();
        var can = canRef.child('candidates').orderByKey();
        //var userQuery = userRef.orderByChild("UserName");
        can.on("value", snapshot => {
          let peopleArr = []
            snapshot.forEach((snap) => {
                    peopleArr.push(snap.val())
              })

            this.setState({people: peopleArr})
          });

        var totRef = database.ref().on('value', snap => {
            this.setState({
                total: snap.val().TotalVotes
            })
        })


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
            div className = "App-Totalvotes" > Total No of votes: {
                this.state.total
            } < /div> <
            br / > {
                this.state.people.map(person => ( <
                    div key = {
                        person.id
                    }
                    className = "App-people-container" >
                    <
                    ResultPersonCard person = {
                        person
                    }

                    /> < /
                    div >
                ))
            } <
            /div> < /
            div > <
            /div>
        )
    }
}

export default ResultPage
