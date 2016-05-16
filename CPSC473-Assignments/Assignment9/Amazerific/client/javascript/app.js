/* Assignment9:  Amazeriffic website using Knockout JS
   Written by: Dean Naji
   Email: deannaji@csu.fullerton.edu
*/
// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
/*globals ko*/
var main = function(toDoObjects) {
    "use strict";
    console.log("SANITY CHECK");


    function ViewModel() {
        var self = this;

        //poputing data from the server to self.todoList:
        self.todoList = toDoObjects;

        //editable content:
        self.todosArray = ko.observableArray([]);
        self.tagsArray = ko.observableArray([]);
        self.singleDescription = ko.observable();
        self.showAdding = ko.observable(false);
        self.descriptionBox = ko.observable("");
        self.tagsBox = ko.observable("");

        //operations:
        self.addNewTodo = function() {
            var found = 0;
            self.todoList.forEach(function(element) {
                if (element.description === self.descriptionBox()) {
                    found = 1;
                    element.tags.push(self.tagsBox());
                }
            });
            if (found === 0) {
                //Not found..
                self.todoList.push({
                    description: self.descriptionBox(),
                    tags: [self.tagsBox()]
                });
            }
            //posting new todo item to the server using ajax:
            $.post("http://localhost:3000/todos", {
                "description": self.descriptionBox(),
                "tags": [self.tagsBox()]
            });
        };

        for (var i = self.todoList.length - 1; i >= 0; i--) {
            self.todosArray.push(self.todoList[i]);
        }

        //The Newest tab:
        self.newest = function() {
            $(".tabs a span").removeClass("active");
            $(".tabs a:nth-child(1) span").addClass("active");
            self.tagsArray([]);
            self.todosArray([]);
            self.showAdding(false);
            for (var i = self.todoList.length - 1; i >= 0; i--) {
                self.todosArray.push(self.todoList[i]);
            }

        };

        //The oldest tab:
        self.oldest = function() {
            $(".tabs a span").removeClass("active");
            $(".tabs a:nth-child(2) span").addClass("active");
            //clearing the view from prev data:
            self.tagsArray([]);
            self.todosArray([]);
            self.showAdding(false);
            self.todoList.forEach(function(element) {
                self.todosArray.push(element);
            });
        };

        //The tags tab:
        self.tags = function() {
            $(".tabs a span").removeClass("active");
            $(".tabs a:nth-child(3) span").addClass("active");
            self.todosArray([]);
            self.showAdding(false);
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
            tagObjects.forEach(function(element) {
                self.tagsArray.push(element);
                element.toDos.forEach(function(desc) {
                    self.singleDescription = desc;
                });
            });

        };

        //the Adding tab:
        self.add = function() {
            $(".tabs a span").removeClass("active");
            $(".tabs a:nth-child(4) span").addClass("active");
            self.tagsArray([]);
            self.todosArray([]);
            self.showAdding(true);

        };
    }

    ko.applyBindings(new ViewModel());
}; //end of main()

$(document).ready(function() {
    "use strict";
    $.getJSON("http://localhost:3000/todos", function(toDoObjects) {
        main(toDoObjects);
    });
});
