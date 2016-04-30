/* Assignment8:  Adding real-time notifications to Amazeriffic website
   Written by: Dean Naji
   Email: deannaji@csu.fullerton.edu
*/
// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
/*globals io*/
var main = function(toDoObjects) {
    "use strict";
    //Initializing socket variable and connect it with the socket microservice:
    //var socket = io.connect("http://localhost:8080/");
    //var socket =io();
    console.log("SANITY CHECK");
    var toDos = toDoObjects.map(function(toDo) {
        // we'll just return the description
        // of this toDoObject
        return toDo.description;
    });

/*
    //sockets back from the server:
    socket.on("user post", function() {
        alert("Hey, A post has been added!");
        //updating the data to get the new todo:
        $.getJSON("todos.json", function(newToDoObjects) {
            toDoObjects = newToDoObjects;
            toDos = newToDoObjects.map(function(toDo) {
                return toDo.description;
            });

            var $li = $("<li>").text(toDos[toDos.length - 1]);//the new todo description
            $li.css("display","none");
            var newObj = toDoObjects[toDoObjects.length - 1];
            var $tag = $("<h3>").text(newObj.tags[0]);//the new todo tag
            $tag.css("display","none");

            //this portion of code is to get what tag is active and append the new todo, without any user's interaction:
            $(".tabs a span").toArray().forEach(function(element) {
                var $element = $(element);
                if ($element.hasClass("active")) {
                    //if the newest tab is active:
                    if ($element.parent().is(":nth-child(1)")) {
                        $(".content ul").prepend($li);
                        $li.slideDown("slow");
                    //if the oldest tab is active:
                    } else if ($element.parent().is(":nth-child(2)")) {
                        $(".content ul").append($li);
                        $li.slideDown("slow");
                    //if its the tags tab is active:
                    } else if ($element.parent().is(":nth-child(3)")) {
                        var found = 0;
                        //find if the tag is already there, or its a new tag along with discription:
                        $(".content h3").toArray().forEach(function(hTag) {
                            var $hTag = $(hTag);
                            if ($hTag.text() === newObj.tags[0]) {
                                found++;
                            } else {
                                found = 0;
                            }
                        });
                        if (found === 0) {
                            //if the tag is new:
                            $(".content").append($tag);
                            $tag.slideDown("slow");
                            $(".content").append($li);
                            $li.slideDown("slow");
                        } else {
                            //if the tag is already there:
                            var str = "<h3>" + newObj.tags[0] + "</h3>";
                            $li.after(str);
                            $(".content").append($li);
                            $li.slideDown("slow");
                        }
                    }

                }
            });

        }); //end of getJSON.
    });//end of socket comming back from the server event.
*/

function ViewModel(){
   var self=this;

   //from the server:
   self.todoList =toDoObjects;
   self.tab1tab2= ko.observable(true);
   console.log(self.todoList);

   //editable content:
   self.todosArray= ko.observableArray([]);
   for (var i=self.todoList.length-1; i>=0 ; i--){
     self.todosArray.push(self.todoList[i]);
   }
   //self.todoList.forEach(function(element){
  //    self.todosArray.push(element);
  // });

  //operations:
  self.newest=function(){
    $(".tabs a span").removeClass("active");
    $(".tabs a:nth-child(1) span").addClass("active");
    self.todosArray.removeAll();
    for (var i=self.todoList.length-1; i>=0 ; i--){
      self.todosArray.push(self.todoList[i]);
    }
  };
  self.oldest=function(){
    $(".tabs a span").removeClass("active");
    $(".tabs a:nth-child(2) span").addClass("active");
    self.todosArray.removeAll();
    self.todoList.forEach(function(element){
       self.todosArray.push(element);
    });

  };
  self.tags=function(){
    $(".tabs a span").removeClass("active");
    $(".tabs a:nth-child(3) span").addClass("active");
    self.todosArray.removeAll();
    var tags = [];

    toDoObjects.forEach(function(toDo) {
        toDo.tags.forEach(function(tag) {
            if (tags.indexOf(tag) === -1) {
                tags.push(tag);
            }
        });
    });

    var tagObjects = tags.map(function(tag) {
        var toDosWithTag = [];

        toDoObjects.forEach(function(toDo) {
            if (toDo.tags.indexOf(tag) !== -1) {
                toDosWithTag.push(toDo.description);
            }
        });

        return {
            "name": tag,
            "toDos": toDosWithTag
        };
    });


    tagObjects.forEach(function(tag) {
        var $tagName = $("<h3>").text(tag.name),
            $content = $("<ul>");


        tag.toDos.forEach(function(description) {
            var $li = $("<li>").text(description);
            $content.append($li);
        });
         //self.todosArray.push($($tagName[0]).text());
         //self.todosArray.push($content[0]);
         console.log($tagName[0]);
         console.log($content[0]);
        $("main .content").append($tagName);
        $("main .content").append($content);
    });
  };

  self.add=function(){
    $(".tabs a span").removeClass("active");
    $(".tabs a:nth-child(4) span").addClass("active");
  };
}

ko.applyBindings(new ViewModel());

/*
    $(".tabs a span").toArray().forEach(function(element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function() {
            var $content,
                $input,
                $button,
                i;
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (i = toDos.length - 1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function(todo) {
                    $content.append($("<li>").text(todo));
                });

            } else if ($element.parent().is(":nth-child(3)")) {
                var tags = [];

                toDoObjects.forEach(function(toDo) {
                    toDo.tags.forEach(function(tag) {
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    });
                });

                var tagObjects = tags.map(function(tag) {
                    var toDosWithTag = [];

                    toDoObjects.forEach(function(toDo) {
                        if (toDo.tags.indexOf(tag) !== -1) {
                            toDosWithTag.push(toDo.description);
                        }
                    });

                    return {
                        "name": tag,
                        "toDos": toDosWithTag
                    };
                });


                tagObjects.forEach(function(tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");


                    tag.toDos.forEach(function(description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });

            } else if ($element.parent().is(":nth-child(4)")) {
                var $inputLabel = $("<p>").text("Description: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Tags: ");
                $input = $("<input>").addClass("description");
                $button = $("<span>").text("+");

                $button.on("click", function() {
                    var description = $input.val(),
                        tags = $tagInput.val().split(","),
                        newToDo = {
                            "description": description,
                            "tags": tags
                        };

                    //Socket Emit to server:
                    //socket.emit("user post", "Todos list updated!");

                    //$.post("todos", newToDo, function(result) {
                        //toDoObjects = result;
                        // update toDos
                        toDos = toDoObjects.map(function(toDo) {
                            return toDo.description;
                        });

                        $input.val("");
                        $tagInput.val("");
                    //});
                });


                $content = $("<div>").append($inputLabel)
                    .append($input)
                    .append($tagLabel)
                    .append($tagInput)
                    .append($button);
            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
*/
};//end of main()

$(document).ready(function() {
    "use strict";
    $.getJSON("http://localhost:3000/db", function(toDoObjects) {
        main(toDoObjects);
    });
});
