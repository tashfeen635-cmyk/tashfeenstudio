export const SITE = {
  url: "https://tashfeenriaz.site",
  title: "Tashfeen Riaz | Full Stack Web Developer in Gilgit, Pakistan",
  description:
    "Tashfeen Riaz - Full Stack Web Developer in Gilgit, Pakistan. Building fast, responsive websites and web apps - WordPress, Shopify, SaaS, and UI/UX design for businesses.",
  keywords: [
    "full stack developer gilgit",
    "web developer gilgit",
    "Tashfeen Riaz",
    "Tashfeen bin Riaz",
    "web design",
    "web development",
    "Gilgit",
    "Gilgit-Baltistan",
    "Pakistan",
    "WordPress",
    "Shopify",
    "SaaS",
    "UI/UX",
  ].join(", "),
  author: "Tashfeen Riaz",
  name: "Tashfeen Riaz",
  names: ["Tashfeen", "Tashfeen bin Riaz", "Tashu"],
  role: "Full Stack Web Developer",
  studio: "Tashu's Studio",
  email: "tashfeen635@gmail.com",
  phone: "+92 355 5890894",
  phoneRaw: "+923555890894",
  whatsapp: "https://wa.me/923555890894",
  location: "Gilgit, Gilgit-Baltistan, Pakistan",
  locality: "Gilgit",
  region: "Gilgit-Baltistan",
  country: "PK",
  instagram: "https://www.instagram.com/tashfeen460/",
  linkedin: "https://www.linkedin.com/in/tashfeen-riaz-39b1a2396/",
  portrait: "/images/tashfeen-riaz-portrait.webp",
  portraitW: 1607,
  portraitH: 1791,
};

export const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbz5-xLZ7L5Gx0bCoEjIk7QrnUxkPVZJhHs0TeQTl1HSvrlX0GEysnpt_B8huIalgD3b/exec";

export const NAV_LEFT = [
  { href: "/work", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
];

export const NAV_RIGHT = [
  { href: "/skills", label: "Skills" },
  { href: "/stories", label: "Stories" },
  { href: "/contact", label: "Contact" },
];

export interface PortfolioItem {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  category: string;
}

export const PORTFOLIO: PortfolioItem[] = [
  {
    src: "/images/brand-identity-design.webp",
    width: 1200,
    height: 800,
    alt: "Brand Identity Design by Tashfeen Riaz, Web Designer in Gilgit",
    title: "Brand Identity",
    category: "Visual Design",
  },
  {
    src: "/images/creative-artwork.webp",
    width: 1200,
    height: 800,
    alt: "Creative Artwork by Tashfeen Riaz",
    title: "Creative Artwork",
    category: "Illustration",
  },
  {
    src: "/images/package-design.webp",
    width: 1200,
    height: 800,
    alt: "Package Design by Tashfeen Riaz",
    title: "Package Design",
    category: "Branding",
  },
  {
    src: "/images/web-design-uiux.webp",
    width: 1200,
    height: 800,
    alt: "Web Design UI/UX by Tashfeen Riaz, Full Stack Developer in Gilgit",
    title: "Web Design",
    category: "UI/UX Design",
  },
  {
    src: "/images/digital-art.webp",
    width: 1200,
    height: 800,
    alt: "Digital Art Creation by Tashfeen Riaz",
    title: "Digital Art",
    category: "Illustration",
  },
  {
    src: "/images/brand-strategy.webp",
    width: 1200,
    height: 800,
    alt: "Brand Strategy Design by Tashfeen Riaz",
    title: "Brand Strategy",
    category: "Visual Identity",
  },
  {
    src: "/images/product-design.webp",
    width: 1200,
    height: 800,
    alt: "Product Packaging Design by Tashfeen Riaz",
    title: "Product Design",
    category: "Packaging",
  },
  {
    src: "/images/web-development.webp",
    width: 1200,
    height: 800,
    alt: "Web Development by Tashfeen Riaz, Full Stack Web Developer in Gilgit",
    title: "Web Development",
    category: "Frontend Design",
  },
];

export interface Skill {
  label: string;
  value: number;
}

export const SKILLS: Skill[] = [
  { label: "HTML/CSS", value: 99 },
  { label: "WordPress", value: 90 },
  { label: "Shopify/Liquid", value: 95 },
  { label: "UI/UX Design", value: 100 },
  { label: "JavaScript", value: 85 },
  { label: "Responsive Design", value: 90 },
  { label: "Figma", value: 88 },
  { label: "Bootstrap", value: 92 },
];

export interface Testimonial {
  quote: string;
  name: string;
  href: string;
  position: string;
  positionHref?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Tashfeen did an excellent job developing our website. Professional, responsive, and he delivered exactly what we needed, on time.",
    name: "Abdul Rehman",
    href: "https://www.instagram.com/travel_with_arrehman/",
    position: "Founder, Terra Pakistan",
  },
  {
    quote:
      "Tashfeen did an excellent job designing and developing the Gilgit Adventure Treks website. He understood our tourism business and created a modern, responsive, and professional website that represents our trekking and adventure services much better online. His attention to SEO, website performance, mobile responsiveness, and user experience was particularly impressive. I highly recommend Tashfeen Bin Riaz to anyone looking for a reliable web developer in Gilgit-Baltistan.",
    name: "Nasir Ahmed",
    href: "https://www.instagram.com/gilgit_adventure_treks/",
    position: "Founder, Gilgit Adventure Treks",
    positionHref: "https://gilgitadventuretreks.com/",
  },
  {
    quote:
      "Tashfeen Bin Riaz developed a professional and modern website for Maqsood Ahmed & Sons. He transformed our company information and services into a clear digital presence that reflects our experience in construction, engineering, IT solutions, and other services. The website is responsive, easy to navigate, and optimized for search engines. His professionalism, technical knowledge, and understanding of business requirements made the entire development process smooth. We are satisfied with the final result and highly recommend his web development services.",
    name: "Maqsood Ahmed Dar",
    href: "https://www.instagram.com/maqsood_ahmed_sons",
    position: "Founder, Maqsood Ahmed & Sons",
    positionHref: "https://mascorporates.com/",
  },
];

