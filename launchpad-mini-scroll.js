const char = require('./bigCharacters');

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
            if (currentLoop > loop) {
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
    }
};

function buildTextMatrix(text) {
    matrix = ['', '', '', '', '', '', '', ''];
    for (let i=0; i<text.length; i++) {
        let letter = char.get(text[i]);
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

function getMatrixInterval(matrix, index) {
    lenghtLeft = matrix[0].substr(index).length;
    console.log(index, matrix[0].length);
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

