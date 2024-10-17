import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from './homeComponent'; // Adjust the path based on your project structure
import { _getQuestions } from '../service/_DATA';
import rootReducer from '../reducer';

jest.mock('../service/_DATA'); // Mock the _getQuestions function

const mockStore = (initialState) => {
  return createStore(rootReducer, initialState);
};

describe('Home Component', () => {
  const onButtonClick = jest.fn();

  it('displays no new questions message when there are no new questions', async () => {
    _getQuestions.mockResolvedValueOnce({}); // Return an empty object for questions

    const store = mockStore({ user: { id: 'sarahedo' }, isLogin: true });
    
    render(
      <Provider store={store}>
        <Home onButtonClick={onButtonClick} />
      </Provider>
    );
    
    await waitFor(() => expect(screen.getByText(/no new questions available/i)).toBeInTheDocument());
  });
});
