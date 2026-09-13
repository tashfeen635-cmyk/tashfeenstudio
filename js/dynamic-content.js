/**
 * ========================================
 * TASHU'S STUDIO - STATIC CONTENT LOADER
 * ========================================
 * Fully static version - no backend / API required.
 * All content is embedded below and applied to the page on load.
 */

// ========================================
// SITE DATA (embedded static content)
// ========================================
var SITE_DATA = {
  settings: {
    storiesHeading: "From the land of peaks",
    portfolioHeading: "Selected Works",
    servicesHeading: "What I Do",
    skillsHeading: "My Skills",
    contactHeading: "Get In Touch"
  },
  about: {
    name: "Tashfeen Riaz",
    title: "Full Stack Web Developer",
    location: "Gilgit, Pakistan",
    bio: "I'm Tashfeen Riaz, a full stack web developer in Gilgit, Gilgit-Baltistan, Pakistan. I design, build, and deploy fast, responsive websites and web applications — from WordPress sites and Shopify stores to custom SaaS platforms and MVPs. I combine clean front-end design (HTML/CSS, JavaScript, UI/UX) with reliable back-end development to deliver projects that balance creativity with functionality. Every project is an opportunity to turn ideas into intuitive interfaces, seamless interactions, and meaningful digital journeys.",
    image: "images/tashfeen-riaz-portrait.webp"
  },
  services: [
    { "name": "Web Design", "description": "Designing clean, modern websites that combine creativity, usability, and seamless user experiences", "icon": "images/svg/002-chat.svg" },
    { "name": "User Experience", "description": "Crafting intuitive, engaging experiences that connect users with meaningful and seamless digital journeys", "icon": "images/svg/003-contact-book.svg" },
    { "name": "Web Development", "description": "Building fast, responsive websites that combine clean code, functionality, and seamless design", "icon": "images/svg/004-percentage.svg" },
    { "name": "WordPress Solutions", "description": "Creating custom WordPress solutions that are flexible, user-friendly, and tailored to goals", "icon": "images/svg/006-goal.svg" },
    { "name": "Mobile Applications", "description": "Designing and developing mobile applications that are intuitive, fast, and user-friendly", "icon": "images/svg/005-line-chart.svg" }
  ],
  skills: [
    { "name": "WordPress", "level": 90 },
    { "name": "HTML/CSS", "level": 99 },
    { "name": "Shopify/Liquid", "level": 95 },
    { "name": "UI/UX Design", "level": 100 },
    { "name": "JavaScript", "level": 85 },
    { "name": "Figma", "level": 88 },
    { "name": "Bootstrap", "level": 92 }
  ],
  portfolio: [
    { "title": "Brand Identity", "description": "Visual Design", "category": "branding", "image": "images/work_1_md.webp", "link": "" },
    { "title": "Creative Artwork", "description": "Illustration", "category": "illustration", "image": "images/work_2_md.webp", "link": "" },
    { "title": "Package Design", "description": "Branding", "category": "branding", "image": "images/work_3_md.webp", "link": "" },
    { "title": "Web Design", "description": "UI/UX Design", "category": "web", "image": "images/work_4_full.webp", "link": "" },
    { "title": "Digital Art", "description": "Illustration", "category": "illustration", "image": "images/work_5_md.webp", "link": "" },
    { "title": "Brand Strategy", "description": "Visual Identity", "category": "branding", "image": "images/work_6_md.webp", "link": "" },
    { "title": "Product Design", "description": "Packaging", "category": "packaging", "image": "images/work_7_a_md.webp", "link": "" },
    { "title": "Web Development", "description": "Frontend Design", "category": "web", "image": "images/work_8_md.webp", "link": "" }
  ],
  stories: [
    { "title": "K2 - The Savage Mountain", "content": "The world's second highest peak, standing tall in my homeland. K2, also known as Mount Godwin-Austen, is the second-highest mountain on Earth at 8,611 meters above sea level. Located in the Karakoram range on the border between Pakistan and China, it's considered one of the most difficult and dangerous mountains to climb.", "image": "K2.webp" },
    { "title": "Mountain Spirit", "content": "The resilient people of the peaks. The mountain communities of Gilgit-Baltistan have lived in harmony with these towering giants for centuries, developing unique cultures, traditions, and ways of life adapted to the high-altitude environment.", "image": "man.webp" },
    { "title": "Ancient Glaciers", "content": "Where ice meets sky in Gilgit-Baltistan. The region is home to some of the longest glaciers outside the polar regions, including the Baltoro Glacier and Biafo Glacier. These ancient rivers of ice have shaped the landscape over millennia.", "image": "glashier.webp" },
    { "title": "Crystal Waters", "content": "Pristine alpine lakes of the north. The lakes of Gilgit-Baltistan, fed by glacial meltwater, are known for their stunning turquoise and emerald colors. These natural wonders attract visitors from around the world.", "image": "lake.webp" },
    { "title": "Journey Through Mountains", "content": "Roads that connect dreams to reality. The Karakoram Highway, one of the highest paved international roads in the world, winds through these mountains, connecting Pakistan to China and offering breathtaking views at every turn.", "image": "road.webp" }
  ]
};

