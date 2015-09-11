module.exports = function(opts) {
  return function(deck) {
    var KEY_SP = 32, KEY_PGUP = 33, KEY_PGDN = 34, KEY_END = 35, KEY_HME = 36,
        KEY_LT = 37, KEY_UP = 38, KEY_RT = 39, KEY_DN = 40,
      isHorizontal = opts !== 'vertical',
      isModifierPressed = function(e) {
        return !!(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey);
      },
      onKeydown = function(e) {
        if (e.which === KEY_SP) {
          if (!e.ctrlKey && !e.altKey && !e.metaKey) return e.shiftKey ? deck.prev() : deck.next();
        }
        else if (e.which === KEY_PGDN ||
            (isHorizontal && e.which === KEY_RT) ||
            (!isHorizontal && e.which === KEY_DN)) {
          if (!isModifierPressed(e)) deck.next();
        }
        else if (e.which === KEY_PGUP ||
            (isHorizontal && e.which === KEY_LT) ||
            (!isHorizontal && e.which === KEY_UP)) {
          if (!isModifierPressed(e)) deck.prev();
        }
        else if (e.which === KEY_END) {
          var last = deck.slides.length - 1;
          if (deck.slide() !== last && !isModifierPressed(e)) deck.slide(last);
        }
        else if (e.which === KEY_HME) {
          if (deck.slide() !== 0 && !isModifierPressed(e)) deck.slide(0);
        }
      };

    deck.on('destroy', function() {
      document.removeEventListener('keydown', onKeydown, false);
    });
    document.addEventListener('keydown', onKeydown, false);
  };
};
