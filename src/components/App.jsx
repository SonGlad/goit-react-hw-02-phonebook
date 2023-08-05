import { Component } from 'react';
import { nanoid } from 'nanoid';
import {Section} from './Section/Section';
import {Containers} from './Containers/Container';
import {Form} from './Form/Form';
import { Filter } from './Filter/Filter';
import {Contacts} from './Contacts/Contacts';
import { Notification } from './Notification/Notification';


function filterByString(field, filterValue) {
  return field.toLowerCase().trim().includes(filterValue.toLowerCase().trim());
};


export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  };

  onLengthCheck = () =>{
    return this.state.contacts.length
  };

  onFormSubmitData = ({ name, number }) => {
    if (
      this.state.contacts.some(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number.toLowerCase() === number.toLowerCase()
      )
    ) {
      alert(`${name} or entered number is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };


  onFilterChange = ({ target: { value } }) => {
    this.setState({
      filter: value,
    });
  };

 
  deleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };



  render(){
    const filteredContacts = this.state.contacts.filter(
      contact =>
        filterByString(contact.name, this.state.filter) ||
        filterByString(contact.number, this.state.filter)
    );
    return (
      <Section>
        <Containers title={'Phonebook'}>
          <Form onChange={this.onFormSubmitData}/>
        </Containers>
        <Containers title={'Filter'}>
          <Filter
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
            />
        </Containers>
        <Containers title={'Contacts'}>
          {this.onLengthCheck() === 0 ? (<Notification message="There are no contatcs in your list, sorry"/>): ( <Contacts 
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
            />
          )}
        </Containers>
      </Section>
    );
  }
};
