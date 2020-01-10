var form;
var rowTotal;
var sumTotal;
var rowTotal1;
var sumTotal1;
var data1;
var email;
var name;
var HTML;
var recipient = [];
var invoice;
var numbers;
var data2;
var totalHours;
var expenses;
var exptot;

$("#setInfo").click(function() {
  email = $("#email").val();
  name = $("#name").val();
  recipient.push(email);
});

function sendEmail() {
  email = $("#email").val();
  name = $("#name").val();
  recipient.push(email);

  setTimeout(function() {
    if (data1 == null) {
      console.log("sent without attachment");
      Email.send({
        SecureToken: "2ff8c767-b1f1-4c06-80b9-362487f0ac05",
        To: recipient,
        From: "smtpjstester@gmail.com",
        Subject: "Invoice",
        Body: HTML
      }).then(message => {
        alert("mail sent successfully");
      });
    } else {
      console.log("sent with attachment");
      Email.send({
        SecureToken: "a56cac8a-a48d-47af-b961-bd7df8d8f72f",
        To: recipient,
        From: "invoice@saluslink.com",
        Subject: "Invoice",
        Body: HTML,
        Attachments: [
          {
            name: "invoice.jpeg",
            data: data1
          }
        ]
      }).then(message => alert("mail sent successfully"));
    }
  }, 2000);
}

function uploadFileToServer() {
  var file = event.srcElement.files[0];

  var reader = new FileReader();
  reader.readAsBinaryString(file);

  reader.onload = function() {
    data1 = "data:" + file.type + ";base64," + btoa(reader.result);
  };
}

function goBack() {
  window.history.back();
}
const $tableID = $("#table");
const $BTN = $("#export-btn");
const $EXPORT = $("#export");

const newTr = `
<tr class="rowss">
                    <td class="pt-3-half" contenteditable="true"></td>
                    <td class="pt-3-half" contenteditable="true"></td>
                    <td class="pt-3-half" contenteditable="true"></td>
                    <td class="pt-3-half sow" contenteditable="true"></td>
                    <td class="pt-3-half eow" contenteditable="true"></td>
                    <td id="hours" class="pt-3-half hour" ></td>
                    <td id="rate" class="pt-3-half rate" contenteditable="true"></td>
                    <td id="rowTotal" class="pt-3-half rawTotal" ></td>
                    <td>
                      <span class="table-remove"><button type="button"
                          class="btn btn-danger btn-rounded btn-sm my-0">Remove</button></span>
                    </td>
                </tr>`;

$(".table-add").on("click", "i", () => {
  // const $clone = $tableID
  //   .find("tbody tr")
  //   .last()
  //   .clone(true)
  //   .removeClass("hide table-line");

  if ($tableID.find("tbody tr").length === $tableID.find("tbody tr").length) {
    $("tbody").append(newTr);
  }

  // $tableID.find("table").append($clone);
});

