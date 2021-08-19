import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Section from "../Section/Section";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";

export default function App() {
  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState("");
  // console.log(contacts);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
    // addContactToList();
  }, [contacts]);

  // componentDidUpdate(prevState) {
  //   const prevContacts = prevState.contacts;
  //   const nextContacts = this.state.contacts;
  //   if (prevContacts !== nextContacts) {
  //      localStorage.setItem('contacts', JSON.stringify(nextContacts))
  //   }
  // };

  // componentDidMount() {
  //   const contactsFromLocal = JSON.parse(localStorage.getItem('contacts'));
  //   if (contactsFromLocal) {
  //     this.setState({ contacts: contactsFromLocal })
  //   }

  // }

  const addContactToList = (name, number) => {
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };
    // console.log(newContact);

    const doubleContact = contacts.find(
      (contact) => contact.name === newContact.name
    );

    !doubleContact
      ? setContacts([...contacts, newContact])
      // ? setContacts(({ contacts }) => ({
      //     contacts: [...contacts, newContact],
      //   }))
      // this.setState(({ contacts }) => ({
      //     contacts: [...contacts, newContact],
      //   }))
      : alert(`${name} is already in contacts`);
  };

  const findName = (e) => {
    setFilter(e.currentTarget.value);
    // this.setState({ filter: e.currentTarget.value });
  };

  const getFilteredContacts=() => {
    // const { contacts, filter } = this.state;
    const normalizedFilteredName = filter.toLowerCase();
    // console.log(contacts);


    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilteredName)
    );
  }

  const deleteContact = (contactId) => {
    setContacts(contacts.filter(
        (contact) => contact.id !== contactId
      ),
    )
    // setContacts((prevState) => ({
    //   contacts: prevState.filter(
    //     (contact) => contact.id !== contactId
    //   ),
    // }))
    // this.setState((prevState) => ({
    //   contacts: prevState.contacts.filter(
    //     (contact) => contact.id !== contactId
    //   ),
    // }));
  };


    // const contactsToRender = getFilteredContacts();
    return (
      <div>
        <Section title={"Phonebook"}>
          <ContactForm onSubmit={addContactToList} />
          {/* <ContactForm  /> */}
          <h2>Contacts</h2>
          <Filter value={filter} onFindName={findName} />

          <ContactList
            // contacts={contactsToRender}
            // contacts={contacts}
            contacts={getFilteredContacts()}
            onBtnClick={deleteContact}
          />

        </Section>
      </div>
    );
}

// import { Component } from "react";
// import { v4 as uuidv4 } from "uuid";
// import Section from "../Section/Section";
// import ContactForm from "../ContactForm/ContactForm";
// import ContactList from "../ContactList/ContactList";
// import Filter from "../Filter/Filter";

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: "",
//   };

//   componentDidUpdate(prevState) {
//     const prevContacts = prevState.contacts;
//     const nextContacts = this.state.contacts;
//     if (prevContacts !== nextContacts) {
//        localStorage.setItem('contacts', JSON.stringify(nextContacts))
//     }
//   };

//   componentDidMount() {
//     const contactsFromLocal = JSON.parse(localStorage.getItem('contacts'));
//     if (contactsFromLocal) {
//       this.setState({ contacts: contactsFromLocal })
//     }

//   }

//   addContactToList = (name, number) => {
//     const newContact = {
//       id: uuidv4(),
//       name,
//       number,
//     };

//     const doubleContact = this.state.contacts.find(
//       (contact) => contact.name === newContact.name
//     );

//     !doubleContact
//       ? this.setState(({ contacts }) => ({
//           contacts: [...contacts, newContact],
//         }))
//       : alert(`${name} is already in contacts`);
//   };

//   findName = (e) => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getFilteredContacts() {
//     const { contacts, filter } = this.state;
//     const normalizedFilteredName = filter.toLowerCase();

//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(normalizedFilteredName)
//     );
//   }

//   deleteContact = (contactId) => {
//     this.setState((prevState) => ({
//       contacts: prevState.contacts.filter(
//         (contact) => contact.id !== contactId
//       ),
//     }));
//   };

//   render() {
//     const contactsToRender = this.getFilteredContacts();
//     return (
//       <div>
//         <Section title={"Phonebook"}>
//           <ContactForm onSubmit={this.addContactToList} />
//           <h2>Contacts</h2>
//           <Filter value={this.state.filter} onFindName={this.findName} />

//           <ContactList
//             contacts={contactsToRender}
//             onBtnClick={this.deleteContact}
//           />

//         </Section>
//       </div>
//     );
//   }
// }

// export default App;
