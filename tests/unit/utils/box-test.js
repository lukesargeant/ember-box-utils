/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import Box from 'ember-box-utils/utils/box';

const expectAt = function(box, top, left, bottom, right) {
  expect(box.top, `Top should equal ${top}`).to.equal(top);
  expect(box.right, `Right should equal ${right}`).to.equal(right);
  expect(box.bottom, `Bottom should equal ${bottom}`).to.equal(bottom);
  expect(box.left, `Left should equal ${left}`).to.equal(left);
};

const isPhantomJS = function() {
  return window.navigator.userAgent.indexOf('PhantomJS') >= 0;
};

describe('Box', function() {
  describe('Given a box constructed with no args', function() {
    beforeEach(function() {
      this.box = new Box();
    });

    it('defaults to 0, 0, 0, 0', function() {
      expectAt(this.box, 0, 0, 0, 0);
    });
  });

  describe('Given a box constructed with an empty object', function() {
    beforeEach(function() {
      this.box = new Box({});
    });

    it('defaults to 0, 0, 0, 0', function() {
      expectAt(this.box, 0, 0, 0, 0);
    });
  });

  describe('Given a box constructed at top=50, left=50, bottom=100, right=100', function() {
    beforeEach(function() {
      this.box = new Box({ top: 50, left: 50, bottom: 100, right: 100 });
    });

    it('should have top=50, left=50, bottom=100, right=100', function() {
      expectAt(this.box, 50, 50, 100, 100);
    });

    it('should have width=50', function() {
      expect(this.box.width()).to.equal(50);
    });

    it('should have height=50', function() {
      expect(this.box.height()).to.equal(50);
    });

    it('should have midX=75', function() {
      expect(this.box.midX()).to.equal(75);
    });

    it('should have midY=75', function() {
      expect(this.box.midY()).to.equal(75);
    });

    it('should report point at top left as [50, 50]', function() {
      expect(this.box.pointAt('top left')).to.deep.equal([50, 50]);
    });

    it('should report point at top right as [100, 50]', function() {
      expect(this.box.pointAt('top right')).to.deep.equal([100, 50]);
    });

    it('should report point at bottom left as [50, 100]', function() {
      expect(this.box.pointAt('bottom left')).to.deep.equal([50, 100]);
    });

    it('should report point at bottom right as [100, 100]', function() {
      expect(this.box.pointAt('bottom right')).to.deep.equal([100, 100]);
    });

    it('should report point at top as [75, 50]', function() {
      expect(this.box.pointAt('top')).to.deep.equal([75, 50]);
    });

    it('should report point at left as [50, 75]', function() {
      expect(this.box.pointAt('left')).to.deep.equal([50, 75]);
    });

    it('should report point at bottom as [75, 100]', function() {
      expect(this.box.pointAt('bottom')).to.deep.equal([75, 100]);
    });

    it('should report point at right as [100, 75]', function() {
      expect(this.box.pointAt('right')).to.deep.equal([100, 75]);
    });

    it('should create clones with the same properties', function() {
      const clone = this.box.clone();
      expect(clone).to.not.equal(this.box);
      expectAt(clone, 50, 50, 100, 100);
    });

    it('should determine whether it can contain a given box', function() {
      const clone = this.box.clone();
      const smaller = new Box({ top: 60, left: 60, bottom: 90, right: 90 });
      const bigger = new Box({ top: 40, left: 40, bottom: 110, right: 110 });

      expect(this.box.canContain(clone), 'Clone should report containable').to.be.true;
      expect(this.box.canContain(smaller), 'Smaller box should report containable').to.be.true;
      expect(this.box.canContain(bigger), 'Bigger box should not report containable').to.be.false;
    });

    describe('When grown by 10', function() {
      beforeEach(function() {
        this.box.grow(10);
      });

      it('should have top=40, left=40, bottom=110, right=110', function() {
        expectAt(this.box, 40, 40, 110, 110);
      });
    });

    describe('When shrunk by 10', function() {
      beforeEach(function() {
        this.box.shrink(10);
      });

      it('should have top=40, left=40, bottom=110, right=110', function() {
        expectAt(this.box, 60, 60, 90, 90);
      });
    });

    describe('when translated [10, 10]', function() {
      beforeEach(function() {
        this.box.translate([10, 10]);
      });

      it('should have top=60, left=60, bottom=110, right=110', function() {
        expectAt(this.box, 60, 60, 110, 110);
      });
    });

    describe('when point \'top left\' translated to [100, 100]', function() {
      beforeEach(function() {
        this.box.pointTo('top left', [100, 100]);
      });

      it('should have top=100, left=100, bottom=150, right=150', function() {
        expectAt(this.box, 100, 100, 150, 150);
      });
    });

    describe('when point \'top right\' translated to [100, 100]', function() {
      beforeEach(function() {
        this.box.pointTo('top right', [100, 100]);
      });

      it('should have top=100, left=50, bottom=150, right=100', function() {
        expectAt(this.box, 100, 50, 150, 100);
      });
    });

    describe('when point \'bottom left\' translated to [100, 100]', function() {
      beforeEach(function() {
        this.box.pointTo('bottom left', [100, 100]);
      });

      it('should have top=50, left=100, bottom=100, right=150', function() {
        expectAt(this.box, 50, 100, 100, 150);
      });
    });

    describe('when point \'bottom right\' translated to [100, 100]', function() {
      beforeEach(function() {
        this.box.pointTo('bottom right', [100, 100]);
      });

      it('should have top=50, left=50, bottom=100, right=100', function() {
        expectAt(this.box, 50, 50, 100, 100);
      });
    });

    describe('when point \'top\' translated to [100, 100]', function() {
      beforeEach(function() {
        this.box.pointTo('top', [100, 100]);
      });

      it('should have top=100, left=75, bottom=150, right=125', function() {
        expectAt(this.box, 100, 75, 150, 125);
      });
    });

    describe('when point \'left\' translated to [100, 100]', function() {
      beforeEach(function() {
        this.box.pointTo('left', [100, 100]);
      });

      it('should have top=75, left=100, bottom=125, right=150', function() {
        expectAt(this.box, 75, 100, 125, 150);
      });
    });

    describe('when point \'bottom\' translated to [100, 100]', function() {
      beforeEach(function() {
        this.box.pointTo('bottom', [100, 100]);
      });

      it('should have top=50, left=75, bottom=100, right=125', function() {
        expectAt(this.box, 50, 75, 100, 125);
      });
    });

    describe('when point \'right\' translated to [100, 100]', function() {
      beforeEach(function() {
        this.box.pointTo('right', [100, 100]);
      });

      it('should have top=75, left=50, bottom=125, right=100', function() {
        expectAt(this.box, 75, 50, 125, 100);
      });
    });

    describe('when constrained top=70', function() {
      beforeEach(function() {
        this.box.constrain({ top: 70 });
      });

      it('should have top=70, left=50, bottom=120, right=100', function() {
        expectAt(this.box, 70, 50, 120, 100);
      });
    });

    describe('when constrained left=70', function() {
      beforeEach(function() {
        this.box.constrain({ left: 70 });
      });

      it('should have top=50, left=70, bottom=100, right=120', function() {
        expectAt(this.box, 50, 70, 100, 120);
      });
    });

    describe('when constrained bottom=80', function() {
      beforeEach(function() {
        this.box.constrain({ bottom: 80 });
      });

      it('should have top=30, left=50, bottom=80, right=100', function() {
        expectAt(this.box, 30, 50, 80, 100);
      });
    });

    describe('when constrained right=80', function() {
      beforeEach(function() {
        this.box.constrain({ right: 80 });
      });

      it('should have top=50, left=30, bottom=100, right=80', function() {
        expectAt(this.box, 50, 30, 100, 80);
      });
    });

    describe('when constrained top=70 left=70 bottom=80 right=80', function() {
      beforeEach(function() {
        this.box.constrain({ top: 70, left: 70, bottom: 80, right: 80 });
      });

      it('should have top=30, left=30, bottom=80, right=80', function() {
        expectAt(this.box, 30, 30, 80, 80);
      });
    });

    describe('when cropped top=70 left=70 bottom=80 right=80', function() {
      beforeEach(function() {
        this.box.crop({ top: 70, left: 70, bottom: 80, right: 80 });
      });

      it('should have top=70, left=70, bottom=80, right=80', function() {
        expectAt(this.box, 70, 70, 80, 80);
      });
    });
  });

  describe('Given a box created from a dom element', function() {
    beforeEach(function() {
      var element = document.createElement('div');
      element.style = 'position: fixed; top: 10px; left: 10px; width: 20px; height: 20px;';
      // PhantomJS does not fully support getBoundingClientRect - used by the implementation.
      if (!isPhantomJS()) {
        document.body.appendChild(element);
      }
      this.box = Box.fromElement(element);
      this.testElement = element;
    });

    afterEach(function() {
      if (!isPhantomJS()) {
        document.body.removeChild(this.testElement);
      }
    });

    it('should have dimensions equal to the element', function() {
      // PhantomJS does not fully support getBoundingClientRect - used by the implementation.
      if (isPhantomJS()) {
        expectAt(this.box, 0, 0, 0, 0);
      } else {
        expectAt(this.box, 10, 10, 30, 30);
      }
    });
  });

  describe('Given a box created from the window', function() {
    beforeEach(function() {
      this.box = Box.fromElement(window);
    });

    it('should have dimensions equal to the window', function() {
      expectAt(this.box, 0, 0, window.innerHeight, window.innerWidth);
    });
  });
});
