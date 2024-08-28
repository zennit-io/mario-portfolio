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
    email: "mariovukzaj@yahoo.com",
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

      email: {
        name: "Send Email",
        url: "mariovukzaj@yahoo.com",
        icon: EmailIcon,

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
      title: "Lead Design Freelancer",
      logoUrl: "/zennit.png",
      start: "November 2023",
      end: "Current",
      description:
        "Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.",
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
        "Co-developed a prototype iOS app with another intern in Swift for the new Splunk Phantom security orchestration product (later publicly demoed and launched at .conf annual conference in Las Vegas). Implemented a realtime service for the iOS app in Django (Python) and C++; serialized data using protobufs transmitted over gRPC resulting in an approximate 500% increase in data throughput.",
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
        "Implemented a custom Kubernetes controller in Go to automate the deployment of MySQL and ProxySQL custom resources in order to enable 2,000+ internal developers to instantly deploy their app databases to production. Wrote several scripts in Go to automate MySQL database failovers while maintaining master-slave replication topologies and keeping Zookeeper nodes consistent with changes.",
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
        "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
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
        "Co-developed a prototype iOS app with another intern in Swift for the new Splunk Phantom security orchestration product (later publicly demoed and launched at .conf annual conference in Las Vegas). Implemented a realtime service for the iOS app in Django (Python) and C++; serialized data using protobufs transmitted over gRPC resulting in an approximate 500% increase in data throughput.",
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
      video: "https://cdn.llm.report/openai-demo.mp4",
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
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Homemade Heaven",
      href: "https://chatcollect.com",

      active: true,
      description:
        "Homemade Heaven crafts bio juices, sauce and jams from organic, local ingredients. Eachproduct is prepared to ensure the highest quality and flavor for a healthy ambient. ",
      technologies: ["UI/UX"],

      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
  ],
} as const;
