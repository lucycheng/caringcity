$.getJSON("http://api.flickr.com/services/feeds/groups_pool.gne?id=
998875@N22âŒ©=en-us&amp;format=json&amp;jsoncallback=?", displayImages);

function displayImages(data) {

    // Start putting together the HTML string
    var htmlString = "";
    
    // Now start cycling through our array of Flickr photo details
    $.each(data.items, function(i,item){
    
        // I only want the ickle square thumbnails
        var sourceSquare = (item.media.m).replace("_m.jpg", "_s.jpg");
        
        // Here's where we piece together the HTML
        htmlString += '<li><a href="' + item.link + '" target="_blank">';
        htmlString += '<img title="' + item.title + '" src="' + sourceSquare;
        htmlString += '" alt="'; htmlString += item.title + '" />';
        htmlString += '</a></li>
        ';
    
    });
    
    // Pop our HTML in the #images DIV
    $('#images').html(htmlString);
    
    // Close down the JSON function call
}