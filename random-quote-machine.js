$(document).ready(function(){

  //randomize background color based on array of colors
  function randomColor(){
    var colors = ['#16a085','#27ae60','#2c3e50','#f39c12','#e74c3c','#9b59b6','#FB6964','#342224',"#472E32","#BDBB99","#77B1A9","#73A857"];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    $(".card-body").css("color", randomColor);
    $(".btn-primary, .card-header, .card-footer").css("background-color", randomColor);
  }
  randomColor();

  //on page load random quotes
  $.ajax({
    type: 'GET',
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(data){
      var post = data.shift();
      $('.card-title').html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + post.content);
      $('.card-text').text('-' + post.title);

      var href = 'https://twitter.com/intent/tweet?hashtags=quotes&text="';

      href += encodeURIComponent($(".card-title").text().trim()) + '"';
      $(this).text('-' + post.title);
      href += encodeURIComponent(" " + $('.card-text').text())
      $(".btn-secondary").attr("href", href);

    },
    cache: false
  });

  //click button to randomize quote
  $(".btn-primary").on("click", function(e){
    e.preventDefault();
    $.ajax({
    type: 'GET',
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(data){
      randomColor();
      var post = data.shift();

      var href = 'https://twitter.com/intent/tweet?hashtags=quotes&text="';

      $(".card-title").fadeOut(function() {
        $(this).html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + post.content);
        href += encodeURIComponent($(this).text().trim()) + '"';
      }).fadeIn("slow");

      $(".card-text").fadeOut(function() {
        $(this).text('-' + post.title);
        href += encodeURIComponent(" " + $(this).text())
        $(".btn-secondary").attr("href", href);
      }).fadeIn("slow");

    },
    cache: false
  });
  });
});
