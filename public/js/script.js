$(document).ready(function () {
  $(this).tooltip();

  // -hide the form at first
  $(".create-list-form").hide();
  $(".create-task-form").hide();

  // -toggle the create list form
  $(".create-list-button").click(function () {
    $(".create-list-form").slideToggle();
  });

  // -toggle the create task form
  $(".create-task-button").click(function () {
    $(".create-task-form").slideToggle();
  });

  // -show task when user click left button
  $(".chevron-left").click(function () {
    $(this).toggle();
    $(".list-container").toggle("drop", 500, function () {
      $(".task-container").toggle(
        "drop",
        { direction: "right" },
        500,
        function () {
          $(".chevron-right").toggle();
        }
      );
    });
  });

  // -show list when user click right button
  $(".chevron-right").click(function () {
    $(this).toggle();
    $(".task-container").toggle(
      "drop",
      { direction: "right" },
      500,
      function () {
        $(".list-container").toggle("drop", 500, function () {
          $(".chevron-left").toggle();
        });
      }
    );
  });
});
