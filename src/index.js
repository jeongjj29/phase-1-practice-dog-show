document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table");
  const editForm = document.querySelector("form");

  function fetchDogs() {
    fetch("http://localhost:3000/dogs")
      .then((res) => res.json())
      .then((dogs) => {
        table.innerHTML = "";
        for (let dogObj in dogs) {
          let dog = dogs[dogObj];

          const nameTd = document.createElement("td");
          nameTd.textContent = dog.name;

          const breedTd = document.createElement("td");
          breedTd.textContent = dog.breed;

          const sexTd = document.createElement("td");
          sexTd.textContent = dog.sex;

          const editTd = document.createElement("td");
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.addEventListener("click", () => {
            handleEditButtonClick(dog);
          });
          editTd.append(editButton);

          const dogTr = document.createElement("tr");
          dogTr.append(nameTd, breedTd, sexTd, editTd);
          table.append(dogTr);
        }
      });
  }

  function handleEditButtonClick(dog) {
    editForm.name.value = dog.name;
    editForm.breed.value = dog.breed;
    editForm.sex.value = dog.sex;

    editForm.addEventListener("submit", (e) => {
      e.preventDefault();

      fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name.value,
          breed: editForm.breed.value,
          sex: editForm.sex.value,
        }),
      }).then(() => {
        fetchDogs();
      });
    });
  }

  fetchDogs();
});
