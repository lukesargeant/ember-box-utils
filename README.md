# Ember-box-utils

An Ember Addon providing a utility class for resolving a variety of box operations.

## Quick start

Install ember-box-utils from the command line.

```
ember install ember-box-utils
```

Import Box into the file that will use it.

```
import Box from 'ember-box-utils/utils/box';
```

Create a box.

```
let myBox = new Box({
  top: 50,
  left: 50,
  bottom: 100,
  right: 100
});

// or...

let myBox = Box.fromElement(Ember.$('.my-element'));
```

Perform chainable operations on the box.

```
myBox.grow(10).transform([30, 40]).crop(anotherBox);
```

Get useful information from the box.

```
import { CORNER } from 'ember-box-utils/utils/box';

myBox.pointAt(CORNER.TOP_LEFT); // e.g. [75, 125]
```

## API
### Constants
* EDGE.LEFT
* EDGE.TOP
* EDGE.BOTTOM
* EDGE.RIGHT
* CORNER.TOP_LEFT
* CORNER.TOP_RIGHT
* CORNER.BOTTOM_LEFT
* CORNER.BOTTOM_RIGHT

### Properties
* top
* left
* bottom
* right

### Methods
* clone()
* width()
* height()
* midX()
* midY()
* pointAt(edgeOrCorner)
* grow(amount)
* shrink(amount)
* translate([x, y])
* pointTo(edgeOrCorner, [x, y])
* constrain({ top, left, bottom, right })
* crop({ top, left, bottom, right })
* canContain(Box)

### Static Methods
* fromElement(DOMElement)

## Implementation details

Truth is represented by top, left bottom and right values, operations either
read or perform transforms on these. Top and left values are offsets from an
origin. Bottom and right values are also offsets from origin, unlike DOM style.

Box is not an ember object, so you can't use get/set nor can you listen to box
values in computed properties or observers at this time.

## Roadmap

Here's a brain dump of additional features that may be worth implementing.

* applyToElement - Apply the box's position and sizing to a given DOM element with given (optional) unit.
* toString - Return a human readable value representing the boxes state.
* expand - Expand this box to fit a given box. Return this.
* intersection - Return a box representing the intersection of this and a given box or null.
* difference - Return an array of boxes representing the difference between this and another box.
* union - Return an array of boxes representing the addition of this and a given box.
* subtract - Return an array of boxes representing the shape after a given box is subtracted.
* alternative - ember object implementation to support get/set/observers/computeds.

## How to contribute

* `git clone` this repository
* `npm install`
* `bower install`

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
