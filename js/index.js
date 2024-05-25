const selectTagEl = document.querySelectorAll("select");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchange = document.querySelector(".exchange");
const translateBtn = document.querySelector("button");
const icons = document.querySelectorAll(".row i");
let option = "";

/////// to set English selected to first selection as default
// for (country_code in countries) {
//   let selected;
//   if (
//     country_code === "en-GB" &&
//     selectTagEl[0].getAttribute("id") === "from"
//   ) {
//     selected = "selected";
//   } else if (
//     country_code === "ar-SA" &&
//     selectTagEl[1].getAttribute("id") === "to"
//   ) {
//     selected = "selected";
//   } else {
//     selected = "none";
//   }
//   option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
//   selectTagEl[0].insertAdjacentHTML("beforeend", option);
// }
/////// to set arabic selected to second selection as default
// for (country_code in countries) {
//   let selected;
//   if (country_code === "ar-SA" && selectTagEl[1].getAttribute("id") === "to") {
//     selected = "selected";
//   } else if (
//     country_code === "en-GB" &&
//     selectTagEl[0].getAttribute("id") === "form"
//   ) {
//     selected = "selected";
//   } else {
//     selected = "none";
//   }
//   option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
//   selectTagEl[1].insertAdjacentHTML("beforeend", option);
// }

selectTagEl.forEach((t, id) => {
  for (const country_code in countries) {
    let selected;
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "ar-SA") {
      selected = "selected";
    }
    option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    t.insertAdjacentHTML("beforeend", option);
  }
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value;
  let trnslateFrom = selectTagEl[0].value;
  let translateTo = selectTagEl[1].value;

  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${trnslateFrom}|${translateTo}`;

  if (!text) return;
  toText.setAttribute("placeholder", "Translating...");
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      let newText = data["responseData"].translatedText;
      toText.value = newText;
      toText.setAttribute("placeholder", "Translation");
    });
});

exchange.addEventListener("click", () => {
  exchangeFun([fromText, toText, selectTagEl[0], selectTagEl[1]]);
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id === "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (target.id === "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTagEl[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTagEl[1].value;
      }
      speechSynthesis.speak(utterance); // speak the passed utterance
    }
  });
});

// function to chgane between from and to text with its slections
let exchangeFun = ([fisrtText, secondText, firstSelect, secondSelect]) => {
  let tempText = fisrtText.value;
  fisrtText.value = secondText.value;
  secondText.value = tempText;

  let tempSelectTag = firstSelect.value;
  firstSelect.value = secondSelect.value;
  secondSelect.value = tempSelectTag;
};
