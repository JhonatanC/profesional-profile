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
const titleSkill = document.querySelector("#titleSkill");
const titleExp = document.querySelector("#titleExp");
const ulSkills = document.querySelector("#ulSkills");
const ulExp = document.querySelector("#ulExp");
const boxExp = document.querySelector("#boxExp");
const body = document.querySelector("body");
const protocol = window.location.protocol;
let skillList = [];
let experienceList = [];
let result = {};

const host = window.location.host;
const pathName = window.location.pathname;

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
  getExperience(result[lang].workExp);
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

const getExperience = (experiences) => {
  experiences.map((exp) => {
    // console.log(exp);
    const boxInfo = document.createElement("div");
    boxInfo.id = "boxInfo";

    const hTitle = document.createElement("h4");
    hTitle.textContent = exp.company;

    const positionJob = document.createElement("p");
    positionJob.className = "positionJob";
    positionJob.textContent = `Cargo: ${exp.position}`;

    const timeJobBox = document.createElement("div");
    timeJobBox.id = "timeJob";

    const divideHr = document.createElement("hr");
    divideHr.className = "divideHr";

    const timeJobDate = document.createElement("small");
    timeJobDate.textContent = `${exp.start_date} - ${
      !exp.end_date ? "Actualmente" : exp.end_date
    }`;

    const descJob = document.createElement("p");
    descJob.textContent = exp.descExp;

    boxExp.append(boxInfo);
    boxInfo.append(hTitle);
    boxInfo.append(positionJob);
    boxInfo.append(timeJobDate);
    boxInfo.append(divideHr);
    boxInfo.append(descJob);
  });
};
