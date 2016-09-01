/**
 * A utility class for resolving a variety of box operations.
 * Truth is represented by top, left bottom and right values, operations either
 * read or perform transforms on these.
 * Top and left values are offsets from an origin.
 * Bottom and right values are also offsets from origin, unlike DOM style.
 * @class Box
 */
export default class Box {

  constructor({ top=0, right=0, bottom=0, left=0 }={}) {
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }

  /**
   * Get a new box with the same dimensions as this one.
   * @return {Box}
   */
  clone() {
    return new Box({
      top: this.top,
      left: this.left,
      bottom: this.bottom,
      right: this.right
    });
  }

  /**
   * Returns the width of the box.
   * @return {Number}
   */
  width() {
    return this.right - this.left;
  }

  /**
   * Returns the height of the box.
   * @return {Number}
   */
  height() {
    return this.bottom - this.top;
  }

  /**
   * Returns the horizontal center point of the box.
   * @return {Number}
   */
  midX() {
    return this.left + (this.width() / 2);
  }

  /**
   * Returns the vertical center point of the box.
   * @return {Number}
   */
  midY() {
    return this.top + (this.height() / 2);
  }

  /**
   * Given an edge or corner, returns a point from the box's origin.
   * @param  {String} edgeOrCorner
   * @return {Number[]}
   */
  pointAt(edgeOrCorner) {
    switch (edgeOrCorner) {
      case EDGE.TOP:
        return [this.midX(), this.top];
      case EDGE.LEFT:
        return [this.left, this.midY()];
      case EDGE.BOTTOM:
        return [this.midX(), this.bottom];
      case EDGE.RIGHT:
        return [this.right, this.midY()];
      case CORNER.TOP_LEFT:
        return [this.left, this.top];
      case CORNER.TOP_RIGHT:
        return [this.right, this.top];
      case CORNER.BOTTOM_LEFT:
        return [this.left, this.bottom];
      case CORNER.BOTTOM_RIGHT:
        return [this.right, this.bottom];
    }
  }

  /**
   * Translate each value from the center by the given amount.
   * @param  {Number} amount
   * @return {Box}
   */
  grow(amount) {
    this.top -= amount;
    this.left -= amount;
    this.bottom += amount;
    this.right += amount;
    return this;
  }

  /**
   * Translate each value toward the center by the given amount.
   * @param  {Number} amount
   * @return {Box}
   */
  shrink(amount) {
    this.top += amount;
    this.left += amount;
    this.bottom -= amount;
    this.right -= amount;
    return this;
  }

  /**
   * Move the box by the specified vector.
   * @param  {Number} x horizontal translation
   * @param  {Number} y vertical translation
   * @return {Box}
   */
  translate([x, y]) {
    this.top += y;
    this.left += x;
    this.bottom += y;
    this.right += x;
    return this;
  }

  /**
   * Translate this box by moving a corner or edge to a given point.
   * @param  {String} edgeOrCorner
   * @param  {Number} toX
   * @param  {Number} toY
   * @return {Box}
   */
  pointTo(edgeOrCorner, [toX, toY]) {
    const [x, y] = this.pointAt(edgeOrCorner);
    this.translate([toX - x, toY - y]);
    return this;
  }

  /**
   * If this box escapes the given box, attempt to translate it inside.
   * @param  {Number} top=-Infinity
   * @param  {Number} right=Infinity
   * @param  {Number} bottom=Infinity
   * @param  {Number} left=-Infinity
   * @return {Box}
   */
  constrain({ top=-Infinity, right=Infinity, bottom=Infinity, left=-Infinity }) {
    const topShift = Math.max(this.top, top) - this.top;
    this.top += topShift;
    this.bottom += topShift;

    const leftShift = Math.max(this.left, left) - this.left;
    this.left += leftShift;
    this.right += leftShift;

    const bottomShift = Math.min(this.bottom, bottom) - this.bottom;
    this.bottom += bottomShift;
    this.top += bottomShift;

    const rightShift = Math.min(this.right, right) - this.right;
    this.right += rightShift;
    this.left += rightShift;
    return this;
  }

  /**
   * Crops this box by the given box.
   * @param  {Number} top=-Infinity
   * @param  {Number} right=Infinity
   * @param  {Number} bottom=Infinity
   * @param  {Number} left=-Infinity
   * @return {Box}
   */
  crop({ top=-Infinity, right=Infinity, bottom=Infinity, left=-Infinity }) {
    this.top = Math.max(this.top, top);
    this.left = Math.max(this.left, left);
    this.bottom = Math.min(this.bottom, bottom);
    this.right = Math.min(this.right, right);
    return this;
  }

  /**
   * Whether the given box can fit inside this one.
   * @param  {Box} box
   * @return {Boolean}
   */
  canContain(box) {
    return this.width() >= box.width() && this.height() >= box.height();
  }

  /**
   * Create a box from a DOM Element or the window.
   * @param  {DOMElement} el
   * @return {Box}
   */
  static fromElement(el) {
    if (el === window) {
      return new Box({ top: 0, left: 0, bottom: window.innerHeight, right: window.innerWidth });
    } else {
      const rect = el.getBoundingClientRect();
      return new Box({ top: rect.top, left: rect.left, bottom: rect.bottom, right: rect.right });
    }
  }
}

/**
 * Edges enum.
 * @type {Object}
 */
const EDGE = {
  TOP: 'top',
  LEFT: 'left',
  BOTTOM: 'bottom',
  RIGHT: 'right'
};

/**
 * Corners enum.
 * @type {Object}
 */
const CORNER = {
  TOP_LEFT: 'top left',
  TOP_RIGHT: 'top right',
  BOTTOM_LEFT: 'bottom left',
  BOTTOM_RIGHT: 'bottom right'
};

export { EDGE, CORNER };
