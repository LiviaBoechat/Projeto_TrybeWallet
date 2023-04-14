import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleEdit = (expenseId) => {
    const { dispatch } = this.props;

    dispatch(editExpense(expenseId));
  };

  handleDelete = (expenseId) => {
    const { expenses, dispatch } = this.props;

    const arrayToMantain = expenses.filter((eachExpense) => (
      eachExpense.id !== expenseId
    ));
    // console.log(arrayToMantain);

    dispatch(deleteExpense(arrayToMantain));
  };

  render() {
    const { expenses, editor } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((eachExpense) => (
            <tr key={ eachExpense.id }>
              <td>{eachExpense.description}</td>
              <td>{eachExpense.tag}</td>
              <td>{eachExpense.method}</td>
              <td>{Number(eachExpense.value).toFixed(2)}</td>
              <td>{eachExpense.exchangeRates[eachExpense.currency].name}</td>
              <td>
                {Number(eachExpense.exchangeRates[eachExpense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>
                {Number(eachExpense.value * eachExpense
                  .exchangeRates[eachExpense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>{eachExpense.exchangeRates[eachExpense.currency].name}</td>
              <td>
                <button
                  data-testid="edit-btn"
                  onClick={ () => this.handleEdit(eachExpense.id) }
                  disabled={ editor }
                >
                  Editar despesa
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={ () => this.handleDelete(eachExpense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
  ...state.walletEdit,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Table);
