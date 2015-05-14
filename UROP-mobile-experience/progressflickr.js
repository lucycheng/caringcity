<html lang="en">
<head>
  <meta charset="utf-8">
  <title>jQuery.getJSON demo</title>
  <style>
  img {
    height: 100px;
    float: left;
  }
  </style>
  <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>
 
<div id="images"></div>

<script>

$(function(){
    // jQuery('#a-link').remove();   
    
    // jQuery('<img alt="" />').attr('id', 'loader').attr('src', 'ajax-loader.gif').appendTo('#image-container');
    
    //assign your api key equal to a variable
    var apiKey = '8aec6026ae8d9cd7d8d902ea3b56b913';
    var userID = '129706517@N07'
    var url = 'http://api.flickr.com/services/rest/?&method=flickr.people.getPhotos&api_key=' + apiKey + '&photoset_id=' + userID;
    
    //the initial json request to flickr
    //to get your latest public photos, use this request: http://api.flickr.com/services/rest/?&amp;method=flickr.people.getPublicPhotos&amp;api_key=' + apiKey + '&amp;user_id=29096781@N02&amp;per_page=15&amp;page=2&amp;format=json&amp;jsoncallback=?
    $.getJSON(url+'&per_page=500', {
        tags: "caring",
        tagmode: "any",
        format: "json"
    })
    .done(function(data) {
        $.each(data.items, function(i,item) {
            $("<img>").attr("src", item.media.m).appendTo("#images");
            if (i===100) {
                return false;
            }
        });
    });
});
</script>

</body>
</html>

    // function(data){
 
    //     //if the image has tags
    //     if(data.photo.tags.tag != '') {
 
    //     //create an empty array to contain all the tags
    //     var tagsArr = new Array();
 
    //     //for each tag, run this function
    //     $.each(data.photo.tags.tag, function(j, item){
 
    //         //push each tag into the empty 'tagsArr' created above
    //         tagsArr.push('<a href="http://www.flickr.com/photos/tags/' + item._content + '">' + item.raw + '</a>');
 
    //         });
 
    //         //turn the tags array into a string variable
    //         var tags = tagsArr.join(', ');
    //     }

//          //assign hover actions to each image
// $('.image-container').live('mouseover', function(){
//     $(this).children('div').attr('class', 'image-info-active');
// });
// $('.image-container').live('mouseout', function(){
//     $(this).children('div').attr('class', 'image-info');
// });