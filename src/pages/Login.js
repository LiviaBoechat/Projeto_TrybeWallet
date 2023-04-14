import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitUserInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    isEnterButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.validateButton());
  };

  validateButton = () => {
    const { senha, email } = this.state;
    const minLetters = 6;

    const emailModel = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);

    this.setState({
      isEnterButtonDisabled: senha.length < minLetters || !emailModel,
    });
  };

  render() {
    const { email, senha, isEnterButtonDisabled } = this.state;

    // dá para usar o history pq está sendo roteado, então tem propriedades do React Router DOM. Além disso, sem o connect (conectar o componente ao redux), o componente não tem dispatch
    const { history, dispatch } = this.props;

    return (
      <form
        onSubmit={ (e) => {
          // se ñ tiver e.preventDefault o formulario ai ter o comportamento padrão de recarregar a pág. e enviar as info. automaticamente p/ o parâmetro
          e.preventDefault();

          // o dispatch está aqui disparando a ação submitUserInfo pq qd o botão entrar é clicado, a função onSubmit é executada por ele ser do tipo submit. O this.state é passado como parâmetro da função dispatch pq todas as info. se encontram no estado do próprio componente c/ os estados atualizados)
          dispatch(submitUserInfo(this.state));

          // esse history vai levar para a rota  qd apertar o botão pq o botão é do tipo submit e dispara essa função onSubmit qd clicado
          history.push('/carteira');
        } }
      >
        <h1 className="title">Informações Pessoais</h1>
        <input
          data-testid="email-input"
          type="text"
          onChange={ this.handleChange }
          value={ email }
          name="email"
        />
        <input
          data-testid="password-input"
          type="password"
          onChange={ this.handleChange }
          value={ senha }
          name="senha"
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          name="isEnterButtonDisabled"
          disabled={ isEnterButtonDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default connect(null)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
