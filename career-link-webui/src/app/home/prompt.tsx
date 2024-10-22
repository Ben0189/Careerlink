export const generateJobDescription = (input: string): string => {
  return `Job Description:
  ${input}
  ----
  List of skills:
  Java, Python, JavaScript, TypeScript, C/C++, C#, Ruby, PHP, Swift, Kotlin, Go, Rust, HTML, CSS, SQL, NoSQL, R, Scala, Bash, PowerShell, Git, GitHub, GitLab, Docker, Kubernetes, Jenkins, Travis CI, CircleCI, Ansible, Terraform, React.js, Angular, Vue.js, Node.js, Express.js, Django, Flask, Ruby on Rails, Spring, Laravel, ASP.NET, GraphQL, RESTful API, Redis, Elasticsearch, RabbitMQ, Kafka, TensorFlow, PyTorch, Keras, scikit-learn, Hadoop, Spark, JIRA, Trello, Slack, Figma, Sketch, Postman, Swagger, Selenium, JUnit, Mocha, Chai, Jest, NUnit, TestNG, Unreal Engine, Unity, Phaser 3, React Native, Flutter, Linux/Unix, CDN, Networking, Data Structure and Algorithms, Big Data, Micro-services, Cloud Computing
  
  List only the skills from the provided list that are explicitly mentioned in the job description above. If a skill is not mentioned in the job description, do not include it in the list. Return the message as a string, one line, separated by the comma. REMEMBER IMPORTANT: JUST SKILLS IN THE LIST ABOVE.`;
};
