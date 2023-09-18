function intiListeners() {
  $("#submit").on("click", (e) => {
    e.preventDefault();
    let fn = $("#firstName").val();
    let ln = $("#lastName").val();
    let ag = $("#age").val();
    let pn = $("#phNum").val();
    let em = $("#email").val();
    let cs = $("#classes").val();

    let newArrayClasses = cs.split(",");
    let courses = [];
    $.each(newArrayClasses, (i, newClass) => {
      let cl = {
        className: newClass.trim(),
      };
      courses.push(cl);
    });

    // console.log(finalClassArray);
    let userObj = {
      fName: fn,
      lName: ln,
      age: ag,
      pNumber: pn,
      email: em,
      courses,
    };
    $("#firstName").val("");
    $("#lastName").val("");
    $("#classes").val("");
    $("#age").val("");
    $("#phNum").val("");
    $("#email").val("");
    addUser(userObj);
  });
  $("#getNames").on("click", (e) => {
    getUsers();
  });
}

function addUser(user) {
  let allUsers = JSON.parse(localStorage.getItem("classes"));
  allUsers.push(user);
  localStorage.setItem("classes", JSON.stringify(allUsers));
}

function getUsers() {
  $("#app").html("");
  let allUsers = JSON.parse(localStorage.getItem("classes"));
  $.each(allUsers, (i, user) => {
    $("#app").append(`<div id="${i}"></div>`);
    $(`#${i}`).append(
      `<p><span class="studentStat">Name:</span> ${user.fName} ${user.lName}</p>`
    );

    $(`#${i}`).append(
      `<p><span class="studentStat">Age:</span> ${user.age}</p> `
    );
    $(`#${i}`).append(
      `<p><span class="studentStat">Phone Number:</span> ${user.pNumber}</p> `
    );
    $(`#${i}`).append(
      `<p><span class="studentStat">Email:</span> ${user.email}</p> `
    );
    $(`#${i}`).append(`<p><span class="studentStat">Classes:</span> </p> `);
    $.each(user.courses, (idx, cl) => {
      $(`#${i}`).append(` <p>${cl.className}</p>`);
    });
  });
}

function connectToStorage() {
  if (localStorage) {
    let classes = localStorage.getItem("classes");
    if (classes) {
      console.log("already there");
    } else {
      localStorage.setItem("classes", "[]");
    }
  } else {
    console.log("no storage available");
  }
}

$(document).ready(function () {
  intiListeners();
  connectToStorage();
});
