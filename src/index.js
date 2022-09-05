let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    postToy(e.target.name.value, e.target.image.value)
  })
});


function getToys() {
  fetch('http://localhost:3000/toys')
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.map(eachToy => renderToys(eachToy))
      console.log(data)
    })

}

function renderToys(toys) {
  const toyCards = 
  `<div class="card">
    <h2>${toys.names}</h2>
    <img src=${toys.image} class="toy-avatar" />
    <p>4 Likes</p>
    <button class=${toys.likes} id="[toy_id]">Like ❤️</button>
  </div>`

  const toyBox = document.getElementById('toy-collection')
  toyBox.innerHTML += toyCards
}

function postToy(name, url) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "name": name,
      "image": url,
      "likes": 0
    })
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    renderToys(data);
  })
}