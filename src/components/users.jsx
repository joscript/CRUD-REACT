import React, { Component } from 'react';
import Form from './form';

class Users extends Component {
    state = { 
        users: null,
        firstName: "",
        lastName: "",
        formAction: "",
        user: {
            first_name: '',
            last_name: ''
        }
    }

    componentDidMount(){
        this.handleGetUsers();
    }

    handleFormAction = (formAction, user) => {
        // if(formAction === "POST") this.clearForm();
        this.setState({formAction, user});
    }
    
    clearForm = () => {
        this.setState(prevState => ({
            user: {...prevState.user, first_name: ''},
            user: {...prevState.user,last_name: ''}
        }))
    }

    handleForm = (e) => {
        e.preventDefault();
        if(this.state.formAction === 'POST'){
            window.axios.post('http://127.0.0.1:8000/api/users', this.state.user)
            .then((res) => {
                console.log('user added!', res);
                this.clearForm();
                this.setState({formAction: ""});
                this.handleGetUsers();
            })
            .catch((err) => {
                console.log(err);
                if(err.response.status === 422) alert(err.response.data);
            });
        } else if(this.state.formAction === 'PUT'){
            window.axios.put(`http://127.0.0.1:8000/api/users/${this.state.user.id}`, this.state.user)
            .then((res) => {
                console.log('user updated!', res);
                this.clearForm();
                this.setState({formAction: ""}); 
                this.handleGetUsers();
            })
            .catch((err) => {
                console.log(err);
                if(err.response.status === 422) alert(err.response.data);
            });
        } else if(this.state.formAction === 'DELETE'){
            window.axios.delete(`http://127.0.0.1:8000/api/users/${this.state.user.id}`)
            .then((res) => {
                console.log('user deleted!', res);
                this.clearForm();
                this.setState({formAction: ""}); 
                this.handleGetUsers();
            })
            .catch(err => console.log(err));
        }
    }

    handleGetUsers(){
        window.axios.get('http://127.0.0.1:8000/api/users')
            .then((response) => {
                const users = response.data;    
                this.setState({users});
            })
            .catch(err => console.log(err))
    }

    handleFirstNameChange = (event) =>{
        this.setState(prevState => ({
            user: {
                ...prevState.user,              // copy all other key-value pairs of user object
                first_name: event.target.value
            }
        }))
    }
    handleLastNameChange = (event) =>{
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                last_name: event.target.value
            }
        }))
    }

    renderUsers(){
        if(this.state.users === null){
            console.log('loading....');
        }else{
            let tableRow = this.state.users.map((user) => {
                    return (<tr key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button onClick={() => this.handleFormAction('PUT', user)} type="button" className="btn btn-secondary btn-sm">Edit</button>
                                <button onClick={() => this.handleFormAction('DELETE', user)} type="button" className="btn btn-dark btn-sm">Delete</button>
                            </div>
                        </td>
                    </tr>)
            });
            return tableRow;
        }
    }

    render() {
        return ( 
                <div className="m-5">

                    {this.state.formAction === 'DELETE' &&
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <div>
                                <strong>Warning!</strong> Are you sure deleting this record? 
                                <button onClick={this.handleForm} className="btn btn-danger btn-sm ml-3">Proceed</button>
                            </div>
                            <button onClick={() => this.setState({formAction: ""})} type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    }

                    <button className="btn btn-primary btn-sm mb-2" onClick={() => this.handleFormAction('POST', '')}>Add user</button>
                    {this.state.formAction == "" || this.state.formAction !== "DELETE" &&
                    <Form
                        // firstName={this.state.firstName} 
                        // lastName={this.state.lastName} 
                        onFirstNameChange={this.handleFirstNameChange} 
                        onLastNameChange={this.handleLastNameChange} 
                        onSubmitForm={this.handleForm}
                        onCancelForm={() => {this.setState({formAction: ""}); this.clearForm();}}
                        user={this.state.user}
                        formAction={this.state.formAction}
                    />  
                    }
                    
                    <hr/>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.renderUsers()
                            }
                        </tbody>
                    </table>
                </div>
        ); 
    }
}

export default Users;