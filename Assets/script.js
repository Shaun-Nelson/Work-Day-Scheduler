// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").click(function () {
    var hour = $(this).closest("div").attr("id").slice(5);
    var text = $(this).siblings("textarea").val();
    localStorage.setItem(hour, text);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var currentHour = dayjs().hour();
  var timeBlocks = $(".time-block");

  for (var i = 0; i < timeBlocks.length; i++) {
    //Gets the id attribute of each time-block and removes "hour-", giving
    //the hour as a number.
    var id = $(timeBlocks[i]).attr("id").slice(5);

    if (currentHour > id) {
      $(timeBlocks[i]).attr("class", "row time-block past");
    } else if (currentHour == id) {
      $(timeBlocks[i]).attr("class", "row time-block present");
    } else {
      $(timeBlocks[i]).attr("class", "row time-block future");
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  for (var i = 0; i < timeBlocks.length; i++) {
    var hour = $(timeBlocks[i]).attr("id").slice(5);

    if (localStorage.getItem(hour)) {
      $(timeBlocks[i]).children("textarea").html(localStorage.getItem(hour));
    }
  }

  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("ddd, MMM D, YYYY "));
});
