// DOM Elements
const registrationContainer = document.getElementById("registration-container")
const registrationForm = document.getElementById("registration-form")
const usernameInput = document.getElementById("username")
const streamSelect = document.getElementById("stream")
const quizContainer = document.getElementById("quiz-container")
const userDisplay = document.getElementById("user-display")
const streamDisplay = document.getElementById("stream-display")
const questionText = document.getElementById("question-text")
const optionsContainer = document.getElementById("options-container")
const timeLeft = document.getElementById("time-left")
const currentQuestionEl = document.getElementById("current-question")
const totalQuestionsEl = document.getElementById("total-questions")
const scoreEl = document.getElementById("score")
const progressFill = document.getElementById("progress-fill")
const resultsContainer = document.getElementById("results-container")
const resultName = document.getElementById("result-name")
const resultStream = document.getElementById("result-stream")
const finalScore = document.getElementById("final-score")
const maxScore = document.getElementById("max-score")
const percentage = document.getElementById("percentage")
const performanceMessage = document.getElementById("performance-message")
const restartBtn = document.getElementById("restart-btn")
const quitBtn = document.getElementById("quit-btn")
const quizRestartBtn = document.getElementById("quiz-restart-btn")
const quizQuitBtn = document.getElementById("quiz-quit-btn")
const correctSound = document.getElementById("correct-sound")
const incorrectSound = document.getElementById("incorrect-sound")

// Quiz state
let username = ""
let selectedStream = ""
let currentQuestion = 0
let score = 0
let timer
let timeRemaining = 10
let currentQuestions = []

