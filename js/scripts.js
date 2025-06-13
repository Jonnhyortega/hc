import { chatBotFunctions } from "./chatbot.js";

// FUNCTIONS MENU MOBILE
const btnMenuMobile = document.getElementById("btn-menu-mobile");
const menuMobile = document.getElementById("nav-mobile");
let openMenu = false;
const linksMenuMobile = document.querySelectorAll("#nav-mobile a");

const handleMenuMobile = () => {
  const toggleMenu = () => {
    openMenu = !openMenu;

    if (openMenu) {
      btnMenuMobile.src = "https://img.icons8.com/officel/80/multiply.png";
      menuMobile.style.display = "flex";
      menuMobile.classList.remove("animate__fadeOut");
      menuMobile.classList.add("animate__fadeInRightBig");
    } else {
      btnMenuMobile.src = "https://img.icons8.com/fluency/48/menu--v1.png";
      menuMobile.classList.remove("animate__fadeInRightBig");
      menuMobile.classList.add("animate__fadeOut");
      setTimeout(() => {
        menuMobile.style.display = "none";
      }, 1000);
    }
  };

  btnMenuMobile.addEventListener("click", toggleMenu);

  // Listener para los enlaces del menú móvil
  linksMenuMobile.forEach((element) => {
    element.addEventListener("click", () => {
      if (openMenu) {
        toggleMenu(); // Cierra el menú
      }
    });
  });
};

// FUNCTIONS TO DISPLAY ENABLING PROCESSES
const contentProcess = document.getElementById("content-process");
const content = [
  {
    step: 1,
    title: "1 - Inspeccion visual",
    description:
      "Visitamos tu local y te asesoramos sobre requerimientos y necesidades.",
    img: "https://img.icons8.com/color/50/search--v1.png",
  },
  {
    step: 2,
    title: "2 - Presupuesto",
    description: "Realizamos un informe completo y te enviamos el presupuesto.",
    img: "https://img.icons8.com/color/50/accumulate.png",
  },
  {
    step: 3,
    title: "3 - Inicio del tramite",
    description:
      "Confeccion de formulario y plano (en caso de corresponder) e ingreso de expediente.",
    img: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/external-businessmen-business-and-management-kiranshastry-lineal-color-kiranshastry-2.png",
  },
  {
    step: 4,
    title: "4 - Inicio de actividades",
    description:
      "Obtencion del codigo QR el cual te habilita a iniciar con tus correspondientes actividades.",
    img: "https://img.icons8.com/emoji/48/chequered-flag.png",
  },
];

const renderTemplateProcess = (object) => {
  return `
    <div class="card-step">
          
          <h3>${object.title}</h3>
          <p>
          ${object.description}           
          </p>
          <img width="50" height="50" src="${object.img}"/>
        </div>
    `;
};

const showProcess = () => {
  content.map((content) => {
    contentProcess.innerHTML += renderTemplateProcess(content);
  });
};

// INTERSECTION OBSERVER
const handleEffects = () => {
  const observerLeftElements = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInLeft"
          );
          observerLeftElements.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px",
    }
  );

  const observerRightElements = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInRight"
          );
          observerRightElements.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px",
    }
  );
  const observerCards = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__flipInY");
          observerRightElements.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px",
    }
  );

  const elementsEffectLeft = document.querySelectorAll(".elementsEffectLeft");
  elementsEffectLeft.forEach((element) => {
    observerLeftElements.observe(element);
  });

  const elementsEffectRight = document.querySelectorAll(".elementsEffectRight");
  elementsEffectRight.forEach((element) => {
    observerRightElements.observe(element);
  });

  const cardsSteps = document.querySelectorAll(".card-step");
  cardsSteps.forEach((card) => {
    observerCards.observe(card);
  });
};

function init() {
  // handleMenuMobile();
  // showProcess();
  // handleEffects();
  chatBotFunctions();
}

document.addEventListener("DOMContentLoaded", init);
