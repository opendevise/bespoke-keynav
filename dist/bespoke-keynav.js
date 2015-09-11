/*!
 * bespoke-keynav v1.0.0-dev
 *
 * Copyright 2015, Dan Allen
 * This content is released under the MIT license
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.bespoke||(g.bespoke = {}));g=(g.plugins||(g.plugins = {}));g.keynav = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});