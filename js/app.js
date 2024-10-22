let printInfo = {};
let lang = navigator.language.substring(0, 2);
const wrapper = document.querySelector("#wrapper");
const aboutMe = document.querySelector("#about-me");
const LangOpt = document.querySelector("#language");
const theme = document.querySelector("#theme");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const position = document.querySelector("#setPosition");
const desc = document.querySelector("#setDescription");
const desProfile = document.querySelector("#about-me-profesional");
const ulSkills = document.querySelector("#ulSkills");
const titleSkill = document.querySelector("#titleSkill");
const body = document.querySelector("body");
const host = window.location.host;
const protocol = window.location.protocol;
let skillList = [];
let result = {};

// Cargar información.
const loadInfo = async () => {
  // Validar el http después de subirlo al servidor de Github.
  const response = await fetch(`${protocol}//${host}/data/info.json`);
  const data = await response.json();
  result = data;
  getJobInfo(lang);
};
loadInfo();

// Cambiar idioma.
const changeLang = (lang) => {
  const getLangValue = lang.target.value;
  ulSkills.innerHTML = "";
  getJobInfo(getLangValue);
};
LangOpt.addEventListener("change", changeLang);

// Información profesional.
const getJobInfo = async (lang = "es") => {
  document.title = result[lang].titleTap;
  position.textContent = result[lang].position;
  desc.innerHTML = result[lang].description;
  titleSkill.textContent = result[lang].titleSkill;
  getSkills(result[lang].skills);
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

const getSkills = (skills) => {
  skills.map((skill) => {
    const item = document.createElement("li");
    item.textContent = skill.language;
    ulSkills.append(item);

    const img = document.createElement("img");
    img.src = skill.icon;
    img.className = "icon-logo";
    item.prepend(img);
  });
};
