const Launchpad = require('launchpad-mini'),
    pad = new Launchpad();
const char = require('../launchpad-mini-scroll');
pad.connect().then(() => {
    //char.displayText(pad, 'abcdefghijklmnopqrstuvwxyz', pad.red.full, 100, 1);

    //char.displayZone1(pad, 'coucouA', pad.red.full, 100, -1);
    char.displayZone2(pad, 'cava', pad.red.full, 100, -1);
});