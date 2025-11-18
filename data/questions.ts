import { Question } from "@/types";

export const questions: Question[] = [
  // Q1 - What best describes your invention?
  {
    id: 1,
    heading: "What best describes your invention?",
    question: "Select the option that best describes your invention.",
    options: [
      { label: "A physical product or device", goTo: 4 },
      { label: "A new process or method", goTo: 4 },
      { label: "A business idea or scheme (such as a financial scheme or insurance scheme)", goTo: 2 },
      { label: "A piece of software or algorithm", goTo: 3 },
      { 
        label: "A scientific discovery, mathematical algorithm, working directions or artistic work", 
        response: "Your idea may not be patentable in Australia, as it may not meet the eligibility criteria for a patentable invention. However the application of a scientific discovery or algorithm to a practical purpose may be patentable. Contact our Patent Attorneys to explore your options.",
        complete: true 
      },
    ],
  },
  // Q2 - Is your business idea implemented using a technical solution?
  {
    id: 2,
    heading: "Technical Implementation",
    question: "Is your business idea implemented using a technical solution (e.g. software, hardware integration)?",
    options: [
      { label: "Yes", goTo: 1 },
      { 
        label: "No", 
        response: "Your idea may not be patentable in Australia, as it may not meet the eligibility criteria for a patentable invention. However the application of a scientific discovery or algorithm to a practical purpose may be patentable. Contact our Patent Attorneys to explore your options.",
        complete: true 
      },
    ],
  },
  // Q3 - Does your software solve a technical problem?
  {
    id: 3,
    heading: "Software Technical Problem",
    question: "Does your software solve a technical problem (not a business problem), produce a technical effect or result in a technical improvement in the computer or system?",
    options: [
      { label: "Yes", goTo: 4 },
      { 
        label: "No", 
        response: "Your idea may not be patentable in Australia, as it may not meet the eligibility criteria for a patentable invention. However the application of a scientific discovery or algorithm to a practical purpose may be patentable. Contact our Patent Attorneys to explore your options.",
        complete: true 
      },
    ],
  },
  // Q4 - Have you disclosed your invention publicly?
  {
    id: 4,
    heading: "Public Disclosure",
    question: "Have you disclosed your invention publicly or used it commercially (e.g. published, presented, or sold it)?",
    options: [
      { label: "No", goTo: 6 },
      { label: "Yes", goTo: 5 },
    ],
  },
  // Q5 - Was this disclosure more than 12 months ago?
  {
    id: 5,
    heading: "Disclosure Timeline",
    question: "Was this disclosure more than 12 months ago?",
    options: [
      { 
        label: "Yes", 
        response: "Unfortunately, your invention was publicly disclosed or used commercially over 12 months ago. Australian patent law requires your invention to be novel or new when you file the patent application, or have disclosed it or used it commercially less than 12 months before, in order to make use of the grace period that Australia, and some other countries, offer. Contact our Patent Attorneys to explore your options.",
        complete: true 
      },
      { label: "No", goTo: 6 },
    ],
  },
  // Q6 - Does your invention offer benefits or advantages?
  {
    id: 6,
    heading: "Inventiveness",
    question: "Does your invention offer benefits or advantages that existing products or processes don't or can't offer, or does it offer an alternative to existing products or processes?",
    options: [
      { label: "Yes", goTo: 7 },
      { 
        label: "No", 
        response: "Based on your answers, your invention may lack the required inventiveness. In order to be patentable, the invention must not have been \"obvious to a person who is skilled in that art\". Contact our Patent Attorneys to explore your options.",
        complete: true 
      },
    ],
  },
  // Q7 - Does your invention have a specific and practical use?
  {
    id: 7,
    heading: "Practical Use",
    question: "Does your invention have a specific and practical use?",
    options: [
      { label: "Yes", goTo: 11 },
      {
        label: "No",
        response: "Patents require practical applicability. Without a specific use, your invention may not qualify for patent protection. Contact our Patent Attorneys to explore your options.",
        complete: true
      },
    ],
  },
  // Q11 - Have you already applied for a patent?
  {
    id: 11,
    heading: "Existing Patent Application",
    question: "Have you already applied for a patent in Australia or overseas?",
    options: [
      { label: "No", goTo: 12 },
      { 
        label: "Yes", 
        response: "If you have already filed a patent application, there are unextendable international deadlines (calculated from the initial filing date) that must be met for extending patent protection from Australia into other countries, and from other countries into Australia. There are also deadlines for completing your patent application if you have filed a provisional patent application. We STRONGLY recommend speaking to one of our patent attorneys ASAP to ensure that these deadlines are not missed. Contact our Patent Attorneys to discuss the options to file your application in other countries or into Australia.",
        complete: true 
      },
    ],
  },
  // Q12 - Would you like to speak with a patent attorney?
  {
    id: 12,
    heading: "Next Steps",
    question: "Would you like to speak with a patent attorney about protecting your invention?",
    options: [
      {
        label: "Yes",
        response: "Please provide your contact details and we'll arrange a complimentary consultation with one of our patent attorneys to discuss protecting your invention.",
        complete: true
      },
      {
        label: "No",
        response: "We hope that our tool has helped you understand what can be protected but if you still have questions then feel free to book a complimentary meeting with one of our attorneys at this link.",
        complete: true
      },
    ],
  },
];