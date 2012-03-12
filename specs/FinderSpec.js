describe('Blaze element finder', function() {
  var paper;

  beforeEach(function() {
    this.addMatchers({
      toContainElementWithName: function(name) {
        var elementSet = this.actual
          , found = false
        ;
        elementSet.forEach(function(el) {
          if (el.data('name') === name) {
            found = true;
            return false;
          }
        });
        return found;
      }
    });
    if (paper !== undefined) {
      // clear the paper before each iteration
      paper.clear();
      paper.remove();
    }
    // initial raphael paper
    paper = Raphael('drawing', 300, 200);
    // draw few shapes
    paper.rect(10, 10, 280, 180).attr('stroke', 'black').data('name', 'rect-outer');
    paper.rect(40, 40, 120, 80).attr('stroke', 'red').data('name', 'rect-inner');
    paper.circle(90, 90, 20).attr({stroke: 'red', fill: 'blue'}).data('name', 'circle');
  });

  it('should be able to find elements by attribute', function() {
    var elementSet = blaze(paper).findAllByAttr('stroke', 'red');
    expect(elementSet.length).toEqual(2);
    expect(elementSet).toContainElementWithName('rect-inner');
    expect(elementSet).toContainElementWithName('circle');
  });

  it('should be possible to find elements by specific data', function() {
    var elementSet = blaze(paper).findAllByData('name', 'rect-outer');
    expect(elementSet.length).toEqual(1);
    expect(elementSet).toContainElementWithName('rect-outer');
  });

  it('should be possible to find elements using regular expression', function() {
    var elementSet = blaze(paper).findAllByData('name', /rect-.+/);
    expect(elementSet.length).toEqual(2);
    expect(elementSet).toContainElementWithName('rect-outer');
    expect(elementSet).toContainElementWithName('rect-inner');
  });

  describe('when I draw circles inside rectangles', function() {
    beforeEach(function() {
      blaze(paper).findAllByData('name', /rect-.+/).forEach(function (el) {
        var sz = el.getBBox();
        paper
          .circle(sz.x + 15, sz.y + 15, 10)
          .attr({fill: 'yellow'})
          .data('name', el.data('name')+'.circle')
        ;
      });
    });

    it('should find three circles on the paper', function() {
      var elementSet = blaze(paper).findAllByData('name', /circle$/);
      expect(elementSet.length).toEqual(3);
      expect(elementSet).toContainElementWithName('rect-outer.circle');
      expect(elementSet).toContainElementWithName('rect-inner.circle');
      expect(elementSet).toContainElementWithName('circle');
    });
    describe('when I change three circle stroke-width', function() {
      beforeEach(function() {
        blaze(paper).findAllByData('name', /circle$/).attr('stroke-width', 3);
      });

      it('should be only two yellow circles with same stroke-width', function() {
        var elementSet = blaze(paper).findAllByAttr({
          'stroke-width': 3,
          'fill': 'yellow'
        });
        expect(elementSet.length).toEqual(2);
        expect(elementSet).toContainElementWithName('rect-outer.circle');
        expect(elementSet).toContainElementWithName('rect-inner.circle');
      });

      it('should be possible to find first match only', function() {
        var elementSet = blaze(paper).findFirstByAttr({
          'stroke-width': 3
        });
        expect(elementSet.length).toEqual(1);
      });
    });
  });
});
