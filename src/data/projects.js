const projects = [
  {
    id: 1,
    title: "Esalon Platform",
    planet: "/planets/1.png",
    previewImg: "/projects/esalon-platform.png",
    images: [],
    stack: ["Html", "Css", "Javascript"],
    descriptionTitle: "Robust SaaS Application",
    description:
      "My First real world project for the company i am working, YoltLabs. Tried sooo many libraries and got experience with a very big Laravel and Livewire SaaS project.",
    overviewUrl: "/esalon-platform",
    contribution:
      "I designed and built the entire front end for the Esalon Platform using Livewire and custom CSS. I created multiple pages to effectively display backend data, ensuring the interface was both functional and aesthetically modern. Every aspect of the platform’s front end was crafted by me, from layout design to data presentation.",
    learned:
      "This project gave me my first real-world experience with Laravel Livewire and deepened my understanding of building data-driven applications. I learned how to create scalable, responsive pages that accurately display dynamic content from the backend, as well as the importance of clean, intuitive design in a complex SaaS environment.",
    liveUrl: "https://esalon.gr",
  },
  {
    id: 2,
    title: "Esalon Dashboard",
    planet: "/planets/2.png",
    previewImg: "/projects/esalon-dashboard.png",
    images: [],
    stack: ["Tailwind", "Javascript"],
    descriptionTitle: "Admin Panel Reimagined",
    description:
      "Originally built from an admin panel template, I completely overhauled the design using Tailwind CSS and custom JavaScript. This was my first real-world project, where I built the dashboard for the platform's administrators. It was a true startup challenge, full of brain-teasing problem-solving and hands-on learning.",
    contribution:
      "Starting from an existing admin panel template, I completely overhauled the Esalon Dashboard with Tailwind CSS and custom JavaScript. I implemented a comprehensive guided tour using Shepherd.js, integrating API calls to track each tenant's progress during the setup process. This dashboard not only serves as the control center for administrators but also showcases my ability to solve complex startup challenges with creative, interactive solutions.",
    learned:
      "This project pushed my frontend skills further, especially in building interactive, responsive interfaces. I gained invaluable experience with Shepherd.js to create a smooth, step-by-step tour for admins, learning how to manage API interactions in real time. The challenges I faced with responsiveness and dynamic data handling have made me more proficient in modern JavaScript and UI development.",
    overviewUrl: "/esalon-dashboard",
    liveUrl: "",
  },
  {
    id: 3,
    title: "Bartender Cheatsheet",
    planet: "/planets/3.png",
    previewImg: "/projects/bc-preview.png",
    images: [],
    stack: ["React", "Node", "Rest API", "Tailwind"],
    descriptionTitle: "Simple & Functional",
    description:
      "A straightforward React project featuring a user sign-up and login form. I integrated TheCocktailDB REST API to fetch cocktail recipes and ingredients, resulting in an intuitive and dynamic cheatsheet that makes cocktail exploration fun and accessible.",
    contribution:
      "I developed the entire front-end of the Bartender Cheatsheet using React and Tailwind CSS. I implemented user authentication with a sign-up and login form, and integrated TheCocktailDB REST API to dynamically fetch cocktail recipes and ingredients. This resulted in an intuitive, interactive cheatsheet that makes exploring cocktail recipes both fun and accessible.",
    learned:
      "This project deepened my understanding of REST API integration within a React application. I learned how to manage asynchronous data fetching, state updates, and error handling in a user authentication flow. Additionally, I honed my skills in responsive UI design with Tailwind CSS and improved my ability to create clean, intuitive interfaces.",
    overviewUrl: "/bartender-cheatsheet",
    liveUrl: "https://giorgos-k-89.github.io/Bartender-Cheatsheet/",
  },
  {
    id: 4,
    title: "Yoltlabs' Page",
    planet: "/planets/4.png",
    previewImg: "/projects/yoltlabs.png",
    images: [],
    stack: ["Tailwind", "Javascript"],
    descriptionTitle: "Modern Corporate Presence",
    description:
      "A fully handcrafted HTML, CSS, and JavaScript page for the company I work with. I designed and built custom imagery, card layouts, and an engaging side navigation to create a visually appealing and professional online presence.",
    contribution:
      "I designed and developed a fully handcrafted HTML, CSS, and JavaScript page, ensuring a polished and professional online presence. I created custom imagery using Canva and Figma, designed unique card layouts, and implemented an engaging side navigation with smooth animations for better user experience.",
    learned:
      "While this project was more of a creative challenge than a technical one, it reinforced my ability to build visually appealing interfaces from scratch. I focused on UI/UX design, improving my skills in layout composition, color balance, and interactive navigation. The side navigation, in particular, was an opportunity to experiment with creative animations and smooth transitions.",
    overviewUrl: "/project-four",
    liveUrl: "https://yoltlabs.com/methodology",
  },
  {
    id: 5,
    title: "Baumit Platform",
    planet: "/planets/5.png",
    previewImg: "/projects/baumit.png",
    images: [],
    stack: ["React", "Tailwind", "Laravel"],
    descriptionTitle: "End-to-End Full-Stack Development",
    description:
      "A largely (mostly) solo project, this full-stack application features a React frontend paired with a Filament dashboard. I handled everything from designing the UI to creating models and migrations, showcasing my ability to deliver a complete product.",
    contribution:
      "I was responsible for developing both the frontend and backend of this platform, following requirements provided by my employer based on client needs. On the frontend, I built the UI using React, ensuring a smooth user experience. On the backend, I worked with Laravel and Filament, setting up models, controllers, and migrations to structure the database effectively. This project showcased my ability to execute a full-stack application while aligning with business requirements.",
    learned:
      "This project significantly expanded my backend development skills. It was my first hands-on experience with Laravel, where I learned how to create and manage controllers, models, and database migrations. I also gained a better understanding of how backend logic integrates with a React frontend. Laravel's tools and conventions made the learning process smoother, and this experience gave me the confidence to work on more backend-related tasks in the future.",
    overviewUrl: "baumit-platform",
    liveUrl: "",
  },
  {
    id: 6,
    title: "Map Project (coming soon)",
    planet: "/planets/6.png",
    previewImg: "",
    images: [],
    stack: ["React", "Supabase"],
    descriptionTitle: "Interactive Social Mapping",
    description:
      "An ongoing presonal project built with React and Supabase as the backend, connected to a PostgreSQL database. It will allow users to log activities, create memories, chat, and connect with friends worldwide using Leaflet for interactive maps. Stay tuned for an innovative, community-driven experience!",
    contribution:
      "I worked on the frontend, implementing the UI using React and Tailwind CSS. I also optimized API calls for better performance.",
    learned:
      "I improved my skills in managing component state and learned how to implement lazy loading for better performance.",
    overviewUrl: "/project-six",
    liveUrl: "",
  },
];

export default projects;