// Wait for page to fully load before applying content
window.addEventListener('load', function() {
  setTimeout(initStaticContent, 500);
});

function initStaticContent() {
  console.log('✓ Static content loader - rendering embedded data...');

  loadSiteSettings();
  loadAboutSection();
  loadServicesSection();
  loadSkillsSection();
  loadPortfolioSection();
  loadStoriesSection();

  console.log('✓ All sections rendered (static site, no backend)');
}

// ========================================
// SITE SETTINGS (Section Headings)
// ========================================
function loadSiteSettings() {
  var settings = SITE_DATA.settings;

  if (settings.storiesHeading) {
    var storiesHeading = document.querySelector('#journal-section .heading-h2 .gsap-reveal');
    if (storiesHeading) {
      storiesHeading.textContent = settings.storiesHeading;
    }
  }

  if (settings.portfolioHeading) {
    var portfolioHeading = document.querySelector('#portfolio-section .section-title .gsap-reveal');
    if (portfolioHeading) {
      portfolioHeading.textContent = settings.portfolioHeading;
    }
  }

  if (settings.servicesHeading) {
    var servicesHeading = document.querySelector('#services-section .heading-h2 .gsap-reveal');
    if (servicesHeading) {
      servicesHeading.textContent = settings.servicesHeading;
    }
  }

  if (settings.skillsHeading) {
    var skillsHeading = document.querySelector('#skills-section .heading-h2 .gsap-reveal');
    if (skillsHeading) {
      skillsHeading.textContent = settings.skillsHeading;
    }
  }

  if (settings.contactHeading) {
    var contactHeading = document.querySelector('#contact-section .heading-h2 .gsap-reveal');
    if (contactHeading) {
      contactHeading.textContent = settings.contactHeading;
    }
  }
}

// ========================================
// ABOUT SECTION
// ========================================
function loadAboutSection() {
  var about = SITE_DATA.about;

  if (!about || !about.name) return;

  // Update bio text
  var bioContainer = document.querySelector('#about-section .col-lg-4');
  if (bioContainer) {
    var leadParagraphs = bioContainer.querySelectorAll('p.lead');
    if (leadParagraphs.length > 0 && about.bio) {
      // Update first paragraph with full bio
      leadParagraphs[0].innerHTML = '<span class="gsap-reveal">' + about.bio + '</span>';
      // Hide additional paragraphs if they exist
      for (var i = 1; i < leadParagraphs.length; i++) {
        leadParagraphs[i].style.display = 'none';
      }
    }
  }

  // Update profile image if provided
  if (about.image) {
    var aboutImg = document.querySelector('#about-section .dotted-bg img');
    if (aboutImg) {
      aboutImg.src = about.image;
      aboutImg.alt = about.name + ' - ' + about.title + ' from ' + about.location;
      aboutImg.title = about.name + ' - Tashu\'s Studio';
    }
  }
}

