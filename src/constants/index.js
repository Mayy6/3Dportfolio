import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
    nocode,
    AIprompt,
  } from "../assets";

  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Project",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];

  const services = [
    {
      title: "Full Stack Developer",
      icon: web,
    },
    {
      title: "React & Next.js Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Cloud & DevOps",
      icon: creator,
    },
  ];

  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];

  const experiences = [
    {
      title: "Full Stack Developer Intern",
      company_name: "CyberLab — University of Adelaide",
      icon: meta,
      iconBg: "#1a1a2e",
      date: "March 2025 – June 2025",
      points: [
        "Built responsive React/Next.js interfaces and reusable UI components using TypeScript and Tailwind CSS, delivering consistent user experiences across devices.",
        "Integrated RESTful APIs for transaction data, account linking and dashboard features, improving frontend performance and maintainability.",
        "Contributed to Git workflows, code reviews and CI/CD practices in an Agile team environment, supporting reliable deployment and smooth feature delivery.",
        "Optimised UI performance following Web Vitals best practices, reducing rendering cycles and improving overall user experience.",
      ],
    },
    {
      title: "Sales & Operations Team Member",
      company_name: "JB Hi-Fi — Adelaide, SA",
      icon: shopify,
      iconBg: "#E6DEDD",
      date: "October 2024 – Present",
      points: [
        "Processed customer transactions, refunds and exchanges in line with company policies, maintaining accuracy under time pressure.",
        "Managed inventory receipts, transfers and system updates, ensuring accurate stock and transaction records.",
        "Identified and resolved inventory discrepancies including over/short deliveries and related credit and debit adjustments.",
        "Collaborated with sales, warehouse and management teams to coordinate stock movement and support smooth day-to-day store operations.",
      ],
    },
    {
      title: "No-Code Generation System — Team Lead",
      company_name: "University of Adelaide",
      icon: starbucks,
      iconBg: "#383E56",
      date: "July 2024 – October 2024",
      points: [
        "Led a cross-functional team to design and deliver a full-stack no-code data visualisation platform.",
        "Architected a scalable PostgreSQL database and implemented RESTful APIs with JWT authentication using Spring Boot and React.",
        "Engaged with stakeholders to gather requirements and iterated on system features based on client feedback.",
        "Managed the full project lifecycle from planning through CI/CD deployment on Render.",
      ],
    },
  ];

  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];

  const projects = [
    {
      name: "Mobile Plan & Support Platform",
      description:
        "Full-stack retail support platform to streamline plan recommendation, activation tracking and issue escalation. Built with React + TypeScript frontend, reusable component library, Node.js/Express APIs and a PostgreSQL database.",
      tags: [
        {
          name: "react + typescript",
          color: "blue-text-gradient",
        },
        {
          name: "node/express",
          color: "green-text-gradient",
        },
        {
          name: "postgresql",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/Mayy6",
    },
    {
      name: "AUS Tax Calculator",
      description:
        "Responsive Next.js tax calculator for Australian income tax estimation. Features tax breakdowns, offset options and bracket visualisation, built with TypeScript and Tailwind CSS, tested with Vitest.",
      tags: [
        {
          name: "next.js",
          color: "blue-text-gradient",
        },
        {
          name: "typescript",
          color: "green-text-gradient",
        },
        {
          name: "tailwind css",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/Mayy6",
    },
    {
      name: "Finance SaaS Platform",
      description:
        "Full-stack finance management app with income/expense tracking, CSV import, real-time dashboards and Plaid bank integration. Secured with Clerk auth, premium upgrades via Lemon Squeezy.",
      tags: [
        {
          name: "next.js",
          color: "blue-text-gradient",
        },
        {
          name: "plaid + clerk",
          color: "green-text-gradient",
        },
        {
          name: "shadcn ui",
          color: "pink-text-gradient",
        },
      ],
      image: AIprompt,
      source_code_link: "https://github.com/Mayy6",
    },
    {
      name: "No-Code Generation System",
      description:
        "Full-stack web app enabling users to build data visualisations without writing code. Integrated JWT authentication, drag-and-drop features, Spring Boot backend and CI/CD deployment on Render.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "spring boot",
          color: "green-text-gradient",
        },
        {
          name: "postgresql",
          color: "pink-text-gradient",
        },
      ],
      image: nocode,
      source_code_link: "https://github.com/Mayy6/UniProject.git",
    },
  ];

  export { services, technologies, experiences, testimonials, projects };