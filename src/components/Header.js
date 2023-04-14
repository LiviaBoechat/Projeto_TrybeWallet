import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <div>
          <h4 data-testid="email-field">{ email }</h4>
          <h4 data-testid="total-field">
            {expenses.reduce((acc, curr) => {
              const value = Number(curr.value)
              * Number(curr.exchangeRates[curr.currency].ask);
              console.log(acc);
              return acc + value;
            }, 0).toFixed(2)}
          </h4>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
  ...state.walletEdit,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
