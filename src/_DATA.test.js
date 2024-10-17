// src/service/_DATA.test.js

import { saveDataToLocalStorage,
    getDataFromLocalStorage,
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
 } from "./service/_DATA";

  
  describe('Data Service', () => {
    beforeEach(() => {
      localStorage.clear(); // Clear localStorage before each test
      saveDataToLocalStorage(); // Set up initial data
    });
  
    it('should save initial data to local storage', () => {
      const data = getDataFromLocalStorage();
      expect(data).toHaveProperty('users');
      expect(data).toHaveProperty('questions');
      expect(Object.keys(data.users)).toHaveLength(4); // Should match initial users
      expect(Object.keys(data.questions)).toHaveLength(6); // Should match initial questions
    });
  
    it('should get all users', () => {
      const users = _getUsers();
      expect(users).toHaveProperty('sarahedo');
      expect(users.sarahedo.name).toBe('Sarah Edo');
    });
  
    it('should get all questions', () => {
      const questions = _getQuestions();
      expect(Object.keys(questions)).toHaveLength(6); // Should match initial questions
    });
  
    it('should save a new question', async () => {
      const newQuestion = {
        optionOneText: 'Option One',
        optionTwoText: 'Option Two',
        author: 'sarahedo',
      };
  
      const savedQuestion = await _saveQuestion(newQuestion);
      
      expect(savedQuestion).toHaveProperty('id');
      expect(savedQuestion.optionOne.text).toBe('Option One');
      expect(savedQuestion.optionTwo.text).toBe('Option Two');
  
      const data = getDataFromLocalStorage();
      expect(Object.keys(data.questions)).toHaveLength(7); // One more question added
      expect(data.users['sarahedo'].questions).toContain(savedQuestion.id);
    });
  
    it('should throw an error if question is missing required fields', async () => {
      const invalidQuestion = {
        optionOneText: 'Option One',
        author: 'sarahedo',
      };
  
      await expect(_saveQuestion(invalidQuestion)).rejects.toMatch('Please provide optionOneText, optionTwoText, and author');
    });
  
    it('should save an answer to a question', () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne',
      };
  
      _saveQuestionAnswer(answerData);
  
      const data = getDataFromLocalStorage();
      expect(data.users['sarahedo'].answers).toHaveProperty('8xf0y6ziyjabvozdd253nd', 'optionOne');
      expect(data.questions['8xf0y6ziyjabvozdd253nd'].optionOne.votes).toContain('sarahedo');
    });
  
    it('should throw an error when saving an answer for a non-existent question', () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: 'nonExistentQuestionId',
        answer: 'optionOne',
      };
  
      expect(() => _saveQuestionAnswer(answerData)).toThrow(); // Modify the function to handle this case
    });
  
    it('should save the answer only if user exists', () => {
      const answerData = {
        authedUser: 'nonExistentUser',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne',
      };
  
      expect(() => _saveQuestionAnswer(answerData)).toThrow(); // Modify the function to handle this case
    });
  
    it('should correctly format a new question', async () => {
      const newQuestion = {
        optionOneText: 'New Option One',
        optionTwoText: 'New Option Two',
        author: 'sarahedo',
      };
  
      const savedQuestion = await _saveQuestion(newQuestion);
      expect(savedQuestion.timestamp).toBeTruthy();
      expect(savedQuestion.optionOne.votes).toEqual([]);
      expect(savedQuestion.optionTwo.votes).toEqual([]);
    });
  
    it('should maintain existing data when adding a question', async () => {
      const existingData = getDataFromLocalStorage();
      const initialQuestionCount = Object.keys(existingData.questions).length;
  
      const newQuestion = {
        optionOneText: 'Another Option One',
        optionTwoText: 'Another Option Two',
        author: 'tylermcginnis',
      };
  
      await _saveQuestion(newQuestion);
      const updatedData = getDataFromLocalStorage();
      expect(Object.keys(updatedData.questions)).toHaveLength(initialQuestionCount + 1);
    });
  
    it('should save multiple answers and reflect in localStorage', () => {
      const answerData1 = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne',
      };
  
      const answerData2 = {
        authedUser: 'tylermcginnis',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionTwo',
      };
  
      _saveQuestionAnswer(answerData1);
      _saveQuestionAnswer(answerData2);
  
      const data = getDataFromLocalStorage();
      expect(data.questions['8xf0y6ziyjabvozdd253nd'].optionOne.votes).toContain('sarahedo');
      expect(data.questions['8xf0y6ziyjabvozdd253nd'].optionTwo.votes).toContain('tylermcginnis');
    });
  });
  