// Question banks for different streams
const questionBanks = {
  "computer-science": [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which programming language is known as the 'mother of all languages'?",
      options: ["Python", "C", "Java", "Assembly"],
      correctAnswer: 1,
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1,
    },
    {
      question: "Which data structure uses LIFO principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: 1,
    },
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Standard Query Language",
        "Sequential Query Language",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which of the following is not an object-oriented programming language?",
      options: ["Java", "C++", "Python", "C"],
      correctAnswer: 3,
    },
    {
      question: "What is the default port number for HTTP?",
      options: ["21", "80", "443", "25"],
      correctAnswer: 1,
    },
    {
      question: "Which company developed the Windows operating system?",
      options: ["Apple", "Google", "Microsoft", "IBM"],
      correctAnswer: 2,
    },
    {
      question: "Which one is a NoSQL database?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
      correctAnswer: 2,
    },
    {
      question: "What does 'CPU' stand for?",
      options: ["Central Process Unit", "Computer Processing Unit", "Central Processing Unit", "Central Power Unit"],
      correctAnswer: 2,
    },
    {
      question: "Which of the following is a version control system?",
      options: ["Linux", "Git", "Apache", "Docker"],
      correctAnswer: 1,
    },
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: 1,
    },
    {
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Applied Program Instruction", "Advanced Programming Index", "Application Process Integration"],
      correctAnswer: 0,
    },
    {
      question: "What is the primary function of an operating system?",
      options: ["Running antivirus", "Browsing the internet", "Managing hardware and software", "Designing websites"],
      correctAnswer: 2,
    },
    
    {
      question: "Which algorithm is used for finding the shortest path in a graph?",
      options: ["Bubble Sort", "Dijkstra's Algorithm", "Binary Search", "Quick Sort"],
      correctAnswer: 1,
    },
  ],
  gk: [
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctAnswer: 2,
    },
    {
      question: "Which continent is the Sahara Desert located on?",
      options: ["Asia", "Africa", "Australia", "South America"],
      correctAnswer: 1,
    },
    {
      question: "Who invented the telephone?",
      options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Isaac Newton"],
      correctAnswer: 0,
    },
    {
      question: "How many players are there in a soccer team on the field?",
      options: ["9", "10", "11", "12"],
      correctAnswer: 2,
    },
    {
      question: "What is the boiling point of water in Celsius?",
      options: ["100", "90", "80", "120"],
      correctAnswer: 0,
    },
    {
      question: "Who was the first person to walk on the moon?",
      options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Michael Collins"],
      correctAnswer: 1,
    },
    {
      question: "Which is the longest river in the world?",
      options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
      correctAnswer: 0,
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "South Korea", "Thailand"],
      correctAnswer: 1,
    },
    
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
    },
    {
      question: "Who wrote the novel '1984'?",
      options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
      correctAnswer: 1,
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: 3,
    },
    {
      question: "Which element has the chemical symbol 'Au'?",
      options: ["Silver", "Gold", "Aluminum", "Argon"],
      correctAnswer: 1,
    },
    {
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correctAnswer: 1,
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
      correctAnswer: 2,
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2,
    },
  ],
  "current-affair": [
    {
      question: "Who is the current Secretary-General of the United Nations?",
      options: ["Ban Ki-moon", "António Guterres", "Kofi Annan", "Boutros Boutros-Ghali"],
      correctAnswer: 1,
    },
    {
      question: "Which tech company acquired Activision Blizzard in 2023?",
      options: ["Sony", "Apple", "Microsoft", "Amazon"],
      correctAnswer: 2,
    },
    {
      question: "Which country launched the Aditya-L1 solar mission in 2023?",
      options: ["USA", "China", "India", "Russia"],
      correctAnswer: 2,
    },
    {
      question: "Who is the current President of the United States (2025)?",
      options: ["Donald Trump", "Joe Biden", "Barack Obama", "Kamala Harris"],
      correctAnswer: 1,
    },
    {
      question: "Which country left the European Union in 2020?",
      options: ["Germany", "Italy", "United Kingdom", "France"],
      correctAnswer: 2,
    },
    {
      question: "What is the name of the initiative promoting semiconductor manufacturing in India?",
      options: ["Digital India", "Startup India", "Make in India", "India Semiconductor Mission"],
      correctAnswer: 3,
    },
    {
      question: "Which company launched GPT-4.5 in 2024?",
      options: ["Meta", "Google", "OpenAI", "Amazon"],
      correctAnswer: 2,
    },
    {
      question: "Which global summit was held in India in 2023?",
      options: ["G7", "BRICS", "G20", "COP28"],
      correctAnswer: 2,
    },
    
    {
      question: "Which country hosted the 2024 Summer Olympics?",
      options: ["Japan", "France", "USA", "Australia"],
      correctAnswer: 1,
    },
    {
      question: "What is the name of the AI chatbot developed by OpenAI?",
      options: ["Bard", "ChatGPT", "Claude", "Copilot"],
      correctAnswer: 1,
    },
    {
      question: "Which social media platform was rebranded to 'X' in 2023?",
      options: ["Facebook", "Instagram", "Twitter", "TikTok"],
      correctAnswer: 2,
    },
    {
      question: "Who won the 2023 Nobel Prize in Literature?",
      options: ["Jon Fosse", "Annie Ernaux", "Abdulrazak Gurnah", "Louise Glück"],
      correctAnswer: 0,
    },
    {
      question: "Which country became the first to land on the Moon's south pole in 2023?",
      options: ["USA", "China", "Russia", "India"],
      correctAnswer: 3,
    },
    {
      question: "What is the name of the climate summit held annually by the UN?",
      options: ["COP", "G20", "WEF", "IPCC"],
      correctAnswer: 0,
    },
    {
      question: "Which cryptocurrency experienced a major collapse in 2022?",
      options: ["Bitcoin", "Ethereum", "Terra Luna", "Dogecoin"],
      correctAnswer: 2,
    },
  ],
  maths: [
    {
      question: "What is the value of π (pi) approximately?",
      options: ["3.14159", "2.71828", "1.41421", "1.61803"],
      correctAnswer: 0,
    },
    {
      question: "What is the value of 9²?",
      options: ["81", "18", "72", "27"],
      correctAnswer: 0,
    },
    {
      question: "Solve: 3x = 12, x = ?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
    },
    {
      question: "What is the cube root of 64?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
    },
    {
      question: "What is 10% of 500?",
      options: ["10", "25", "50", "100"],
      correctAnswer: 2,
    },
    {
      question: "What is the perimeter of a square with side 6?",
      options: ["24", "12", "18", "36"],
      correctAnswer: 0,
    },
    {
      question: "What is the median of the set [3, 5, 7, 9, 11]?",
      options: ["5", "7", "9", "6"],
      correctAnswer: 1,
    },
    {
      question: "What is the next prime number after 7?",
      options: ["9", "10", "11", "13"],
      correctAnswer: 2,
    },
    
    {
      question: "What is the derivative of x²?",
      options: ["x", "2x", "x²", "2"],
      correctAnswer: 1,
    },
    {
      question: "What is 15% of 200?",
      options: ["25", "30", "35", "40"],
      correctAnswer: 1,
    },
    {
      question: "What is the area of a circle with radius 5?",
      options: ["25π", "10π", "5π", "15π"],
      correctAnswer: 0,
    },
    {
      question: "What is the square root of 144?",
      options: ["11", "12", "13", "14"],
      correctAnswer: 1,
    },
    {
      question: "If 2x + 5 = 15, what is the value of x?",
      options: ["5", "10", "7.5", "2.5"],
      correctAnswer: 0,
    },
    {
      question: "What is the sum of angles in a triangle?",
      options: ["90°", "180°", "270°", "360°"],
      correctAnswer: 1,
    },
    {
      question: "What is 7! (7 factorial)?",
      options: ["49", "343", "5040", "720"],
      correctAnswer: 2,
    },
  ],
  commerce: [
    {
      question: "What does GDP stand for?",
      options: [
        "Gross Domestic Product",
        "General Domestic Product",
        "Global Domestic Product",
        "Gross Development Product",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is the full form of MRP?",
      options: ["Maximum Retail Price", "Minimum Retail Price", "Market Retail Price", "Marginal Return Price"],
      correctAnswer: 0,
    },
    {
      question: "Which tax replaced VAT and Service Tax in India?",
      options: ["Income Tax", "Excise Duty", "GST", "Custom Duty"],
      correctAnswer: 2,
    },
    {
      question: "What does the term 'liquidity' refer to in finance?",
      options: ["Debt level", "Cash availability", "Profits", "Assets"],
      correctAnswer: 1,
    },
    {
      question: "Which financial statement shows revenues and expenses?",
      options: ["Balance Sheet", "Income Statement", "Cash Flow Statement", "Ledger"],
      correctAnswer: 1,
    },
    {
      question: "What is the term for selling goods in large quantities?",
      options: ["Retailing", "Wholesaling", "Franchising", "Dropshipping"],
      correctAnswer: 1,
    },
    {
      question: "What is depreciation?",
      options: ["Loss of sales", "Decrease in value of an asset", "Extra tax", "Dividend payment"],
      correctAnswer: 1,
    },
    {
      question: "Which ratio measures a company’s ability to pay short-term obligations?",
      options: ["Debt-Equity Ratio", "Current Ratio", "Return on Equity", "Price to Earnings Ratio"],
      correctAnswer: 1,
    },
    
    {
      question: "Which accounting principle states that expenses should be matched with revenues?",
      options: ["Consistency Principle", "Matching Principle", "Materiality Principle", "Conservatism Principle"],
      correctAnswer: 1,
    },
    {
      question: "What is the formula for calculating simple interest?",
      options: ["P × R × T", "P × R × T / 100", "P + R + T", "P × R / T"],
      correctAnswer: 1,
    },
    {
      question: "In which market are shares of companies traded?",
      options: ["Money Market", "Capital Market", "Commodity Market", "Foreign Exchange Market"],
      correctAnswer: 1,
    },
    {
      question: "What does ROI stand for in business?",
      options: ["Rate of Interest", "Return on Investment", "Risk of Investment", "Ratio of Income"],
      correctAnswer: 1,
    },
    {
      question: "Which document shows the financial position of a company at a specific point in time?",
      options: ["Income Statement", "Cash Flow Statement", "Balance Sheet", "Trial Balance"],
      correctAnswer: 2,
    },
    {
      question: "What is the term for the cost of borrowing money?",
      options: ["Principal", "Interest", "Dividend", "Premium"],
      correctAnswer: 1,
    },
    {
      question: "Which economic system is characterized by private ownership and free markets?",
      options: ["Socialism", "Communism", "Capitalism", "Mixed Economy"],
      correctAnswer: 2,
    },
  ],
}

