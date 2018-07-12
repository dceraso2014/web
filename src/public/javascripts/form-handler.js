
/*(function () {

  function init(){
    $('#submitButton').click(submitButtonHandler);
  }

  function submitButtonHandler (evt) {
     var testForm = document.getElementById('testForm');

      //prevent form submission
      evt.preventDefault();
      evt.stopPropagation();

      $('#post-results-container').fadeOut();
      $('.ajaxLoader').css('display', 'inline-block');


      //make the AJAX call
      $.ajax({
        url: '/contactsend',
        type: 'POST',
        data: {
          nombre: testForm.nombre.value,
          email: testForm.email.value,
          asunto: testForm.asunto.value,
          desc: testForm.desc.value
        },
        success: postSuccessHandler
      });
  }

  function postSuccessHandler (jsonData) {
    var $data = $('#post-results-container .data');

    //reset the UI
    $data.html('');
    $('.ajaxLoader').hide();

    //update the UI with the data returned from the AJAX call 
    $.each(jsonData, function (key, val) {
      $data.append('<li><b>' +  key + '</b>'   + val + '</li>');

      
    });

    $('#post-results-container').fadeIn();
  };

//init on document ready
$(document).ready(init);
})();
*/