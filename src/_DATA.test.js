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

  test('should fail to save a question without author', async () => {
    await expect(_saveQuestion({
      optionOneText: 'What is your favorite color?',
      optionTwoText: 'What is your favorite animal?',
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

  test('should fail to save an answer without qid', async () => {
    await expect(_saveQuestionAnswer({
      authedUser: 'sarahedo',
      answer: 'optionOne',
    })).rejects.toEqual("Please provide authedUser, qid, and answer");
  });

  test('should fail to save an answer without answer', async () => {
    await expect(_saveQuestionAnswer({
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
    })).rejects.toEqual("Please provide authedUser, qid, and answer");
  });

  test('should correctly update the votes when saving answers', async () => {
    const answerData = {
      authedUser: 'tylermcginnis',
      qid: '6ni6ok3ym7mf1p33lnez',
      answer: 'optionTwo',
    };
    await _saveQuestionAnswer(answerData);

    const users = await _getUsers();
    expect(users['tylermcginnis'].answers).toHaveProperty('6ni6ok3ym7mf1p33lnez', 'optionTwo');

    const questions = await _getQuestions();
    expect(questions['6ni6ok3ym7mf1p33lnez'].optionTwo.votes).toContain('tylermcginnis');
  });

  test('should not overwrite existing votes', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      qid: '6ni6ok3ym7mf1p33lnez',
      answer: 'optionTwo',
    };
    await _saveQuestionAnswer(answerData);

    const questions = await _getQuestions();
    expect(questions['6ni6ok3ym7mf1p33lnez'].optionTwo.votes).toContain('sarahedo');
    expect(questions['6ni6ok3ym7mf1p33lnez'].optionOne.votes).not.toContain('sarahedo');
  });

  test('should not allow duplicate answers', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    };
    await _saveQuestionAnswer(answerData); // First time
    await _saveQuestionAnswer(answerData); // Second time, should not change anything

    const users = await _getUsers();
    expect(users['sarahedo'].answers['8xf0y6ziyjabvozdd253nd']).toBe('optionOne');
  });

  test('should correctly handle multiple users answering questions', async () => {
    const answerData1 = {
      authedUser: 'tylermcginnis',
      qid: '6ni6ok3ym7mf1p33lnez',
      answer: 'optionTwo',
    };
    const answerData2 = {
      authedUser: 'mtsamis',
      qid: '6ni6ok3ym7mf1p33lnez',
      answer: 'optionOne',
    };

    await _saveQuestionAnswer(answerData1);
    await _saveQuestionAnswer(answerData2);

    const questions = await _getQuestions();
    expect(questions['6ni6ok3ym7mf1p33lnez'].optionOne.votes).toContain('mtsamis');
    expect(questions['6ni6ok3ym7mf1p33lnez'].optionTwo.votes).toContain('tylermcginnis');
  });
});
