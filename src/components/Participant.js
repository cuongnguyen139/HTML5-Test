import React, { Component } from 'react';

class Participant extends Component {
    state = {
        isEditting: false,
        name: this.props.name,
        email: this.props.email,
        phoneNumber: this.props.phoneNumber
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

    //when clicking on Edit button
    onEditClick = () => {
        this.setState({ isEditting: true });
    }

    //when clicking on Cancel button
    onCancelClick = () => {
        this.setState({ isEditting: false });
        this.setState({ name: this.props.name });
    }

    //when clicking on Save button
    onSaveClick =(event) => {
        event.preventDefault();
        const oldParticipant = this.props.id;
        const newParticipant = {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
        };
        this.props.saveParticipant(oldParticipant, newParticipant);
        this.setState({ isEditting: false });
    }

    //display a form to edit a participant
    renderForm = () => {
        const { name, email, phoneNumber } = this.state;
        return (
            <form onSubmit={this.saveHandler}>
                <input type="text" value={name} onChange={this.nameChangeHandler} />
                <input type="email" value={email} onChange={this.emailChangeHandler} />
                <input type="text" value={phoneNumber} onChange={this.phoneNumberChangeHandler} />
                <button type="submit" className="save" onClick={this.onSaveClick}>Save</button>
                <button type="button" className="cancel" onClick={this.onCancelClick}>Cancel</button>
            </form>
        )
    }

    //display participant list
    renderList= () => {
        const { name, email, phoneNumber } = this.state;
        return (
            <table>
                <tbody>
                    <tr>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phoneNumber}</td>
                        <td>
                            <span>
                                <i className="fas fa-pencil-alt" aria-hidden="true" onClick={this.onEditClick}></i>
                                <i className="fas fa-trash" aria-hidden="true" 
                                    onClick={() => this.props.deleteParticipant(this.props.id)}>
                                </i>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    render() {
        return(
            <section>
                {
                    this.state.isEditting ? this.renderForm() : this.renderList()
                }
            </section>
        )
    }
};

export default Participant;