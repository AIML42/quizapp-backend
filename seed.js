require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
  } catch (error) {
    console.error('Error connecting to DB:', error);
    process.exit(1);
  }
};

const seedQuestions = async () => {
  await connectDB();

  const questions = [
    // League of Legends Questions (20+)
    {
      text: 'Which champion is known as "The Might of Demacia"?',
      options: ['Garen', 'Lux', 'Jarvan IV', 'Fiora'],
      correctAnswer: 'Garen',
      category: 'League of Legends',
    },
    {
      text: 'What is the name of the resource used by Akali to cast her abilities?',
      options: ['Mana', 'Energy', 'Fury', 'Rage'],
      correctAnswer: 'Energy',
      category: 'League of Legends',
    },
    {
      text: 'Which region is associated with the Shadow Isles?',
      options: ['Noxus', 'Ionia', 'Bilgewater', 'Shadow Isles'],
      correctAnswer: 'Shadow Isles',
      category: 'League of Legends',
    },
    {
      text: 'What is the name of Yasuo’s ultimate ability?',
      options: ['Last Breath', 'Steel Tempest', 'Wind Wall', 'Sweeping Blade'],
      correctAnswer: 'Last Breath',
      category: 'League of Legends',
    },
    {
      text: 'Which champion is known for their ability to transform into a spider?',
      options: ['Elise', 'Nidalee', 'Shyvana', 'Jayce'],
      correctAnswer: 'Elise',
      category: 'League of Legends',
    },
    {
      text: 'What is the primary role of the champion Jhin?',
      options: ['Support', 'Marksman', 'Mage', 'Tank'],
      correctAnswer: 'Marksman',
      category: 'League of Legends',
    },
    {
      text: 'Which item is commonly built on ADCs for critical strike chance?',
      options: ['Infinity Edge', 'Rabadon’s Deathcap', 'Zhonya’s Hourglass', 'Spirit Visage'],
      correctAnswer: 'Infinity Edge',
      category: 'League of Legends',
    },
    {
      text: 'What is the name of the map where most League of Legends games are played?',
      options: ['Summoner’s Rift', 'Twisted Treeline', 'Howling Abyss', 'Crystal Scar'],
      correctAnswer: 'Summoner’s Rift',
      category: 'League of Legends',
    },
    {
      text: 'Which champion is known as "The Tiny Master of Evil"?',
      options: ['Veigar', 'Teemo', 'Ziggs', 'Rumble'],
      correctAnswer: 'Veigar',
      category: 'League of Legends',
    },
    {
      text: 'What is the name of the currency used to buy items in a match?',
      options: ['Gold', 'Blue Essence', 'Riot Points', 'Merit'],
      correctAnswer: 'Gold',
      category: 'League of Legends',
    },
    {
      text: 'Which champion is associated with the quote "The unseen blade is the deadliest"?',
      options: ['Akali', 'Zed', 'Talon', 'Katarina'],
      correctAnswer: 'Zed',
      category: 'League of Legends',
    },
    {
      text: 'What is the name of the dragon that grants bonus attack damage and ability power?',
      options: ['Infernal Drake', 'Ocean Drake', 'Cloud Drake', 'Mountain Drake'],
      correctAnswer: 'Infernal Drake',
      category: 'League of Legends',
    },
    {
      text: 'Which champion is known for their ability to steal enemy ultimates?',
      options: ['Sylas', 'Zoe', 'LeBlanc', 'Ahri'],
      correctAnswer: 'Sylas',
      category: 'League of Legends',
    },
    {
      text: 'What is the name of the structure that players must destroy to win the game?',
      options: ['Nexus', 'Inhibitor', 'Turret', 'Baron Nashor'],
      correctAnswer: 'Nexus',
      category: 'League of Legends',
    },
    {
      text: 'Which champion is known as "The Desert Rose"?',
      options: ['Akali', 'Ahri', 'Akali', 'Samira'],
      correctAnswer: 'Samira',
      category: 'League of Legends',
    },
    {
      text: 'What is the name of the ability that allows Ashe to scout the map?',
      options: ['Hawkshot', 'Frost Shot', 'Volley', 'Crystal Arrow'],
      correctAnswer: 'Hawkshot',
      category: 'League of Legends',
    },
    {
      text: 'Which region is known for its ninja champions like Akali and Shen?',
      options: ['Ionia', 'Noxus', 'Demacia', 'Freljord'],
      correctAnswer: 'Ionia',
      category: 'League of Legends',
    },
    {
      text: 'What is the name of the jungle monster that grants a buff for recalling faster?',
      options: ['Blue Sentinel', 'Red Brambleback', 'Cloud Drake', 'Rift Scuttler'],
      correctAnswer: 'Rift Scuttler',
      category: 'League of Legends',
    },
    {
      text: 'Which champion is known as "The Star Forger"?',
      options: ['Aurelion Sol', 'Zoe', 'Lux', 'Janna'],
      correctAnswer: 'Aurelion Sol',
      category: 'League of Legends',
    },
    {
      text: 'What is the name of the annual event where new skins are released for the "High Noon" theme?',
      options: ['Spirit Blossom', 'High Noon', 'Lunar Revel', 'Snowdown Showdown'],
      correctAnswer: 'High Noon',
      category: 'League of Legends',
    },
    {
      text: 'Which champion is known for their ability to create portals?',
      options: ['Bard', 'Tahm Kench', 'Ryze', 'Thresh'],
      correctAnswer: 'Ryze',
      category: 'League of Legends',
    },
    {
      text: 'What is the name of the game mode where players fight on a single lane with random champions?',
      options: ['ARAM', 'URF', 'One For All', 'Nexus Blitz'],
      correctAnswer: 'ARAM',
      category: 'League of Legends',
    },

    // Computer Science Questions (20+)
    {
      text: 'What does "HTTP" stand for in the context of web protocols?',
      options: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'Hyper Transfer Text Protocol', 'HyperText Transport Protocol'],
      correctAnswer: 'HyperText Transfer Protocol',
      category: 'Computer Science',
    },
    {
      text: 'Which data structure operates on a "Last In, First Out" principle?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      correctAnswer: 'Stack',
      category: 'Computer Science',
    },
    {
      text: 'What is the time complexity of a binary search algorithm?',
      options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
      correctAnswer: 'O(log n)',
      category: 'Computer Science',
    },
    {
      text: 'Which programming language is known for its use in system programming and was created by Dennis Ritchie?',
      options: ['Python', 'Java', 'C', 'Ruby'],
      correctAnswer: 'C',
      category: 'Computer Science',
    },
    {
      text: 'What does "SQL" stand for?',
      options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'Sequential Query Language'],
      correctAnswer: 'Structured Query Language',
      category: 'Computer Science',
    },
    {
      text: 'Which of the following is a version control system?',
      options: ['Git', 'Docker', 'Kubernetes', 'Jenkins'],
      correctAnswer: 'Git',
      category: 'Computer Science',
    },
    {
      text: 'What is the primary function of an operating system’s kernel?',
      options: ['Manage hardware resources', 'Run applications', 'Provide a user interface', 'Compile code'],
      correctAnswer: 'Manage hardware resources',
      category: 'Computer Science',
    },
    {
      text: 'Which protocol is used to send emails over the internet?',
      options: ['SMTP', 'HTTP', 'FTP', 'TCP'],
      correctAnswer: 'SMTP',
      category: 'Computer Science',
    },
    {
      text: 'What does "OOP" stand for in programming?',
      options: ['Object-Oriented Programming', 'Operational Object Programming', 'Object-Ordered Programming', 'Optimal Object Processing'],
      correctAnswer: 'Object-Oriented Programming',
      category: 'Computer Science',
    },
    {
      text: 'Which of the following is a NoSQL database?',
      options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
      correctAnswer: 'MongoDB',
      category: 'Computer Science',
    },
    {
      text: 'What is the name of the process where source code is converted into machine code?',
      options: ['Compilation', 'Interpretation', 'Execution', 'Debugging'],
      correctAnswer: 'Compilation',
      category: 'Computer Science',
    },
    {
      text: 'Which sorting algorithm has the best average-case time complexity of O(n log n)?',
      options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'],
      correctAnswer: 'Quick Sort',
      category: 'Computer Science',
    },
    {
      text: 'What does "API" stand for?',
      options: ['Application Programming Interface', 'Automated Program Interface', 'Application Process Integration', 'Advanced Programming Interface'],
      correctAnswer: 'Application Programming Interface',
      category: 'Computer Science',
    },
    {
      text: 'Which of the following is a type of machine learning?',
      options: ['Supervised Learning', 'Object-Oriented Learning', 'Procedural Learning', 'Functional Learning'],
      correctAnswer: 'Supervised Learning',
      category: 'Computer Science',
    },
    {
      text: 'What is the name of the data structure used to implement a "First In, First Out" system?',
      options: ['Stack', 'Queue', 'Heap', 'Tree'],
      correctAnswer: 'Queue',
      category: 'Computer Science',
    },
    {
      text: 'Which company developed the Java programming language?',
      options: ['Microsoft', 'Sun Microsystems', 'Google', 'IBM'],
      correctAnswer: 'Sun Microsystems',
      category: 'Computer Science',
    },
    {
      text: 'What does "DNS" stand for in networking?',
      options: ['Domain Name System', 'Dynamic Network Service', 'Data Network System', 'Distributed Name Service'],
      correctAnswer: 'Domain Name System',
      category: 'Computer Science',
    },
    {
      text: 'Which of the following is a front-end JavaScript framework?',
      options: ['React', 'Django', 'Flask', 'Spring'],
      correctAnswer: 'React',
      category: 'Computer Science',
    },
    {
      text: 'What is the name of the process where a program runs multiple threads simultaneously?',
      options: ['Multithreading', 'Multiprocessing', 'Multitasking', 'Multicasting'],
      correctAnswer: 'Multithreading',
      category: 'Computer Science',
    },
    {
      text: 'Which of the following is a cloud computing service provider?',
      options: ['AWS', 'Apache', 'Nginx', 'MySQL'],
      correctAnswer: 'AWS',
      category: 'Computer Science',
    },
    {
      text: 'What does "HTML" stand for?',
      options: ['HyperText Markup Language', 'HighText Markup Language', 'Hyper Transfer Markup Language', 'HyperText Model Language'],
      correctAnswer: 'HyperText Markup Language',
      category: 'Computer Science',
    },
    {
      text: 'Which data structure is used to represent a hierarchical relationship, such as a file system?',
      options: ['Tree', 'Graph', 'Array', 'Stack'],
      correctAnswer: 'Tree',
      category: 'Computer Science',
    },

    // General Knowledge Questions (20+)
    {
      text: 'What is the capital city of Japan?',
      options: ['Tokyo', 'Seoul', 'Beijing', 'Bangkok'],
      correctAnswer: 'Tokyo',
      category: 'General Knowledge',
    },
    {
      text: 'Which planet is known as the "Red Planet"?',
      options: ['Mars', 'Jupiter', 'Venus', 'Mercury'],
      correctAnswer: 'Mars',
      category: 'General Knowledge',
    },
    {
      text: 'Who painted the Mona Lisa?',
      options: ['Leonardo da Vinci', 'Michelangelo', 'Vincent van Gogh', 'Pablo Picasso'],
      correctAnswer: 'Leonardo da Vinci',
      category: 'General Knowledge',
    },
    {
      text: 'What is the largest ocean on Earth?',
      options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
      correctAnswer: 'Pacific Ocean',
      category: 'General Knowledge',
    },
    {
      text: 'Which element has the chemical symbol "Au"?',
      options: ['Gold', 'Silver', 'Iron', 'Copper'],
      correctAnswer: 'Gold',
      category: 'General Knowledge',
    },
    {
      text: 'What is the currency of the United Kingdom?',
      options: ['Pound Sterling', 'Euro', 'Dollar', 'Yen'],
      correctAnswer: 'Pound Sterling',
      category: 'General Knowledge',
    },
    {
      text: 'Who wrote the play "Romeo and Juliet"?',
      options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'],
      correctAnswer: 'William Shakespeare',
      category: 'General Knowledge',
    },
    {
      text: 'What is the tallest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
      correctAnswer: 'Mount Everest',
      category: 'General Knowledge',
    },
    {
      text: 'Which country is known as the "Land of the Rising Sun"?',
      options: ['Japan', 'China', 'South Korea', 'Thailand'],
      correctAnswer: 'Japan',
      category: 'General Knowledge',
    },
    {
      text: 'What is the primary source of energy for Earth’s climate system?',
      options: ['The Sun', 'The Moon', 'Geothermal Heat', 'Ocean Currents'],
      correctAnswer: 'The Sun',
      category: 'General Knowledge',
    },
    {
      text: 'Which animal is known as the "King of the Jungle"?',
      options: ['Lion', 'Tiger', 'Elephant', 'Gorilla'],
      correctAnswer: 'Lion',
      category: 'General Knowledge',
    },
    {
      text: 'What is the name of the famous clock tower in London?',
      options: ['Big Ben', 'Eiffel Tower', 'Leaning Tower of Pisa', 'Statue of Liberty'],
      correctAnswer: 'Big Ben',
      category: 'General Knowledge',
    },
    {
      text: 'Which gas is most abundant in Earth’s atmosphere?',
      options: ['Nitrogen', 'Oxygen', 'Carbon Dioxide', 'Argon'],
      correctAnswer: 'Nitrogen',
      category: 'General Knowledge',
    },
    {
      text: 'Who was the first person to walk on the moon?',
      options: ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'Alan Shepard'],
      correctAnswer: 'Neil Armstrong',
      category: 'General Knowledge',
    },
    {
      text: 'What is the longest river in the world?',
      options: ['Nile River', 'Amazon River', 'Yangtze River', 'Mississippi River'],
      correctAnswer: 'Nile River',
      category: 'General Knowledge',
    },
    {
      text: 'Which country hosted the 2016 Summer Olympics?',
      options: ['Brazil', 'China', 'United Kingdom', 'Japan'],
      correctAnswer: 'Brazil',
      category: 'General Knowledge',
    },
    {
      text: 'What is the name of the famous ship that sank on its maiden voyage in 1912?',
      options: ['Titanic', 'Lusitania', 'Britannic', 'Queen Mary'],
      correctAnswer: 'Titanic',
      category: 'General Knowledge',
    },
    {
      text: 'Which language is the most spoken in the world by native speakers?',
      options: ['Mandarin Chinese', 'Spanish', 'English', 'Hindi'],
      correctAnswer: 'Mandarin Chinese',
      category: 'General Knowledge',
    },
    {
      text: 'What is the name of the largest desert in the world?',
      options: ['Sahara Desert', 'Gobi Desert', 'Kalahari Desert', 'Antarctic Desert'],
      correctAnswer: 'Antarctic Desert',
      category: 'General Knowledge',
    },
    {
      text: 'Which scientist developed the theory of relativity?',
      options: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Nikola Tesla'],
      correctAnswer: 'Albert Einstein',
      category: 'General Knowledge',
    },
    {
      text: 'What is the name of the currency used in Japan?',
      options: ['Yen', 'Won', 'Dollar', 'Euro'],
      correctAnswer: 'Yen',
      category: 'General Knowledge',
    },
    {
      text: 'Which country is famous for the ancient ruins of Machu Picchu?',
      options: ['Peru', 'Mexico', 'Egypt', 'Greece'],
      correctAnswer: 'Peru',
      category: 'General Knowledge',
    },
  ];

  try {
    await Question.deleteMany(); // Clear existing questions
    await Question.insertMany(questions);
    console.log('Questions seeded successfully');
  } catch (error) {
    console.error('Error seeding questions:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedQuestions();