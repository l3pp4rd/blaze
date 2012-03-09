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

  blaze.fn = blaze.prototype = {
    constructor: blaze,
    paper: null,
    init: function(paper) {
      this.paper = paper;
      return this;
    },
    findOneBy: function(key, value) {
      var result, match;
      this.paper.forEach(function(el) {
        if (typeof key == 'object') {
          match = true;
          for (i in key) {
            if (key.hasOwnProperty(i)) {
              if (!matches(el.data(i), key[i])) {
                match = false;
                break;
              }
            }
          }
          if (match) {
            result = el;
            return false;
          }
        } else if (matches(el.data(key), value)) {
            result = el;
            return false;
        }
      });
      return result;
    },
    findAllBy: function(key, value) {
      var st = this.paper.set(), match;
      this.paper.forEach(function(el) {
        if (typeof key == 'object') {
          match = true;
          for (i in key) {
            if (key.hasOwnProperty(i)) {
              if (!matches(el.data(i), key[i])) {
                match = false;
                break;
              }
            }
          }
          if (match) {
            st.push(el);
          }
        } else if (matches(el.data(key), value)) {
            st.push(el);
        }
      });
      return st;
    },
    findOneByAttr: function(key, value) {
      var result, match;
      this.paper.forEach(function(el) {
        if (typeof key == 'object') {
          match = true;
          for (i in key) {
            if (key.hasOwnProperty(i)) {
              if (!matches(el.attr(i), key[i])) {
                match = false;
                break;
              }
            }
          }
          if (match) {
            result = el;
            return false;
          }
        } else if (matches(el.attr(key), value)) {
            result = el;
            return false;
        }
      });
      return result;
    },
    findAllByAttr: function(key, value) {
      var st = this.paper.set(), match;
      this.paper.forEach(function(el) {
        if (typeof key == 'object') {
          match = true;
          for (i in key) {
            if (key.hasOwnProperty(i)) {
              if (!matches(el.attr(i), key[i])) {
                match = false;
                break;
              }
            }
          }
          if (match) {
            st.push(el);
          }
        } else if (matches(el.attr(key), value)) {
            st.push(el);
        }
      });
      return st;
    }
  };
  blaze.fn.init.prototype = blaze.fn;
  return blaze;
})();

