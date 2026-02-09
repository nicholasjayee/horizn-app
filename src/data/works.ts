
export interface WorkItem {
  id: number;
  title: string;
  client?: string;
  category: string;
  year?: string;
  image: string;
  video?: string;
  services?: string[];
  link?: string;
}

export const SELECTED_WORKS: WorkItem[] = [
  {
    id: 1,
    title: "Neon Genesis",
    client: "Future Corp",
    category: "Web Experience",
    image: "https://picsum.photos/600/400?random=10",
    video: "https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-futuristic-interface-3199-large.mp4",
    services: ["WebGL", "Development", "Sound Design"]
  },
  {
    id: 2,
    title: "Cyber Fashion",
    client: "Vogue Digital",
    category: "3D Motion",
    image: "https://picsum.photos/600/400?random=11",
    video: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-purple-landscape-978-large.mp4",
    services: ["3D Modeling", "Motion Capture", "Art Direction"]
  },
  {
    id: 3,
    title: "FinTech 3.0",
    client: "Nova Bank",
    category: "App Dev",
    image: "https://picsum.photos/600/400?random=12",
    video: "https://assets.mixkit.co/videos/preview/mixkit-white-abstract-technology-background-1886-large.mp4",
    services: ["UI/UX", "Mobile Dev", "Security"]
  }
];

export const PROJECT_ARCHIVE: WorkItem[] = [
  {
    id: 101,
    title: "Orbital Dashboard",
    client: "SpaceX",
    category: "Development",
    year: "2024",
    image: "https://picsum.photos/100/100?random=50",
    services: ["Data Vis", "React"]
  },
  {
    id: 102,
    title: "Neural Interface",
    client: "Neuralink",
    category: "R&D",
    year: "2023",
    image: "https://picsum.photos/100/100?random=51",
    services: ["WebGL", "Prototyping"]
  },
  {
    id: 103,
    title: "Carbon Tracker",
    client: "Climate Fund",
    category: "Web Design",
    year: "2023",
    image: "https://picsum.photos/100/100?random=52",
    services: ["UI/UX", "Brand"]
  },
  {
    id: 104,
    title: "Metropolis",
    client: "Nike",
    category: "Motion",
    year: "2022",
    image: "https://picsum.photos/100/100?random=53",
    services: ["3D Animation", "Campaign"]
  },
  {
    id: 105,
    title: "Soundscape",
    client: "Spotify",
    category: "Experience",
    year: "2022",
    image: "https://picsum.photos/100/100?random=54",
    services: ["Audio Reactive", "Web"]
  },
  {
    id: 106,
    title: "Quantum Leap",
    client: "IBM",
    category: "Interactive",
    year: "2021",
    image: "https://picsum.photos/100/100?random=55",
    services: ["Educational", "WebGL"]
  }
];
