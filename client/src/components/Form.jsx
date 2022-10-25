import React from 'react';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      lastname: '',
      user: '',
      errors: {
        name: '',
        lastname: '',
        user: ''
      },
      disabled: true
    };

    this.handleChange = this.handleChange.bind(this);
  }

  validarForm(errors) {
    let valid = true;
    Object.values(errors).forEach( (val) => val.length > 0 && (valid = false)
    );
    if(valid) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case 'name': 
        errors.name = value.length < 5 ? 'Nombre debe tener 5 caracteres' : '';
        break;
      case 'lastname': 
        errors.lastname = value.length < 5 ? 'Apellido debe tener 5 caracteres' : '';
        break;
      case 'user': 
        var emailPattern = /\S+@\S+\.\S+/; // Expresion Regular para validar Emails.
        errors.user = emailPattern.test(value) ? '' : 'El usuario debe ser un email';
        break;
      default:
        break;
    }
    this.setState({
      [name]: value, // Sintaxis ES6 para actualizar la key correspondiente
      errors
    });

    this.validarForm(this.state.errors)
  }

  render() {
    return (
      <form style={{display: 'flex', flexDirection: 'column', width: '150px'}}>
          <input
            name="name"
            type="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Nombre" />
          {!this.state.errors.name ? null : <div>{this.state.errors.name}</div>}
          <input
            name="lastname"
            type="name"
            value={this.state.lastname}
            onChange={this.handleChange}
            placeholder="Apellido" />
          {!this.state.errors.lastname ? null : <div>{this.state.errors.lastname}</div>}
          <input
            name="user"
            type="name"
            value={this.state.user}
            onChange={this.handleChange}
            placeholder="Usuario" />
          {!this.state.errors.user ? null : <div>{this.state.errors.user}</div>}
          <input disabled={this.state.disabled} type="submit" value="Submit" />
      </form>
    );
  }
};

export default Form;