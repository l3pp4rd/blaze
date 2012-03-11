# Blaze

Is a small helper library for [Raphaël](http://raphaeljs.com/). Blaze helps
to organize and fetch elements from Raphael paper based on their specific
attributes or internal data properties.

## Usage

Include the **blaze.js** file in your project. This example will create some very basic
drawings to show the actual functionality.

``` html
<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="vendor/raphael/raphael-min.js"></script>
    <script type="text/javascript" src="src/blaze.js"></script>
</head>
<body>
    <div id="drawing"></div>

<script type="text/javascript">

(function() {

// initialize raphael paper as a rectangle
var paper = Raphael('drawing', 300, 200);
// draw few shapes
paper.rect(10, 10, 280, 180).attr('stroke', '#000').data('name', 'rect-outer');
paper.rect(40, 40, 120, 80).attr('stroke', '#f00').data('name', 'rect-inner');
paper.circle(90, 90, 20).attr({stroke: '#f00', fill: 'blue'}).data('name', 'circle');

})();
</script>
</body>
</html>
```

**NOTE:** Raphael 2.0 or higher version is required.

After adding these shapes, we can now use the **blaze** to change or extract specific
elements from the paper.

### Fetch elements using a RegExp

Find all rects starting by name regular expression pattern **rect.+** and change the stroke-width

``` js
blaze(paper).findAllByData('name', /rect.+/).attr({'stroke-width': 5});
```

### Fetching by attributes

Find all elements stroked with **red** color and draw yellow circles inside

``` js
blaze(paper).findAllByAttr('stroke', '#f00').forEach(function(el) {
    // get the box of the actual element
    var sz = el.getBBox();
    // draw a circle inside
    el.paper
        .circle(sz.x + 25, sz.y + 15, 10)
        .attr({fill: 'yellow'})
        .data('name', el.data('name')+'.circle')
    ;
});
```

It helps a lot to manage or change the effects on specific shapes, without messing the code.

