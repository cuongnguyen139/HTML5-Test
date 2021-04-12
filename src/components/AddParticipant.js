import React, { Component } from 'react';
import $ from 'jquery';

class AddParticipant extends Component {
    state = {
        errors: {
            nameError: '',
            emailError: '',
            phoneNumberError: ''
        },
        name: '',
        email: '',
        phoneNumber: ''
    }

    nameChangeHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    emailChangeHandler = (event) => {
        this.setState({ email: event.target.value });
    }

    phoneNumberChangeHandler = (event) => {
        this.setState({ phoneNumber: event.target.value });
    }

    //form adding handler
    addHandler = (event) => {
        event.preventDefault();
        let errors = this.state.errors;
        errors.phoneNumberError = '';
        this.setState({ errors: errors});

        const validForm = this.validateInput(this.state.name, this.state.email, this.state.phoneNumber);
        if (!validForm) {
            return;
        }
        
        this.props.addParticipant(
            this.state.name,
            this.state.email,
            this.state.phoneNumber);
        this.setState({ 
            name: '',
            email: '',
            phoneNumber: ''
        });
    }

    //check if the form is valid
    validateInput(name, email, phoneNumber) {
        let errors = this.state.errors;
        if (!name) {
            $("#fullName").addClass("invalid"); 
            errors.nameError = 'Required!';
            //return 'Name is empty!';
        }

        let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email) {
            errors.emailError = 'Required!';
            //return 'Email address is empty!';
        } else if (!emailPattern.test(email)) {
            errors.emailError = 'Invalid input email';
            //return 'Invalid input email';
        }
        let phonePattern = /^\+?[0-9]{10,12}$/;
        if (!phoneNumber) {
            errors.phoneNumberError = 'Required!';
            //return 'Please enter a phone number!';
        } else if (!phonePattern.test(phoneNumber)) {
            errors.phoneNumberError = 'Invalid phone number';
            //return 'Phone number is empty';
        }

        this.setState({errors: errors});
        if (errors.emailError || errors.phoneNumberError|| errors.emailError) {
            return false;
        }

        return true;
    }

    render() {
        return (
            <section>
                <div className="error" id="nameError" >{this.state.errors.nameError}</div>
                <div className="error" id="emailError">{this.state.errors.emailError}</div>
                <div className="error" id="phoneError">{this.state.errors.phoneNumberError}</div>
                <form onSubmit={this.addHandler}>
                    <input 
                        id="fullName" 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="Full name" 
                        value={this.state.name} 
                        onChange={this.nameChangeHandler}>
                    </input>
                    <input  
                        type="email" 
                        name="email"  
                        required
                        placeholder="E-mail address" 
                        value={this.state.email} 
                        onChange={this.emailChangeHandler}>
                    </input>                
                    <input  
                        type="tel" 
                        name="phone"
                        required
                        placeholder="Phone number" 
                        value={this.state.phoneNumber} 
                        onChange={this.phoneNumberChangeHandler}>
                    </input>
                    <button type="submit">Add new</button>
                </form>
            </section>
        )
    }
};

export default AddParticipant;