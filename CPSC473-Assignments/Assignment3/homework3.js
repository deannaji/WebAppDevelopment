// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
/*globals _ */

//1:)
//Exercise 1:
var exercise1 = function(n) {
    "use strict";
    var sum = 0;
    n.forEach(function(element) {
        sum = sum + element;
    });
    return sum / n.length;
};
///////////////////////////////////


//Exercise 2:
var exercise2 = function(n) {
    "use strict";
    var largest = 0;
    n.forEach(function(element) {
        if (element > largest) {
            largest = element;
        }
    });
    return largest;
};
///////////////////////////////////


//Exercise 3:
var exercise3 = function(n) {
    "use strict";
    var even = false;
    n.forEach(function(element) {
        if (element % 2 === 0) {
            even = true;
        }
    });
    return even;
};
////////////////////////////////


//Exercise 4:
var exercise4 = function(n) {
    "use strict";
    var allEven = true;
    n.forEach(function(element) {
        if (element % 2 > 0) {
            allEven = false;
        }
    });
    return allEven;
};
///////////////////////////////


//Exercise 5:
var arrayContains = function(strs, str) {
    "use strict";
    var contained = false;
    strs.forEach(function(element) {
        if (element === str) {
            contained = true;
        }
    });
    return contained;
};
///////////////////////////////


//Exercise 6-a:
var arrayContainsTwo = function(strs, str) {
    "use strict";
    var contained = false,
        count = 0;
    strs.forEach(function(element) {
        if (element === str) {
            count++;
        }
    });
    if (count >= 2) {
        contained = true;
    }
    return contained;
};
///////////////////////////////


//Exercise 6-b:
var arrayContainsThree = function(strs, str) {
    "use strict";
    var contained = false,
        count = 0;
    strs.forEach(function(element) {
        if (element === str) {
            count++;
        }
    });
    if (count >= 3) {
        contained = true;
    }
    return contained;
};
//////////////////////////////



//Exercise 6-c:
var arrayContainsNTimes = function(strs, str, times) {
    "use strict";
    var contained = false,
        count = 0;
    strs.forEach(function(element) {
        if (element === str) {
            count++;
        }
    });
    if (count === times) {
        contained = true;
    }
    return contained;
};
////////////////////////////


//2:)

//Underscore.js-exercise2:
var underscoreLargest = function(n) {
    "use strict";
    var largest = _.max(n, function(num) {
        return num;
    });
    return largest;
};
///////////////////////////


//Underscore.js-exercise3:
var underscoreEvenNum = function(n) {
    "use strict";
    var isEven = false,
        even = _.find(n, function(num) {
            return num % 2 === 0;
        });
    if (even > 0) {
        isEven = true;
    }
    return isEven;
};
///////////////////////////

//Underscore.js-exercise4:
var underscoreEvens = function(n) {
    "use strict";
    var allEven = _.every(n, function(num) {
        return num % 2 === 0;
    });
    return allEven;
};
//////////////////////////


//Main function:
var main = function() {
    "use strict";
    $(".exercise1 p").text(exercise1([1, 2, 4, 7]));
    $(".exercise2 p").text(exercise2([1, 3, 4, 2, 1, 4, 2, 3, 1]));
    $(".exercise3 p").text(exercise3([1, 3, 5, 7, 8]));
    $(".exercise4 p").text(exercise4([2, 4, 6, 8, 10]));
    $(".exercise5 p").text(arrayContains(["hello", "world"], "hello"));
    $(".exercise6a p").text(arrayContainsTwo(["a", "b", "c", "a", "d", "c"], "c"));
    $(".exercise6b p").text(arrayContainsThree(["a", "b", "c", "a", "d", "a", "c"], "a"));
    $(".exercise6c p").text(arrayContainsNTimes(["a", "b", "c", "a", "d", "a", "c"], "d", 2));
    //Underscore:
    $(".underscore2 p").text(underscoreLargest([1, 5, 3, 2, 4]));
    $(".underscore3 p").text(underscoreEvenNum([1, 2, 3, 5, 7]));
    $(".underscore4 p").text(underscoreEvens([2, 4, 6, 8, 10]));
};
$(document).ready(main);
