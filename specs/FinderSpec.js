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
});
