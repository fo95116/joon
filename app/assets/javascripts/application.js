// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .



$(function () {

  $('#hamburger').click(function(event) {
    document.location.reload();
  })


    $('input[name="commit"]').click(function(event) {
        event.preventDefault();

        //this returns [input#username, context: document, selector: "#username", jquery: "1.10.2",
        //constructor: function, init: function…]
        var $username = $('#username');
        //by making this variable a .val() it just returns what is inserted
        var $username = $username.val();


        // we are making a conditional to make sure that ther is a value submitted to our ajax request
        if($username == "") {
          // we determined that our value is empty. Append an error message
          $('#errors').append('<h2>Error!</h2>');
          // after the user has had time to read the message reload the page
          setTimeout(function(){
            //reload the page
            document.location.reload();
          }, 2000)
        // we will submit our logic in this section
        } else {
          // console.log('there is a value in here!');
          //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          //we are making our api request to instagram and inserting the $username into the user_search request
          $('section.padding').hide();
          $.ajax({
               type: "GET",
               dataType: "jsonp",
               cache: false,
               url: "https://api.instagram.com/v1/users/search?q=" + $username + "&access_token=27050376.1fb234f.c8dd4da64a6944778a88d8f47725683c",
               success: function(parsed_json) {
                  // the request return an object with two values. one is an object with metadata and the other
                  // is an array of objects, which are the results of our search
                  // we will only use the parsed_json data to get our desired variables
                   var $arr = parsed_json.data
                   // console.log($arr)
                   // console.log(parsed_json)
                   _.each($arr, function(i) {
                      // console.log(i)
                      //these will be the variables that will be taken from our object
                      var $name = i['full_name']
                      var $id = i['id']
                      var $picture = i['profile_picture']
                      // console.log($picture);
                      // console.log($name);
                      // console.log($id);

                      $('#pics').append('<div class="column_3" id="' + $id + '">' +
                                        '<h5>' + $name + '</h5>' + '</br>' +
                                        '<a href="#">' +
                                        '<img src=' + '"' + $picture + '"' +
                                        'class="responsive rounded margin-bottom"' + '/>'+
                                        '</a>' +
                                        '</div>')
                          //======================================================
                          //lets try and make an event delegate to target the image picked
                          $('#pics').on('click', '#' + $id, function(event) {
                            event.preventDefault();
                            var target = event.target;
                            // console.log($id)
                            // console.log(target)
                            //==========================================================================
                            //we will inject the $id into our next ajax request to retrieve a users feed
                            $('#pics').empty();
                            $('#user').append('<h1>' + $name + '</h1>')
                            $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            cache: false,
                            url: "https://api.instagram.com/v1/users/" + $id + "/media/recent?access_token=27050376.1fb234f.c8dd4da64a6944778a88d8f47725683c",
                            success: function(parsed_json) {
                              // console.log(parsed_json)
                              var $info = parsed_json.data;
                              //this is an array with objects
                              // console.log($info)
                              //=====================================================
                              _.each($info, function(obj) {
                                  // console.log(obj)
                                  // var $cap = obj['caption']['text']
                                  var $img = obj['images']['low_resolution']['url']
                                  var $comments = obj['comments'].data
                                  var $p_id = obj['id']
                                  // _.each($comments, function(text) {
                                  //     console.log(text)
                                  //     var $show = text['text']
                                  //     $('#images').append('<div>' + $show + '</br>' + '</div>')
                                  // })
                                  console.log($name)
                                  console.log($p_id);
                                  // console.log($comments)
                                  // console.log($img)
                                  $('#images').append('<div class="column_4" id="' + $p_id + '">' +
                                                      '<a href="#" data-tuktuk-modal="a" data-tip="Map the comments for this image!">' +
                                                      '<img src=' + '"' +
                                                      $img + '"' + '/>' +
                                                      '</a>' +
                                                      '</div>')
                                  // we got our image pics working and stuff
                                  // ======================================================
                                  // create our second delegate to make our final view with the pic and comments
                                  $('#images').on('click', '#' + $p_id, function(event) {
                                    event.preventDefault();
                                    var tar = event.target;

                                    $('#images').empty();
                                    //this is where we will parse our $comments array and pick out the text
                                    //a conditional to determine if our $comments array has objects
                                    if(typeof $comments !== 'undefined' && $comments.length > 0){
                                      // console.log($comments)
                                      //comments is an array with objects that house my text data
                                      var $results = [];
                                      $('#final').append('<img src="' + $img + '"/>')
                                      TukTuk.Modal.show("a")
                                      _.each($comments, function(txt) {
                                        // this section is where we have our comments as sentances
                                        // we must split our sentances into words and push them into an array
                                        // split $text into $word and push into $results
                                        var $text = txt['text'];

                                        $text = $text.trim().split(/\s+/);


                                        // console.log($text)
                                        $results.push($text);

                                      })

                                      $results = _.flatten($results);

                                      console.log($results)
                                      //============================ d3!!!!!!!!!!!!!!!!!=================
                                      // conditional to map words that are less than 10 with a different layout
                                      if($results.length >= 1 && $results.length <= 10 ) {
                                        var fill = d3.scale.category20();

                                        d3.layout.cloud().size([306, 306])
                                            .words($results.map(function(d) {
                                              return {text: d, size: 32 + Math.random() * 30};
                                            }))
                                            .padding(.25)
                                            .rotate(function(d) { return ~~(Math.random() * 2) ; })
                                            .font("Lobster Two")
                                            .fontSize(function(d) { return d.size; })
                                            .on("end", draw)
                                            .start();

                                        function draw(words) {
                                          d3.select("#final").append("svg")
                                              .attr("width", 306)
                                              .attr("height", 306)
                                            .append("g")
                                              .attr("transform", "translate(150,150)")
                                            .selectAll("text")
                                              .data(words)
                                            .enter().append("text")
                                              .style("font-size", function(d) { return d.size + "px"; })
                                              .style("font-family", "Lobster Two")
                                              .style("fill", function(d, i) { return fill(i); })
                                              .attr("text-anchor", "middle")
                                              .attr("transform", function(d) {
                                                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                                              })
                                              .text(function(d) { return d.text; });
                                        }
                                        console.log($results.length)
                                        console.log('this array is small')
                                      } else if($results.length >= 11 && $results.length <= 20) {
                                        var fill = d3.scale.category20();

                                        d3.layout.cloud().size([306, 306])
                                            .words($results.map(function(d) {
                                              return {text: d, size: 25 + Math.random() * 60};
                                            }))
                                            .padding(.25)
                                            .rotate(function(d) { return ~~(Math.random() * 2) * 90; })
                                            .font("Impact")
                                            .fontSize(function(d) { return d.size; })
                                            .on("end", draw)
                                            .start();

                                        function draw(words) {
                                          d3.select("#final").append("svg")
                                              .attr("width", 306)
                                              .attr("height", 306)
                                            .append("g")
                                              .attr("transform", "translate(150,150)")
                                            .selectAll("text")
                                              .data(words)
                                            .enter().append("text")
                                              .style("font-size", function(d) { return d.size + "px"; })
                                              .style("font-family", "Impact")
                                              .style("fill", function(d, i) { return fill(i); })
                                              .attr("text-anchor", "middle")
                                              .attr("transform", function(d) {
                                                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                                              })
                                              .text(function(d) { return d.text; });
                                        }
                                        console.log($results.length)
                                        console.log('this array is medium')
                                      } else if($results.length >= 21) {
                                        var fill = d3.scale.category20();

                                        d3.layout.cloud().size([306, 306])
                                            .words($results.map(function(d) {
                                              return {text: d, size: 10 + Math.random() * 75};
                                            }))
                                            .padding(0.15)
                                            .rotate(function(d) { return ~~(Math.random() * 4) * 45; })
                                            .font("Lobster Two")
                                            .fontSize(function(d) { return d.size; })
                                            .on("end", draw)
                                            .start();

                                        function draw(words) {
                                          d3.select("#final").append("svg")
                                              .attr("width", 306)
                                              .attr("height", 306)
                                            .append("g")
                                              .attr("transform", "translate(150,150)")
                                            .selectAll("text")
                                              .data(words)
                                            .enter().append("text")
                                              .style("font-size", function(d) { return d.size + "px"; })
                                              .style("font-family", "Lobster Two")
                                              .style("fill", function(d, i) { return fill(i); })
                                              .attr("text-anchor", "middle")
                                              .attr("transform", function(d) {
                                                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                                              })
                                              .text(function(d) { return d.text; });
                                        }
                                        console.log($results.length)
                                        console.log('this array is big')
                                      }
                                    $('#b').click(function(event) {
                                      event.preventDefault;
                                      TukTuk.Modal.hide("b")
                                    })
                                      //================================================================
                                    } else {

                                      $('#false').append('<h1>Sorry there are no comments for this image.</h1>')
                                        setTimeout(function(){
                                        //reload the page
                                        document.location.reload();
                                        }, 3000)
                                    }


                                  })



                              })

                          }
                      });// end of our user recent media request
                          })

                   })

               }
          });// end of our initial user search ajax request
        }// end of our value conditional to determine that there is a value in our form
    })

})