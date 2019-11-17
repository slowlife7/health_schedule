document.querySelector("#save").addEventListener("click", function() {
  console.log("save");
  const checkedBoxes = document.querySelectorAll(
    "input:checked:not(.all):not(.td--checkbox)"
  );

  const checkedRows = Array.prototype.slice.call(checkedBoxes);
  console.dir(checkedRows);
  const cols = checkedRows.map(function(element) {
    const rows = Array.prototype.slice.call(element.closest("tr").children, 1);

    const objs = rows.reduce(function(result, item, index) {
      const obj = {};

      let element = item.firstElementChild;
      obj[element.name] = element.value;

      while (
        (element = element.nextElementSibling) != null &&
        element.tagName !== "SELECT"
      ) {
        obj[element.name] = element.value;
      }

      return {
        ...obj,
        ...result
      };
    }, {});
    return objs;
  });
  console.dir(cols);

  const createdRows = cols
    .filter(data => {
      return data._id === "";
    })
    .map(data => {
      delete data._id;
      return fetch("/excercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    });

  const updatedRows = cols
    .filter(data => {
      return data._id !== "";
    })
    .map(data => {
      return fetch("/excercises", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    });

  Promise.all([...createdRows, ...updatedRows]).then(finished => {
    fetch("/excercises")
      .then(response => {
        return response.json();
      })
      .then(json => {
        json.url = "/excercises";
        console.log("json:", json);
        paintPosts(json);
        paintPagination(json);
      });

      document.querySelector(".all").value = false;
      document.querySelector(".all").checked = false;

  });
});

document.querySelector("#delete").addEventListener("click", function(event) {
  const checkedBoxes = document.querySelectorAll(
    "input:checked:not(.all):not(.td--checkbox)"
  );
  const checkedRows = Array.prototype.slice.call(checkedBoxes);
  const cols = checkedRows.map(function(element) {
    const rows = Array.prototype.slice.call(element.closest("tr").children, 1);

    const objs = rows.reduce(function(result, item, index) {
      const obj = {};

      let element = item.firstElementChild;
      obj[element.name] = element.value;

      while (
        (element = element.nextElementSibling) != null &&
        element.tagName !== "SELECT"
      ) {
        obj[element.name] = element.value;
      }

      return {
        ...obj,
        ...result
      };
    }, {});
    return objs;
  });

  const deleteRows = cols
    .filter(data => {
      return data._id !== "";
    })
    .map(data => {
      return fetch("/excercises", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    });

  Promise.all([...deleteRows]).then(finished => {
    fetch("/excercises")
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        json.url = "/excercises";
        paintPosts(json);
        paintPagination(json);
        /*if (json instanceof Array) {
          json.forEach(element => {
            tableBody.insertAdjacentHTML("beforeend", createRow(element));
          });
        }*/
        console.log(json);
      });
  });
});

const createRow = function(json) {
  let options = "";
  for (let i = 0; i < 10; i++) {
    if (i + 1 == json.set) {
      options += "<option selected>" + (i + 1) + "</option>";
    } else {
      options += "<option>" + (i + 1) + "</option>";
    }
  }

  let checkbox = "";
  if (json.pick) {
    checkbox =
      '<input class="td--checkbox" type="checkbox" name="pick" checked value=' +
      json.pick +
      ' onchange="pick(event)">';
  } else {
    checkbox =
      '<input class="td--checkbox" type="checkbox" name="pick" value=' +
      json.pick +
      ' onchange="pick(event)">';
  }
  return (
    "<tr>" +
    '<td><input type="checkbox" /></td>' +
    "<td>" +
    '<input class="td--text__none" type="text" name="_id" value="' +
    json._id +
    '" />' +
    '<input class="td--text" type="text" name="name" value="' +
    json.name +
    '"/>' +
    "</td>" +
    "<td>" +
    '<input class="td--number" type="text" name="weight" value="' +
    json.weight +
    '" />' +
    "</td>" +
    "<td>" +
    '<input class="td--text__none" type="hidden" name="set" value="' +
    json.set +
    '" />' +
    "<select>" +
    options +
    "</select>\
       </td>\
      <td>" +
    checkbox +
    "</td>\
    </tr>"
  );
};

const pick = function(event) {
  console.log(event);
  const target = event.target;
  if (target.checked) {
    target.value = true;
  } else {
    target.value = false;
  }
};

const onChangedPick = function(event) {
  console.dir(event);
  if (!event) {
    return;
  }
  
  event.value = event.checked;
  console.log('v:',event.value);
}

document.querySelector("#add").addEventListener("click", function(target) {
  const tableBody = document.querySelector("table tbody");
  tableBody.insertAdjacentHTML(
    "beforeend",
    '<tr>\
      <td><input type="checkbox" /></td> \
      <td>\
       <input class="td--text__none" type="text" name="_id" value="" />\
       <input class="td--text" type="text" name="name" value="" />\
      </td>\
      <td>\
       <input class="td--text" type="text" name="weight" value="" />\
      </td>\
       <td> \
         <input class="td--text__none" type="hidden" name="set" value="" />\
         <select> \
          <option selected>1</option> \
          <option>2</option> \
          <option>3</option> \
          <option>4</option> \
          <option>5</option> \
          <option>6</option> \
          <option>7</option> \
          <option>8</option> \
          <option>9</option> \
          <option>10</option> \
         </select>\
       </td>\
      <td>\
        <input \
          class="td--checkbox" \
          type="checkbox"\
          name="pick"\
          value="false"\
          onchange="onChangedPick(this)"\
        />\
      </td>\
    </tr>'
  );
});

document
  .querySelector("table tbody")
  .addEventListener("change", function(event) {
    const target = event.target;
    if (!target || target.nodeName !== "SELECT") {
      return;
    }
    console.log('c:',target);
    const value = target.previousElementSibling;
    value.value = target.value;
  });

document
  .querySelector("input[type=checkbox]:first-child")
  .addEventListener("click", function(event) {
    const checked = event.target.checked;
    const checkboxes = document.querySelectorAll(
      "input[type=checkbox]:not(.all):not(.td--checkbox)"
    );
    checkboxes.forEach(function(element) {
      element.checked = checked;
    });
  });
