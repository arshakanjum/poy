import React, {
    Component
} from 'react'
import './StartPage.css'
import fire from '../../fire.js'
import {
    provider,
    auth
} from '../../fire.js';
class StartPage extends Component {

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
            <
            button className = "StartPage-facebook-login"
            onClick = {
                this.login
            } >
            Login with facebook <
            /button> < /
            div > <
            /div>
        )
    }
}

export default StartPage
