let printInfo = {};
let lang = navigator.language.substring(0, 2);
const wrapper = document.querySelector("#wrapper");
const aboutMe = document.querySelector("#about-me");
const LangOpt = document.querySelector("#language");
const darkMode = document.querySelector("#dark");
const position = document.querySelector("#setPosition");
const desProfile = document.querySelector("#about-me-profesional");
const body = document.querySelector("body");

// Cargar información.
const loadInfo = async () => {
  const response = await fetch("http://127.0.0.1:5500/data/info.json");
  const result = await response.json();
  // desProfile.textContent = result[lang].description;
  console.log(result[lang].description);

  desProfile.innerHTML = result[lang].description;

  return result;
};

// Cambiar idioma.
const changeLang = (lang) => {
  const getLangValue = lang.target.value;
  getJobPosition(getLangValue);
};
LangOpt.addEventListener("change", changeLang);

// Cargo profesional.
const getJobPosition = async (lang = "es") => {
  const titlePosition = await loadInfo();
  position.textContent = titlePosition[lang].position;
};

const getResume = () => {};

// Cambiar tema - claro / oscuro.
const setTheme = () => {
  if (!document.body.classList.contains("dark-mode")) {
    body.classList.add("dark-mode");
    wrapper.classList.add("wrapper-dark");
  } else {
    body.classList.remove("dark-mode");
    wrapper.classList.remove("wrapper-dark");
  }
};
darkMode.addEventListener("click", setTheme);

// Título por defecto en el tab del site
const setDefaultTitleTab = async () => {
  const titleTab = await loadInfo();
  titleTab[lang].titleTap;
  document.title = titleTab[lang].titleTap;
};
setDefaultTitleTab();
