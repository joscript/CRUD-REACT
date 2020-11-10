import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/users/userActions';

function Navbar({userData, fetchUsers}) {

    useEffect( () => {
        fetchUsers()
    }, [])

    return ( 
        <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1 mx-auto">NUMBER OF USERS: <span className="text-danger">{userData.users.length}</span></span>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        userData: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);  