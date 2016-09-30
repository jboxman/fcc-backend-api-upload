// TODO
// http://stackoverflow.com/a/22987941/6732764
$(function() {
  // http://stackoverflow.com/a/8244082/6732764
  $('#upload').submit(function(e) {
    e.preventDefault();
    $('#output').prop('disabled', true);

    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    var fd = new FormData();
    // This only grabs one file.
    fd.append('file', $('#file')[0].files[0]);

    $.ajax({
      url: '/post',
      type: "POST",
      data: fd,
      contentType: false,
      processData: false,
      success: function(result) {
        $('#submit').prop('disabled', false);
        $('#output').text(result.fileSize);
      }
    });
  });
});
