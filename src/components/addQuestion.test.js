import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import configureStore from 'redux-mock-store';
import AddQuestionComponent from './addQuestionComponent';
import { _saveQuestion } from '../service/_DATA';

jest.mock('../service/_DATA'); // Mock the _saveQuestion function

const mockStore = configureStore([]);

describe('AddQuestionComponent', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: { id: 'testuser' }, // Mock user data
    });
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AddQuestionComponent />
        </MemoryRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('submits form with user input', async () => {
    _saveQuestion.mockResolvedValueOnce({}); // Mock successful save

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddQuestionComponent />
        </MemoryRouter>
      </Provider>
    );

    const optionOneInput = screen.getByPlaceholderText(/enter option one text/i);
    const optionTwoInput = screen.getByPlaceholderText(/enter option two text/i);
    const submitButton = screen.getByText(/submit/i);

    // Simulate user typing in the inputs
    fireEvent.change(optionOneInput, { target: { value: 'Option One' } });
    fireEvent.change(optionTwoInput, { target: { value: 'Option Two' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Assert that the _saveQuestion function was called with the correct arguments
    expect(_saveQuestion).toHaveBeenCalledWith({
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'testuser',
    });
  });
});
