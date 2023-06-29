// function getValue(array, knopka) {
//   let i = 0;
//   while (i < array.length) {
//     console.log(i);
//     console.log(knopka);
//     console.log(array[i].tags);
//     if (array[i].tags.includes(knopka)) {
//       console.log(array[i].tags.includes(knopka));
//       window.open(array[i].homepage).focus();
//       return;
//     }

//     i++;
//   }
// }

async function krData() {
  let existingUl = document.getElementById("radio-list");
  if (existingUl) {
    existingUl.parentNode.removeChild(existingUl);
  }

  const strana_str = document.getElementById("strana").value;
  const janr_str = document.getElementById("janr").value;
  const response = await fetch(
    ` http://de1.api.radio-browser.info/json/stations/search?name=${strana_str}&tag=${janr_str}`
  );

  if (!response.ok)
    throw new Error(`Ссылка не найдена. Ошибка ${response.status}`);
  const radiostations = await response.json();

  let ul = document.createElement("ul");
  ul.setAttribute("id", "radio-list");

  for (let i = 0; i < radiostations.length; i++) {
    const currentRadio = radiostations[i];

    let li = document.createElement("li");
    let link = document.createElement("a");
    link.href = currentRadio.homepage;
    link.textContent = currentRadio.name;
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.open(this.href, "_blank", "width=800,height=600").focus();
    });

    li.appendChild(link);
    ul.appendChild(li);
  }

  document.body.appendChild(ul);

  // getValue(radiostation, knopka);
}
