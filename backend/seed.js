require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Job = require("./models/Job");

const companies = [
  "Zoho",
  "Freshworks",
  "Amazon",
  "Google",
  "Microsoft",
  "Infosys",
  "TCS",
  "Wipro",
  "Cognizant",
  "Accenture",
  "Capgemini",
  "IBM",
  "Oracle",
  "PayPal",
  "Razorpay",
  "PhonePe",
  "Swiggy",
  "Flipkart",
  "Myntra",
  "HCLTech",
  "Virtusa",
  "Hexaware",
  "UST",
  "Tech Mahindra",
  "Tiger Analytics",
  "Chargebee",
  "Kissflow",
  "Bytize Technologies",
  "Sciflare Technologies",
  "SMART HRMS",
  "Altos Technologies"
];

const locations = [
  "Chennai",
  "Bengaluru",
  "Hyderabad",
  "Kochi",
  "Pune",
  "Mumbai",
  "Noida",
  "Gurugram",
  "Coimbatore",
  "Remote"
];

const workModes = [
  "Onsite",
  "Hybrid",
  "Remote"
];

const jobTypes = [
  "Full-time",
  "Internship",
  "Contract",
  "Walk-in",
  "Part-time"
];

const experienceLevels = [
  "Fresher",
  "0-2 Years",
  "2-5 Years",
  "5+ Years"
];

const categories = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "DevOps",
  "QA",
  "UI/UX"
];

const titles = [
  "Frontend Developer",
  "React Developer",
  "MERN Stack Developer",
  "Node.js Developer",
  "Backend Developer",
  "Software Engineer",
  "Java Developer",
  "Python Developer",
  "UI Developer",
  "QA Engineer",
  "DevOps Engineer",
  "Mobile App Developer",
  "Cloud Engineer",
  "Full Stack Developer"
];

const stacks = [
  ["React", "Node.js", "MongoDB", "Express"],
  ["React", "Firebase"],
  ["Next.js", "TypeScript"],
  ["Angular", "Spring Boot"],
  ["Java", "Spring Boot", "MySQL"],
  ["Python", "Django", "React"],
  ["Flutter", "Firebase"],
  ["React Native", "Node.js"],
  ["Vue.js", "Laravel"],
  ["HTML", "CSS", "JavaScript"],
  ["Docker", "AWS"],
  ["Selenium", "Java"],
  [".NET", "SQL Server"],
  ["PHP", "Laravel"]
];

const descriptions = [
  "Build scalable enterprise applications.",
  "Develop responsive web applications.",
  "Collaborate with cross-functional teams.",
  "Work on cloud-native applications.",
  "Maintain and improve existing software.",
  "Design and develop REST APIs.",
  "Implement new product features.",
  "Optimize application performance.",
  "Write clean and maintainable code.",
  "Participate in Agile development."
];

const jobs = [];

for (let i = 1; i <= 100; i++) {
  const company = companies[Math.floor(Math.random() * companies.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const techStack = stacks[Math.floor(Math.random() * stacks.length)];

  jobs.push({
    title: titles[Math.floor(Math.random() * titles.length)],
    company,
    companyLogo: "",
    companyWebsite: `https://www.${company.toLowerCase().replace(/\s+/g, "")}.com`,
    location,
    workMode: workModes[Math.floor(Math.random() * workModes.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    techStack,
    skills: techStack,
    experienceLevel:
      experienceLevels[Math.floor(Math.random() * experienceLevels.length)],
    jobType: jobTypes[Math.floor(Math.random() * jobTypes.length)],
    salaryMin: 20000 + Math.floor(Math.random() * 30000),
    salaryMax: 60000 + Math.floor(Math.random() * 70000),
    vacancies: Math.ceil(Math.random() * 10),
    education: "Bachelor's Degree",
    description:
      descriptions[Math.floor(Math.random() * descriptions.length)],
    applyLink: "https://example.com",
    source: "Generated",
    isFeatured: Math.random() > 0.8,
    postedDate: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 86400000
    ),
    applicationDeadline: new Date(
      Date.now() + Math.floor(Math.random() * 30) * 86400000
    ),
  });

  async function seed() {
  try {
    await connectDB();

    // Delete old jobs
    await Job.deleteMany({});

    // Insert new jobs
    await Job.insertMany(jobs);

    console.log(`✅ Seeded ${jobs.length} jobs successfully.`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();
}