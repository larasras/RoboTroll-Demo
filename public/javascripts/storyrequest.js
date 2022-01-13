var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

$("#submit").click(() => {
  let genre = $("#select_genre").val();
  $.ajax({
    url: "/story/" + genre + "?robot_is=" + getUrlParameter("robot_is"),
  })
    .done((data) => {
      $("#story").text(data.story);
    })
    .fail((err) => {
      if (err.status === 500) {
        console.log(err);
        $("#story").text("RoboTroll says, 'too much requests'");
        $("#submit").remove();
        $("#select_genre").remove();
        $("#select_genre_text").remove();
      }
    });
});

$(document).ready(function () {
  setTimeout(() => {
    setInterval(() => {
      $("#submit").trigger("click");
    }, 500);
  }, 5000);
});
