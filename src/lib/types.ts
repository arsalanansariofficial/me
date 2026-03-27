export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string
  ) {
    super(message);
  }
}

export type Response = {
  name: string;
  title: string;
  profilePicture: string;
  projectCategories: string[];
  articleCategories: string[];
  about: { title: string; content: string }[];
  clients: { name: string; image: string; website: string }[];
  services: { image: string; category: string; title: string }[];
  testimonials: { name: string; image: string; comment: string }[];
  projects: { category: string; title: string; href: string; image: string }[];
  contactDetails: {
    dob: string;
    phone: string;
    email: string;
    location: string;
  };
  social: {
    email: string;
    github: string;
    resume: string;
    website: string;
    discord: string;
  };
  blogs: {
    date: string;
    href: string;
    title: string;
    image: string;
    author: string;
    description: string;
  }[];
  timeline: {
    education: { duration: string; institution: string; description: string }[];
    experience: {
      duration: string;
      institution: string;
      description: string;
    }[];
  };
  skills: [
    { title: string; percentage: number },
    { title: string; percentage: number },
    { title: string; percentage: number },
    { title: string; percentage: number },
    { title: string; percentage: number }
  ];
};
