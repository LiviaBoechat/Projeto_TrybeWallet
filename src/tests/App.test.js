import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const INITIAL_STATE_MOCK = {
  user: { email: '' },
  wallet: {
    currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC',
      'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
    expenses: [
      {
        id: 1,
        value: '100',
        description: 'Farmácia',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: [
          mockData,
        ],
      },
    ],
    totalExpenses: 0,
  },
  walletEdit: {
    editedExpense: {},
    editor: false,
    idToEdit: 0,
    edited: false,
  },
};

const valueInputDataTEstId = 'value-input';
const descriptionDataTestId = 'description-input';
const addBtnName = 'Adicionar despesa';
describe('Teste da página de Login', () => {
  test('Teste se a página contém as informações sobre Login e se o botão direciona para a página de Carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const EMAIL_USER = 'email@email.com';
    const PASSWORD_USER = '123456';

    const personalInfoTitle = screen.getByRole('heading', { name: 'Informações Pessoais' });
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-button');

    expect(personalInfoTitle).toBeVisible();
    expect(emailInput).toBeVisible();
    expect(passwordInput).toBeVisible();
    expect(enterBtn).toBeVisible();

    userEvent.type(emailInput, EMAIL_USER);
    userEvent.type(passwordInput, PASSWORD_USER);
    userEvent.click(enterBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

describe('Teste da página de Wallet', () => {
  test('Testa se o e-mail do usuário aparece no render', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => history.push('/carteira'));

    const userEmail = screen.getByTestId('email-field');
    const totalCost = screen.getByTestId('total-field');

    expect(userEmail).toBeVisible();
    expect(totalCost).toBeVisible();
  });

  test('Testa se os campos p/ preencher despesas estão na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => history.push('/carteira'));

    const valueInput = screen.getByTestId(valueInputDataTEstId);
    const descriptionInput = screen.getByTestId(descriptionDataTestId);
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addExpenseBtn = screen.getByRole('button', { name: addBtnName });
    const allInputs = [valueInput, descriptionInput,
      currencyInput, methodInput, tagInput, addExpenseBtn];

    allInputs.forEach((eachInput) => expect(eachInput).toBeVisible());
  });

  test('Testa se as despesas estão sendo adicionadas ao clicar o botão', async () => {
    const initialState = { INITIAL_STATE_MOCK };
    const initialEntries = ['/carteira'];

    const { store } = renderWithRouterAndRedux(
      <App />,
      {
        initialState,
        initialEntries,
      },
    );
    console.log(store.getState());

    const valueInput = screen.getByTestId(valueInputDataTEstId);
    const descriptionInput = screen.getByTestId(descriptionDataTestId);
    const addExpenseBtn = screen.getByRole('button', { name: addBtnName });

    userEvent.type(valueInput, '100');
    userEvent.type(descriptionInput, 'expense description');
    userEvent.click(addExpenseBtn);

    const expenseValue = await screen.findByRole('cell', { name: '100.00' });
    const expenseDescription = await screen.findByRole('cell', { name: 'expense description' });

    await waitFor(() => {
      expect(expenseValue).toBeVisible();
      expect(expenseDescription).toBeVisible();
    });
  });

  test('Testa se as despesas estão sendo exluídas do estado global e da tabela ao clicar o botão', async () => {
    const initialEntries = ['/carteira'];

    const { store } = renderWithRouterAndRedux(
      <App />,
      {
        initialEntries,
      },
    );
    console.log(store.getState());

    const valueInput = screen.getByTestId(valueInputDataTEstId);
    const descriptionInput = screen.getByTestId(descriptionDataTestId);
    const addExpenseBtn = screen.getByRole('button', { name: addBtnName });

    userEvent.type(valueInput, '100');
    userEvent.type(descriptionInput, 'Farmácia');
    userEvent.click(addExpenseBtn);

    const deleteBtn = await screen.findByRole('button', { name: 'Excluir' });
    // screen.logTestingPlaygroundURL();
    userEvent.click(deleteBtn);

    await waitFor(() => {
      expect(screen.queryByText('Farmácia')).toBe(null);
      // screen.logTestingPlaygroundURL();
    });
  });

  test('Testa se as despesas estão sendo editadas do estado e da tabela ao clicar o botão', async () => {
    const initialEntries = ['/carteira'];

    const { store } = renderWithRouterAndRedux(
      <App />,
      {
        initialEntries,
      },
    );
    console.log(store.getState());

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addExpenseBtn = screen.getByRole('button', { name: addBtnName });

    userEvent.type(valueInput, '100');
    userEvent.type(descriptionInput, 'Farmácia');
    userEvent.click(addExpenseBtn);

    const editBtn = await screen.findByRole('button', { name: 'Editar despesa' });
    // screen.logTestingPlaygroundURL();
    userEvent.click(editBtn);

    userEvent.type(descriptionInput, 'Carro');
    userEvent.click(editBtn);

    await waitFor(() => {
      expect(screen.queryByText('Carro')).toBe(null);
      // screen.logTestingPlaygroundURL();
    });
  });

  test('Testa se o botão de adicionar despesa muda para editar despesa quando o botão editar despesa (na tablea) é clicado', async () => {
    const initialEntries = ['/carteira'];

    const { store } = renderWithRouterAndRedux(
      <App />,
      {
        initialEntries,
      },
    );
    console.log(store.getState());

    const valueInput = screen.getByTestId(valueInputDataTEstId);
    const descriptionInput = screen.getByTestId(descriptionDataTestId);
    const addExpenseBtn = screen.getByRole('button', { name: addBtnName });

    userEvent.type(valueInput, '100');
    userEvent.type(descriptionInput, 'Farmácia');
    userEvent.click(addExpenseBtn);

    const editBtn = await screen.findByRole('button', { name: 'Editar despesa' });
    userEvent.click(editBtn);

    await waitFor(() => {
      expect(screen.queryByText(addBtnName)).toBe(null);
      // screen.logTestingPlaygroundURL();
    });
  });
});
