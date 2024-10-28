let lang = navigator.language.substring(0, 2);
let printInfo = {};
let result = {};
let skillList = [];
let experienceList = [];
const protocol = window.location.protocol;
const host = window.location.host;
const pathName = window.location.pathname;

const body = document.querySelector("body");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const ulExp = document.querySelector("#ulExp");
const theme = document.querySelector("#theme");
const boxExp = document.querySelector("#boxExp");
const wrapper = document.querySelector("#wrapper");
const aboutMe = document.querySelector("#about-me");
const LangOpt = document.querySelector("#language");
const titleExp = document.querySelector("#titleExp");
const ulSkills = document.querySelector("#ulSkills");
const desc = document.querySelector("#setDescription");
const position = document.querySelector("#setPosition");
const titleSkill = document.querySelector("#titleSkill");
const desProfile = document.querySelector("#about-me-profesional");

const url =
  pathName == "/"
    ? `${protocol}//${host}/data/info.json`
    : `${protocol}//${host}/${pathName}/data/info.json`;

// Cargar información.
const loadInfo = async () => {
  const response = await fetch(`${url}`);
  const data = await response.json();
  result = data;
  getJobInfo(lang);
};
loadInfo();

// Cambiar idioma.
const changeLang = (lang) => {
  const getLangValue = lang.target.value;
  ulSkills.innerHTML = "";
  boxExp.innerHTML = "";
  getJobInfo(getLangValue);
  return lang;
};
LangOpt.addEventListener("change", changeLang);

// Información profesional.
const getJobInfo = async (lang = "es") => {
  document.title = result[lang].titleTap;
  position.textContent = result[lang].position;
  desc.innerHTML = result[lang].description;
  titleSkill.textContent = result[lang].titleSkill;
  titleExp.textContent = result[lang].titleExp;
  getSkills(result[lang].skills);
  getExperience(lang, result[lang].workExp);
  result[lang].workExp.map((work) => {
    getTools(work.toolsApply);
  });
};

// Cambiar tema - claro / oscuro.
const setTheme = () => {
  if (!document.body.classList.contains("dark-mode")) {
    body.classList.add("dark-mode");
    wrapper.classList.add("wrapper-dark");
    light.style.display = "block";
    dark.style.display = "none";
  } else {
    body.classList.remove("dark-mode");
    wrapper.classList.remove("wrapper-dark");
    light.style.display = "none";
    dark.style.display = "block";
  }
};
theme.addEventListener("click", setTheme);

const createDynamicElement = (setElement) => {
  const element = document.createElement(`${setElement.ele}`);
  `${!setElement.id ? null : (element.id = setElement.id)}`;
  `${!setElement.class ? null : (element.className = setElement.class)}`;
  `${!setElement.text ? null : (element.textContent = setElement.text)}`;
  `${!setElement.source ? null : (element.src = setElement.source)}`;

  if (!setElement.position) {
    setElement?.render.append(element);
  } else {
    setElement?.render?.prepend(element);
  }

  return element;
};

const getSkills = (skills) => {
  ulSkills.innerHTML = "";
  boxExp.innerHTML = "";

  skills.map((skill) => {
    // console.log(skill);
    const liSkill = createDynamicElement({
      ele: "li",
      text: skill.language,
      render: ulSkills,
      position: "append",
    });

    createDynamicElement({
      ele: "img",
      source: skill.icon,
      class: "icon-logo",
      render: liSkill,
      position: "preppend",
    });
  });
};

const getTools = (tools) => {
  tools.map((tool) => {
    createDynamicElement({
      ele: "li",
      text: tool,
      class: "tools-items",
      render: boxInfo,
    });
  });
};

const getExperience = (lang, experiences) => {
  experiences.map((exp) => {
    // Caja contenedora principal de información.
    const boxInfo = createDynamicElement({
      ele: "div",
      id: "boxInfo",
      render: boxExp,
    });

    // Nombre de la empresa.
    createDynamicElement({ ele: "h4", text: exp.company, render: boxInfo });

    // Cargo en la empresa.
    createDynamicElement({
      ele: "p",
      text:
        lang == "es" ? `Cargo: ${exp.position}` : `Position: ${exp.position}`,
      class: "positionJob",
      render: boxInfo,
    });

    // Contenedor tiempo en la empresa.
    createDynamicElement({ ele: "div", id: "timeJob", render: boxInfo });

    // Rango de tiempo en la empresa.
    createDynamicElement({
      ele: "small",
      text: `${exp.start_date} - ${
        !exp.end_date ? "Actualmente" : exp.end_date
      }`,
      render: boxInfo,
    });

    // Separador
    createDynamicElement({ ele: "hr", class: "divideHr", render: boxInfo });

    // Descripción actividades en la empresa.
    createDynamicElement({ ele: "p", text: exp.descExp, render: boxInfo });

    // Contenedor - tecnologías utlizadas.
    const ulTools = createDynamicElement({
      ele: "ul",
      id: "listTools",
      render: boxInfo,
    });

    // toolsApply
    exp.toolsApply.map((tool) => {
      createDynamicElement({
        ele: "li",
        text: tool,
        class: "tools-items",
        render: ulTools,
        position: "append",
      });
    });

    // Texto tecnologías
    createDynamicElement({
      ele: "span",
      text:
        lang == "es"
          ? `Tecnologías implementadas: `
          : `Technologies implemented: `,
      render: ulTools,
      class: "pre-text-tec",
      position: "prepend",
    });
  });
};
