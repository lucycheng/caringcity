<html>
<head>
  <meta charset="utf-8">

  <title> Road Trip</title>

  <link rel="stylesheet" href="am3.css">
    
 <script type="text/javascript" src="http://code.jquery.com/jquery-2.0.0.min.js"></script>
 

<script>
//shorthand for $(document).ready(function(){
$(function(){
 
    //Append an empty grid with id="pics" to the gallery page content.
    $("<div>").attr("id", "pics").attr("class", "ui-grid-b").appendTo('#gallery [data-role="content"]');
 
    //attach search button click handler
    $("#searchbutton").click(function() { 
        //remove previous images from previous search
        $("#pics").empty();
    
        //query the Flickr API
        var url = "http://api.flickr.com/services/rest/?method=flickr.people.getPhotos&
            api_key=8aec6026ae8d9cd7d8d902ea3b56b913&user_id=129706517@N07"
        $.getJSON(url,
        {
            tags: $("#tags").val(), 
            format: "json"
        },
        function(data) {
            $.each(data.items, function(i,item){
                //append image to the grid, wrap with a link tag so it's clickable
                $("<img/>").attr("src", item.media.m).appendTo("#pics").wrap("<a href=" + item.link + "></a>");
                if ( i >= 8 ) return false; //display 9 images
            });
        });
 
    });
});

</script>

</head>

<body>

  <div id = "rapper">
    <div id="wrap">
      <input id="places" type="text" name="info" placeholder="where do you want to go?" autocomplete="off">
      <input type="submit" class = "submit" value="submit" id = "submitInfo">
    </div>
  </div>


</body>
</html>