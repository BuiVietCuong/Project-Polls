import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { _getQuestions } from '../service/_DATA';
import Home from './homeComponent';

// Mock the _getQuestions function
jest.mock('../service/_DATA', () => ({
  _getQuestions: jest.fn(),
}));

// Simple reducer for testing
const initialState = {
  user: { id: 'sarahedo' },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(reducer);

describe('Home Component', () => {
  beforeEach(() => {
    _getQuestions.mockResolvedValueOnce({
      "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
          votes: ['sarahedo'],
          text: 'Build our new application with Javascript',
        },
        optionTwo: {
          votes: [],
          text: 'Build our new application with Typescript',
        },
      },
      "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        author: 'mtsamis',
        timestamp: 1468479767190,
        optionOne: {
          votes: [],
          text: 'hire more frontend developers',
        },
        optionTwo: {
          votes: ['sarahedo'],
          text: 'hire more backend developers',
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays no questions message when there are no new questions', async () => {
    _getQuestions.mockResolvedValueOnce({}); // Simulate no questions available

    render(
      <Provider store={store}>
        <Home onButtonClick={jest.fn()} />
      </Provider>
    );

    const noQuestionsMessage = await screen.findByText(/No new questions available./i);
    expect(noQuestionsMessage).toBeInTheDocument();
  });
});
