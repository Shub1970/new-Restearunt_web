const menu = [
  {
    category: 1,
    id: "indian_dish",
    food: [
      "aloo paratha",
      "chicken tikka masala",
      "saag paneer",
      "biryani",
      "dosa",
    ],
    rank: [1, 2, 3, 4, 5],
  },
  {
    category: 2,
    id: "chinese_dish",
    food: [
      "kung pao chicken",
      "mapo tofu",
      "hot and sour soup",
      "dim sum",
      "fried rice",
    ],
    rank: [1, 2, 3, 4, 5],
  },
  {
    category: 3,
    id: "european_dish",
    food: [
      "spaghetti carbonara",
      "fish and chips",
      "paella",
      "shepherd's pie",
      "schnitzel",
    ],
    rank: [1, 2, 3, 4, 5],
  },
  {
    category: 4,
    id: "american_dish",
    food: [
      "hamburger",
      "hot dog",
      "mac and cheese",
      "buffalo wings",
      "grilled cheese",
    ],
    rank: [1, 2, 3, 4, 5],
  },
  {
    category: 5,
    id: "south_american_dish",
    food: ["tacos", "empanadas", "feijoada", "ceviche", "picanha"],
    rank: [0, 1, 2, 3, 4],
  },
];

const parentBoxes = document.querySelectorAll(".parent-box");

let draggedItem = null;
let draggedParent = null;

function handleDragStart(event) {
  if (event.target.classList.contains("child-box")) {
    event.target.classList.add("start");
    draggedItem = event.target;
    draggedParent = event.target.parentNode;
  } else if (event.target.classList.contains("parent-box")) {
    event.target.classList.add("start");
    draggedParent = event.target;
  }
}

