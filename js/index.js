const selectTagEl = document.querySelectorAll("select");
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