$tableID.on("click", ".table-remove", function() {
  $(this)
    .parents("tr")
    .detach();
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.on("click", () => {
  form = data = [];

  const $rows = $tableID.find("tr:not(:hidden)");
  const headers = [];

  // Get the headers (add special header logic here)
  $($rows.shift())
    .find("th:not(:empty)")
    .each(function() {
      headers.push(
        $(this)
          .text()
          .toLowerCase()
      );
    });

  // Turn all existing rows into a loopable array
  $rows.each(function() {
    const $td = $(this).find("td");
    const h = {};

    // Use the headers from earlier to name our hash keys
    headers.forEach((header, i) => {
      h[header] = $td.eq(i).text();
    });

    data.push(h);
  });

  // Output the result
  $EXPORT.text(JSON.stringify(data));

  $(document).ready(function() {
    for (var i = 0; i < form.length; i++) {
      html += "<tr>";
      html += "<td>" + form[i].date + "</td>";
      html += "<td>" + form[i]["client/detail"] + "</td>";
      html += "<td>" + form[i].location + "</td>";
      html += "<td>" + form[i].sow + "</td>";
      html += "<td>" + form[i].eow + "</td>";
      html += "<td>" + form[i].hours + "</td>";
      html += "<td>" + form[i].rate + "</td>";
      html += "<td>" + rowTotal1[i] + "</td>";
      html += "</tr>";
    }
    $("#grandTotal").append(exptot);
    $("#inName").append(name);
    $("#id").append(id);
    $("#expop").append(exptop);
    $("#html").html(html);
  });

  setTimeout(function() {
    $(this).attr("disabled", "disabled");
    var tableHtml = document.getElementById("copy");
    tableHtml = tableHtml.innerHTML.replace(/\n|\t/g, " ");
    HTML = tableHtml;
  }, 1000);
});

$BTN.click(function() {
  $(this).attr("disabled", "disabled");
  var indTotal = form.map(data => data.hours * data.rate);
  d = indTotal;
  var total = indTotal.reduce((a, b) => a + b);
  sumTotal = total;
  id = $("#invoice").val();
  notes = $("#noteBox").val();
  $("#notes").append(notes);
});

$(".rate")
  .on("input")
  .empty();

// $(" .rate, .sow, .eow").on("input", function() {
//   if (/^[\d\s]+$/.test($(this).text())) {
//   } else {
//     alert("NUMBERS ONLY PLEASE");
//   }
// });
$("#calc").on("click", function() {
  for (let index = 0; index < 3; index++) {
    numbers = data2 = [];

    const $rows = $tableID.find("tr:not(:hidden)");
    const headers = [];

    // Get the headers (add special header logic here)
    $($rows.shift())
      .find("th:not(:empty)")
      .each(function() {
        headers.push(
          $(this)
            .text()
            .toLowerCase()
        );
      });

    // Turn all existing rows into a loopable array
    $rows.each(function() {
      const $td = $(this).find("td");
      const h = {};

      // Use the headers from earlier to name our hash keys
      headers.forEach((header, i) => {
        h[header] = $td.eq(i).text();
      });

      data2.push(h);
    });

    // Output the result
    $EXPORT.text(JSON.stringify(data2));

    var indTotal = numbers.map(
      data2 => parseFloat(data2.hours, 10) * parseFloat(data2.rate, 10)
    );
    rowTotal1 = indTotal;

    var total = indTotal.reduce(
      (a, b) => parseFloat(a, 10) + parseFloat(b, 10)
    );

    sumTotal1 = total;

    function compareMilitaryTime(start, end) {
      const d1 = new Date();
      d1.setHours(parseInt(start.toString().substr(0, 2), 10));
      d1.setMinutes(parseInt(start.toString().substr(2, 2), 10));
      const d2 = new Date();
      d2.setHours(parseInt(end.toString().substr(0, 2), 10));
      d2.setMinutes(parseInt(end.toString().substr(2, 2), 10));
      const millis = d2.getTime() - d1.getTime();
      return Math.floor(millis / 1000) / 60 / 60;
    }

    numbers.forEach((d, i) => {
      d.hours = compareMilitaryTime(d.sow, d.eow);
      d.total = d.hours * parseFloat(d.rate, 10);
      $("#rowTotal" + i)
        .empty()
        .text(rowTotal1[i].toFixed(2));
      $("#hours" + i)
        .empty()
        .text(d.hours.toFixed(2));
    });
    var expen = $(exp).val();
    exptop = expen;
    expenses = parseFloat(expen, 19);
    exptot = parseFloat(sumTotal1.toFixed(2), 10) + parseFloat(expenses, 10);

    $("#grandTotal1")
      .empty()
      .append(exptot);

    id = $("#invoice").val();

    $(".rawTotal").each(function(index) {
      $(this).attr("id", "rowTotal" + index);
    });
    $(".hour").each(function(index) {
      $(this).attr("id", "hours" + index);
    });
    $(".eow").each(function(index) {
      $(this).attr("id", "eow" + index);
    });
  }
});

$(document).ready(function() {
  $("#hide").hide();
  $("#myModal").modal("show");
});

$(".hour, .rate, .loc, .date, .sow, .eow, .cli").focus(function() {
  $(this).empty();
});
