
export interface SocialLink {
  platform: 'twitter' | 'instagram' | 'linkedin' | 'github';
  url: string;
}

export interface ArchiveProject {
  id: number;
  title: string;
  client: string;
  year: string;
  category: string;
  services: string[];
  heroImage: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  website?: string;
  socials?: SocialLink[];
  gallery: string[];
}

export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    id: 101,
    title: "Orbital Dashboard",
    client: "SpaceX",
    year: "2024",
    category: "Development",
    services: ["Data Vis", "React", "WebSocket"],
    heroImage: "https://picsum.photos/1920/1080?random=50",
    description: "A mission-critical telemetry dashboard designed for next-generation orbital launch vehicles. The interface provides real-time visualization of over 20,000 data points with sub-millisecond latency.",
    challenge: "The primary challenge was handling the massive influx of WebSocket data without blocking the main thread, while maintaining a 60fps render loop for complex 3D trajectory visualizations.",
    solution: "We implemented a custom WebGL renderer for the data visualization layer and utilized Web Workers for data parsing and state management, ensuring the UI remains responsive under heavy load.",
    technologies: ["React", "Three.js", "WebSockets", "D3.js", "WebGL"],
    website: "https://spacex.com",
    socials: [
      { platform: 'twitter', url: '#' },
      { platform: 'github', url: '#' }
    ],
    gallery: [
      "https://picsum.photos/800/600?random=101",
      "https://picsum.photos/800/600?random=102",
      "https://picsum.photos/800/600?random=103"
    ]
  },
  {
    id: 102,
    title: "Neural Interface",
    client: "Neuralink",
    year: "2023",
    category: "R&D",
    services: ["WebGL", "Prototyping", "UX Strategy"],
    heroImage: "https://picsum.photos/1920/1080?random=51",
    description: "An experimental interface for visualizing brain-computer interface (BCI) signals. This prototype explores how thought patterns can be translated into digital commands in a spatial environment.",
    challenge: "Visualizing abstract neural spikes in a way that is intuitive to human operators was the main hurdle. We needed a visual language that felt organic yet precise.",
    solution: "Using generative particle systems in WebGL, we created a visual metaphor of 'neural firing' that maps frequency and amplitude to color and motion, allowing instant readability of brain states.",
    technologies: ["WebGL", "GLSL", "React Three Fiber", "Python"],
    website: "https://neuralink.com",
    gallery: [
      "https://picsum.photos/800/600?random=104",
      "https://picsum.photos/800/600?random=105"
    ]
  },
  {
    id: 103,
    title: "Carbon Tracker",
    client: "Climate Fund",
    year: "2023",
    category: "Web Design",
    services: ["UI/UX", "Brand", "Full Stack"],
    heroImage: "https://picsum.photos/1920/1080?random=52",
    description: "A public-facing platform tracking global carbon offsets in real-time. The site combines transparency with storytelling to drive engagement and investment in green initiatives.",
    challenge: "Making dry environmental data engaging for a general audience without sacrificing scientific accuracy.",
    solution: "We built an immersive 'Living Earth' digital twin that visualizes carbon data as atmospheric layers. The experience gamifies the exploration of data, encouraging users to dig deeper.",
    technologies: ["Next.js", "Mapbox GL", "TailwindCSS", "Node.js"],
    website: "https://climate.example.org",
    socials: [
        { platform: 'instagram', url: '#' }
    ],
    gallery: [
      "https://picsum.photos/800/600?random=106",
      "https://picsum.photos/800/600?random=107",
      "https://picsum.photos/800/600?random=108"
    ]
  },
  {
    id: 104,
    title: "Metropolis",
    client: "Nike",
    year: "2022",
    category: "Motion",
    services: ["3D Animation", "Campaign", "Art Direction"],
    heroImage: "https://picsum.photos/1920/1080?random=53",
    description: "A high-energy motion campaign for the launch of the new urban tech-wear line. The video pieces were deployed across 40ft billboards in Times Square and Shibuya.",
    challenge: "Creating a cohesive visual narrative that works across varied aspect ratios, from vertical social feeds to ultra-wide digital billboards.",
    solution: "We designed a modular 3D environment where camera angles could be adjusted non-destructively, allowing us to render bespoke framing for every target display without rebuilding scenes.",
    technologies: ["Cinema 4D", "Octane Render", "After Effects"],
    socials: [
        { platform: 'instagram', url: '#' },
        { platform: 'twitter', url: '#' }
    ],
    gallery: [
      "https://picsum.photos/800/600?random=109",
      "https://picsum.photos/800/600?random=110"
    ]
  },
  {
    id: 105,
    title: "Soundscape",
    client: "Spotify",
    year: "2022",
    category: "Experience",
    services: ["Audio Reactive", "Web", "Creative Coding"],
    heroImage: "https://picsum.photos/1920/1080?random=54",
    description: "An audio-reactive web experience that generates unique 3D artwork based on a user's listening habits and favorite tracks.",
    challenge: "Analyzing audio data in the browser and syncing visuals perfectly with the beat across different devices and latency conditions.",
    solution: "We utilized the Web Audio API to extract FFT data and drive a custom shader pipeline. A precise internal clock synced to the audio context ensured perfect timing.",
    technologies: ["Web Audio API", "Three.js", "Spotify API"],
    gallery: [
      "https://picsum.photos/800/600?random=111",
      "https://picsum.photos/800/600?random=112"
    ]
  },
  {
    id: 106,
    title: "Quantum Leap",
    client: "IBM",
    year: "2021",
    category: "Interactive",
    services: ["Educational", "WebGL", "Storytelling"],
    heroImage: "https://picsum.photos/1920/1080?random=55",
    description: "An educational interactive journey explaining the principles of quantum computing to students and enthusiasts.",
    challenge: "Simplifying the complex, counter-intuitive concepts of quantum mechanics (superposition, entanglement) into visual interactive metaphors.",
    solution: "We created a series of 'playable' vignettes where users could manipulate qubits directly, seeing the probabilistic outcomes in real-time visual feedback.",
    technologies: ["WebGL", "Vue.js", "GSAP"],
    website: "https://ibm.com/quantum",
    gallery: [
      "https://picsum.photos/800/600?random=113",
      "https://picsum.photos/800/600?random=114"
    ]
  }
];
