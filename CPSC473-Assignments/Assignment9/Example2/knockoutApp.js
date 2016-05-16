/* Assignment9:  Example2 using Knockout JS
   Written by: Dean Naji
   Email: deannaji@csu.fullerton.edu
*/
// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
/*globals ko*/
function ViewModel() {
    "use strict";
    var self = this;
    self.textBoxValue = ko.observable("");

    //data from the server:
    self.availableComments = [{
        comment: "This is the first comment!"
    }, {
        comment: "Here's the second one!"
    }, {
        comment: "And this is one more."
    }, {
        comment: "Here is another one!"
    }];

    //editable data:
    //The list of comments:
    self.comments = ko.observableArray([
        self.availableComments[0],
        self.availableComments[1],
        self.availableComments[2],
        self.availableComments[3]
    ]);
    //operations:
    //adding a comment from the input box to the list of comments:
    self.addComment = function() {
        self.comments.push({
            comment: self.textBoxValue()
        });
        $(".comment-input input").val("");
    };
}


ko.applyBindings(new ViewModel());
