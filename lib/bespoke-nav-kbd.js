module.exports = function() {
  return function(deck) {
    var KEY_SB = 32, KEY_PGUP = 33, KEY_PGDN = 34, KEY_END = 35, KEY_HOME = 36, KEY_LFT = 37, KEY_RGT = 39,
      isModifierPressed = function(e, keyCode) {
        return e.ctrlKey || (e.shiftKey && keyCode !== KEY_SB) || e.altKey || e.metaKey;
      },
      onKeydown = function(e) {
        var keyCode = e.which;
        if (isModifierPressed(e, keyCode)) return;
        switch(keyCode) {
          case KEY_SB:
            return e.shiftKey ? deck.prev() : deck.next();
          case KEY_RGT:
          case KEY_PGDN:
            return deck.next();
          case KEY_LFT:
          case KEY_PGUP:
            return deck.prev();
          case KEY_HOME:
            return deck.slide(0);
          case KEY_END:
            return deck.slide(deck.slides.length - 1);
        }
      };
    deck.on('destroy', function() {
      document.removeEventListener('keydown', onKeydown);
    });
    document.addEventListener('keydown', onKeydown);
  };
};
