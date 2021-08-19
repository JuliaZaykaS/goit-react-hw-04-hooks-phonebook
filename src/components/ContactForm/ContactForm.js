import { Component } from "react";
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  onChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  onSubmitContact = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.name, this.state.number);
    
    this.setState({ name: "", number: "" });

  };

  render() {
    return (
      <form className={s.form} onSubmit={this.onSubmitContact}>
        <label className={s.label}>
          Name
          <input
          className={s.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={this.state.name}
            onChange={this.onChangeInput}
          />
        </label>
        <label className={s.label}>
          Number
          <input
            className={s.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            value={this.state.number}
            onChange={this.onChangeInput}
          />
        </label>
        <button className={s.button} type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
