const Launchpad = require('launchpad-mini'),
    pad = new Launchpad();
const char = require('../launchpad-mini-scroll');
pad.connect().then(() => {
    char.displayText(pad, 'abcdefghijklmnopqrstuvwxyz', pad.red.full, 100, 1);
});