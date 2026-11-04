import type { EducationStory, Post } from '../types';

export const USER_PROFILE = {
  username: 'pratik_pawar_0204',
  fullName: 'Pratik S Pawar',
  title: 'MSc IT Graduate & AI Builder',
  avatar: '/profile.png',
  bio: '🎓 MSc IT Graduate • 💻 Full-Stack & AI Builder • ⚡ Building responsive & secure web products\n📍 Mumbai, India • 🌐 Open for opportunities',
  phone: '+91-8928260115',
  email: 'pratikpawar0222@gmail.com',
  github: 'https://github.com/PratikPawar020403',
  linkedin: 'https://www.linkedin.com/in/pratik-s-pawar-780443358/',
  portfolioUrl: 'https://psp-02-portfolio.netlify.app/',
  postsCount: 4,
  followersCount: '1.4k',
  followingCount: 382,
  isVerified: true,
};

export const INITIAL_STORIES: EducationStory[] = [
  {
    id: 'school',
    title: 'School Education',
    label: 'School',
    username: 'pratik_pawar_0204',
    avatar: '/school-memories.jpg',
    category: 'school',
    viewed: false,
    timestamp: '8h ago',
    slides: [
      {
        id: 'school-1',
        slideType: 'info',
        title: 'School Days (1st – 10th)',
        subtitle: "Padmavati Venkatesh High School",
        period: '1st to 10th Standard (SSC)',
        institution: 'Padmavati Venkatesh High School',
        location: 'Mumbai, India',
        degreeOrGrade: 'Secondary School Certificate (SSC)',
        description: 'From 1st to 10th standard, I was known as a bright but quiet student. Learning came naturally to me, and I understood concepts quickly without putting in long hours of study.',
        paragraphs: [
          'From 1st to 10th standard, I was known as a bright but quiet student.',
          'Learning came naturally to me, and I understood concepts quickly without putting in long hours of study.',
          'I relied more on intuition and understanding than memorization.',
          'I preferred individual activities like running and fencing, which matched my focused and independent nature.'
        ],
        highlights: [
          'Consistent top performer in Mathematics & Science',
          'Competed in individual sports: Running & Fencing',
          'Learned to combine natural intuition with deep focus'
        ],
        skillsLearned: ['Intuitive Logic', 'Mathematics', 'Science', 'Running & Fencing'],
        gradient: 'from-amber-600 via-orange-600 to-red-600',
        badge: '1st – 10th Standard',
        emoji: '🏫',
      },
      {
        id: 'school-2',
        slideType: 'photo',
        image: '/school-memories.jpg',
        title: 'School Memories & Campus',
        subtitle: "Padmavati Venkatesh High School & Jr. College",
        period: 'School Years',
        institution: "Vidya Vardhak Samiti's Padmavati Venkatesh High School",
        location: 'Mumbai, India',
        degreeOrGrade: 'Padmavati Venkatesh High School • Batch Photo & Science Exhibition',
        description: 'School batch photograph with our teachers, the Padmavati Venkatesh High School campus, and presenting working models at the science exhibition in our lab coats.',
        paragraphs: [
          'Top: Class batch photograph alongside our respected teachers and mentors.',
          'Center: The iconic Padmavati Venkatesh High School & Junior College building.',
          'Bottom: Participating in the Science Exhibition, presenting biological and anatomical models.'
        ],
        highlights: [
          'Class batch photograph with teachers and peers',
          'Padmavati Venkatesh High School campus memories',
          'Hands-on presentation at the Science Exhibition'
        ],
        skillsLearned: ['Teamwork', 'Science Demonstration', 'Public Speaking'],
        gradient: 'from-slate-900 via-neutral-900 to-black',
        badge: '📸 Photo Memories',
        emoji: '📸',
      },
      {
        id: 'school-3',
        slideType: 'info',
        title: 'Key Takeaways & SSC Board Marks',
        subtitle: 'The shift from ease to deliberate struggle',
        period: 'SSC Milestone',
        institution: 'Padmavati Venkatesh High School',
        location: 'Mumbai, India',
        degreeOrGrade: 'SSC Board Examination • 80.80%',
        description: 'Class 10 went smoothly because things came easily, but looking back, this phase taught me an important truth — natural ability can carry you forward, but it doesn’t teach you how to struggle.',
        paragraphs: [
          'Class 10 went smoothly because things came easily, but looking back, this phase taught me an important truth — natural ability can carry you forward, but it doesn’t teach you how to struggle.',
          'School provided the foundation in logic, algebra, and physics that turned my curiosity toward computers.'
        ],
        scores: [
          { subject: 'Percentage', score: '80.80 %' },
          { subject: 'Mathematics', score: '85' },
          { subject: 'Science', score: '82' },
          { subject: 'Hindi/Sanskrit', score: '85' }
        ],
        highlights: [
          'Core Takeaway: Natural ability gets you started, but grit and struggle build mastery',
          'Athletic Discipline: Running & fencing fostered independent focus',
          'Next Step: Transitioned into Science with Computer Science in Junior College'
        ],
        skillsLearned: ['Analytical Thinking', 'Perseverance', 'Problem Solving', 'Independent Focus'],
        gradient: 'from-indigo-600 via-purple-700 to-pink-700',
        badge: '10th Standard Board',
        emoji: '💡',
      },
    ],
  },
  {
    id: 'class12',
    title: 'Class 12 (Junior College)',
    label: 'Class 12',
    username: 'pratik_pawar_0204',
    avatar: '/class12-memories.jpg',
    category: 'class12',
    viewed: false,
    timestamp: '6h ago',
    slides: [
      {
        id: 'class12-1',
        slideType: 'info',
        title: 'Class 11th & 12th (HSC)',
        subtitle: "Jnan Vikas Mandal's Dr. R. T. Doshi Jr. College",
        period: 'Junior College (11th & 12th Science)',
        institution: "Jnan Vikas Mandal's Jr. College of Science",
        location: 'Kalwa, Mumbai, India',
        degreeOrGrade: 'Higher Secondary Education',
        description: 'From 11th to 12th standard, I went through a noticeable change. I became more carefree and focused more on experiences than routine academics.',
        paragraphs: [
          'From 11th to 12th standard, I went through a noticeable change.',
          'I became more carefree and focused more on experiences than routine academics.',
          'I grew more outgoing, made many friends, and slowly moved away from the quiet discipline I had earlier.',
          'My academic performance declined, but my confidence and people skills improved. I learned how to communicate, connect, and understand different peoples.'
        ],
        highlights: [
          'Transformation: Stepped out of my shell into high social confidence',
          'Communication: Learned to empathize, articulate, and connect with people',
          'Perspective: Discovered that life lessons outside the book are equally vital'
        ],
        skillsLearned: ['Interpersonal Communication', 'Social Confidence', 'Empathy', 'Resilience'],
        gradient: 'from-rose-500 via-pink-600 to-purple-600',
        badge: '11th – 12th Standard',
        emoji: '🌱',
      },
      {
        id: 'class12-2',
        slideType: 'photo',
        image: '/class12-memories.jpg',
        title: 'Junior College Memories',
        subtitle: "Jnan Vikas Mandal's Dr. R. T. Doshi Jr. College",
        period: 'Junior College Days',
        institution: "Jnan Vikas Mandal's New English School & Jr. College",
        location: 'Kalwa, Mumbai, India',
        degreeOrGrade: "Jnan Vikas Mandal's Jr. College • Campus & Friend Circle",
        description: 'The Jnan Vikas Mandal\'s Padmavati Dr. R. T. Doshi Junior College building and sunny afternoons spent hanging out with a tight circle of friends.',
        paragraphs: [
          'Top: Jnan Vikas Mandal\'s Padmavati Dr. R. T. Doshi Junior College campus building.',
          'Bottom: Golden memories and brotherhood with the friend circle on sunny afternoons.'
        ],
        highlights: [
          "Jnan Vikas Mandal's College of Science & Commerce, Kalwa",
          'Formative friendships and unforgettable youth memories',
          'Learning social dynamics and collective teamwork outside the classroom'
        ],
        skillsLearned: ['Camaraderie', 'Life Experiences', 'Team Bonding'],
        gradient: 'from-slate-900 via-neutral-900 to-black',
        badge: '📸 College Memories',
        emoji: '📸',
      },
      {
        id: 'class12-3',
        slideType: 'info',
        title: 'Lessons Beyond Books & HSC Marks',
        subtitle: 'What life outside books taught me',
        period: 'HSC Milestone',
        institution: "Jnan Vikas Mandal's Jr. College",
        location: 'Kalwa, Mumbai, India',
        degreeOrGrade: 'Higher Secondary Certificate (HSC) • 51.38%',
        description: 'Life outside books started teaching me lessons classrooms never could. Class 12 taught me lessons about life that stayed with me beyond academics.',
        paragraphs: [
          'Life outside books started teaching me lessons classrooms never could.',
          'Class 12 taught me lessons about life that stayed with me beyond academics — a pivotal wake-up call to rebuild with purpose.'
        ],
        scores: [
          { subject: 'Percentage', score: '51.38 %' },
          { subject: 'English', score: '66' }
        ],
        highlights: [
          'Real-world Wisdom: Life lessons outside textbooks built grit and self-honesty',
          'The Reset: The drop in marks was the exact catalyst needed to re-evaluate and rebuild focus',
          'Next Chapter: Chose BSc Computer Science with renewed dedication, driving to a 7.75 CGPA in college'
        ],
        skillsLearned: ['Self-Reflection', 'Emotional Maturity', 'Personal Accountability', 'Grit'],
        gradient: 'from-purple-600 via-fuchsia-700 to-rose-600',
        badge: '12th Standard Board',
        emoji: '🌟',
      },
    ],
  },
  {
    id: 'bsc_cs',
    title: 'BSc Computer Science',
    label: 'BSc CS',
    username: 'pratik_pawar_0204',
    avatar: '/bsc-cs-memories.jpg',
    category: 'bsc_cs',
    viewed: false,
    timestamp: '4h ago',
    slides: [
      {
        id: 'bsc-1',
        slideType: 'info',
        title: 'BSc Computer Science',
        subtitle: "Vidya Prasarak Mandal's Educational Institutions",
        period: '3-Year Bachelor of Science (BSc CS)',
        institution: "Vidya Prasarak Mandal's Educational Institutions",
        location: 'Mumbai, India',
        degreeOrGrade: 'Undergraduate Program',
        description: 'The lockdown gave me time — time to slow down, explore, and think. I had a natural interest in computers and technology since childhood. My Class 12 marks led me to choose BSc Computer Science, and over time I realized it was a decision I genuinely enjoyed.',
        paragraphs: [
          'The lockdown gave me time — time to slow down, explore, and think.',
          'I had a natural interest in computers and technology since childhood.',
          'My Class 12 marks led me to choose BSc Computer Science.',
          'Over time, I realized it was a good decision and something I genuinely enjoyed.'
        ],
        highlights: [
          'Turned personal tech curiosity into rigorous engineering fundamentals',
          'Mastered core computing concepts and hands-on laboratory practicals',
          'Solidified commitment to pursuing a career in software development'
        ],
        skillsLearned: ['Python', 'Operating Systems', 'Computer Networks', 'AI', 'Ethical Hacking'],
        gradient: 'from-blue-600 via-indigo-600 to-violet-700',
        badge: 'Undergraduate Degree',
        emoji: '💻',
      },
      {
        id: 'bsc-2',
        slideType: 'photo',
        image: '/bsc-cs-memories.jpg',
        title: 'BSc CS Campus Memories',
        subtitle: "Vidya Prasarak Mandal's Educational Institutions",
        period: 'Undergraduate Years',
        institution: "Vidya Prasarak Mandal's Educational Institutions",
        location: 'Mumbai, India',
        degreeOrGrade: "Vidya Prasarak Mandal's Campus • BSc CS Batch Gathering",
        description: 'Batch celebration with Computer Science friends, faculty and mentors, along with the iconic entrance archway of Vidya Prasarak Mandal\'s Educational Institutions.',
        paragraphs: [
          'Top: Celebrating graduation & traditional day with our Computer Science batch.',
          'Bottom: The iconic campus gate of Vidya Prasarak Mandal\'s Educational Institutions.'
        ],
        highlights: [
          'Strong peer network and collaborative coding projects',
          "Campus life at Vidya Prasarak Mandal's Educational Institutions",
          'Deep dive into computer labs, Unix terminals and networking rigs'
        ],
        skillsLearned: ['Team Collaboration', 'Lab Experiments', 'Technical Symposia'],
        gradient: 'from-slate-900 via-neutral-900 to-black',
        badge: '📸 College Memories',
        emoji: '📸',
      },
      {
        id: 'bsc-3',
        slideType: 'info',
        title: 'Cybersecurity, AI & Degree Grades',
        subtitle: 'Beyond coding: How technology shapes the world',
        period: 'BSc CS Graduation',
        institution: "Vidya Prasarak Mandal's Educational Institutions",
        location: 'Mumbai, India',
        degreeOrGrade: 'Bachelor of Science (Computer Science) • CGPA 7.75',
        description: 'What interested me most was not just coding, but how technology shapes the world. Cybersecurity caught my attention, pushing me to learn more and build things. With the arrival of GPT and AI, my curiosity grew significantly. I became deeply interested in understanding AI, how it works, and what it can become.',
        paragraphs: [
          'What interested me most was not just coding, but how technology shapes the world. Cybersecurity caught my attention, pushing me to build things.',
          'With the arrival of GPT and AI, my curiosity grew significantly to understand how AI works and what it can become.'
        ],
        scores: [
          { subject: 'CGPA', score: '7.75' },
          { subject: 'Programming with Python-I', score: 'A+' },
          { subject: 'Operating System', score: 'O' },
          { subject: 'Computer Networks', score: 'O' },
          { subject: 'Artificial Intelligence', score: 'A' },
          { subject: 'Ethical Hacking', score: 'A' }
        ],
        highlights: [
          'Graduated with 7.75 CGPA in BSc Computer Science',
          'Scored "O" (Outstanding) in Operating Systems & Computer Networks',
          'Next Step: Transitioned directly into MSc Information Technology to specialize in scalable systems & AI'
        ],
        skillsLearned: ['Ethical Hacking', 'AI Fundamentals', 'Network Security', 'Curiosity & Research'],
        gradient: 'from-violet-600 via-purple-700 to-cyan-700',
        badge: 'BSc CS Degree Grades',
        emoji: '🤖',
      },
    ],
  },
  {
    id: 'msc_it',
    title: 'MSc Information Technology',
    label: 'MSc IT',
    username: 'pratik_pawar_0204',
    avatar: '/msc-it-memories.jpg',
    category: 'msc_it',
    viewed: false,
    timestamp: '2h ago',
    slides: [
      {
        id: 'msc-1',
        slideType: 'info',
        title: 'MSc Information Technology',
        subtitle: "S.P. Mandali's Ramnarain Ruia Autonomous College",
        period: '2-Year Master of Science (MSc IT)',
        institution: 'Ramnarain Ruia Autonomous College',
        location: 'Mumbai, India',
        degreeOrGrade: 'Postgraduate Program',
        description: 'After BSc CS, I chose MSc IT to continue exploring technology before stepping into a job. During this phase, my interest grew strongly toward AI/ML, cybersecurity, and research.',
        paragraphs: [
          'After BSc CS, I chose MSc IT to continue exploring technology before stepping into a job.',
          'During this phase, my interest grew strongly toward AI/ML, cybersecurity, and research.',
          'Subjects like Generative AI, Machine Learning, Blockchain Technology, and RPA changed the way I look at technology.'
        ],
        highlights: [
          'Advanced postgraduate specialization in modern software and AI',
          'Studied Generative AI, Machine Learning, Blockchain, and Penetration Testing',
          'Transitioned from software development into research and architecture'
        ],
        skillsLearned: ['Generative AI', 'Machine Learning', 'Blockchain', 'Penetration Testing', 'RPA'],
        gradient: 'from-emerald-600 via-teal-700 to-cyan-800',
        badge: 'Postgraduate Master Degree',
        emoji: '🎓',
      },
      {
        id: 'msc-2',
        slideType: 'photo',
        image: '/msc-it-memories.jpg',
        title: 'MSc IT Ruia College Memories',
        subtitle: "S.P. Mandali's Ramnarain Ruia Autonomous College",
        period: 'Postgraduate Years',
        institution: 'Ramnarain Ruia Autonomous College (Grade A+)',
        location: 'Mumbai, India',
        degreeOrGrade: 'Ramnarain Ruia Autonomous College • Campus & Celebrations',
        description: 'MSc IT batch gathering at the sports grounds, the historic Ramnarain Ruia Autonomous College building (Estd 1937), and celebrating Marathi Bhasha Gaurav Din in traditional formals.',
        paragraphs: [
          'Top: MSc IT batch friends outdoors on Ruia college grounds.',
          'Center: The iconic Ramnarain Ruia Autonomous College of Excellence heritage campus.',
          'Bottom: Evening batch photo celebrating Marathi Bhasha Gaurav Din in traditional formals.'
        ],
        highlights: [
          'Ramnarain Ruia Autonomous College (NAAC A+ College of Excellence)',
          'MSc IT batchmates, research seminars & lab cohorts',
          'Cultural celebrations & academic symposiums'
        ],
        skillsLearned: ['Research Methodology', 'Symposium Presentation', 'Collaboration'],
        gradient: 'from-slate-900 via-neutral-900 to-black',
        badge: '📸 Postgrad Memories',
        emoji: '📸',
      },
      {
        id: 'msc-3',
        slideType: 'info',
        title: 'Research Paper & Postgrad Grades',
        subtitle: 'Cyber Security of Critical Infrastructure & Viksit Bharat 2024',
        period: 'MSc IT Research Culmination',
        institution: 'Ramnarain Ruia Autonomous College',
        location: 'Mumbai, India',
        degreeOrGrade: 'Master of Science (IT) • CGPA 7.58',
        description: 'I also wrote a research paper on "Cyber Security of National Critical Infrastructure" for Viksit Bharat 2024. MSc gave me more curiosity than clarity — and helped me understand that growth is often uncertain.',
        paragraphs: [
          'I also wrote a research paper on "Cyber Security of National Critical Infrastructure" for Viksit Bharat 2024.',
          'MSc gave me more curiosity than clarity — and helped me understand that growth is often uncertain, which fuels my passion to keep building.'
        ],
        scores: [
          { subject: 'CGPA', score: '7.58' },
          { subject: 'Generative AI', score: 'A' },
          { subject: 'Machine Learning', score: 'B+' },
          { subject: 'Blockchain Technology', score: 'A+' },
          { subject: 'RPA', score: 'B+' },
          { subject: 'Penetration Testing', score: 'A+' }
        ],
        highlights: [
          'Graduated with 7.58 CGPA from Ramnarain Ruia Autonomous College',
          'Published Research: "Cyber Security of National Critical Infrastructure" (Viksit Bharat 2024)',
          'Ready for Industry: Combining MSc IT systems depth with modern AI, web architecture and security'
        ],
        skillsLearned: ['Critical Infrastructure Security', 'Research Writing', 'Curiosity Mindset', 'Generative AI Applications'],
        gradient: 'from-teal-600 via-emerald-700 to-indigo-800',
        badge: 'MSc IT Postgrad Grades',
        emoji: '🚀',
      },
    ],
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: {
      username: 'pratik_pawar_0204',
      name: 'Pratik S Pawar',
      avatar: '/profile.png',
      isVerified: true,
      location: 'Creative Mind • Personal Introduction',
    },
    subtitle: 'Creative Mind / 001 · Personal Introduction',
    type: 'image_carousel',
    images: ['/posts/1-1.jpg', '/posts/1-2.jpeg', '/posts/1-3.jpg'],
    timestamp: 'JUST NOW',
    caption: `NAMASTE! I'M PRATIK S PAWAR. 🙏
An AI Builder & Thinker exploring ideas, questioning the world around me, and learning by making.

Swipe through 👉
• Slide 1: Personal Introduction
• Slide 2: "I won't work for you... until you work with me! Make me your creative collaborator."
• Slide 3: Three Pillars. One Curious Mind (01 AI & Technology • 02 Creative Experiments • 03 Building & Automation)

Drop a heart or comment if you believe in curious minds building the future! 🚀`,
    tags: ['#CreativeMind', '#AIBuilder', '#PersonalIntroduction', '#ThreePillars', '#MScIT', '#FullStack'],
    likesCount: 0,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c1',
        username: 'tech_recruiter_sarah',
        text: 'The visual craft of these slides is incredible! Love the three pillars concept. 🔥',
        timestamp: '14h ago',
        likes: 0,
      },
      {
        id: 'c2',
        username: 'alex_frontend',
        text: '"I won\'t work for you until you work with me" — such a strong collaborator mindset! 👏',
        timestamp: '9h ago',
        likes: 0,
      },
    ],
  },
  {
    id: 'post-2',
    author: {
      username: 'pratik_pawar_0204',
      name: 'Pratik S Pawar',
      avatar: '/profile.png',
      isVerified: true,
      location: 'The Curiosity Lab • Field Notes / 001',
    },
    subtitle: 'The Curiosity Lab · Approach & Case Studies',
    type: 'image_carousel',
    images: ['/posts/2-1.jpg', '/posts/2-2.jpg', '/posts/2-3.jpg'],
    timestamp: '2 HOURS AGO',
    caption: `COMPLICATED PROBLEMS. SIMPLER SOLUTIONS. 💡
I enjoy finding the simplest practical way to turn an idea into something useful. Complexity → Clarity. Less friction, more possibility.

Swipe through 👉
• Slide 1: Approach & Philosophy (Complexity → Clarity)
• Slide 2: Curiosity, Put into Practice (001 AI Voice Detection • 002 Satyata Image Forensics • 003 Legal-Sakha AI Assistant)
• Slide 3: Gen AI Intern at Door Decor (I turn ideas into working systems: WordPress, n8n meeting automation, AI product content workflows)

"Think deeply. Experiment fearlessly. Build practically." ✨`,
    tags: ['#CuriosityLab', '#ProblemSolving', '#GenAI', '#CaseStudies', '#AIVoiceDetection', '#Satyata', '#LegalSakha', '#n8n'],
    likesCount: 0,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c3',
        username: 'dev_lead_mumbai',
        text: 'Satyata and AI Voice Detection are real-world engineering gems. Outstanding work! 🚀',
        timestamp: '2h ago',
        likes: 0,
      },
      {
        id: 'c4',
        username: 'startup_founder_jay',
        text: 'The Door Decor automation workflow (n8n + AI) shows real business impact. Impressive! 👏',
        timestamp: '1h ago',
        likes: 0,
      },
    ],
  },
  {
    id: 'post-wispr-breathless',
    author: {
      username: 'pratik_pawar_0204',
      name: 'Pratik',
      avatar: '/profile.png',
      isVerified: true,
      location: 'Growth Pitch • Wispr Flow India',
    },
    subtitle: 'Growth pitch · not affiliated with Wispr Flow or the artists',
    type: 'pitch_carousel',
    pitchId: 'wispr-breathless',
    timestamp: 'JUST NOW',
    caption: 'My pitch for Wispr Flow India: ask Shankar Mahadevan to sing one breath of Breathless while Flow writes it live, then let the whole country try. #BolegaIndia #OneBreathPitch #WisprFlow #GrowthPitch',
    tags: ['#BolegaIndia', '#OneBreathPitch', '#WisprFlow', '#GrowthPitch'],
    likesCount: 0,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'wb1',
        username: 'growth_lead_anu',
        text: 'Using Breathless to prove latency and accuracy in Hinglish is pure genius! 🔥',
        timestamp: '15m ago',
        likes: 0,
      },
      {
        id: 'wb2',
        username: 'voice_tech_fan',
        text: 'Love the 30-sec #BolegaIndia challenge idea. Would definitely try this!',
        timestamp: '8m ago',
        likes: 0,
      },
    ],
  },
  {
    id: 'post-wispr-diwali',
    author: {
      username: 'pratik_pawar_0204',
      name: 'Pratik',
      avatar: '/profile.png',
      isVerified: true,
      location: 'Growth Pitch • Wispr Flow India',
    },
    subtitle: 'Growth pitch · not affiliated with Wispr Flow or the artists',
    type: 'pitch_carousel',
    pitchId: 'wispr-diwali',
    timestamp: '2 HOURS AGO',
    caption: 'My pitch for Wispr Flow India: four Diwali songs by Darshan Magdum, four wishes written with Flow, one pledge: forward nahi, feel bhejo. #ForwardNahiFeelBhejo #DiwaliWithFlow #WisprFlow #GrowthPitch',
    tags: ['#ForwardNahiFeelBhejo', '#DiwaliWithFlow', '#WisprFlow', '#GrowthPitch'],
    likesCount: 0,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'wd1',
        username: 'diwali_vibes',
        text: 'Forward nahi feel bhejo hits home so hard. Everyone is tired of copied forwards! 🪔',
        timestamp: '1h ago',
        likes: 0,
      },
      {
        id: 'wd2',
        username: 'product_priya',
        text: 'Darshan Magdum collaboration is such a smart organic viral hook. 👏',
        timestamp: '42m ago',
        likes: 0,
      },
    ],
  },
];
