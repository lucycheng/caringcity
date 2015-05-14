$(function(){
    // jQuery('#a-link').remove();   
    
    // jQuery('<img alt="" />').attr('id', 'loader').attr('src', 'ajax-loader.gif').appendTo('#image-container');
    
    //assign your api key equal to a variable

    //do "or" for cities, "and" for cities and 

    //enlarge images in general

    // gray out other images when one is clicked


  var info = "";
  var tagArray = [];
  var locations = ["Paris", "Glasgow", "New York City", "Berlin", "Barcelona", "Istanbul", "Boston", "Lima"];
  var locationArray = [];

  testing(tagArray, 'any');

  $(document).on("click", ".like", function () {  
    $(this).toggleClass("like_toggle");
    console.log("toggled like");

    $(this).children('img').toggleClass("img_toggle");
    console.log("toggled img");
    $(this).children('.hover').toggleClass("hover_toggle");

    console.log("toggled hover");
    console.log(this);

    $(this).find('.description').toggleClass("description_toggle");
    $(this).find('.tags').toggleClass("tags_toggle");
    console.log("toggled tags and desc");

  });

  var buttonTags = ["Paris", "Glasgow", "New York City", "Berlin", "Barcelona", "Istanbul", "Boston", "Lima", "caring", "uncaring", "transportation", "mobility", "public space", "health", "well being", "communication", "culture", "housing", "work", "learning", "relationship to state", "male", "female"];

  for (i = 0; i < buttonTags.length; i++) {
      var string = buttonTags[i].replace(/\s+/g, '');
      $('#buttons').append('<button id=' + string + "> " + buttonTags[i] +"</button>");
  };

  $(document).on("click", '#buttons button', function () {
    $('#images').empty();
    var tag = $(this).attr('id');
    console.log(tag);
    console.log(tagArray);

    // check if the location tag is in the array
      if (tagArray.indexOf(tag) == -1) {

        // if the location tag has a hyphen, remove it
        if (tag.indexOf('-') != -1) {
        tag = tag.replace(/-/g, '');
        }

        // change the button background
        $(this).css({'background-color' :'white',
                      'color' : 'black',
                      'border': '1px solid black'
                    });
        tagArray.push(tag);
        console.log(tagArray);

        if (isLocation(tag)) {
          testing(tagArray, 'any')
        } else {
        testing(tagArray, 'all');
        }
      }
        else {
        removeTag(this);
        $(this).css({'background-color' :'#345',
                      'color' : 'white',
                      'border': 'none'
                  });
        testing(tagArray);
      }
  });



  // $(document).on("click", '#buttons button', function () {
  //   $('#images').empty();
  //   var tag = $(this).attr('id');
  //   console.log(tag);
  //   console.log(tagArray);
  //   // check if the tag is in the array in general
  //   if (tagArray.indexOf(tag) == -1) {

  //     // is it a location tag?
  //     if (isLocation(tag)) {

  //       //if so, remove hyphen if necessary
  //       if (tag.indexOf('-') != -1) {
  //         tag = tag.replace(/-/g, '');
  //       }

  //     locationArray.push(tag);
  //     console.log(locationArray);

  //     $(this).css({'background-color' :'white',
  //                 'color' : 'black',
  //                 'border': '1px solid black'
  //     });

  //       if (locationArray.length < 2) {
  //           tagArray.push(tag);
  //           console.log(tagArray);
  //           testing(tagArray);
  //         } else {
  //           console.log(locationArray.length);
  //           var length = locationArray.length;
  //             for (var i = 0; i < length; i++) {
  //             var temp = tagArray.push(tag);
  //             testing(temp);
  //             temp.removeTag(tag);
  //           }
  //       }
  //     } else {
  //         tagArray.push(tag);
  //         console.log(tagArray);
  //         testing(tagArray);
  //     } 
  //   }
  //   else {
  //     removeTag(this);
  //     $(this).css({'background-color' :'#345',
  //                      'color' : 'white',
  //                      'border': 'none'
  //                  });
  //     testing(tagArray);
  //   }
  // }


// check to see if the tag exists in the current array
// and prime it in any case 

function isLocation (tag) {
  if (locations.indexOf(tag) != -1) {
    return true;
  }
  return false;
}


function removeTag (object) {
      var index = tagArray.indexOf(object.id);
      tagArray.splice(index, 1);
      console.log(tagArray);
}

function testing (info, input) {
    var apiKey = '8aec6026ae8d9cd7d8d902ea3b56b913';
    var userId = '129706517@N07';
    var tag = info;
    var perPage = '500';
    var showOnPage = '500';
    var extras = 'tags%2C+description';
    var parameter = input;
    console.log(tag + "within testing");
    
    $.getJSON('https://api.flickr.com/services/rest/?format=json&method='+
        'flickr.photos.search&api_key=' + apiKey + '&user_id=' + userId + 
        '&tags=' + tag + '&tag_mode=' + parameter + '&extras=' + extras + '&per_page=' + perPage + '&jsoncallback=?', 
    function(data){
        
        $.each(data.photos.photo, function(i, rPhoto){

            addingLike(rPhoto, 'images');
           var width = $('img').attr('width');
        console.log(width);
        $('.hover').attr('width', width);
        });
    });
  };
});

function addingLike(item, place){
  // the below code creates all the different
  // elements for the each of the likes

  var temp= item;
  var obj= document.createElement('div');
  obj.className= "like";
  var title = document.createElement('div');
  var photo= document.createElement("IMG");
  var info = document.createElement("div");
  var button = document.createElement("span");
  var desc = document.createElement('div');
  var content = document.createElement('p');
  title.className = "tags";
  desc.className = "description";
  info.className = "hover";
  button.className = "expand";

  // the below creates the code for populating the 
  // likes elements with information (title, # of likes, link to like)
   title.innerHTML= "TAGS: " + temp.tags;
   var content = JSON.stringify(temp.description);

   var trim = content.substring(12);
   if (trim.length == 3) {
    trim = "This picture does not currently have a description.";
   }

   if (trim.indexOf('}') != -1) {
    trim = trim.substring(0, trim.length-1);
   }


   desc.innerHTML = "DESCRIPTION: " + trim;
   content.innerHTML = "CONTENT: " + temp.content;

  var basePhotoURL = 'http://farm' + temp.farm + '.static.flickr.com/'
            + temp.server + '/' + temp.id + '_' + temp.secret;  

   photo.src = basePhotoURL + "_z.jpg";

   info.appendChild(title);
   info.appendChild(desc);
   // info.appendChild(content);
   obj.appendChild(photo);
   obj.appendChild(info);

  document.getElementById(place).appendChild(obj);


}