export interface Service {
  icon: string;
  title: string;
  desc: string;
}

export const HOME_SERVICES: Service[] = [
  {
    icon: "/images/svg/001-options.svg",
    title: "Digital Strategy",
    desc: "Crafting smart digital strategies that turn ideas into impactful, user-focused experiences.",
  },
  {
    icon: "/images/svg/002-chat.svg",
    title: "Web Design",
    desc: "Designing clean, modern websites that combine creativity, usability, and seamless user experiences.",
  },
  {
    icon: "/images/svg/003-contact-book.svg",
    title: "User Experience",
    desc: "Crafting intuitive, engaging experiences that connect users with meaningful and seamless digital journeys.",
  },
  {
    icon: "/images/svg/004-percentage.svg",
    title: "Web Development",
    desc: "Building fast, responsive websites that combine clean code, functionality, and seamless design.",
  },
  {
    icon: "/images/svg/006-goal.svg",
    title: "WordPress Solutions",
    desc: "Creating custom WordPress solutions that are flexible, user-friendly, and tailored to goals.",
  },
  {
    icon: "/images/svg/005-line-chart.svg",
    title: "Mobile Applications",
    desc: "Designing and developing mobile applications that are intuitive, fast, and user-friendly.",
  },
];

export const SERVICES: Service[] = [
  {
    icon: "/images/svg/002-chat.svg",
    title: "Web Design",
    desc: "Designing clean, modern websites that combine creativity, usability, and seamless user experiences for businesses in Gilgit and beyond.",
  },
  {
    icon: "/images/svg/003-contact-book.svg",
    title: "UI/UX & User Experience",
    desc: "Crafting intuitive, engaging experiences that connect users with meaningful and seamless digital journeys - wireframes to pixel-perfect designs.",
  },
  {
    icon: "/images/svg/004-percentage.svg",
    title: "Full Stack Web Development",
    desc: "Building fast, responsive, and scalable web applications with clean code - front-end and back-end handled together for a complete product.",
  },
  {
    icon: "/images/svg/006-goal.svg",
    title: "WordPress Solutions",
    desc: "Custom WordPress websites that are flexible, user-friendly, and tailored to your goals - themes, plugins, and full site management.",
  },
  {
    icon: "/images/svg/001-options.svg",
    title: "Shopify & eCommerce",
    desc: "Conversion-focused online stores built on Shopify with custom themes, payment integration, and smooth, secure checkout experiences.",
  },
  {
    icon: "/images/svg/005-line-chart.svg",
    title: "SaaS & MVPs",
    desc: "From MVP to production-ready SaaS platforms - multi-tenant apps, dashboards, role-based systems, and business portals built to scale.",
  },
];

