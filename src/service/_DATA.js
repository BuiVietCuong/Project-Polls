// src/service/_DATA.js

const initialData = {
  users: {
    sarahedo: {
      id: "sarahedo",
      password: "password123",
      name: "Sarah Edo",
      avatarURL: "https://images.unsplash.com/photo-1728935367997-d9dd04a4d447?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      answers: {
        "8xf0y6ziyjabvozdd253nd": "optionOne",
        "6ni6ok3ym7mf1p33lnez": "optionOne",
        "am8ehyc8byjqgar0jgpub9": "optionTwo",
        "loxhs1bqm25b708cmbf3g": "optionTwo",
      },
      questions: [
        "8xf0y6ziyjabvozdd253nd",
        "am8ehyc8byjqgar0jgpub9",
      ],
    },
    tylermcginnis: {
      id: "tylermcginnis",
      password: "abc321",
      name: "Tyler McGinnis",
      avatarURL: "https://images.unsplash.com/photo-1616540389399-3033c4ba7072?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      answers: {
        "vthrdm985a262al8qx3do": "optionOne",
        "xj352vofupe1dqz9emx13r": "optionTwo",
      },
      questions: [
        "loxhs1bqm25b708cmbf3g",
        "vthrdm985a262al8qx3do",
      ],
    },
    mtsamis: {
      id: "mtsamis",
      password: "xyz123",
      name: "Mike Tsamis",
      avatarURL: "https://images.unsplash.com/photo-1600013227786-329ab1958371?q=80&w=2135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      answers: {
        "xj352vofupe1dqz9emx13r": "optionOne",
        "vthrdm985a262al8qx3do": "optionTwo",
        "6ni6ok3ym7mf1p33lnez": "optionOne",
      },
      questions: [
        "6ni6ok3ym7mf1p33lnez",
        "xj352vofupe1dqz9emx13r",
      ],
    },
    zoshikanlu: {
      id: "zoshikanlu",
      password: "pass246",
      name: "Zenobia Oshikanlu",
      avatarURL: "https://plus.unsplash.com/premium_photo-1663040014450-11d8157ad539?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      answers: {
        "xj352vofupe1dqz9emx13r": "optionOne",
      },
      questions: [],
    },
  },
  questions: {
    "8xf0y6ziyjabvozdd253nd": {
      id: "8xf0y6ziyjabvozdd253nd",
      author: "sarahedo",
      timestamp: 1467166872634,
      optionOne: {
        votes: ["sarahedo"],
        text: "Build our new application with Javascript",
      },
      optionTwo: {
        votes: [],
        text: "Build our new application with Typescript",
      },
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: "6ni6ok3ym7mf1p33lnez",
      author: "mtsamis",
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
        text: "hire more frontend developers",
      },
      optionTwo: {
        votes: ["mtsamis", "sarahedo"],
        text: "hire more backend developers",
      },
    },
    "am8ehyc8byjqgar0jgpub9": {
      id: "am8ehyc8byjqgar0jgpub9",
      author: "sarahedo",
      timestamp: 1488579767190,
      optionOne: {
        votes: [],
        text: "conduct a release retrospective 1 week after a release",
      },
      optionTwo: {
        votes: ["sarahedo"],
        text: "conduct release retrospectives quarterly",
      },
    },
    "loxhs1bqm25b708cmbf3g": {
      id: "loxhs1bqm25b708cmbf3g",
      author: "tylermcginnis",
      timestamp: 1482579767190,
      optionOne: {
        votes: [],
        text: "have code reviews conducted by peers",
      },
      optionTwo: {
        votes: ["sarahedo"],
        text: "have code reviews conducted by managers",
      },
    },
    "vthrdm985a262al8qx3do": {
      id: "vthrdm985a262al8qx3do",
      author: "tylermcginnis",
      timestamp: 1489579767190,
      optionOne: {
        votes: ["tylermcginnis"],
        text: "take a course on ReactJS",
      },
      optionTwo: {
        votes: ["mtsamis"],
        text: "take a course on unit testing with Jest",
      },
    },
    "xj352vofupe1dqz9emx13r": {
      id: "xj352vofupe1dqz9emx13r",
      author: "mtsamis",
      timestamp: 1493579767190,
      optionOne: {
        votes: ["mtsamis", "zoshikanlu"],
        text: "deploy to production once every two weeks",
      },
      optionTwo: {
        votes: ["tylermcginnis"],
        text: "deploy to production once every month",
      },
    },
  },
};

// Function to save initial data to local storage
const saveDataToLocalStorage = () => {
  localStorage.setItem('data', JSON.stringify(initialData));
};

// Function to get data from local storage
const getDataFromLocalStorage = () => {
  const data = localStorage.getItem('data');
  return data ? JSON.parse(data) : initialData;
};

// Function to get all users
const _getUsers = () => {
  const data = getDataFromLocalStorage();
  return data.users;
};

// Function to get all questions
const _getQuestions = () => {
  const data = getDataFromLocalStorage();
  return data.questions;
};


function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

const _saveQuestion = (question) => {
  console.log("Coming in _saveQuestion");
  return new Promise((resolve, reject) => {
    if (!question.optionOneText || !question.optionTwoText || !question.author) {
      return reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion = formatQuestion(question); // Format the question
    const data = getDataFromLocalStorage(); // Fetch existing data

    // Add the formatted question to the questions object
    data.questions[formattedQuestion.id] = formattedQuestion;

    // Update the user's questions list
    if (data.users[question.author]) {
      data.users[question.author].questions.push(formattedQuestion.id);
    }

    // Save back to localStorage
    localStorage.setItem('data', JSON.stringify(data)); 

    resolve(formattedQuestion); // Resolve with the formatted question
    console.log("Updated questions: =====", getDataFromLocalStorage().questions);
  });
};


// Function to save an answer
const _saveQuestionAnswer = ({ authedUser, qid, answer }) => {
  console.log("come to _saveQuestionAnswer")
  const data = getDataFromLocalStorage();
  console.log("data.users[authedUser]: ", data,  data.users[authedUser])
  data.users[authedUser].answers[qid] = answer;
  data.questions[qid][answer].votes.push(authedUser);
  localStorage.setItem('data', JSON.stringify(data));
};

export {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
};
