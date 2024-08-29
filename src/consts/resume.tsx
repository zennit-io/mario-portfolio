import {
  EmailIcon,
  GithubIcon,
  HomeIcon,
  InstagramIcon,
  InternetIcon,
  LinkedInIcon,
  NotebookIcon,
  TwitterIcon,
} from "@/icons";

export const RESUME = {
  name: "Mario Vukzaj",
  initials: "MV",
  url: "https://mariovukzaj.com",
  location: "Tirana, Albania",
  locationLink: "https://maps.app.goo.gl/sAD7H6G6U6Gue9ah7",
  description:
    "UI/UX Designer that loves implementing ideas into high-fidelity designs.",
  summary:
    "With a strong foundation in relevant\n" +
    "coursework and hands-on experience\n" +
    "through internships and projects, I\n" +
    "have developed a solid understanding\n" +
    "of the principles and practices in my\n" +
    "field. I possess a range of skills that\n" +
    "make me a strong candidate, including\n" +
    "proficiency in design, excellent\n" +
    "communication and collaboration\n" +
    "skills, and a strong attention to detail. I\n" +
    "am a quick learner and am committed\n" +
    "to staying up-to-date with the latest\n" +
    "trends and technologies in my field.",
  avatarUrl: "/me.png",
  skills: [
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Figma",
    "Blender 3D",
    "Spline 3D",
    "Framer",
    "Unreal Engine 5",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "vukzajmario5@gmail.com",
    tel: "+355688328069",
    social: {
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/vukzajmario/",
        icon: InstagramIcon,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mario-v-95b1111a2/",
        icon: LinkedInIcon,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/mariovukzaj",
        icon: TwitterIcon,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "zennit",
      href: "https://zennit.io",
      badges: [],
      location: "Remote",
      title: "Co-Founder & Lead Designer",
      logoUrl: "/zennit.png",
      start: "November 2023",
      end: "Current",
      description:
        "Co-founded Zennit and serve as the Lead Designer, where I drive the creative vision and oversee the design team. I ensure that all products and platforms feature cohesive, user-centered designs that align with our brand identity and business goals.",
    },
    {
      company: "LookUp",
      href: "https://lookup-parking.com",
      badges: [],
      location: "Tirana, Albania",
      title: "Lead Design Freelancer",
      logoUrl: "/lookup.png",
      start: "February 2023",
      end: "Current",
      description:
        "I lead the design and user experience of our app, LookUp, which assists users in finding places for their automobiles to park and charge. I co-founded LookUp. I oversee the creative direction and make sure the user experience is simple and easy to use for the app.",
    },
    {
      company: "Vatra Agency",
      badges: [],
      href: "https://vatra.net",
      location: "On-Site",
      title: "Graphic Designer",
      logoUrl: "/vatra.png",
      start: "September 2023",
      end: "June 2024",
      description:
        "Designed and developed intuitive user interfaces and social media content for various digital platforms, creating seamless and engaging experiences that resonated with target audiences and aligned with client objectives.",
    },
    {
      company: "Altech Solutions",
      href: "https://nvidia.com/",
      badges: [],
      location: "Santa Clara, CA",
      title: "Software Engineer",
      logoUrl: "/altech.png",
      start: "February 2022",
      end: "June 2023",
      description:
        "Developed and refined user interface designs and user experiences for multiple high-traffic crypto and online casino platforms, with a strong focus on enhancing user engagement and conversion rates. resulting in a 25% increase in user retention on crypto platforms and a 30% rise in customer satisfaction on casino sites.",
    },
    {
      company: "Polpetto Shoes",
      href: "https://splunk.com",
      badges: [],
      location: "San Jose, CA",
      title: "Software Engineer",
      logoUrl: "/polpetto.png",
      start: "September 2021",
      end: "December 2021",
      description:
        "I won the ERASMUS Mobility Call in Seville, Spain for three month for an internship and Polpetto Shoes was the company that I worked for.  Kept up-to-date the social media page and website with new design Boosted the store popularity by 22% in Polpetto Shoes website and 14% on social media.",
    },
  ],
  projects: [
    {
      title: "Mektrin Motors",
      active: true,
      description:
        "Mektrin Motors is a prominent car dealership in Albania, specializing in top brands such as Land Rover, Jaguar, Kia, Cranieri, and Volvo. They offer a diverse selection of new and pre-owned vehicles, complemented by personalized service, competitive pricing, and comprehensive after-sales support.",
      technologies: ["UI/UX"],
      links: [
        {
          type: "Website",
          href: "https://mektrin.al",
          icon: <InternetIcon className="size-3" />,
        },
      ],
      href: "https://mektrin-motors.al",
      image: "",
      video: "/mektrin.mp4",
    },
    {
      title: "LookUp",
      href: "https://lookup-parking.com",
      active: true,
      description:
        "LookUp is an innovative startup focused on simplifying urban mobility by helping users find parking spaces and electric vehicle charging stations. The app streamlines the search process, making it easier for drivers to locate convenient spots and charge their cars efficiently.",
      technologies: ["UI/UX", "Branding", "Social Media"],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <InternetIcon className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <GithubIcon className="size-3" />,
        },
      ],
      image: "",
      video: "/lookup.mp4",
    },
    {
      title: "zennit",
      href: "https://llm.report",

      active: true,
      description:
        "At Zennit, we create custom software solutions that are suited to your specific requirements in order to bring your ideas to life. Experience the highest level of software development brilliance by collaborating with us.",
      technologies: ["Branding", "UI/UX", "3D Modeling", "Digital Marketing"],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <InternetIcon className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dillionverma/llm.report",
          icon: <GithubIcon className="size-3" />,
        },
      ],
      image: "",
      video: "/zennit.mp4",
    },
    {
      title: "Fast Track Tyres",
      href: "https://automatic.chat",
      active: true,
      description:
        "Fast Track Tyres is a leading UK business specializing in the swift supply and fitting of high-quality tyres. Known for its efficient service and competitive pricing, Fast Track Tyres caters to a wide range of vehicles, ensuring safety and performance on the road.",
      technologies: ["Next.js", "Typescript", "PostgreSQL", "Prisma"],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <InternetIcon className="size-3" />,
        },
      ],
      image: "",
      video: "/fast-track-tyres.mp4",
    },
    {
      title: "dardanair",
      href: "https://llm.report",

      active: true,
      description:
        "Dardanair is a proposed regional airline project aimed at Kosovo, with key European destinations. The project also emphasizes the use of modern, fuel-efficient aircraft to ensure sustainability and environmental responsibility.",
      technologies: ["Branding", "UI/UX", "3D Modeling"],

      image: "",
      video: "/dardanair.mp4",
    },
    {
      title: "Homemade Heaven",
      href: "https://chatcollect.com",

      active: true,
      description:
        "Homemade Heaven crafts bio juices, sauce and jams from organic, local ingredients. Eachproduct is prepared to ensure the highest quality and flavor for a healthy ambient. ",
      technologies: ["UI/UX"],

      image: "",
      video: "/homemade-heaven.mp4",
    },
  ],
} as const;
