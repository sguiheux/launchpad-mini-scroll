const char = require('./characters');
const char4 = require('./characters4');
module.exports = {
    displayText: function(pad, text, color, speed, loop) {
        matrix = buildTextMatrix(text);
        index = 0;
        currentLoop = 0;

        bufferConf = {
            write: 0,
            read: 1,
        };

        loopInterval = setInterval(() => {
            // finish
            if (currentLoop > loop && loop !== -1) {
                clearInterval(loopInterval);
            }

            // calculate new matrix to display
            let idx = index%matrix[0].length;
            if (idx === 0) {
                currentLoop++;
            }
            currentMatrix = getMatrixInterval(matrix.slice(), idx);

            // reset write buffer
            pad.reset(0);
            pad.col(color, pad.fromPattern(currentMatrix));

            // buffer switch
            switchBuffer(bufferConf);
            index++;
        }, speed);
    },
    displayZone1: function (pad, text, color, speed, loop) {
        text = text.toLowerCase();
        let matrix = buildTextMatrixForZone(text);

        index = 0;
        currentLoop = 0;
        loopInterval = setInterval(() => {
            // finish
            if (currentLoop > loop && loop !== -1) {
                clearInterval(loopInterval);
            }

            // calculate new matrix to display
            let idx = index%matrix[0].length;
            if (idx === 0) {
                currentLoop++;
            }
            currentMatrix = getMatrixIntervalZone(matrix.slice(), idx);

            // reset write buffer
            resetZone1(pad);
            displayZone1(pad, color, currentMatrix);

            index++;
        }, speed);
    },

    displayZone2: function (pad, text, color, speed, loop) {
        text = text.toLowerCase();
        let matrix = buildTextMatrixForZone(text);

        index = 0;
        currentLoop = 0;
        loopInterval = setInterval(() => {
            // finish
            if (currentLoop > loop && loop !== -1) {
                clearInterval(loopInterval);
            }

            // calculate new matrix to display
            let idx = index%matrix[0].length;
            if (idx === 0) {
                currentLoop++;
            }
            currentMatrix = getMatrixIntervalZone(matrix.slice(), idx);

            // reset write buffer
            resetZone2(pad);
            displayZone2(pad, color, currentMatrix);

            index++;
        }, speed);
    }
};

function resetZone1(pad) {
    for (var i=0; i<8;i++) {
        pad.col(pad.off, [i, 0]);
        pad.col(pad.off, [i, 1]);
        pad.col(pad.off, [i, 2]);
        pad.col(pad.off, [i, 3]);
    }
}

function resetZone2(pad) {
    for (var i=0; i<8;i++) {
        pad.col(pad.off, [i, 4]);
        pad.col(pad.off, [i, 5]);
        pad.col(pad.off, [i, 6]);
        pad.col(pad.off, [i, 7]);
    }
}

function displayZone1(pad, color, matrix) {
    for (var i=0; i<4;i++) {
        let data = matrix[i];
        for (var j=0; j<8; j++) {
            if (data[j] === 'x') {
                pad.col(color, [j, i]);
            }
        }
    }

}

function displayZone2(pad, color, matrix) {
    for (var i=0; i<4;i++) {
        let data = matrix[i];
        for (var j=0; j<8; j++) {
            if (data[j] === 'x') {
                pad.col(color, [j, i+4]);
            }
        }
    }
}

function buildTextMatrixForZone(text) {
    text = text.toLowerCase();
    matrix = ['', '', '', '', '', '', '', ''];
    for (let i=0; i<text.length; i++) {
        let letter = char4.get(text[i]);
        if (!letter) {
            letter = char4.get('space');
        }
        for (let j=0; j<letter.length; j++) {
            matrix[j] +=letter[j];
        }
    }
    return matrix;
}

function buildTextMatrix(text) {
    text = text.toLowerCase();
    matrix = ['', '', '', '', '', '', '', ''];
    for (let i=0; i<text.length; i++) {
        let letter = char.get(text[i]);
        if (!letter) {
            letter = char.get('space');
        }
        for (let j=0; j<letter.length; j++) {
            matrix[j] +=letter[j];
        }
    }
    return matrix;
}

function switchBuffer(conf) {
    let read = conf.write;
    conf.write = conf.read;
    conf.read = read;
}

function getMatrixIntervalZone(matrix, index) {
    lenghtLeft = matrix[0].substr(index).length;
    if (lenghtLeft < 8) {
        matrix[0] += matrix[0].substr(0, (8 - lenghtLeft));
        matrix[1] += matrix[1].substr(0, (8 - lenghtLeft));
        matrix[2] += matrix[2].substr(0, (8 - lenghtLeft));
        matrix[3] += matrix[3].substr(0, (8 - lenghtLeft));

    }
    newMatrix = [
        matrix[0].substr(index, 8),
        matrix[1].substr(index, 8),
        matrix[2].substr(index, 8),
        matrix[3].substr(index, 8)
    ];
    return newMatrix;
}

function getMatrixInterval(matrix, index) {
    lenghtLeft = matrix[0].substr(index).length;
    if (lenghtLeft < 8) {
        matrix[0] += matrix[0].substr(0, (8 - lenghtLeft));
        matrix[1] += matrix[1].substr(0, (8 - lenghtLeft));
        matrix[2] += matrix[2].substr(0, (8 - lenghtLeft));
        matrix[3] += matrix[3].substr(0, (8 - lenghtLeft));
        matrix[4] += matrix[4].substr(0, (8 - lenghtLeft));
        matrix[5] += matrix[5].substr(0, (8 - lenghtLeft));
        matrix[6] += matrix[6].substr(0, (8 - lenghtLeft));
        matrix[7] += matrix[7].substr(0, (8 - lenghtLeft));

    }
    newMatrix = [
        'c0 ' + matrix[0].substr(index, 8),
        'c1 ' + matrix[1].substr(index, 8),
        'c2 ' + matrix[2].substr(index, 8),
        'c3 ' + matrix[3].substr(index, 8),
        'c4 ' + matrix[4].substr(index, 8),
        'c5 ' + matrix[5].substr(index, 8),
        'c6 ' + matrix[6].substr(index, 8),
        'c7 ' + matrix[7].substr(index, 8)
    ];
    return newMatrix;
}