export interface Story {
  title: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  content: string;
  excerpt: string;
}

export const STORIES: Story[] = [
  {
    title: "K2 - The Savage Mountain",
    image: "/images/K2.webp",
    width: 1600,
    height: 1067,
    alt: "K2 - The Savage Mountain, Gilgit-Baltistan, Pakistan",
    excerpt: "The world's second highest peak, standing tall in my homeland.",
    content:
      "The world's second highest peak, standing tall in my homeland. K2, also known as Mount Godwin-Austen, is the second-highest mountain on Earth at 8,611 meters above sea level. Located in the Karakoram range on the border between Pakistan and China, it's considered one of the most difficult and dangerous mountains to climb.",
  },
  {
    title: "Mountain Spirit",
    image: "/images/man.webp",
    width: 1600,
    height: 975,
    alt: "Mountain people of Gilgit-Baltistan, Pakistan",
    excerpt: "The resilient people of the peaks.",
    content:
      "The resilient people of the peaks. The mountain communities of Gilgit-Baltistan have lived in harmony with these towering giants for centuries, developing unique cultures, traditions, and ways of life adapted to the high-altitude environment.",
  },
  {
    title: "Ancient Glaciers",
    image: "/images/glashier.webp",
    width: 1600,
    height: 1200,
    alt: "Glaciers of Gilgit-Baltistan, Pakistan",
    excerpt: "Where ice meets sky in Gilgit-Baltistan.",
    content:
      "Where ice meets sky in Gilgit-Baltistan. The region is home to some of the longest glaciers outside the polar regions, including the Baltoro Glacier and Biafo Glacier. These ancient rivers of ice have shaped the landscape over millennia.",
  },
  {
    title: "Crystal Waters",
    image: "/images/lake.webp",
    width: 1600,
    height: 1203,
    alt: "Alpine lake of Gilgit-Baltistan, Pakistan",
    excerpt: "Pristine alpine lakes of the north.",
    content:
      "Pristine alpine lakes of the north. The lakes of Gilgit-Baltistan, fed by glacial meltwater, are known for their stunning turquoise and emerald colors. These natural wonders attract visitors from around the world.",
  },
  {
    title: "Journey Through Mountains",
    image: "/images/road.webp",
    width: 1600,
    height: 1069,
    alt: "Karakoram Highway through the mountains of Gilgit-Baltistan",
    excerpt: "Roads that connect dreams to reality.",
    content:
      "Roads that connect dreams to reality. The Karakoram Highway, one of the highest paved international roads in the world, winds through these mountains, connecting Pakistan to China and offering breathtaking views at every turn.",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const HOME_FAQ: Faq[] = [
  {
    q: "Who is Tashfeen Riaz?",
    a: "Tashfeen Riaz (also known as Tashfeen bin Riaz or Tashu) is a full stack web developer and designer from Gilgit, Gilgit-Baltistan, Pakistan. He is the founder of Tashu's Studio and specializes in WordPress, Shopify, UI/UX design, and SaaS development.",
  },
  {
    q: "Where is Tashfeen Riaz based?",
    a: "Tashfeen Riaz is based in Gilgit, Gilgit-Baltistan, Pakistan, and works with clients locally in Gilgit and across Pakistan.",
  },
  {
    q: "What services does Tashu's Studio offer?",
    a: "Tashu's Studio offers web design, UI/UX design, full stack web development, WordPress solutions, Shopify and eCommerce stores, and SaaS / MVP development.",
  },
  {
    q: "Is Tashfeen Riaz available for freelance projects?",
    a: "Yes, Tashfeen Riaz is available for freelance web design and development projects. Contact him through the contact page, by email at tashfeen635@gmail.com, or on WhatsApp at +92 355 5890894.",
  },
  {
    q: "Can you build a website for a business in Gilgit?",
    a: "Yes, I build fast, responsive websites for businesses in Gilgit, Gilgit-Baltistan and across Pakistan - from simple business sites to WordPress blogs, Shopify stores, and custom web applications.",
  },
];

export const SERVICES_FAQ: Faq[] = [
  {
    q: "Are you a web developer in Gilgit, Pakistan?",
    a: "Yes, Tashfeen Riaz is a full stack web developer and designer based in Gilgit, Gilgit-Baltistan, Pakistan. He designs, builds, and deploys websites and web applications for clients in Gilgit and across Pakistan.",
  },
  {
    q: "What web development services do you offer?",
    a: "I offer web design, UI/UX and user experience design, full stack web development, WordPress solutions, Shopify and eCommerce stores, and SaaS and MVP development - handling everything from concept and design to code and deployment.",
  },
  {
    q: "How much does a website cost in Gilgit, Pakistan?",
    a: "The cost depends on the type of website, the number of pages, and the features you need - a simple business or portfolio site is affordable, while custom eCommerce or SaaS platforms cost more. Contact me with your requirements for an exact quote.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A typical business or portfolio website takes 2 to 3 weeks, while larger projects such as Shopify stores or custom web applications usually take 4 to 6 weeks or more, depending on the scope and features.",
  },
  {
    q: "Do you provide website maintenance and support?",
    a: "Yes, I provide ongoing website maintenance, updates, backups, and support so your site stays fast, secure, and up to date after launch.",
  },
  {
    q: "Can you build both WordPress and Shopify websites?",
    a: "Yes. I build custom WordPress websites and blogs, and conversion-focused Shopify stores with custom themes, payment integration, and secure checkout - whichever platform fits your business best.",
  },
];

// ===== JSON-LD helpers =====

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    alternateName: SITE.names,
    url: `${SITE.url}/`,
    image: {
      "@type": "ImageObject",
      url: `${SITE.url}/images/tashfeen-riaz-portrait.webp`,
      width: SITE.portraitW,
      height: SITE.portraitH,
      caption: "Tashfeen Riaz - Web Designer & Developer from Gilgit, Pakistan",
    },
    jobTitle: SITE.role,
    worksFor: { "@type": "Organization", name: SITE.studio },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    email: SITE.email,
    telephone: SITE.phoneRaw,
    nationality: "Pakistani",
    knowsAbout: [
      "Web Design",
      "Web Development",
      "Full Stack Development",
      "WordPress",
      "Shopify",
      "SaaS",
      "UI/UX Design",
      "JavaScript",
      "HTML/CSS",
    ],
    sameAs: [SITE.instagram, SITE.linkedin],
  };
}

export function faqJsonLd(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function reviewsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#professional-service`,
        name: SITE.studio,
        url: `${SITE.url}/`,
        description: `Web design, web development, WordPress, Shopify, SaaS and UI/UX services by ${SITE.name}, ${SITE.role} in ${SITE.location}.`,
        founder: {
          "@type": "Person",
          name: SITE.name,
          url: `${SITE.url}/about`,
        },
        review: TESTIMONIALS.map((t) => ({
          "@type": "Review",
          itemReviewed: { "@id": `${SITE.url}/#professional-service` },
          author: { "@type": "Person", name: t.name, sameAs: t.href },
          reviewBody: t.quote,
        })),
      },
    ],
  };
}

export function articlesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": STORIES.map((s) => ({
      "@type": "Article",
      headline: s.title,
      author: {
        "@type": "Person",
        name: SITE.name,
        url: `${SITE.url}/about`,
      },
      image: `${SITE.url}${s.image}`,
      description: s.excerpt,
      url: `${SITE.url}/stories`,
    })),
  };
}