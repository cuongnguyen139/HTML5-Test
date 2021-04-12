import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import participantData from '../ParticipantList.json';
import Participant from '../components/Participant'
import AddParticipant from '../components/AddParticipant'
import logo from '../assets/images/logo.jpg'

let participantList = participantData.Participants;

class App extends Component {
  state = {
    participantList,
    sortOrder: true
  }

  componentDidMount() {
    //add class asc or desc to display css arrow
    $('.sortable').click(function(){
        const sort = $(this).hasClass('asc') ? 'desc' : 'asc';
        $('.sortable').removeClass('asc').removeClass('desc');
        $(this).addClass(sort);
    });
}

  //find free next id in an array
  findFreeId = (array) => {
    const sortedArray = array
      .slice() // Make a copy of the array
      .sort(function (a, b) {return a.id - b.id}); // Sort it
    let previousId = 0;
    for (let element of sortedArray) {
      if (element.id !== (previousId + 1)) {
        // Found a gap
        return previousId + 1;
      }
      previousId = element.id;
    }
    // Found no gaps
    return previousId + 1;
  }

  addParticipant = (name, email, phoneNumber) => {
    const id = this.findFreeId(this.state.participantList);
    const newparticipantList = [...this.state.participantList];
    newparticipantList.push({
      id,
      name, 
      email,
      phoneNumber
    })
    this.setState( {participantList: newparticipantList});
  }

  saveParticipant = (oldParticipant, newParticipant) => {
    //find participant from the current list by id
    const participantIndex = this.state.participantList.findIndex(p => {
      return p.id === oldParticipant;
    });
    //make a copy of the found participant
    const participant = {...this.state.participantList[participantIndex]};
    participant.name = newParticipant.name;
    participant.email = newParticipant.email;
    participant.phoneNumber = newParticipant.phoneNumber;
    //make a copy of the current list
    const participants = [...this.state.participantList];
    //change the value of editted object
    participants[participantIndex] = participant;
    //set new state
    this.setState( {participantList: participants});
  }

  deleleParticipant = (participantIndex) => {
    //make a copy of the current list
    const participants = [...this.state.participantList];
    //delete participant from the list
    participants.splice(participants.findIndex(item => item.id === participantIndex), 1)
    //set new state
    this.setState( {participantList: participants});
  }

  sortByName = () => {
    this.setState({ sortOrder: !this.state.sortOrder})
    //make a copy of the current list
    const participants = [...this.state.participantList];
    if(this.state.sortOrder) {
      //sort array by name in asc
      participants.sort((a, b) => (a.name > b.name) ? 1 : -1)
    } else {
      //sort array by name in desc
      participants.sort((a, b) => (a.name < b.name) ? 1 : -1)
    }
    //set new state
    this.setState( {participantList: participants});
  }

  sortByEmail = () => {
    this.setState({ sortOrder: !this.state.sortOrder})
    //make a copy of the current list
    const participants = [...this.state.participantList];
    if(this.state.sortOrder) {
      //sort array by email in asc
      participants.sort((a, b) => (a.email > b.email) ? 1 : -1)
    } else {
      //sort array by email in desc
      participants.sort((a, b) => (a.email < b.email) ? 1 : -1)
    }
    //set new state
    this.setState( {participantList: participants});
  }

  sortByPhoneNumber = () => {
    this.setState({ sortOrder: !this.state.sortOrder})
    //make a copy of the current list
    const participants = [...this.state.participantList];
    if(this.state.sortOrder) {
      //sort array by phone number in asc
      participants.sort((a, b) => (a.phoneNumber > b.phoneNumber) ? 1 : -1)
    } else {
      //sort array by phone number in desc
      participants.sort((a, b) => (a.phoneNumber < b.phoneNumber) ? 1 : -1)
    }
    //set new state
    this.setState( {participantList: participants});
  }

  render() {
    let participants = null;
    participants = this.state.participantList.map((participant) => {
      return (
        <Participant
          key={participant.id}
          id={participant.id}
          name={participant.name}
          email={participant.email}
          phoneNumber={participant.phoneNumber}
          saveParticipant={this.saveParticipant}
          deleteParticipant={this.deleleParticipant}
        />
      )
    })
    
    return (
      <div id="container">
        <header className="header">
        <img src={logo} alt=""/>
          <span>
            <h2>
              Iord Software
            </h2>
          </span>
        </header>
        <section className="content">
          <h2>
            List of participants
          </h2>
          <div className="table-body">
            <section>
              <AddParticipant 
                addParticipant={this.addParticipant}
              />
            </section>
            <table>
              <thead>
                <tr>
                  <th className="sortable" onClick={this.sortByName}>Name</th>
                  <th className="sortable" onClick={this.sortByEmail}>Email</th>
                  <th className="sortable" onClick={this.sortByPhoneNumber}>Phone Number</th>
                  <th></th>
                </tr>  
              </thead>
            </table>
            {participants}
          </div>
        </section>
      </div>
    )
  }
}

export default App;
