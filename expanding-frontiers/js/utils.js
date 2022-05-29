/* Audio stuff */

var AudioManager = function () {
};

AudioManager.prototype.playSoundByName = function (name, time) {
    if (time == undefined) {
        time = 0;
    }
    if (name in this) {
        playSound(this[name], time, function () {
            finishPlayingSound(name);
        }, name);
    } else {
        console.log("ERROR: sound " + name + " not available!")
    }
}

AudioManager.prototype.loadSound = function (name, url) {
    var name = name.toString();
    var soundMap = {}
    soundMap[name] = url
    loadSounds(this, soundMap, function () {
        audio_manager.playSoundByName(name);
    });
}

AudioManager.prototype.stopAllBufferNodes = function () {
    for (var key in TIMERS) {
        clearTimeout(TIMERS[key]);
    }
    TIMERS = [];
    for (var key in BUFFER_NODES) {
        var node = BUFFER_NODES[key];
        if (node !== undefined) {
            BUFFER_NODES[key].node.stop();
            finishPlayingSound(BUFFER_NODES[key].sound_id);
        }
        BUFFER_NODES = [];
    }
}

/* Distance measures */

function computeEuclideanDistance(p1x, p1y, p2x, p2y) {
    return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
}

function computeEuclideanDistance3d(p1x, p1y, p1z, p2x, p2y, p2z) {
    return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2) + Math.pow(p2z - p1z, 2));
}

function logInfo(text) {
    document.getElementById('info_placeholder').innerHTML += "<div>" + text + "</div>";
}

function logInfoWithProgressBar(id, text, value) {
    if (!!document.getElementById(id)) {
        document.getElementById(id).innerHTML = " " + value + "%";
    } else {
        document.getElementById('info_placeholder').innerHTML += `<div style="display: inline-flex;">${text} <div id='${id}'> ${value}%</div></div><br>`
    }
}

function extractMaximumDifferenceInLatentSpace() {
    for (let i = 0; i < sampleValuesInLatentSpace.length; i++) {

    }
}

// Returns Uint8Array of WAV bytes
function getWavBytes(buffer, options) {
    const type = options.isFloat ? Float32Array : Uint16Array
    const numFrames = buffer.byteLength / type.BYTES_PER_ELEMENT

    const headerBytes = getWavHeader(Object.assign({}, options, {numFrames}))
    const wavBytes = new Uint8Array(headerBytes.length + buffer.byteLength);

    // prepend header, then add pcmBytes
    wavBytes.set(headerBytes, 0)
    wavBytes.set(new Uint8Array(buffer), headerBytes.length)

    return wavBytes
}

// adapted from https://gist.github.com/also/900023
// returns Uint8Array of WAV header bytes
function getWavHeader(options) {
    const numFrames = options.numFrames
    const numChannels = options.numChannels || 2
    const sampleRate = options.sampleRate || 44100
    const bytesPerSample = options.isFloat ? 4 : 2
    const format = options.isFloat ? 3 : 1

    const blockAlign = numChannels * bytesPerSample
    const byteRate = sampleRate * blockAlign
    const dataSize = numFrames * blockAlign

    const buffer = new ArrayBuffer(44)
    const dv = new DataView(buffer)

    let p = 0

    function writeString(s) {
        for (let i = 0; i < s.length; i++) {
            dv.setUint8(p + i, s.charCodeAt(i))
        }
        p += s.length
    }

    function writeUint32(d) {
        dv.setUint32(p, d, true)
        p += 4
    }

    function writeUint16(d) {
        dv.setUint16(p, d, true)
        p += 2
    }

    writeString('RIFF')              // ChunkID
    writeUint32(dataSize + 36)       // ChunkSize
    writeString('WAVE')              // Format
    writeString('fmt ')              // Subchunk1ID
    writeUint32(16)                  // Subchunk1Size
    writeUint16(format)              // AudioFormat https://i.stack.imgur.com/BuSmb.png
    writeUint16(numChannels)         // NumChannels
    writeUint32(sampleRate)          // SampleRate
    writeUint32(byteRate)            // ByteRate
    writeUint16(blockAlign)          // BlockAlign
    writeUint16(bytesPerSample * 8)  // BitsPerSample
    writeString('data')              // Subchunk2ID
    writeUint32(dataSize)            // Subchunk2Size

    return new Uint8Array(buffer)
}

/* Colors */

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    // usage: rgbToHex(0, 51, 255); // #0033ff
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/* JSON requests */

function loadJSON(callback, url) {
    logInfo("Querying Freesound.")
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        n_pages_received += 1;
        if (status == 200) {
            logInfo("recieved audios from Freesound.")
            callback(xhr.response);
        } else {
            console.log('Error getting data from Freesound, status code: ' + xhr.status);
        }
    };
    xhr.send();
}

/* Request parameters */

function get_req_param(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

/* Coordinates and mapping from normalised map to display map */

function normCoordsToDisplayCoords(x, y) {

    // First rotate
    x -= center_x;
    y -= center_y;
    var sin = Math.sin(rotation_degrees);
    var cos = Math.cos(rotation_degrees);
    var x_r = x * cos - y * sin;
    var y_r = x * sin + y * cos;
    x_r += center_x;
    y_r += center_y;

    // Then translate
    var x_rt = Math.round(((x_r - center_x) * zoom_factor * disp_scale) + disp_scale / 2 + disp_x_offset);
    var y_rt = Math.round(((y_r - center_y) * zoom_factor * disp_scale) + disp_scale / 2 + disp_y_offset);
    return [x_rt, y_rt];
}

function displayCoordsToNormCoords(x, y) {

    // First translate
    var x_t = ((x - disp_scale / 2 - disp_x_offset) / (zoom_factor * disp_scale)) + center_x;
    var y_t = ((y - disp_scale / 2 - disp_y_offset) / (zoom_factor * disp_scale)) + center_y;

    // Then rotate
    x_t -= center_x;
    y_t -= center_y;
    var sin = Math.sin(rotation_degrees);
    var cos = Math.cos(rotation_degrees);
    var y_tr = (y_t * cos - x_t * sin) / (cos * cos + sin * sin);
    var x_tr = (x_t + y_tr * sin) / cos;
    x_tr += center_x;
    y_tr += center_y;
    return [x_tr, y_tr];
}

/* Access nested object attributes by string */
// Example usage: Object.byString(someObj, 'part3[0].name');
Object.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}