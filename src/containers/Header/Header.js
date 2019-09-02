import React, {Component} from 'react';
import classes from './Header.scss';
import {connect} from "react-redux";
import {
    signInWithGoogle,
    signOutGoogle
} from "../../store/actions";

class Header extends Component{

    render() {

        let button = <button onClick={this.props.signInWithGoogle}>Sign-In With Google</button>;

        if (localStorage.getItem('userId') || this.props.authenticated)
            button = <button onClick={this.props.signOutGoogle}>Sign-Out</button>;
        if (!this.props.authenticated)
            button = <button onClick={this.props.signInWithGoogle}>Sign-In With Google</button>;
        return (
            <div>
                <div className={'header'}>
                    <span>Easy To Do App</span>
                    <span>{this.props.authenticated ? 'Welcome '+this.props.userName : null}</span>
                    {button}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.root.authenticated,
        userName: state.root.userName
    }
};

const mapDispatchToProps = {signInWithGoogle,
    signOutGoogle};

export default connect(mapStateToProps, mapDispatchToProps)(Header);