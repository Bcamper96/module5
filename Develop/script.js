// this is adding current date and time on the schedule using the api
currentDay = document.querySelector('#currentDay')
// "mmmm" is to display full month, "Do" displays date number, "yyyy" displays full year, "h:mm" displays hr and min, "a" displays whether am or pm
currentDay.innerText = moment().format('MMMM Do YYYY, h:mm a');

// this adds a current time block indicator 
var currentHour = moment().hours();

$('.row').each(function() {
  var timeBlock = parseInt($(this).children('.hour').text());
  if (timeBlock === currentHour) {
    $(this).children('.past').addClass('present').removeClass('past future');
  } else if (timeBlock < currentHour) {
    $(this).children('.past').addClass('past').removeClass('present future');
  } else {
    $(this).children('.past').addClass('future').removeClass('present past');
  }
});

//this adds a local storage functionality 
function save(event) {
    var timeBlock = $(event.target).siblings('.hour').text().trim();
    var text = $(event.target).siblings('.past').val().trim();
    localStorage.setItem(timeBlock, text);
  }
  

  $('.row').each(function() {
    var timeBlock = $(this).children('.hour').text().trim();
    var text = localStorage.getItem(timeBlock);
    $(this).children('.past').val(text);
  });

  function getTimeBlockClass(hour) {
    const currentHour = moment().hour();
    if (hour < currentHour) {
      return "past";
    } else if (hour === currentHour) {
      return "present";
    } else {
      return "future";
    }
}

function colorFuture() {
    // get current time
    var currentTime = moment().format("HH");
  
    // loop over each time block
    $(".row").each(function () {
      var blockTime = $(this).find(".hour").text().trim();
      blockTime = moment(blockTime, "hA").format("HH");
  
      if (blockTime > currentTime) {
        $(this).find("textarea").removeClass("past present").addClass("future");
      }
    });
  }
  
  colorFuture();
  