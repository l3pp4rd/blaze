var blaze = (function() {
  // initializer
  var blaze = function(paper) {
    if (paper instanceof Raphael._Paper === false) {
      throw "Paper must be an instance of Raphael paper, element.paper etc";
    }
    return new blaze.fn.init(paper);
  };

  var matches = function(actual, required) {
    if (actual !== undefined) {
      if (typeof required == 'object' && required instanceof RegExp) {
        return typeof actual == 'string' && actual.match(required) !== null;
      }
      return required === actual;
    }
    return false;
  };

  var findBy = function(paper, data, stopAtFirstMatch, type) {
    var st = paper.set();
    paper.forEach(function(el) {
      st.push(el); // assume matches
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          if (type === 'attr') {
            // interigate element attributes
            if (!matches(el.attr(key), data[key])) {
              st.pop(); // remove, match failed
              break;
            }
          } else { // type === 'data' or anything else
            // interigate element data
            if (!matches(el.data(key), data[key])) {
              st.pop(); // remove, match failed
              break;
            }
          }
        }
      }
      if (st.length && stopAtFirstMatch) {
        return false; // return the set with first element found
      }
    });
    return st;
  };

  blaze.fn = blaze.prototype = {
    constructor: blaze,
    paper: null,
    init: function(paper) {
      this.paper = paper;
      return this;
    },
    findAllByData: function(key, value) {
      var data = {};
      if (typeof key == 'object') {
        data = key;
      } else {
        data[key] = value;
      }
      return findBy(
        this.paper,
        data,
        false,
        'data'
      );
    },
    findFirstByData: function(key, value) {
      var data = {};
      if (typeof key == 'object') {
        data = key;
      } else {
        data[key] = value;
      }
      return findBy(
        this.paper,
        data,
        true,
        'data'
      );
    },
    findAllByAttr: function(key, value) {
      var data = {};
      if (typeof key == 'object') {
        data = key;
      } else {
        data[key] = value;
      }
      return findBy(
        this.paper,
        data,
        false,
        'attr'
      );
    },
    findFirstByAttr: function(key, value) {
      var data = {};
      if (typeof key == 'object') {
        data = key;
      } else {
        data[key] = value;
      }
      return findBy(
        this.paper,
        data,
        true,
        'attr'
      );
    }
  };
  blaze.fn.init.prototype = blaze.fn;
  return blaze;
})();

