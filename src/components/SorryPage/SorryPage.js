import React, {
    Component
} from 'react'
import './SorryPage.css'

import {
    provider,
    auth
} from '../../fire.js';
class SorryPage extends Component {

  //  async componentWillMount() {
    //    const user = await auth().currentUser;
      //  if (user) this.setState({
        //    user
        //})
        //this.props.history.push('/vote')
    //}

    constructor(props) {
        super(props)
        this.login = this.login.bind(this)

        this.loggedIn = this.loggedIn.bind(this)
    }
    async login() {
        const result = await auth().signInWithPopup(provider)
        console.log(result.user)
        this.setState({
            user: result.user
        });
       console.log("Logged in")
        this.props.history.push('/vote')
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
            div className = "StartPage-up-poy" > PERSON OF THE YEAR < /div> < /
            div > <
            div className = "StartPage-down" >
            <div className="StartPage-Thanks">Sorry, you have to be a member of Koyilandy Kootam group to vote.<br/> Be a member by clicking <a href="https://www.facebook.com/groups/koyilandykoottam">here </a></div>
             < /
            div > <
            /div>
        )
    }
}

export default SorryPage