// ========================================
// SERVICES SECTION
// ========================================
function loadServicesSection() {
  var services = SITE_DATA.services;
  if (!services || services.length === 0) return;

  var container = document.querySelector('#services-section .row.gutter-v3');
  if (!container) return;

  container.innerHTML = services.map(function(service, index) {
    return '<div class="col-md-6 col-lg-4 mb-4">' +
      '<div class="feature-v1" data-aos="fade-up" data-aos-delay="' + ((index % 3) * 100) + '">' +
        '<div class="wrap-icon mb-3">' +
          '<img src="' + (service.icon || 'images/svg/001-options.svg') + '" alt="Icon" width="45">' +
        '</div>' +
        '<h3>' + formatServiceName(service.name) + '</h3>' +
        '<p>' + service.description + '</p>' +
      '</div>' +
    '</div>';
  }).join('');

  // Refresh AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// Helper to format service name with line break
function formatServiceName(name) {
  var words = name.split(' ');
  if (words.length >= 2) {
    return words[0] + ' <br> ' + words.slice(1).join(' ');
  }
  return name;
}

// ========================================
// SKILLS SECTION
// ========================================
function loadSkillsSection() {
  var skills = SITE_DATA.skills;
  if (!skills || skills.length === 0) return;

  var container = document.querySelector('#skills-section .container');
  if (!container) return;

  var sectionHeading = container.querySelector('.section-heading-wrap');
  if (!sectionHeading) return;

  // Remove existing skill rows
  var existingRows = container.querySelectorAll('.row.pt-5, .row.pt-4');
  existingRows.forEach(function(row) { row.remove(); });

  // Create new skill rows (4 skills per row)
  var rowsHTML = '';
  var numRows = Math.ceil(skills.length / 4);

  for (var i = 0; i < numRows; i++) {
    var rowSkills = skills.slice(i * 4, (i + 1) * 4);
    var rowClass = i === 0 ? 'row pt-5' : 'row pt-4';

    rowsHTML += '<div class="' + rowClass + '">';
    rowsHTML += rowSkills.map(function(skill, index) {
      return '<div class="col-6 col-sm-6 mb-5 ' + (i === numRows - 1 ? 'mb-lg-0' : '') + ' col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="' + (index * 100) + '">' +
        '<div class="counter-v1 text-center">' +
          '<span class="number-wrap">' +
            '<span class="number">' + skill.level + '</span>' +
            '<span class="append-text">%</span>' +
          '</span>' +
          '<span class="counter-label">' + skill.name + '</span>' +
        '</div>' +
      '</div>';
    }).join('');
    rowsHTML += '</div>';
  }

  // Insert after section heading
  sectionHeading.insertAdjacentHTML('afterend', rowsHTML);

  // Refresh AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// ========================================
// PORTFOLIO SECTION
// ========================================
function loadPortfolioSection() {
  var portfolio = SITE_DATA.portfolio;
  if (!portfolio || portfolio.length === 0) return;

  var container = document.querySelector('#posts');
  if (!container) return;

  container.innerHTML = portfolio.map(function(item) {
    var imagePath = item.image;
    var title = item.title;
    var caption = (item.description || item.category || '') ? ' - ' + (item.description || item.category || '') : '';
    var safeTitle = String(title).replace(/'/g, "\\'");
    return '<div class="item ' + (item.category || 'web') + ' col-sm-6 col-md-6 col-lg-4 isotope-mb-2">' +
      '<a href="javascript:void(0)" class="portfolio-item" data-viewer="gallery" data-image="' + imagePath + '" data-caption="' + title + caption + '" onclick="openImage(\'' + imagePath + '\',\'' + safeTitle + '\'); return false;">' +
        '<div class="portfolio-img-wrap">' +
          '<img src="' + imagePath + '" class="img-fluid" alt="' + title + '" />' +
          '<div class="portfolio-overlay">' +
            '<div class="portfolio-content">' +
              '<h4>' + title + '</h4>' +
              '<p>' + (item.description || item.category || '') + '</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</a>' +
    '</div>';
  }).join('');

  // Re-initialize isotope if available
  if (typeof jQuery !== 'undefined' && jQuery.fn.isotope) {
    setTimeout(function() {
      jQuery('#posts').isotope('reloadItems').isotope({ filter: '*' });
    }, 100);
  }
}

// ========================================
// STORIES SECTION
// ========================================
function loadStoriesSection() {
  var stories = SITE_DATA.stories;
  if (!stories || stories.length === 0) return;

  var container = document.querySelector('#journal-section .row.gutter-v4');
  if (!container) return;

  container.innerHTML = stories.map(function(story, index) {
    // First item is larger (8 cols), rest are smaller (4 cols)
    var colClass = index === 0 ? 'col-sm-6 col-md-6 col-lg-8' : 'col-sm-6 col-md-6 col-lg-4';

    return '<div class="' + colClass + ' blog-post-entry" data-aos="fade-up" data-aos-delay="' + ((index % 3) * 100) + '">' +
      '<a class="grid-item blog-item w-100 h-100">' +
        '<div class="overlay">' +
          '<div class="overlay-content">' +
            '<h3>' + story.title + '</h3>' +
            '<p>' + (story.content ? story.content.substring(0, 80) + '...' : '') + '</p>' +
          '</div>' +
        '</div>' +
        '<img data-src="' + story.image + '" class="lazyload" alt="' + story.title + '" loading="lazy" />' +
      '</a>' +
    '</div>';
  }).join('');

  // Refresh AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}