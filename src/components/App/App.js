import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Section from "../Section/Section";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidUpdate(prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;
    if (prevContacts !== nextContacts) {
       localStorage.setItem('contacts', JSON.stringify(nextContacts))
    }
  };

  componentDidMount() {
    const contactsFromLocal = JSON.parse(localStorage.getItem('contacts'));
    if (contactsFromLocal) {
      this.setState({ contacts: contactsFromLocal })
    }
      
  }

  addContactToList = (name, number) => {
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    const doubleContact = this.state.contacts.find(
      (contact) => contact.name === newContact.name
    );

    !doubleContact
      ? this.setState(({ contacts }) => ({
          contacts: [...contacts, newContact],
        }))
      : alert(`${name} is already in contacts`);
  };

  findName = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts() {
    const { contacts, filter } = this.state;
    const normalizedFilteredName = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilteredName)
    );
  }

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const contactsToRender = this.getFilteredContacts();
    return (
      <div>
        <Section title={"Phonebook"}>
          <ContactForm onSubmit={this.addContactToList} />
          <h2>Contacts</h2>
          <Filter value={this.state.filter} onFindName={this.findName} />

          <ContactList
            contacts={contactsToRender}
            onBtnClick={this.deleteContact}
          />
          
        </Section>
      </div>
    );
  }
}

export default App;