function handleDragEnd(event) {
  if (draggedItem) {
    draggedItem = null;
    draggedParent = null;
    document.querySelectorAll(".child-box").forEach((child) => {
      child.classList.remove("enter");
      child.classList.remove("start");
    });
  } else if (draggedParent) {
    draggedParent = null;
    document.querySelectorAll(".parent-box").forEach((parent) => {
      parent.classList.remove("enter");
      parent.classList.remove("start");
    });
  }
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDragEnter(event) {
  if (
    event.target.classList.contains("child-box") &&
    event.target.parentNode === draggedParent
  ) {
    event.target.classList.add("enter");
  } else if (event.target.classList.contains("parent-box")) {
    event.target.classList.add("enter");
  }
}

function handleDragLeave(event) {
  if (
    event.target.classList.contains("child-box") &&
    event.target.parentNode === draggedParent
  ) {
    event.target.classList.remove("enter");
  } else if (event.target.classList.contains("parent-box")) {
    event.target.classList.remove("enter");
  }
}
function handleDrop(event) {
  if (
    draggedItem &&
    event.target.classList.contains("child-box") &&
    event.target.parentNode === draggedParent &&
    event.target !== draggedItem
  ) {
    const targetIndex = Array.from(event.target.parentNode.childNodes).indexOf(
      event.target
    );
    const draggedIndex = Array.from(draggedParent.childNodes).indexOf(
      draggedItem
    );
    draggedParent.insertBefore(
      event.target,
      draggedParent.childNodes[draggedIndex]
    );
    event.target.parentNode.insertBefore(
      draggedItem,
      event.target.parentNode.childNodes[targetIndex]
    );
    event.target.style.background = "";
  } else if (draggedParent && event.target.classList.contains("parent-box")) {
    const parentRect = event.target.getBoundingClientRect();
    const draggedParentRect = draggedParent.getBoundingClientRect();
    console.log("changle occur by handleDrop");
    if (event.clientX >= parentRect.left + parentRect.width / 2) {
      console.log(parentRect.left, parentRect.width);
      event.target.parentNode.insertBefore(
        draggedParent,
        event.target.nextSibling
      );
    } else {
      event.target.parentNode.insertBefore(draggedParent, event.target);
    }
    event.target.style.background = "rgb(163, 115, 81, 0.8)";
    event.target.style.transform = "scale(1)";
  }
  createJson();
}

parentBoxes.forEach((parentBox) => {
  parentBox.addEventListener("dragstart", handleDragStart);
  parentBox.addEventListener("dragend", handleDragEnd);
  parentBox.addEventListener("dragover", handleDragOver);
  parentBox.addEventListener("dragenter", handleDragEnter);
  parentBox.addEventListener("dragleave", handleDragLeave);
  parentBox.addEventListener("drop", handleDrop);
});

// function parentDragDrop() {
//   let dragSrcEl = null;
//   function phandleDragStart(e) {
//     e.target.style.opacity = "1";
//     dragSrcEl = this;
//     e.dataTransfer.effectAllowed = "move";
//     e.target.classList.add("start");
//     e.dataTransfer.setData("text/html", this.innerHTML);
//   }

//   function phandleDragEnd(e) {
//     items.forEach(function (item) {
//       item.classList.remove("enter");
//       item.classList.remove("start");
//     });
//   }

//   function phandleDragEnter(e) {
//     this.classList.add("enter");
//   }
//   function phandleDragOver(e) {
//     e.preventDefault();
//   }
//   function phandleDragLeave(e) {
//     this.classList.remove("enter");
//   }
//   function phandleDrop(e) {
//     e.stopPropagation();
//     if (dragSrcEl !== this) {
//       console.log("change occur by phandleDrop");
//       dragSrcEl.innerHTML = this.innerHTML;
//       this.innerHTML = e.dataTransfer.getData("text/html");
//     }
//     document.querySelectorAll(".child-box").forEach((child) => {
//       child.classList.remove("start");
//     });
//     createJson();
//     return false;
//   }
//   let items = document.querySelectorAll(".parent-box");
//   items.forEach(function (item) {
//     item.addEventListener("dragstart", phandleDragStart);
//     item.addEventListener("dragenter", phandleDragEnter);
//     item.addEventListener("dragleave", phandleDragLeave);
//     item.addEventListener("dragend", phandleDragEnd);
//     item.addEventListener("dragover", phandleDragOver);
//     item.addEventListener("drop", phandleDrop);
//   });
// }

function update_menujs() {
  let updated_catg = [];
  const fooddiv = document.querySelectorAll(".parent-box");
  fooddiv.forEach((food) => {
    let temp = menu.filter((obj) => {
      return obj.id === food.id;
    });
    updated_catg.push(temp[0].category);
  });
  return updated_catg;
}

function update_sublist() {
  const foodlist = document.querySelectorAll(".parent-box");
  const catg = update_menujs();
  let update_list = [];
  const tempMenu = [];
  catg.forEach((ct) => {
    tempMenu.push(menu[ct - 1]);
  });
  for (let i = 0; i < foodlist.length; i++) {
    const tempfood = foodlist[i].querySelectorAll(".child-box");
    let tempArray = [];
    tempfood.forEach((tf) => {
      tempArray.push(tempMenu[i].food.indexOf(tf.innerHTML));
    });
    update_list.push(tempArray);
  }
  return update_list;
}

function createJson() {
  let data = [];
  const category = update_menujs();
  const subList = update_sublist();
  category.forEach((ctg, index) => {
    data.push({ category: ctg, rank: subList[index] });
  });
  const jsonData = JSON.stringify(data, null, 2);
  if (document.getElementById("myCheck").checked) {
    localStorage.setItem("myData", jsonData);
  }
  displayDataFromLocalStorage();
  return jsonData;
}

function saveJsonToLocalStorage() {
  const data = createJson();
  localStorage.setItem("myData", data);
}

function displayDataFromLocalStorage() {
  const data = localStorage.getItem("myData");
  if (data) {
    const jsonData = JSON.parse(data);
    const list = document.getElementById("live_data");
    list.innerHTML = "";
    jsonData.forEach((item) => {
      const li1 = document.createElement("li");
      const li2 = document.createElement("li");
      const box = document.createElement("div");
      li1.textContent = `category:${item.category}`;
      li2.textContent = `rank:${item.rank}`;
      box.appendChild(li1);
      box.appendChild(li2);

      list.appendChild(box);
    });
  }
}

document
  .getElementById("myCheck")
  .addEventListener("click", saveJsonToLocalStorage);

createJson();
displayDataFromLocalStorage();
parentDragDrop();
