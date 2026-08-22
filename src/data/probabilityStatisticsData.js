export const PROBABILITY_STATISTICS_DATA = [
  {
    id: "descriptive-statistics",
    title: "Descriptive Statistics",
    description: "Data summarization, central tendencies, and variability measures.",
    realLifeExamples: [
      {
        title: "E-Commerce Analytics",
        description: "Used by platforms like Amazon to calculate average delivery times, customer ratings, and product price ranges to improve user experience."
      }
    ],
    examples: [
      { id: 1, question: "Find the mean of data set: 4, 8, 12, 16, 20.", solution: "Mean = (4 + 8 + 12 + 16 + 20) / 5 = 60 / 5 = 12." },
      { id: 2, question: "Find the median of data set: 3, 7, 9, 15, 21.", solution: "Sorted odd data set length (5). Middle value is 9." },
      { id: 3, question: "Find the mode of data set: 2, 4, 4, 6, 8, 9, 4.", solution: "The number 4 appears most frequently (3 times), so mode = 4." },
      { id: 4, question: "Calculate range of numbers: 15, 2, 8, 45, 30.", solution: "Range = Max - Min = 45 - 2 = 43." },
      { id: 5, question: "Find the mean deviation of 2, 4, 6, 8.", solution: "Mean = 5. Absolute deviations: |2-5|=3, |4-5|=1, |6-5|=1, |8-5|=3. Mean Deviation = (3+1+1+3)/4 = 2." },
      { id: 6, question: "Calculate variance for sample: 1, 3, 5.", solution: "Mean = 3. Squared deviations: (1-3)^2=4, (3-3)^2=0, (5-3)^2=4. Sample Variance s^2 = (4+0+4)/(3-1) = 4." },
      { id: 7, question: "Find standard deviation if sample variance is 16.", solution: "Standard deviation s = sqrt(Variance) = sqrt(16) = 4." },
      { id: 8, question: "Find interquartile range (IQR) if Q1 = 12 and Q3 = 28.", solution: "IQR = Q3 - Q1 = 28 - 12 = 16." }
    ],
    mcqs: [
      { id: 1, question: "Which measure of central tendency is affected most by extreme outliers?", options: ["Mean", "Median", "Mode", "IQR"], answer: "Mean" },
      { id: 2, question: "What is the median of 2, 5, 8, 11?", options: ["5", "6.5", "8", "6"], answer: "6.5" },
      { id: 3, question: "The square root of variance is called:", options: ["Range", "Standard Deviation", "Mean Absolute Deviation", "Variance Square"], answer: "Standard Deviation" },
      { id: 4, question: "If all values in a dataset are identical, the standard deviation is:", options: ["1", "-1", "0", "Undefined"], answer: "0" },
      { id: 5, question: "Which measure represents the most frequent value?", options: ["Mean", "Median", "Mode", "Variance"], answer: "Mode" },
      { id: 6, question: "Sum of absolute deviations is minimal when taken around:", options: ["Mean", "Median", "Mode", "Zero"], answer: "Median" },
      { id: 7, question: "IQR measures the spread of the middle:", options: ["25% of data", "50% of data", "75% of data", "100% of data"], answer: "50% of data" },
      { id: 8, question: "What is Q2 in statistics?", options: ["First Quartile", "Median", "Third Quartile", "Mean"], answer: "Median" },
      { id: 9, question: "For a symmetric distribution, which is true?", options: ["Mean > Median", "Mean < Median", "Mean = Median = Mode", "Mode = 0"], answer: "Mean = Median = Mode" },
      { id: 10, question: "Which chart is best suited for continuous grouped data?", options: ["Bar graph", "Pie chart", "Histogram", "Line plot"], answer: "Histogram" },
      { id: 11, question: "If mean is 50 and standard deviation is 5, the variance is:", options: ["10", "25", "100", "2.23"], answer: "25" },
      { id: 12, question: "Empirical rule states approximately what percent data lies within 1 std dev in normal distribution?", options: ["50%", "68%", "95%", "99.7%"], answer: "68%" },
      { id: 13, question: "Data skewed to the right has:", options: ["Mean < Median", "Mean > Median", "Mean = Median", "No skew"], answer: "Mean > Median" },
      { id: 14, question: "Range is defined as:", options: ["Max + Min", "Max - Min", "Max / Min", "(Max + Min)/2"], answer: "Max - Min" },
      { id: 15, question: "Coefficient of variation is calculated as:", options: ["(Std Dev / Mean) * 100", "(Mean / Std Dev) * 100", "Variance / Mean", "Mean / Variance"], answer: "(Std Dev / Mean) * 100" }
    ],
    practiceArena: {
      easy: [
        { id: "e1", question: "Find mean of 10, 20, 30.", options: ["15", "20", "25", "30"], answer: "20" },
        { id: "e2", question: "Find mode of 1, 1, 2, 3.", options: ["1", "2", "3", "None"], answer: "1" },
        { id: "e3", question: "Calculate range of 5, 9, 2, 12.", options: ["7", "10", "12", "5"], answer: "10" }
      ],
      medium: [
        { id: "m1", question: "Find median of 4, 1, 7, 9, 3, 10.", options: ["5.5", "7", "4.5", "5"], answer: "5.5" },
        { id: "m2", question: "If variance is 49, what is standard deviation?", options: ["7", "14", "24.5", "9.8"], answer: "7" },
        { id: "m3", question: "Find mean deviation about mean for 3, 6, 9.", options: ["2", "3", "0", "1.5"], answer: "2" }
      ],
      hard: [
        { id: "h1", question: "A sample has 5 numbers with mean 10. If 12 is added, what is new mean?", options: ["10.33", "10.5", "11", "10.2"], answer: "10.33" },
        { id: "h2", question: "Calculate sample variance for 2, 4, 6, 8.", options: ["6.67", "5", "4", "8"], answer: "6.67" }
      ]
    }
  },
  {
    id: "basic-probability",
    title: "Basic Probability & Bayes' Rule",
    description: "Probability laws, conditional events, independence, and Bayesian decision analysis.",
    realLifeExamples: [
      {
        title: "Medical Diagnostics",
        description: "Used in medical diagnostic tests to calculate the exact probability that a patient actually has a disease given a positive lab result (Bayes' Theorem)."
      }
    ],
    examples: [
      { id: 1, question: "What is probability of getting a head on a fair coin flip?", solution: "P(Head) = 1 favorable outcome / 2 total outcomes = 0.5." },
      { id: 2, question: "Rolling a 6-sided die, find P(rolling an even number).", solution: "Even outcomes = {2, 4, 6} (3 total). P(Even) = 3/6 = 0.5." },
      { id: 3, question: "Find probability of drawing an Ace from a standard 52-card deck.", solution: "Number of Aces = 4. P(Ace) = 4 / 52 = 1 / 13." },
      { id: 4, question: "If P(A) = 0.4, find complement P(A').", solution: "P(A') = 1 - P(A) = 1 - 0.4 = 0.6." },
      { id: 5, question: "Independent events A and B have P(A)=0.5 and P(B)=0.3. Find P(A ∩ B).", solution: "For independent events: P(A ∩ B) = P(A) * P(B) = 0.5 * 0.3 = 0.15." },
      { id: 6, question: "P(A) = 0.6, P(B) = 0.5, P(A ∩ B) = 0.3. Find P(A | B).", solution: "P(A | B) = P(A ∩ B) / P(B) = 0.3 / 0.5 = 0.6." },
      { id: 7, question: "Find P(A ∪ B) if P(A)=0.4, P(B)=0.5, P(A ∩ B)=0.2.", solution: "P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0.4 + 0.5 - 0.2 = 0.7." },
      { id: 8, question: "Bayes' Theorem: P(A)=0.01, P(B|A)=0.9, P(B|A')=0.05. Find P(A|B).", solution: "P(B) = (0.9*0.01) + (0.05*0.99) = 0.009 + 0.0495 = 0.0585. P(A|B) = 0.009 / 0.0585 ≈ 0.1538." }
    ],
    mcqs: [
      { id: 1, question: "Probability of an impossible event is:", options: ["0", "1", "-1", "Infinite"], answer: "0" },
      { id: 2, question: "Sum of probabilities of all elementary events in sample space is:", options: ["0", "0.5", "1", "100"], answer: "1" },
      { id: 3, question: "If P(A) = 0.7, P(A') is:", options: ["0.7", "0.3", "0", "1.7"], answer: "0.3" },
      { id: 4, question: "Formula for conditional probability P(A|B) is:", options: ["P(A∩B) / P(B)", "P(A∩B) / P(A)", "P(A) * P(B)", "P(A) + P(B)"], answer: "P(A∩B) / P(B)" },
      { id: 5, question: "For mutually exclusive events A and B, P(A ∩ B) is:", options: ["1", "0", "P(A)P(B)", "0.5"], answer: "0" },
      { id: 6, question: "If two events are independent, P(A ∩ B) equals:", options: ["P(A) + P(B)", "P(A) * P(B)", "P(A) / P(B)", "P(A) - P(B)"], answer: "P(A) * P(B)" },
      { id: 7, question: "Bayes' Theorem is primarily used for calculating:", options: ["Joint probability", "Posterior probability", "Marginal probability", "Simple average"], answer: "Posterior probability" },
      { id: 8, question: "Rolling two fair dice, total number of sample outcomes is:", options: ["12", "36", "24", "18"], answer: "36" },
      { id: 9, question: "Probability values always range between:", options: ["-1 and 1", "0 and 1", "0 and 100", "1 and 10"], answer: "0 and 1" },
      { id: 10, question: "Probability of getting sum = 12 with two 6-sided dice is:", options: ["1/36", "1/12", "1/6", "2/36"], answer: "1/36" },
      { id: 11, question: "Addition rule for non-mutually exclusive events is P(A∪B) = ", options: ["P(A)+P(B)", "P(A)+P(B)-P(A∩B)", "P(A)*P(B)", "P(A)/P(B)"], answer: "P(A)+P(B)-P(A∩B)" },
      { id: 12, question: "A fair die is rolled. P(getting number > 4) is:", options: ["1/6", "2/6", "3/6", "4/6"], answer: "2/6" },
      { id: 13, question: "If event A guarantees event B occurs, then P(A ∩ B) equals:", options: ["P(B)", "P(A)", "0", "1"], answer: "P(A)" },
      { id: 14, question: "Prior probability in Bayes' rule refers to probability evaluated:", options: ["Before new evidence", "After new evidence", "During test", "Never"], answer: "Before new evidence" },
      { id: 15, question: "Drawing 2 cards with replacement from 52 cards, total outcome count per draw remains:", options: ["52", "51", "50", "26"], answer: "52" }
    ],
    practiceArena: {
      easy: [
        { id: "pe1", question: "What is P(Tail) in a fair coin flip?", options: ["0", "0.5", "1", "0.25"], answer: "0.5" },
        { id: "pe2", question: "If P(E) = 0.25, find P(E').", options: ["0.75", "0.25", "0.5", "1"], answer: "0.75" }
      ],
      medium: [
        { id: "pm1", question: "If P(A)=0.3, P(B)=0.4 and A, B independent, find P(A ∩ B).", options: ["0.12", "0.7", "0.1", "0.5"], answer: "0.12" },
        { id: "pm2", question: "Find P(getting red card) from standard 52 deck.", options: ["1/4", "1/2", "1/13", "3/4"], answer: "1/2" }
      ],
      hard: [
        { id: "ph1", question: "Given P(A)=0.05, P(B|A)=0.8, P(B|A')=0.1. Find P(A|B) using Bayes' Rule.", options: ["0.296", "0.500", "0.125", "0.040"], answer: "0.296" }
      ]
    }
  }
];