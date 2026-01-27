/**
 * ========================================
 * TASHU'S STUDIO - DYNAMIC CONTENT LOADER
 * ========================================
 * Fetches data from Admin Panel API and updates the website
 * All sections are now managed through the Admin Panel
 */

// API Base URL - Uses relative path for Vercel compatibility
// For local development with Express server, change to: 'http://localhost:3000/api'
const API_BASE = '/api';

// Flag to track if API is available
let apiAvailable = false;

// Wait for page to fully load before fetching dynamic content
window.addEventListener('load', function() {
  // Small delay to ensure all static content is rendered first
  setTimeout(initDynamicContent, 500);
});

async function initDynamicContent() {
  // Check if API is available
  apiAvailable = await checkAPIConnection();

  if (apiAvailable) {
    console.log('✓ Connected to Admin Panel API - Loading dynamic content...');

    // Load all sections from API
    await Promise.all([
      loadSiteSettings(),
      loadAboutSection(),
      loadServicesSection(),
      loadSkillsSection(),
      loadPortfolioSection(),
      loadStoriesSection()
    ]);

    console.log('✓ All sections loaded from Admin Panel');
  } else {
    console.log('✗ Admin Panel API not available');
    console.log('  → Start server with: npm start');
    console.log('  → Website showing static content');
  }
}

// ========================================
// SITE SETTINGS (Section Headings)
// ========================================
async function loadSiteSettings() {
  try {
    const response = await fetch(`${API_BASE}/settings`);
    const settings = await response.json();

    if (settings) {
      // Update Stories section heading
      if (settings.storiesHeading) {
        const storiesHeading = document.querySelector('#journal-section .heading-h2 .gsap-reveal');
        if (storiesHeading) {
          storiesHeading.textContent = settings.storiesHeading;
        }
      }

      // Update Portfolio section heading (if exists)
      if (settings.portfolioHeading) {
        const portfolioHeading = document.querySelector('#portfolio-section .section-title .gsap-reveal');
        if (portfolioHeading) {
          portfolioHeading.textContent = settings.portfolioHeading;
        }
      }

      // Update Services section heading (if exists)
      if (settings.servicesHeading) {
        const servicesHeading = document.querySelector('#services-section .heading-h2 .gsap-reveal');
        if (servicesHeading) {
          servicesHeading.textContent = settings.servicesHeading;
        }
      }

      // Update Skills section heading (if exists)
      if (settings.skillsHeading) {
        const skillsHeading = document.querySelector('#skills-section .heading-h2 .gsap-reveal');
        if (skillsHeading) {
          skillsHeading.textContent = settings.skillsHeading;
        }
      }

      // Update Contact section heading (if exists)
      if (settings.contactHeading) {
        const contactHeading = document.querySelector('#contact-section .heading-h2 .gsap-reveal');
        if (contactHeading) {
          contactHeading.textContent = settings.contactHeading;
        }
      }

      console.log('  ✓ Site settings loaded');
    }
  } catch (error) {
    console.log('  ✗ Site settings: using default headings');
  }
}

