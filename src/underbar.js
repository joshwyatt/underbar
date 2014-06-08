/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  _.negate = function(fn) {
    return function() {
      return !fn.apply(this, arguments);
    };
  }

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === 0 ? [] : n === undefined ? array.slice(-1)[0] : array.slice(n * -1);

  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var k in collection) {
        iterator(collection[k], k, collection)
      }
    }
  }

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var results = [];
    _.each(collection, function (element) {
      if (test(element)) {
        results.push(element);
      }
    });
    return results;
  };

  // Return function that returns the ! of fn passed as argument.
  _.negate = function(fn) {
    return function() {
      return !fn.apply(this, arguments);
    }
  }

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, _.negate(test));
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var items = {};
    return _.reject(array, function(item) {
      var result = item in items;
      items[item] = item;
      return result;
    });
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var results = [];
    _.each(collection, function(item) {
      results.push(iterator(item));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(item) {
      var isFn = typeof functionOrKey == 'function';
      return (isFn ? functionOrKey : item[functionOrKey]).apply(item, args);
    });
  };

  _.invoke = function(collection, fok, args) {
    return _.map(collection, function(item) {
      var isFn = typeof fok === 'function';
      return (isFn ? fok : item[fok]).apply(this, args)
    })
  }

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator === undefined) {
      accumulator = collection.shift();
    }
    _.each(collection, function(item) {
      accumulator = iterator(accumulator, item);
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (typeof iterator !== 'function') {
      iterator = _.identity;
    }
    return _.reduce(collection, function(wasTrue, item) {
      if (!wasTrue) {
        return false;
      }
      return !!iterator(item);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (typeof iterator !== 'function') {
      iterator = _.identity;
    }
    return !_.every(collection, _.negate(iterator));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(objectArg) {
      _.each(objectArg, function(value, key) {
        obj[key] = value;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(objectArg) {
      _.each(objectArg, function(value, key) {
        if (!(key in obj)) {
          obj[key] = value;
        }
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    return function(arg) {
      func.results = func.results || {};
      return func.results[arg] !== undefined ? 
        func.results[arg] :
        func.results[arg] = func.call(this, arg);
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var storedArgs = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      func.apply(this, storedArgs);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var result = array.slice();
    var dice = function() {
      return Math.floor(Math.random() * array.length);
    }
    _.each(array, function(item) {
      var tempStorage;
      tempStorage = result.splice(dice(), 1)[0];
      result.push(tempStorage);
    });
    return result;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.

  _.sortBy = function(collection, iterator) {
    return collection.sort(function(a, b) {
      return typeof iterator === 'string' ?
        a[iterator] - b[iterator] :
        iterator(a) - iterator(b);
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var len = Math.max.apply(null, _.pluck(arguments, 'length'));
    var results = [];
    for (var i = 0; i < len; i++) {
      results.push(_.pluck(arguments, i));
    }
    return results;
  };

  // Returns whether or not an object is an Array.
  _.isArray = function(obj) {
    return Array.isArray(obj);
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || [];
    _.each(nestedArray, function(item) {
      _.isArray(item) ? _.flatten(item, result) : result.push(item);
    });
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    return _.reduce(arguments, function(results, array) {
      return _.filter(results, function(resultsItem) {
        return _.some(array, function(arrayItem) {
          return resultsItem === arrayItem;
        });
      });
    }, arguments[0]);
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments, 1);
    return _.reduce(args, function(results, array) {
      return _.filter(results, function(resultsItem) {
        return !(_.some(array, function(arrayItem) {
          return (resultsItem === arrayItem);
        }));
      });
    }, arguments[0]);
  };

  _.now = function() {
    return Date.now();
  }


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var lastInvoke = 0;
    var invokeLater = function() {
      lastInvoke = _.now();
      result = func.apply(context, args);
    };
    return function() {
      context = this;
      args = arguments;
      var untilInvokeLater = wait - (_.now() - lastInvoke);
      if (untilInvokeLater <= 0) {
        clearInterval(timeout);
        lastInvoke = _.now();
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(invokeLater, untilInvokeLater);
      }
      return result;
    };
  };

}).call(this);