// Stream display names
const streamNames = {
  "computer-science": "Computer Science",
  gk: "General Knowledge",
  "current-affair": "Current Affairs",
  maths: "Mathematics",
  commerce: "Commerce",
}

// Event Listeners
registrationForm.addEventListener("submit", startQuiz)
restartBtn.addEventListener("click", restartQuiz)
quitBtn.addEventListener("click", quitQuiz)
quizRestartBtn.addEventListener("click", restartQuizMidGame)
quizQuitBtn.addEventListener("click", quitQuizMidGame)

// Initialize the quiz
function init() {
  // Set up initial state
}

// Start the quiz
function startQuiz(e) {
  e.preventDefault()
  username = usernameInput.value.trim()
  selectedStream = streamSelect.value

  if (!username || !selectedStream) return

  // Get questions for selected stream
  currentQuestions = [...questionBanks[selectedStream]]

  // Reset quiz state
  currentQuestion = 0
  score = 0

  // Update displays
  userDisplay.textContent = username
  streamDisplay.textContent = streamNames[selectedStream]
  resultName.textContent = username
  resultStream.textContent = streamNames[selectedStream]
  totalQuestionsEl.textContent = currentQuestions.length
  maxScore.textContent = currentQuestions.length
  scoreEl.textContent = score

  // Show quiz container
  registrationContainer.classList.add("hidden")
  quizContainer.classList.remove("hidden")

  loadQuestion()
}

// Load a question
function loadQuestion() {
  if (currentQuestion >= currentQuestions.length) {
    showResults()
    return
  }

  const question = currentQuestions[currentQuestion]
  questionText.textContent = question.question

  // Clear previous options
  optionsContainer.innerHTML = ""

  // Add new options
  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div")
    optionElement.classList.add("option")
    optionElement.textContent = option
    optionElement.addEventListener("click", () => checkAnswer(index))
    optionsContainer.appendChild(optionElement)
  })

  // Update question counter and progress
  currentQuestionEl.textContent = currentQuestion + 1
  updateProgressBar()

  // Reset and start timer
  resetTimer()
  startTimer()
}

