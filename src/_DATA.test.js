import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './service/_DATA'; // Adjust the import path as necessary

describe('Data Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch users', async () => {
    const users = await _getUsers();
    expect(users).toHaveProperty('sarahedo');
    expect(users).toHaveProperty('tylermcginnis');
    expect(users).toHaveProperty('mtsamis');
    expect(users).toHaveProperty('zoshikanlu');
  });

  test('should fetch questions', async () => {
    const questions = await _getQuestions();
    expect(questions).toHaveProperty('8xf0y6ziyjabvozdd253nd');
    expect(questions).toHaveProperty('6ni6ok3ym7mf1p33lnez');
  });

  test('should save a new question', async () => {
    const newQuestion = {
      optionOneText: 'What is your favorite color?',
      optionTwoText: 'What is your favorite animal?',
      author: 'sarahedo',
    };
    const savedQuestion = await _saveQuestion(newQuestion);
    expect(savedQuestion).toHaveProperty('id');
    expect(savedQuestion).toHaveProperty('author', 'sarahedo');
    expect(savedQuestion).toHaveProperty('optionOne');
    expect(savedQuestion).toHaveProperty('optionTwo');
    expect(savedQuestion.optionOne.text).toBe('What is your favorite color?');
  });

  test('should fail to save a question without optionOneText', async () => {
    await expect(_saveQuestion({
      optionTwoText: 'What is your favorite animal?',
      author: 'sarahedo',
    })).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
  });

  test('should fail to save a question without optionTwoText', async () => {
    await expect(_saveQuestion({
      optionOneText: 'What is your favorite color?',
      author: 'sarahedo',
    })).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
  });

  test('should save a question answer', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    };
    await _saveQuestionAnswer(answerData);

    const users = await _getUsers();
    expect(users['sarahedo'].answers).toHaveProperty('8xf0y6ziyjabvozdd253nd', 'optionOne');

    const questions = await _getQuestions();
    expect(questions['8xf0y6ziyjabvozdd253nd'].optionOne.votes).toContain('sarahedo');
  });

  test('should fail to save an answer without authedUser', async () => {
    await expect(_saveQuestionAnswer({
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    })).rejects.toEqual("Please provide authedUser, qid, and answer");
  });

});
