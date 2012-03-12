/**
 * Blaze is a small helper library for RaphaelJs >= 2.0
 * It helps to organize and fetch elements as sets based
 * on their specific attributes.
 *
 * @author Gediminas Morkevicius <gediminas.morkevicius@gmail.com>
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
var blaze = (function() {
  // initializer, example is taken from jQuery
  var blaze = function(paper) {
    if (paper instanceof Raphael._Paper === false) {
      throw "Paper must be an instance of Raphael paper, element.paper etc";
    }
    // create a finder instance
    return new blaze.fn.init(paper);
  };

  /**
   * Tests $actual against $required returns
   * true if both matches. $required can be a RegExp
   * if testing a string
   *
   * @param mixed $actual
   * @param mixed $required - can be a RegExp if matching a string
   * @returns Boolean
   */
  var matches = function(actual, required) {
    if (actual !== undefined) {
      if (typeof required == 'object' && required instanceof RegExp) {
        return typeof actual == 'string' && actual.match(required) !== null;
      }
      return required === actual;
    }
    return false;
  };

  /**
   * Searches the paper for elements based on the given
   * data (attributes or internal element data) defined by
   * $type parameter. $stopAtFirstMatch will stop the iteration
   * if theres at least one match found.
   *
   * @param Raphael._Paper $paper - is the raphaeljs paper
   * @param boolean $stopAtFirstMatch
   * @param string $type - data or attr
   * @param mixed $dataKey - attribute or data key, can be object with a list of attrs
   * @param mixed $dataValue - data or attribute value, not required if $key is an object
   * @returns Raphael.Set - the set of elements matched
   */
  var findBy = function(paper, stopAtFirstMatch, type, dataKey, dataValue) {
    var st = paper.set()
      , data = {}
    ;
    if (typeof dataKey == 'object') {
      data = dataKey;
    } else {
      data[dataKey] = dataValue;
    }

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

  /**
   * Actual blaze prototype
   */
  blaze.fn = blaze.prototype = {
    constructor: blaze,
    paper: null, // Raphael._Paper reference
    init: function(paper) {
      this.paper = paper;
      return this;
    },
    /**
     * Match all paper elements based on $key
     * and $value data parameters.
     *
     * @param mixed $key - attribute or data key, can be object with a list of attrs
     * @param mixed $value - data or attribute value, not required if $key is an object
     * @returns Raphael.Set - the set of elements matched
     */
    findAllByData: function(key, value) {
      return findBy(this.paper, false, 'data', key, value);
    },
    /**
     * Match first paper element based on $key
     * and $value data parameters. Stops at first match.
     *
     * @param mixed $key - attribute or data key, can be object with a list of attrs
     * @param mixed $value - data or attribute value, not required if $key is an object
     * @returns Raphael.Set - the empty set or with element matched
     */
    findFirstByData: function(key, value) {
      return findBy(this.paper, true, 'data', key, value);
    },
    /**
     * Match all paper elements based on $key
     * and $value attribute parameters.
     *
     * @param mixed $key - attribute or data key, can be object with a list of attrs
     * @param mixed $value - data or attribute value, not required if $key is an object
     * @returns Raphael.Set - the set of elements matched
     */
    findAllByAttr: function(key, value) {
      return findBy(this.paper, false, 'attr', key, value);
    },
    /**
     * Match first paper element based on $key
     * and $value data parameters. Stops at first match
     *
     * @param mixed $key - attribute or data key, can be object with a list of attrs
     * @param mixed $value - data or attribute value, not required if $key is an object
     * @returns Raphael.Set - the empty set or with element matched
     */
    findFirstByAttr: function(key, value) {
      return findBy(this.paper, true, 'attr', key, value);
    }
  };
  blaze.fn.init.prototype = blaze.fn;
  return blaze;
})();

