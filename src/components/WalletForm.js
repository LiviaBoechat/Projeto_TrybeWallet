import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEconomiaAPI,
  addExpenses, subscribe, editedToFalse } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: [],
  };

  async componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchEconomiaAPI());
  }

  async componentDidUpdate() {
    const { dispatch, edited, idToEdit, expenses } = this.props;

    if (edited) {
      const getEditedObject = expenses.find((eachExpense) => (
        eachExpense.id === idToEdit
      ));
      console.log(getEditedObject);
      this.setState({
        value: getEditedObject.value,
        description: getEditedObject.description,
        currency: getEditedObject.currency,
        method: getEditedObject.method,
        tag: getEditedObject.tag,
        exchangeRates: getEditedObject.exchangeRates,
      });
      dispatch(editedToFalse());
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleAddExpense = () => {
    const { dispatch } = this.props;
    const { exchangeRates: _, ...data } = this.state;
    dispatch(addExpenses(data));

    this.setState({
      value: '',
      description: '',
    });
  };

  handleSubscribe = () => {
    // const { value, description, currency, method, tag } = this.state;
    const { dispatch, expenses, idToEdit } = this.props;

    const getExpenseIndex = expenses.findIndex((expense) => expense.id === idToEdit);
    const expenseId = expenses.find((expense) => expense.id === idToEdit);
    expenses[getExpenseIndex] = {
      ...this.state,
      id: expenseId.id,
    };
    // console.log(expenses)
    dispatch(subscribe(expenses));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    // console.log(currencies);
    return (
      <form>
        <label htmlFor="value-input">
          Valor
          <input
            id="value-input"
            data-testid="value-input"
            value={ value }
            name="value"
            type="number"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição da despesa
          <input
            id="description-input"
            data-testid="description-input"
            type="text"
            onChange={ this.handleChange }
            value={ description }
            name="description"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda
          <select
            id="currency-input"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
            name="currency"
          >
            {currencies.map((eachCurrency) => (
              <option
                key={ eachCurrency }
                value={ eachCurrency }
              >
                { eachCurrency }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento
          <select
            id="method-input"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
            name="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria da despesa
          <select
            id="tag-input"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
            name="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ editor ? () => this.handleSubscribe()
            : () => this.handleAddExpense() }
        >
          { editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
  ...state.walletEdit,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number.isRequired,
    method: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  edited: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};
