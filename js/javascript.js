$(document).ready(function() {


  // Clears placeholder text when in focus
  $('input').focus(function() {
    $(this).attr('placeholder', '')
  }).blur(function() {
    $(this).attr('placeholder', 'Search')
  })


  // When search is clicked, move search bar up and show results
  $("#search").click(function(e) {
      e.preventDefault();
      wikiCallback(e);
      $('#search-text').val(""); //clears value in text box
      $('#search-bar').animate({top: "3%"}, 400); // moves search bar up
      $('#content').show().animate({
        opacity: 1,
        marginTop: "130px"
      }, 800); 
  });



  // When enter key is pressed, run wikiCallback
  $('#search-text').keypress(function(e) {
    if ( e.which == 13 ) {
     e.preventDefault();
     $('#search').trigger("click");
    };
  }); 

  // Callback function
  function wikiCallback(e) {
    // Gets search input
    var searchText = $('#search-text').val(); 
    //API url with searchTerm
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchText + "&format=json&callback=?";

    if (searchText == '') {
      $('#output').html('No results found.');
    } else {
      // Wikipedia Ajax call
      $.ajax({
        type: "GET",
        url: url,
        async: false,
        dataType: "json",
        success: function(data){
          // console.log(data[1][0]); - heading/title of article
          // console.log(data[2][0]); - description 
          // console.log(data[3][0]); - wikipedia link for article
          $('#output').html(''); // Clears previous results before displaying current ones
          for (var i = 0; i < data[1].length; i++){
            $('#output').prepend("<li><a href='"+data[3][i]+"' target='_blank'>"+data[1][i] +"</a><p>"+data[2][i]+"</p></li>");
          }
        },
        error: function(errorMessage){
          alert("Error");
        }

      });
    };  
  }

  // Hide results by default 
  $('#content').hide();


  // Back to top
  if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
  }

});




