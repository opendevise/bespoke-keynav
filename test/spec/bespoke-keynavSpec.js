Function.prototype.bind = Function.prototype.bind || require('function-bind');

var simulant = require('simulant'),
  bespoke = require('bespoke'),
  keynav = require('../../lib/bespoke-keynav.js'),
  forms = require('bespoke-forms');

describe("bespoke-keys", function() {
  var deck,
    inputBox = null,
    createDeck = function(opts) {
      var parent = document.createElement('article');
      for (var i = 1; i <= 5; i++) {
        var slide = document.createElement('section');
        if (i === 1) {
          inputBox = document.createElement('input');
          inputBox.type = 'text';
          slide.appendChild(inputBox);
        }
        parent.appendChild(slide);
      }

      deck = bespoke.from(parent, [
        keynav(opts),
        forms()
      ]);
    },
    destroyDeck = function() {
      deck.fire('destroy');
      var parentNode = deck.parent.parentNode;
      if (parentNode) {
        parentNode.removeChild(deck.parent);
      }
      deck = null;
    },
    pressKey = function(which, isShift, element) {
      simulant.fire((element || document), 'keydown', { which: which, shiftKey: !!isShift });
    };

  describe("horizontal deck", function() {
    [undefined, 'horizontal'].forEach(function (opts) {
      describe("with an option value of '" + opts + "'", function() {
        beforeEach(createDeck.bind(null, opts));
        afterEach(destroyDeck);

        describe("next slide", function() {
          it("should go to the next slide when pressing the space bar", function() {
            pressKey(32);
            expect(deck.slide()).toBe(1);
          });

          it("should go to the next slide when pressing the right arrow", function() {
            pressKey(39);
            expect(deck.slide()).toBe(1);
          });

          it("should go to the next slide when pressing page down", function() {
            pressKey(34);
            expect(deck.slide()).toBe(1);
          });

          it("should not go to the next slide when pressing the right arrow with shift pressed", function() {
            pressKey(39, true);
            expect(deck.slide()).toBe(0);
          });

          it("should not go to the next slide when pressing the space bar in an input field", function() {
            pressKey(32, false, inputBox);
            expect(deck.slide()).toBe(0);
          });
        });

        describe("previous slide", function() {
          beforeEach(function() { deck.slide(1); });

          it("should go to the previous slide when pressing the left arrow", function() {
            pressKey(37);
            expect(deck.slide()).toBe(0);
          });

          it("should go to the previous slide when pressing page up", function() {
            pressKey(33);
            expect(deck.slide()).toBe(0);
          });

          it("should go to the previous slide when pressing the shift and space bar", function() {
            pressKey(32, true);
            expect(deck.slide()).toBe(0);
          });

          it("should not go to the previous slide when pressing the left arrow with shift pressed", function() {
            pressKey(37, true);
            expect(deck.slide()).toBe(1);
          });

          it("should not go to the previous slide when pressing the shift and space bar in an input field", function() {
            pressKey(32, true, inputBox);
            expect(deck.slide()).toBe(1);
          });
        });

        describe("last slide", function() {
          beforeEach(function() { deck.slide(2); });

          it("should go to the first slide when pressing home", function() {
            pressKey(36);
            expect(deck.slide()).toBe(0);
          });
        });

        describe("first slide", function() {
          it("should go to the last slide when pressing end", function() {
            pressKey(35);
            expect(deck.slide()).toBe(deck.slides.length - 1);
          });
        });
      });
    });
  });

  describe("vertical deck", function() {
    beforeEach(createDeck.bind(null, 'vertical'));
    afterEach(destroyDeck);

    describe("next slide", function() {
      it("should go to the next slide when pressing the space bar", function() {
        pressKey(32);
        expect(deck.slide()).toBe(1);
      });

      it("should go to the next slide when pressing the down arrow", function() {
        pressKey(40);
        expect(deck.slide()).toBe(1);
      });

      it("should go to the next slide when pressing page down", function() {
        pressKey(34);
        expect(deck.slide()).toBe(1);
      });
    });

    describe("previous slide", function() {
      beforeEach(function() { deck.slide(1); });

      it("should go to the previous slide when pressing the up arrow", function() {
        pressKey(38);
        expect(deck.slide()).toBe(0);
      });

      it("should go to the previous slide when pressing page up", function() {
        pressKey(33);
        expect(deck.slide()).toBe(0);
      });

      it("should go to the previous slide when pressing the shift and space bar", function() {
        pressKey(32, true);
        expect(deck.slide()).toBe(0);
      });
    });
  });
});
