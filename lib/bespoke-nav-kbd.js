module.exports = function() {
  return function(deck) {
    var KEY_SB = 32, KEY_PGUP = 33, KEY_PGDN = 34, KEY_END = 35, KEY_HME = 36,
        KEY_LT = 37, KEY_RT = 39, KEY_H = 72, KEY_L = 76, KEYDOWN = 'keydown',
      isModifierPressed = function(e, keyCode) {
        return e.ctrlKey || (e.shiftKey && (keyCode === KEY_HME || keyCode === KEY_END)) || e.altKey || e.metaKey;
      },
      onKeydown = function(e) {
        if (!isModifierPressed(e, e.which)) {
          switch(e.which) {
            case KEY_SB: return deck[e.shiftKey ? 'prev' : 'next']();
            case KEY_RT: case KEY_PGDN: case KEY_L: return e.shiftKey ? deck.slide(deck.slide() + 1) : deck.next();
            case KEY_LT: case KEY_PGUP: case KEY_H: return e.shiftKey ? deck.slide(deck.slide() - 1) : deck.prev();
            case KEY_HME: return deck.slide(0);
            case KEY_END: return deck.slide(deck.slides.length - 1);
          }
        }
      };
    deck.on('destroy', function() {
      document.removeEventListener(KEYDOWN, onKeydown);
    });
    document.addEventListener(KEYDOWN, onKeydown);
  };
};
