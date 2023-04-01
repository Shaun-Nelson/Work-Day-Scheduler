// Wraps all code that interacts with the DOM in a call to jQuery to ensure
// that the code isn't run until the browser has finished rendering all the
// elements in the html

$(function () {
  // Adds a listener for click events on each save button using the id in
  // the containing time-block as a key to save user input in
  // local storage

  $(".saveBtn").click(function () {
    // Selects the "id" attribute of the parent div of each button and
    // removes "hour-", giving the hour as a (string) number
    var hour = $(this).closest("div").attr("id").slice(5);

    // Selects the textarea within the same div as each button and gets
    // its value
    var text = $(this).siblings("textarea").val();

    // Saves the text entry of the time-block in local storage
    localStorage.setItem(hour, text);
  });

  // Adds the past, present, or future class to each time
  // block by comparing the id to the current hour
  var currentHour = dayjs().hour();
  var timeBlocks = $(".time-block");

  for (var i = 0; i < timeBlocks.length; i++) {
    // Gets the id attribute of each time-block and removes "hour-", giving
    // the hour as a (string) number
    var id = $(timeBlocks[i]).attr("id").slice(5);

    if (currentHour > id) {
      // Applies "past" styling if time-block is in past hour
      $(timeBlocks[i]).attr("class", "row time-block past");
    } else if (currentHour == id) {
      // "double equals" is used to evaluate string and number types
      // Applies "present" styling if time-block is in current hour
      $(timeBlocks[i]).attr("class", "row time-block present");
    } else {
      // Applies "future" styling if time-block is in future hour
      $(timeBlocks[i]).attr("class", "row time-block future");
    }
  }

  for (var i = 0; i < timeBlocks.length; i++) {
    // Gets the id attribute of each time-block and removes "hour-", giving
    // the hour as a (string) number
    var hour = $(timeBlocks[i]).attr("id").slice(5);

    if (localStorage.getItem(hour)) {
      // Retrieves user input from local storage if it exists
      $(timeBlocks[i]).children("textarea").text(localStorage.getItem(hour));
    }
  }

  // Displays the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY "));
});
