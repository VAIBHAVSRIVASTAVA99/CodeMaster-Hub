const axios = require('axios');

const fetchRandomCodeChefQuestion = async () => {
  try {
    const problems = [
      {
        title: "Life, the Universe, and Everything",
        code: "TEST",
        difficulty: "Easy",
      },
      {
        title: "ATM",
        code: "HS08TEST",
        difficulty: "Easy",
      },
      {
        title: "Add Two Numbers",
        code: "FLOW001",
        difficulty: "Easy",
      },
      {
        title: "Number Mirror",
        code: "START01",
        difficulty: "Easy",
      },
      {
        title: "Sum of Digits",
        code: "FLOW006",
        difficulty: "Easy",
      },
      {
        title: "Chef and Operators",
        code: "CHOPRT",
        difficulty: "Easy",
      },
      {
        title: "Finding Square Roots",
        code: "FSQRT",
        difficulty: "Easy",
      },
      {
        title: "Second Largest",
        code: "FLOW017",
        difficulty: "Easy",
      }
    ];

    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    return {
      platform: "CodeChef",
      title: randomProblem.title,
      url: `https://www.codechef.com/problems/${randomProblem.code}`,
      difficulty: randomProblem.difficulty
    };
  } catch (error) {
    console.error('Error fetching CodeChef question:', error.message);
    return null;
  }
};

module.exports = fetchRandomCodeChefQuestion;