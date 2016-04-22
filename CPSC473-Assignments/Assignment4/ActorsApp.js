// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
"use strict";
var main = function() {
    //get the actors data from JSON.db file:
    $.get("http://localhost:3000/actors", function(list) {
        var $actorListItem = $("<div>");
        list.forEach(function(actor) {
            var $container = $("<div>"),
                $star = $("<i>"),
                $element = $("<span>"),
                $person = $("<i>");

            $container.addClass("mdl-list__item");
            $star.addClass("material-icons");
            $star.attr("id", actor.id);
            $element.text(actor.name);
            $person.addClass("material-icons mdl-list__item-avatar");
            $person.text("person");
            $("input").val("");
            $container.append($person);
            $container.append($element);
            $container.append($star);

            if (actor.starred) {
                $star.text("star");
            } else {
                $star.text("star_border");
            }

            $actorListItem.append($container);

            //Star click event:
            $star.on("click", function() {
                var idNum = $star.attr("id");
                if ($star.text() === "star") {
                    $star.text("star_border");
                    $.ajax({
                        type: "PUT",
                        url: "http://localhost:3000/actors/" + idNum,
                        data: {
                            "id": idNum,
                            "name": $element.text(),
                            "starred": false
                        }
                    });
                } else {
                    $star.text("star");
                    $.ajax({
                        type: "PUT",
                        url: "http://localhost:3000/actors/" + idNum,
                        data: {
                            "id": idNum,
                            "name": $element.text(),
                            "starred": true
                        }
                    });
                }
            });

        });
        $("#mainList").append($actorListItem);
    });



    //Button click event:
    var $input = $("input");
    var $button = $("button");
    $button.on("click", function() {
        var $id = 0;
        //calculate current ID:
        $.get("http://localhost:3000/actors", function(list) {
            $id = list.length;
            $id = $id + 1;
            //Posting new data to JSON file:
            if ($input.val() !== "") {
                $.post("http://localhost:3000/actors", {
                    "id": $id,
                    "name": $input.val(),
                    "starred": false
                });
            }
        });
    });

};
$(document).ready(main);
