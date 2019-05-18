window.onload = function() {
  get();
};

window.onload = function() {
  getMany();
};

class User {
  constructor(name, image, moreInfo) {
    this.name = name;
    this.image = image;
    this.moreInfo = moreInfo;
  }
}
let x = 0;
const users = [];
function get() {
  fetch("https://randomuser.me/api/")
    .then(response => response.json())
    .then(data => {
      let key = x;
      let name =
        data.results["0"].name.first + " " + data.results["0"].name.last;
      let image = data.results["0"].picture.thumbnail;
      let moreInfo = {
        dob: data.results["0"].dob,
        email: data.results["0"].email
      };
      users.push(new User(name, image, moreInfo));
      createDom(name, image, moreInfo, key);
    })
    .catch(error => console.log(`Oops, there was an error: ${error}`))
    .finally(() => console.log("this function will always run"));
}

const createDom = (name, image, moreInfo, key) => {
  personList.innerHTML += `
      <div style='display:inline-block'; class='eachUser'>
        <div>
        ${name}
        <br>
        <img src='${image}'/>
        <br>
        <button onclick="getInfo(${key})">More Info</button>
        <p id="${key}">
        </div>
      </div>
    `;
  x++;
};

const getInfo = key => {
  let pText = document.getElementById(key);
  pText.innerHTML = `
    age: ${users[0].moreInfo.dob.age}
    <br>
    email: ${users[0].moreInfo.email}
    `;
  console.log(users[0].moreInfo.dob.age);
};

function getMany() {
  fetch("https://randomuser.me/api/?results=5")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.results.map(y => {
        let key = x;
        let name = y.name.first + " " + y.name.last;
        let image = y.picture.thumbnail;
        let moreInfo = {
          dob: y.dob,
          email: y.email
        };
        users.push(new User(name, image, moreInfo));
        createDom(name, image, moreInfo, key);
      });
    });
  console.log(users);
}
