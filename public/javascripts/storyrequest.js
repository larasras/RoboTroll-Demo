$("#submit").click(() => {
  let genre = $("#select_genre").val();
  $.ajax({ url: "/story/" + genre })
    .done((data) => {
      $("#story").text(data.story);
    })
    .fail((err) => {
      if (err.status === 500) {
        $("#story").text("Terlalu banyak request. Anda diduga robot.");
      }
    });
});
