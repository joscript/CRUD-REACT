import React, { Component } from 'react';

class Form extends Component {

    getBtnClasses = () => {
        let classes = 'btn btn-sm m-1 ';
        classes += (this.props.formAction === "POST") ? 'btn-info' : 'btn-warning';
        return classes;
    }

    render() { 
        let btnTitle = (this.props.formAction === "POST") ? 'save' : 'update';
        return (
            <div>
                <form className="shadow rounded p-3">
                    <div className="form-group">
                        <label htmlFor="First name">First name</label>
                        <input type="text" className="form-control" value={this.props.user.first_name} onChange={this.props.onFirstNameChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="First name">Last name</label>
                        <input type="text" className="form-control" value={this.props.user.last_name} onChange={this.props.onLastNameChange}></input>
                    </div>
                    <div className="text-right">
                        <button onClick={this.props.onCancelForm} className="btn btn-sm btn-secondary m-1">Cancel</button>
                        <button onClick={this.props.onSubmitForm} className={this.getBtnClasses()}>{btnTitle}</button>
                    </div>
                </form>
            </div>
        )
    }
}
 
export default Form;