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

    $('input[name="commit"]').click(function(event) {
        event.preventDefault();

        //this returns [input#username, context: document, selector: "#username", jquery: "1.10.2",
        //constructor: function, init: function…]
        var $username = $('#username');
        //by making this variable a .val() it just returns what is inserted
        var $username = $username.val()

        //we are making our api request to instagram and inserting the $username into the user_search request
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
                 console.log($arr)
                 _.each($arr, function(i) {
                    // console.log(i)
                    //these will be the variables that will be taken from our object
                    var $name = i['full_name']
                    var $id = i['id']
                    var $picture = i['profile_picture']
                    // console.log($picture);
                    // console.log($name);
                    // console.log($id);

                    $('#pics').append('<div id="' + $id + '">' +
                                      $name + '</br>' +
                                      '<a href="#">' +
                                      '<img src=' + '"' + $picture + '"' + '/>'+
                                      '</a>' +
                                      '</div>')
                        //======================================================
                        //lets try and make an event delegate to target the image picked
                        $('#pics').on('click', '#' + $id, function(event) {
                          event.preventDefault();
                          var target = event.target;
                          console.log($id)
                          console.log(target)
                          //==========================================================================
                          //we will inject the $id into our next ajax request to retrieve a users feed
                          $.ajax({
                          type: "GET",
                          dataType: "jsonp",
                          cache: false,
                          url: "https://api.instagram.com/v1/users/" + $id + "/media/recent?access_token=27050376.1fb234f.c8dd4da64a6944778a88d8f47725683c",
                          success: function(parsed_json) {
                            // console.log(parsed_json)
                            var $info = parsed_json.data;
                            //this is an array with objects
                            console.log($info)
                            //=====================================================
                            // _.each($info, function(obj) {
                            //     // console.log(obj)
                            //     var $cap = obj['caption']['text']
                            //     var $img = obj['images']['low_resolution']['url']
                            //     var $comments = obj['comments'].data
                            //     _.each($comments, function(text) {
                            //         console.log(text)
                            //         var $show = text['text']
                            //         $('#images').append('<div>' + $show + '</br>' + '</div>')
                            //     })

                            //     console.log($comments)
                            //     console.log($img)
                            //     $('#images').append('<div>' +
                            //                         $cap + '</br>' +
                            //                         '<img src=' + '"' +
                            //                         $img + '"' + '/>' + '</br>' +
                            //                         $comments + '</br>' +
                            //                         '</div>')

                            // })

                        }
                    });// end of our user recent media request
                        })

                 })

             }
        });// end of our initial user search ajax request

    })

})
