import React, { Component } from 'react'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <p>This message inserted by React</p>
        );
    }
}

export default Profile;