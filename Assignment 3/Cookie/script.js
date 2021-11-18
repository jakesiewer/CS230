function calculateAvg() {
    var k = document.getElementById("myTable");
  
    for (var i = 1; i < k.rows.length; i++) {
      var sumOfGrades = 0;
  
      for (var j = 2; j < k.rows[0].cells.length - 1; j++) {
        if (k.rows[i].cells[j].innerHTML != "-") {
          sumOfGrades += parseInt(k.rows[i].cells[j].innerHTML);
        }
      }
      var avg = k.rows[i].cells[j].innerHTML = Math.round(sumOfGrades / 5);
      k.rows[i].cells[j].innerHTML = Math.round(avg) + "%";
  
      if (avg <= 40) {
        k.rows[i].cells[j].style.background = "red";
        k.rows[i].cells[j].style.color = "white";
      } else {
        k.rows[i].cells[j].style.background = "white";
        k.rows[i].cells[j].style.color = "black";
      }
    }
  }
  
  function saveTable() {
    var table = document.getElementById("myTable");
    var num = table.rows[0].cells.length; // amount of rows
    var data = '';
    for (var i = 1; i < table.rows.length; i++) {
      for (var j = 0; j < table.rows[0].cells.length - 1; j++) {
        data += table.rows[i].cells[j].innerHTML + ";";
      }
    }
    data = table.rows.length + ";" + table.rows[0].cells.length + ";" + data.substring(0, data.length);
    setCookie("data", data, 60);
    alert("Cookie Saved");
  }
  
  function setCookie(cname, cvalue, exdays) {
  
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function LoadTable() {
    var data = getCookie("data");
    if (data != "") {
      alert("The table says:" + data);
    } else {
      alert("There is no data in the table");
    }
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }