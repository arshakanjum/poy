import React, {
    Component
} from 'react'
import './StartPage.css'

import {
    provider,
    auth,
    database
} from '../../fire.js';

import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Titillium Web:300,400,700', 'sans-serif']
    }
});

class StartPage extends Component {

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);

    }

    componentWillMount() {
        const {
            history
        } = this.props
    }


    componentDidMount() {
        var tRef = database.ref();
        var tQuery = tRef.child('appstatus');
        //console.log(userid);
        tQuery.once("value", (snapshot) => {
            //console.log(snapshot.val());
            if (snapshot.val() == 0)
                this.prop.history.push('/thanks');
        })

    }
    async login() {

        const result = await auth().signInWithPopup(provider)
        console.log(result.additionalUserInfo.profile.id)
        //console.log(result)
        this.setState({
            user: result.user
        });
        //console.log(result.user.UserId)

        this.props.history.push({
            pathname: '/vote',
            state: {
                userid: result.additionalUserInfo.profile.id
            }
        })
    }


    loggedIn() {
        console.log('meh')
        // make check for login here
        this.props.history.push('/vote')
    }

    render() {

        return ( <
            div className = "StartPage" >
            <
            div className = "StartPage-up" >
            <
            div className = "StartPage-up-logo-container" >
            <
            img className = "StartPage-up-logo"
            src = "http://koyilandykoottam.in/images/home/logo.png" / >
            <
            /div> <
            div className = "StartPage-up-poy" > PERSON OF THE YEAR < br / > < span className = 'bigger' > 2017 < /span>< /div > < /
            div > <
            div className = "StartPage-down" >
            <
            button className = "StartPage-facebook-login"
            onClick = {
                this.login
            } >
            Login with facebook <
            /button>
            <
            /
            div > <
            /div>
        )
    }
}

export default StartPage
