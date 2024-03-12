  //hey there dynamic typing function
  const text = "Hey there!";  
  let index = 0;
  let direction = 1;
  let typingTimer;
  let clearingTimer;
  let delay = 150;
  const clearingSpeedFactor = 1.8; 
  
  function typeText() {
    if (direction === 1) {
      if (index < text.length) {
        document.getElementById("typing-text").textContent += text.charAt(index);
        index++;
      } else {
        direction = -1;
        delay /= clearingSpeedFactor; 
      }
    } else {
      if (index >= 0) {
        document.getElementById("typing-text").textContent = text.substring(0, index);
        index--;
      } else {
        direction = 1;
        delay *= clearingSpeedFactor;
      }
    }
  
    typingTimer = setTimeout(typeText, delay); 
  }
  
  function startTypingAnimation() {
    typeText();
  }
  
  startTypingAnimation();

  var know = document.getElementById("know");

  know.addEventListener("mouseenter", function() {
    know.innerHTML = "Click..";
  });
  
  know.addEventListener("click", function() {
    know.innerHTML = `scrolling`;
  });
  
  know.addEventListener("mouseleave", function() {
    know.innerHTML = `
      Know More 
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-person-raised-hand" viewBox="0 0 16 16">
        <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a.998.998 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207Z"/>
        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
      </svg>
    `;
  });


  function scrollToAbout() {
    const aboutSection = document.getElementById("about");
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const offset = aboutSection.offsetTop - navbarHeight;
    window.scrollTo({
        top: offset,
        behavior: "smooth"
    });
}

  // Certificate
window.addEventListener('scroll', function() {
  revealCertificates();
});

const experienceLink = document.getElementById('experience-link');
experienceLink.addEventListener('click', function(event) {
  event.preventDefault();
  scrollToExperienceSection();
});

function revealCertificates() {
  const certificates = document.querySelectorAll('.certificate');

  certificates.forEach((certificate, index) => {
    if (isElementInViewport(certificate) && !certificate.classList.contains('animate')) {
      setTimeout(() => {
        certificate.classList.add('animate');
      }, index * 400); 
    }
  });
}

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function scrollToExperienceSection() {
  const experienceSection = document.getElementById('experience');
  experienceSection.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
  const projectCarousel = document.querySelector('.project-carousel');
  const projects = document.querySelectorAll('.project');
  const projectDots = document.querySelectorAll('.dot');
  const navArrows = document.querySelectorAll('.nav-arrow');
  let currentProject = 0;

  // Function to show the current project
  function showProject(index) {
      projects.forEach(project => {
          project.style.display = 'none';
      });
      projects[index].style.display = 'block';
      projectDots.forEach(dot => {
          dot.classList.remove('active');
      });
      projectDots[index].classList.add('active');
  }

  showProject(currentProject);


  function nextProject() {
      currentProject = (currentProject + 1) % projects.length;
      showProject(currentProject);
  }

  // Function to navigate to the previous project
  function prevProject() {
      currentProject = (currentProject - 1 + projects.length) % projects.length;
      showProject(currentProject);
  }

  // Event listeners for navigation arrows
  navArrows.forEach(arrow => {
      arrow.addEventListener('click', function() {
          if (arrow.classList.contains('left')) {
              prevProject();
          } else {
              nextProject();
          }
      });
  });

  // Event listeners for dot navigation
  projectDots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
          currentProject = index;
          showProject(currentProject);
      });
  });
});

  document.addEventListener('DOMContentLoaded', function() {
    const projectCarousel = document.querySelector('.project-carousel');
    const projects = projectCarousel.querySelectorAll('.project');
    const projectCount = projects.length;
    const navArrows = document.querySelectorAll('.nav-arrow');
    let currentIndex = 0;

    function showProject(index) {
      projects.forEach((project, i) => {
        project.style.display = i === index ? 'block' : 'none';
      });
    }

    function updateNavDots() {
      const navDots = document.querySelectorAll('.dot');
      navDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function prevProject() {
      currentIndex = (currentIndex - 1 + projectCount) % projectCount;
      showProject(currentIndex);
      updateNavDots();
    }

    function nextProject() {
      currentIndex = (currentIndex + 1) % projectCount;
      showProject(currentIndex);
      updateNavDots();
    }

    navArrows.forEach(arrow => {
      arrow.addEventListener('click', function() {
        if (this.classList.contains('left')) {
          prevProject();
        } else if (this.classList.contains('right')) {
          nextProject();
        }
      });
    });

    showProject(currentIndex);
    updateNavDots();
  });

  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Form submitted successfully!');
    this.reset();
});