// Update progress bar
function updateProgressBar() {
  const progress = ((currentQuestion + 1) / currentQuestions.length) * 100
  progressFill.style.width = `${progress}%`
}

// Check the selected answer
function checkAnswer(selectedIndex) {
  clearInterval(timer)

  const question = currentQuestions[currentQuestion]
  const options = document.querySelectorAll(".option")

  // Disable all options
  options.forEach((option) => {
    option.classList.add("disabled")
  })

  // Mark correct and incorrect options
  options[question.correctAnswer].classList.add("correct")

  if (selectedIndex === question.correctAnswer) {
    // Correct answer
    score++
    scoreEl.textContent = score
    playSound(true)
  } else {
    // Incorrect answer
    options[selectedIndex].classList.add("incorrect")
    playSound(false)
  }

  // Move to next question after a delay
  setTimeout(() => {
    currentQuestion++
    loadQuestion()
  }, 1500)
}

// Start the timer
function startTimer() {
  timeRemaining = 10
  timeLeft.textContent = timeRemaining

  timer = setInterval(() => {
    timeRemaining--
    timeLeft.textContent = timeRemaining

    // Change timer color as time runs out
    const timerCircle = document.querySelector(".timer-circle")
    if (timeRemaining <= 3) {
      timerCircle.style.background = "linear-gradient(135deg, #ff4757, #ff3838)"
    } else if (timeRemaining <= 5) {
      timerCircle.style.background = "linear-gradient(135deg, #ffa502, #ff6348)"
    } else {
      timerCircle.style.background = "linear-gradient(135deg, #ff6b6b, #ee5a24)"
    }

    if (timeRemaining <= 0) {
      clearInterval(timer)
      // Time's up, move to next question
      const options = document.querySelectorAll(".option")
      const question = currentQuestions[currentQuestion]

      // Show correct answer
      options[question.correctAnswer].classList.add("correct")
      playSound(false)

      // Disable all options
      options.forEach((option) => {
        option.classList.add("disabled")
      })

      setTimeout(() => {
        currentQuestion++
        loadQuestion()
      }, 1500)
    }
  }, 1000)
}

// Reset the timer
function resetTimer() {
  clearInterval(timer)
  timeRemaining = 10
  timeLeft.textContent = timeRemaining

  // Reset timer color
  const timerCircle = document.querySelector(".timer-circle")
  timerCircle.style.background = "linear-gradient(135deg, #ff6b6b, #ee5a24)"
}

// Show the results
function showResults() {
  quizContainer.classList.add("hidden")
  resultsContainer.classList.remove("hidden")

  finalScore.textContent = score
  const percentageScore = Math.round((score / currentQuestions.length) * 100)
  percentage.textContent = percentageScore

  // Set performance message
  let message = ""
  if (percentageScore >= 90) {
    message = "🏆 Outstanding! You're a genius!"
  } else if (percentageScore >= 80) {
    message = "🎉 Excellent work! Well done!"
  } else if (percentageScore >= 70) {
    message = "👍 Good job! Keep it up!"
  } else if (percentageScore >= 60) {
    message = "👌 Not bad! Room for improvement."
  } else {
    message = "📚 Keep studying! You'll do better next time."
  }
  performanceMessage.textContent = message
}

// Restart quiz during gameplay
function restartQuizMidGame() {
  clearInterval(timer)
  currentQuestion = 0
  score = 0
  scoreEl.textContent = score
  loadQuestion()
}

// Quit quiz during gameplay
function quitQuizMidGame() {
  clearInterval(timer)
  quizContainer.classList.add("hidden")
  registrationContainer.classList.remove("hidden")

  // Reset form
  usernameInput.value = ""
  streamSelect.value = ""
  currentQuestion = 0
  score = 0
}

// Restart the quiz (from results)
function restartQuiz() {
  currentQuestion = 0
  score = 0
  scoreEl.textContent = score

  resultsContainer.classList.add("hidden")
  quizContainer.classList.remove("hidden")

  loadQuestion()
}

// Quit the quiz (from results)
function quitQuiz() {
  resultsContainer.classList.add("hidden")
  registrationContainer.classList.remove("hidden")

  // Reset form
  usernameInput.value = ""
  streamSelect.value = ""
  currentQuestion = 0
  score = 0
}

// Play sound for correct/incorrect answers
function playSound(isCorrect) {
  try {
    if (isCorrect) {
      correctSound.currentTime = 0
      correctSound.play().catch((e) => console.log("Audio play failed:", e))
    } else {
      incorrectSound.currentTime = 0
      incorrectSound.play().catch((e) => console.log("Audio play failed:", e))
    }
  } catch (error) {
    console.log("Audio not supported:", error)
  }
}

// Initialize the quiz
init()