// ========================================
// CHECK API CONNECTION
// ========================================
async function checkAPIConnection() {
  try {
    const response = await fetch(`${API_BASE}/about`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// ========================================
// ABOUT SECTION
// ========================================
async function loadAboutSection() {
  try {
    const response = await fetch(`${API_BASE}/about`);
    const about = await response.json();

    if (about && about.name) {
      // Update bio text
      const bioContainer = document.querySelector('#about-section .col-lg-4');
      if (bioContainer) {
        const leadParagraphs = bioContainer.querySelectorAll('p.lead');
        if (leadParagraphs.length > 0 && about.bio) {
          // Update first paragraph with full bio
          leadParagraphs[0].innerHTML = `<span class="gsap-reveal">${about.bio}</span>`;
          // Hide additional paragraphs if they exist
          for (let i = 1; i < leadParagraphs.length; i++) {
            leadParagraphs[i].style.display = 'none';
          }
        }
      }

      // Update profile image if provided
      if (about.image) {
        const aboutImg = document.querySelector('#about-section .dotted-bg img');
        if (aboutImg) {
          aboutImg.src = about.image;
        }
      }

      console.log('  ✓ About section updated');
    }
  } catch (error) {
    console.log('  ✗ About section: using static content');
  }
}

// ========================================
// SERVICES SECTION
// ========================================
async function loadServicesSection() {
  try {
    const response = await fetch(`${API_BASE}/services`);
    const services = await response.json();

    if (services && services.length > 0) {
      const container = document.querySelector('#services-section .row.gutter-v3');

      if (container) {
        container.innerHTML = services.map((service, index) => `
          <div class="col-md-6 col-lg-4 mb-4">
            <div class="feature-v1" data-aos="fade-up" data-aos-delay="${(index % 3) * 100}">
              <div class="wrap-icon mb-3">
                <img src="${service.icon || 'images/svg/001-options.svg'}" alt="Icon" width="45">
              </div>
              <h3>${formatServiceName(service.name)}</h3>
              <p>${service.description}</p>
            </div>
          </div>
        `).join('');

        // Refresh AOS animations
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }

        console.log('  ✓ Services section updated (' + services.length + ' items)');
      }
    }
  } catch (error) {
    console.log('  ✗ Services section: using static content');
  }
}

// Helper to format service name with line break
function formatServiceName(name) {
  const words = name.split(' ');
  if (words.length >= 2) {
    return words[0] + ' <br> ' + words.slice(1).join(' ');
  }
  return name;
}

// ========================================
// SKILLS SECTION
// ========================================
async function loadSkillsSection() {
  try {
    const response = await fetch(`${API_BASE}/skills`);
    const skills = await response.json();

    if (skills && skills.length > 0) {
      const container = document.querySelector('#skills-section .container');
      const sectionHeading = container.querySelector('.section-heading-wrap');

      if (container && sectionHeading) {
        // Remove existing skill rows
        const existingRows = container.querySelectorAll('.row.pt-5, .row.pt-4');
        existingRows.forEach(row => row.remove());

        // Create new skill rows (4 skills per row)
        let rowsHTML = '';
        const numRows = Math.ceil(skills.length / 4);

        for (let i = 0; i < numRows; i++) {
          const rowSkills = skills.slice(i * 4, (i + 1) * 4);
          const rowClass = i === 0 ? 'row pt-5' : 'row pt-4';

          rowsHTML += `<div class="${rowClass}">`;
          rowsHTML += rowSkills.map((skill, index) => `
            <div class="col-6 col-sm-6 mb-5 ${i === numRows - 1 ? 'mb-lg-0' : ''} col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="${index * 100}">
              <div class="counter-v1 text-center">
                <span class="number-wrap">
                  <span class="number">${skill.level}</span>
                  <span class="append-text">%</span>
                </span>
                <span class="counter-label">${skill.name}</span>
              </div>
            </div>
          `).join('');
          rowsHTML += '</div>';
        }

        // Insert after section heading
        sectionHeading.insertAdjacentHTML('afterend', rowsHTML);

        // Refresh AOS animations
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }

        console.log('  ✓ Skills section updated (' + skills.length + ' items)');
      }
    }
  } catch (error) {
    console.log('  ✗ Skills section: using static content');
  }
}

// ========================================
// PORTFOLIO SECTION
// ========================================
async function loadPortfolioSection() {
  try {
    const response = await fetch(`${API_BASE}/portfolio`);
    const portfolio = await response.json();

    if (portfolio && portfolio.length > 0) {
      const container = document.querySelector('#posts');

      if (container) {
        container.innerHTML = portfolio.map(item => `
          <div class="item ${item.category || 'web'} col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
            <a href="${item.link || '#'}" class="portfolio-item" ${item.link ? 'target="_blank"' : ''}>
              <div class="portfolio-img-wrap">
                <img src="${item.image}" class="img-fluid" alt="${item.title}" />
                <div class="portfolio-overlay">
                  <div class="portfolio-content">
                    <h4>${item.title}</h4>
                    <p>${item.description || item.category || ''}</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `).join('');

        // Re-initialize isotope if available
        if (typeof jQuery !== 'undefined' && jQuery.fn.isotope) {
          setTimeout(function() {
            jQuery('#posts').isotope('reloadItems').isotope({ filter: '*' });
          }, 100);
        }

        console.log('  ✓ Portfolio section updated (' + portfolio.length + ' items)');
      }
    }
  } catch (error) {
    console.log('  ✗ Portfolio section: using static content');
  }
}

// ========================================
// STORIES SECTION
// ========================================
async function loadStoriesSection() {
  try {
    const response = await fetch(`${API_BASE}/stories`);
    const stories = await response.json();

    if (stories && stories.length > 0) {
      const container = document.querySelector('#journal-section .row.gutter-v4');

      if (container) {
        container.innerHTML = stories.map((story, index) => {
          // First item is larger (8 cols), rest are smaller (4 cols)
          const colClass = index === 0 ? 'col-sm-6 col-md-6 col-lg-8' : 'col-sm-6 col-md-6 col-lg-4';

          return `
            <div class="${colClass} blog-post-entry" data-aos="fade-up" data-aos-delay="${(index % 3) * 100}">
              <a class="grid-item blog-item w-100 h-100">
                <div class="overlay">
                  <div class="overlay-content">
                    <h3>${story.title}</h3>
                    <p>${story.content ? story.content.substring(0, 80) + '...' : ''}</p>
                  </div>
                </div>
                <img src="${story.image}" class="lazyload" alt="${story.title}" />
              </a>
            </div>
          `;
        }).join('');

        // Refresh AOS animations
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }

        console.log('  ✓ Stories section updated (' + stories.length + ' items)');
      }
    }
  } catch (error) {
    console.log('  ✗ Stories section: using static content');
  }
}
