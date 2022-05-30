/* Global variables and objects */

// Variational Autoencoder stuff
let encoderModel = undefined;
let decoderModel = undefined;
let model;
let sampleValuesInLatentSpace = [];
let sessionId = 0;
let numFiles = 3;
let latentSpaceLoaded = false;
let mu_latent_spaces = [];
let log_variance_latent_spaces = [];
let waveformImages = document.getElementById('waveform')
let idGeneratedAudio = -1;
let waveformAux;

// Audio stuff
let audio_manager = new AudioManager();
let MONO_MODE = true;

// Sounds and content
let default_query = "footstep"
let sounds = [];
let sampledSounds = [];
let extra_descriptors = undefined;
let map_features = undefined;
let n_pages = 3;
let n_pages_received = 0;
let all_loaded = false;
let last_selected_sound_id = undefined;

// t-sne and xy map
let max_tsne_iterations = 500;
let current_it_number = 0;
let epsilon = 10;
let perplexity = 10;
let tsne = undefined;
let max_xy_iterations = 50;
let map_xy_x_max = undefined;
let map_xy_x_min = undefined;
let map_xy_y_max = undefined;
let map_xy_y_min = undefined;

// Canvas and display stuff
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;
let default_point_modulation = 0.6;
let disp_scale = Math.min(w, h);
let center_x = undefined;  // Set in start()
let center_y = undefined;  // Set in start()
let zoom_factor = undefined;  // Set in start()
let rotation_degrees = undefined;  // Set in start()
let min_zoom = 0.2;
let max_zoom = 10;
const PI = Math.PI
const PI2 = 2 * Math.PI

/* Setup and app flow functions */

function start() {


    //Leer audio por defecto para pruebas
    // loadJSON(function (data) {
    // // console.log(data)
    //     console.log("started")
    //     default_audio = data
    //     console.time('spectrogramMateo')
    //     let mcltSpec = spectrogramMateo(default_audio)
    //     console.timeEnd('spectrogramMateo')
    //     mcltspecCut = mcltSpec.slice(0, mcltSpec.length-1);
    //     mcltspecTransposed = mcltspecCut[0].map((_, colIndex) => mcltspecCut.map(row => row[colIndex]));
    //     // console.log(mcltspecTransposed)
    //     let mclt2Dspec = arangeSpectrogram(mcltspecTransposed)
    //     // console.log("Espectrograma chido")
    //     console.log(mclt2Dspec)
    //     // let mclt2Dspec = megadata;
    //     // mclt2Dspec = mclt2Dspec.slice(0, mclt2Dspec.length-1);
    //     // mclt2Dspec = mclt2Dspec[0].map((_, colIndex) => mclt2Dspec.map(row => row[colIndex])); // Transpose array to fit the model
    //
    //
    //     //Decoder step
    //     let tensor = tf.tensor2d(mclt2Dspec, [1024, 64], 'float32');
    //     let [mu_tensor, log_variance_tensor] = encoder_model.predict(tf.reshape(tensor, shape = [1, 1024, 64, 1]));
    //     let mu_latent_space = mu_tensor.dataSync();
    //     let log_variance_latent_space = log_variance_tensor.dataSync();
    //     let latent_space_size = mu_latent_space.length;
    //     // console.log(mu_latent_space)
    //     // console.log(log_variance_latent_space)
    //     // console.log(latent_space_size)
    //
    //     sampleValuesInLatentSpace = []
    //     for (let i = 0; i < latent_space_size; i++) {
    //         //sampleValuesInLatentSpace.push(sampleFromLatentSpace(mu_latent_space[i], log_variance_latent_space[i]));
    //         sampleValuesInLatentSpace.push(mu_latent_space[i]);
    //     }
    //     // console.log(sampleValuesInLatentSpace)
    //
    //     let decoder_tensor = tf.tensor(sampleValuesInLatentSpace);
    //     let predicted_spectogram_tensor = decoder_model.predict(tf.reshape(decoder_tensor, shape = [1, latent_space_size]));
    //     // console.log(predicted_spectogram_tensor)
    //     let predicted_spectrogram = predicted_spectogram_tensor.arraySync()
    //     predicted_spectrogram = predicted_spectrogram[0];
    //     let audio = convertPredictedSpectrogramIntoAudio(predicted_spectrogram);
    //
    //     console.log(audio);
    //     // send audio to GUI
    //
    // }, default_audio_query);
    //
    // return


    //const model = tf.sequential();

    // stop all audio
    audio_manager.stopAllBufferNodes();

    // get map descriptors
    setMapDescriptor();

    // update axis labels
    update_axis_labels();

    // Sounds
    sounds = [];
    sampledSounds = [];
    mu_latent_spaces = [];
    sampleValuesInLatentSpace = [];
    log_variance_latent_spaces = [];
    waveformImages.innerHTML = '';
    n_pages_received = 0;
    all_loaded = false;
    idGeneratedAudio = -1;

    // Canvas
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseOut, false);
    canvas.addEventListener("wheel", onWheel, false);
    center_x = 0.5;
    center_y = 0.5;
    zoom_factor = 1.0;
    rotation_degrees = 0;

    // Display stuff
    if (w >= h) {
        disp_x_offset = (w - h) / 2;
        disp_y_offset = 0.0;
    } else {
        disp_x_offset = 0.0;
        disp_y_offset = (h - w) / 2;
    }
    current_it_number = 0;

    //this is in online mode
    let query = document.getElementById('query_terms_input').value;

    // Search sounds in Freesound and start loading them
    if ((query == undefined) || (query == "")) {
        query = default_query;
    }

    let url = "https://freesound.org/apiv2/search/text/?query=" + query + "&group_by_pack=0" +
        "&filter=duration:[1+TO+2]" + "&page_size=" + numFiles + "&fields=id,previews,name,analysis,url,username,images" +
        "&token=I7j6d2GhKndeNeAcJ4lnihzSpWP0YEQdfF2NSu6e&page=2";

    loadJSON(function (data) {
        load_data_from_fs_json(data);
    }, url);
}

function changeAxisAttribute() {
    all_loaded = false;
    current_it_number = 0;
    setMapDescriptor();
    update_axis_labels();
    center_x = 0.5;
    center_y = 0.5;
    zoom_factor = 1.0;
    rotation_degrees = 0;
}

window.requestAnimFrame = (function () { // This is called when code reaches this point
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// Add the number of variables in latent space to html select tag items
function initLantentSpaceVariableSelector(latentSpaceDimension) {
    let xSelector = document.getElementById('x_axis_map_descriptors_selector');
    let ySelector = document.getElementById('y_axis_map_descriptors_selector');
    for (let i = 1; i <= latentSpaceDimension; i++) {
        let optX = document.createElement('option');
        optX.value = String(i);
        optX.innerHTML = "Dimension " + i;
        let optY = document.createElement('option');
        optY.value = String(i);
        optY.innerHTML = "Dimension " + i;
        xSelector.appendChild(optX);
        ySelector.appendChild(optY);
    }
    ySelector.getElementsByTagName('option')[1].selected = 'selected' // we use dim 1 and 2 in intiliazation
}

(async function init() { // This is called when code reaches this point
    window.addEventListener("keydown", onKeyDown, false);
    window.addEventListener("keyup", onKeyUp, false);
    // get encoder tensorflow model
    //encoderModel = await tf.loadLayersModel('https://models.seamosrealistas.com/encoder_model/model.json');
    encoderModel = await tf.loadLayersModel('https://github.com/MateoCamara/mateocamara.github.io/tree/main/expanding-frontiers/models/encoder_model/model.json');
    logInfo("Loaded default encoder.")
    // // get decoder tensorflow model
    //decoderModel = await tf.loadLayersModel('https://models.seamosrealistas.com/decoder_model/model.json');
    decoderModel = await tf.loadLayersModel('https://github.com/MateoCamara/mateocamara.github.io/tree/main/expanding-frontiers/models/decoder_model/model.json');
    logInfo("Loaded default decoder.")
    // Add the number of variables in latent space to html select tag items
    initLantentSpaceVariableSelector(encoderModel.outputShape[0][1]);
    setMapDescriptor(true);
    update_axis_labels();
})();

(function loop() {  // This is called when code reaches this point
    // Get sound's xy position and scale it smoothly to create an animation effect
    if ((mu_latent_spaces.length === numFiles) && (!all_loaded)) {
        let x = mu_latent_spaces.map((ls) => ls[map_features[0]]);
        let y = mu_latent_spaces.map((ls) => ls[map_features[1]]);
        console.log("x", x)
        console.log("y", y)

        map_xy_x_max = Math.max.apply(null, x);
        map_xy_x_min = Math.min.apply(null, x);
        map_xy_y_max = Math.max.apply(null, y);
        map_xy_y_min = Math.min.apply(null, y);

        for (i in sounds) {
            sounds[i].computed_x = (x[i] - map_xy_x_min) / (map_xy_x_max - map_xy_x_min);
            sounds[i].computed_y = 1 - (y[i] - map_xy_y_min) / (map_xy_y_max - map_xy_y_min);
        }

        for (i in sampledSounds) {
            sampledSounds[i].computed_x = (sampledSounds[i].latentSpace[map_features[0]] - map_xy_x_min) / (map_xy_x_max - map_xy_x_min);
            sampledSounds[i].computed_y = 1 - (sampledSounds[i].latentSpace[map_features[1]] - map_xy_y_min) / (map_xy_y_max - map_xy_y_min);
        }

        all_loaded = true;
        latentSpaceLoaded = true;
        console.log('Loaded map with ' + sounds.length + ' sounds');
    }
    if ((all_loaded) && (current_it_number <= max_xy_iterations)) {
        // if (current_it_number === 0) {
        //     document.getElementById('info_placeholder').innerHTML += '<div>Projecting sounds...</div>';
        // }
        for (i in sounds) {
            let sound = sounds[i];
            sound.x = sound.computed_x * Math.pow(100, current_it_number / max_xy_iterations - 1) + 0.5 * (1 - Math.pow(100, current_it_number / max_xy_iterations - 1)); // Smooth position at the beginning
            sound.y = sound.computed_y * Math.pow(100, current_it_number / max_xy_iterations - 1) + 0.5 * (1 - Math.pow(100, current_it_number / max_xy_iterations - 1)); // Smooth position at the beginning
        }

        for (i in sampledSounds) {
            let sound = sampledSounds[i];
            sound.x = sound.computed_x * Math.pow(100, current_it_number / max_xy_iterations - 1) + 0.5 * (1 - Math.pow(100, current_it_number / max_xy_iterations - 1)); // Smooth position at the beginning
            sound.y = sound.computed_y * Math.pow(100, current_it_number / max_xy_iterations - 1) + 0.5 * (1 - Math.pow(100, current_it_number / max_xy_iterations - 1)); // Smooth position at the beginning
        }
        current_it_number += 1;
    }
    // if (current_it_number === max_xy_iterations - 1) {
    //     logInfo(`Done, ${sounds.length} sounds loaded!`);
    // }
    if (all_loaded) {
        draw();
    }
    requestAnimFrame(loop);
})();


/* Sounds stuff */

function SoundFactory(id, preview_url, analysis, url, name, username, image) {
    this.x = Math.random();
    this.y = Math.random();
    this.rad = 15;
    this.mod_position = Math.random();
    this.mod_inc = 0.1;
    this.mod_amp = default_point_modulation;
    this.selected = false;

    this.id = id;
    this.preview_url = preview_url;
    this.analysis = analysis;

    let color = rgbToHex(255, 255, 255)
    this.rgba = color;

    this.url = url;
    this.name = name;
    this.username = username;
    this.image = image;
    this.generated = false;
}

function SoundFactoryGeneratedAudios(id, waveform, x, y, latentSpace) {
    this.id = id;
    this.waveform = waveform;
    this.x = x;
    this.y = y;
    this.rad = 15;
    this.mod_amp = default_point_modulation;
    this.mod_position = Math.random();
    this.mod_inc = 0.1;
    this.selected = false;
    this.generated = true;
    this.latentSpace = latentSpace;
}

function load_data_from_fs_json(data) {
    let max = data['results'].length;
    let i = 0;
    let interval = setInterval(function () {

        // console.log(data)
        let sound_json = data['results'][i];
        let sound = new SoundFactory(
            id = sound_json['id'],
            preview_url = sound_json['audio'] || sound_json['previews']['preview-hq-mp3'],
            analysis = sound_json['analysis'],
            url = sound_json['url'],
            name = sound_json['name'],
            username = sound_json['username'],
            image = sound_json['image'] || sound_json['images']['spectral_m'],
        );
        sounds.push(sound);
        // console.log("sound.preview_url", sound.preview_url)

        getWaveformFromPreview(function (waveform) {
            let adjustedWaveform = adjustAudioToExpectedSize(waveform, 22050);

            sessionId += 1;

            spectrogramMCLT(function (mcltSpectrogram) {
                // console.log("mcltSpectrogram", mcltSpectrogram)
                let mcltspecCut = mcltSpectrogram.slice(0, mcltSpectrogram.length - 1);
                // console.log("mcltspecCut", mcltspecCut)
                let mcltspecTransposed = mcltspecCut[0].map((_, colIndex) => mcltspecCut.map(row => row[colIndex]));
                // console.log("mcltspecTransposed", mcltspecTransposed)
                let mclt2Dspec = arangeSpectrogram(mcltspecTransposed)
                // console.log(mclt2Dspec)
                let {mu_latent_space, log_variance_latent_space} = encodeAudio(mclt2Dspec);
                // console.log(mu_latent_space)
                let latent_space_size = mu_latent_space.length;
                // console.log(latent_space_size)
                // let samplesInLatentSpace = []
                // for (let i = 0; i < latent_space_size; i++) {
                //     samplesInLatentSpace.push(sampleFromLatentSpace(mu_latent_space[i], 0)); // log_variance_latent_space[i]));
                // }
                mu_latent_spaces.push(mu_latent_space);
                log_variance_latent_spaces.push(log_variance_latent_space);
                // sampleValuesInLatentSpace.push(samplesInLatentSpace);
            }, adjustedWaveform, 512);

        }, sound.preview_url);
        i++;
        if (i == max) {
            clearInterval(interval);
        }
    }, 1000);
    console.log("sampleValuesInLatentSpace", sampleValuesInLatentSpace)
    return

    // TODO: convert clicked bubble to blue color - ok
    // TODO: get waveform from preview wavesurfer.exportPCM() - ok
    // TODO: adjust length to expected by VAE - ok
    // TODO: encode audios - ok
    // TODO: extract maximum difference from Latent Space - semiok
    // TODO: draw map based on maximum distance - semiok
    // TODO: draw lines connecting outter polygon - ok
    // TODO: Create bubble on user click - ok
    // TODO: Convert bubble to interactive - ok
    // TODO: fix how to extrapolate on the rest of dimensions
    // TODO: automatic play audio when ready - ok
    // TODO: add waveform plot to GUI - no
    // TODO: add downloadable audio - ok
    // TODO: add asyncronousness to sampling latent space - ok
    // TODO: check upload subrutine - ok
    // TODO: logo - ok
    // TODO: train a new VAE
    // TODO: comment code
    // TODO: upload to web

}

function checkSelectSound(x, y) {
    let min_dist = 9999;
    let selected_sound = false;
    let distancesArray = []
    for (i in sounds) {
        let sound = sounds[i];
        let dist = computeEuclideanDistance(sound.x, sound.y, x, y);
        if (dist < min_dist) {
            min_dist = dist;
            selected_sound = sound;
        }
        distancesArray.push(dist);
    }

    for (i in sampledSounds) {
        let sound = sampledSounds[i];
        let dist = computeEuclideanDistance(sound.x, sound.y, x, y);
        if (dist < min_dist) {
            min_dist = dist;
            selected_sound = sound;
        }
    }

    if (min_dist < 0.02) {

        selectSound(selected_sound);

    } else {
        let dim1LatentSpace = (x * (map_xy_x_max - map_xy_x_min)) + map_xy_x_min;
        let dim2LatentSpace = ((y - 1) * -(map_xy_y_max - map_xy_y_min)) + map_xy_y_min;

        let quadraticDistancesArray = distancesArray.map((dist) => dist ** 2);
        console.log("quadraticDistancesArray", quadraticDistancesArray)
        let minDistancePointIndex = distancesArray.indexOf(Math.min(...distancesArray));
        console.log("minDistancePointIndex", minDistancePointIndex)


        let multilateralDim = []
        let aux = []
        for (let i = 0; i < mu_latent_spaces.length; i++) {
            if (i === minDistancePointIndex) continue;
            for (j in mu_latent_spaces[i]) {

                aux.push((quadraticDistancesArray[i] - quadraticDistancesArray[minDistancePointIndex] - mu_latent_spaces[i][j] ** 2 + mu_latent_spaces[minDistancePointIndex][j] ** 2) / (2 * (mu_latent_spaces[minDistancePointIndex][j] - mu_latent_spaces[i][j])))

            }
            multilateralDim.push(aux)
            aux = [];
        }

        console.log("multilateralDim", multilateralDim)

        multilateralDim = multilateralDim[0];
        multilateralDim[map_features[0]] = dim1LatentSpace;
        multilateralDim[map_features[1]] = dim2LatentSpace;

        console.log("multilateralDimxD", multilateralDim)

        let latent_space_size = mu_latent_spaces[0].length;
        let decoder_tensor = tf.tensor(multilateralDim);
        let predicted_spectogram_tensor = decoderModel.predict(tf.reshape(decoder_tensor, shape = [1, latent_space_size]));
        // console.log(predicted_spectogram_tensor)
        let predicted_spectrogram = predicted_spectogram_tensor.arraySync()
        console.log("predicted_spectrogram", predicted_spectrogram)
        predicted_spectrogram = predicted_spectrogram[0];
        convertPredictedSpectrogramIntoAudio(function (audio) {
            console.log("audio", audio)
            idGeneratedAudio += 1;
            let sound = new SoundFactoryGeneratedAudios(
                id = idGeneratedAudio,
                waveform = audio,
                x = x,
                y = y,
                latentSpace = multilateralDim,
            );
            sampledSounds.push(sound);
            playGeneratedSound(sound.waveform);
            showGeneratedSoundInfo(sound.waveform);
        }, predicted_spectrogram, "2D", 512);
    }
}

function multilaterationCoordinates(dim1LatentSpace, dim2LatentSpace) {

    for (let i = 0; i < mu_latent_spaces.length; i++) {
        weigthedLatentSpace = mu_latent_spaces.map((val) => math.dotMultiply(Array.from(val), distancesWeights[i]));
    }
}

function selectSound(selected_sound) {

    selected_sound.selected = true;
    selected_sound.mod_amp = 5.0;
    if (MONO_MODE) {
        audio_manager.stopAllBufferNodes();
    }
    if (selected_sound.generated) {
        playGeneratedSound(selected_sound.waveform)
        showGeneratedSoundInfo(selected_sound.waveform);

    } else {
        audio_manager.loadSound(selected_sound.id, selected_sound.preview_url);
        showSoundInfo(selected_sound);
    }
    last_selected_sound_id = selected_sound['id']
    selected_sound.selected = false;
    selected_sound.mod_amp = default_point_modulation;

}

function finishPlayingSound(sound_id) {
    let sound = getSoundFromId(sound_id);
    sound.selected = false;
    sound.mod_amp = default_point_modulation;
}

function selectSoundFromId(sound_id) {
    let sound = getSoundFromId(sound_id);
    selectSound(sound);
}

function getSoundFromId(sound_id) {
    for (i in sounds) {
        let sound = sounds[i];
        if (sound.id == parseInt(sound_id)) {
            return sound;
        }
    }
}

function showSoundInfo(sound) {
    let html = '';
    if ((sound.image !== undefined) && (sound.image !== '')) {
        html += '<img src="' + sound.image + '"/ class="sound_image"><br>';
    }
    html += sound.name + ' by <a href="' + sound.url + '" target="_blank">' + sound.username + '</a>';
    document.getElementById('sound_info_box').innerHTML = html;
}

function showGeneratedSoundInfo(waveform) {
    waveformAux = waveform
    console.log(waveform)
    let html = '';
    html += `<button onclick="downloadAudio(waveformAux)">Download generated audio!</button>`;
    document.getElementById('sound_info_box').innerHTML = html;
}

function downloadAudio(waveform) {
    const waveformArray = new Float32Array(waveform)
    console.log(waveform)
    const wavBytes = getWavBytes(waveformArray.buffer, {
        isFloat: true,       // floating point or 16-bit integer
        numChannels: 1,
        sampleRate: 22050,
    })
    console.log("wavBytes", wavBytes)
    const wav = new Blob([wavBytes], {type: 'audio/wav'})
    const downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(wav)
    downloadLink.setAttribute('download', 'my-audio.wav')
    downloadLink.click();
}

function playGeneratedSound(waveform) {
    let myArrayBuffer = context.createBuffer(1, 22050 * 3, 22050);
    let wf = new Float32Array(waveform)
    // myArrayBuffer.copyToChannel(selected_sound.waveform, 0, 0);
    let nowBuffering = myArrayBuffer.getChannelData(0);
    for (var i = 0; i < myArrayBuffer.length; i++) {
        // Math.random() is in [0; 1.0]
        // audio needs to be in [-1.0; 1.0]
        if (i >= wf.length) {
            nowBuffering[i] = 0;
        } else {
            nowBuffering[i] = wf[i];
        }
    }
    var source = context.createBufferSource();
    source.buffer = myArrayBuffer;
    source.connect(context.gainNode);
    source.start();
}

function setMapDescriptor(init) {
    let x_descriptor = document.getElementById('x_axis_map_descriptors_selector').value;
    let y_descriptor = document.getElementById('y_axis_map_descriptors_selector').value;
    if (init) {
        y_descriptor = 2;
    }
    map_features = [x_descriptor, y_descriptor];
}

/* Drawing */

function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (i in sounds) {
        let sound = sounds[i];
        let disp_x, disp_y;
        [disp_x, disp_y] = normCoordsToDisplayCoords(sound.x, sound.y)

        let z = i;
        z == sounds.length - 1 ? z = 0 : z = 1 + parseInt(i);
        let nextSound = sounds[z];
        let nextX, nextY;
        [nextX, nextY] = normCoordsToDisplayCoords(nextSound.x, nextSound.y)

        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();       // Start a new path
        ctx.moveTo(disp_x, disp_y);    // Move the pen to (30, 50)
        ctx.lineTo(nextX, nextY);  // Draw a line to (150, 100)
        ctx.stroke();
        ctx.closePath();

        if (!sound.selected) {
            ctx.fillStyle = sound.rgba;
            ctx.strokeStyle = sound.rgba;
        } else {
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#ffffff';
        }

        if (last_selected_sound_id == sound['id']) {
            ctx.fillStyle = '#0000ff';
            ctx.strokeStyle = '#0000ff';
        }

        ctx.beginPath();
        ctx.arc(disp_x, disp_y, sound.rad * zoom_factor * Math.pow(0.9, zoom_factor), 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(disp_x, disp_y, (sound.rad + 5 + (sound.mod_amp * Math.cos(sound.mod_position))) * zoom_factor * Math.pow(0.9, zoom_factor), 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();

        sound.mod_position += sound.mod_inc;
    }

    for (i in sampledSounds) {
        let sound = sampledSounds[i];
        let disp_x, disp_y;
        [disp_x, disp_y] = normCoordsToDisplayCoords(sound.x, sound.y)

        ctx.fillStyle = '#ffff00';
        ctx.strokeStyle = '#ffff00';

        ctx.beginPath();
        ctx.arc(disp_x, disp_y, sound.rad * zoom_factor * Math.pow(0.9, zoom_factor), 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(disp_x, disp_y, (sound.rad + 5 + (sound.mod_amp * Math.cos(sound.mod_position))) * zoom_factor * Math.pow(0.9, zoom_factor), 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();

        sound.mod_position += sound.mod_inc;
    }
}

// form submit event handler
(function () {
    let formSubmitHandler = function formSubmitHandler(event) {
        event.preventDefault();
        start();
    }
    document.getElementById('query-form').onsubmit = formSubmitHandler;
})()

// axis text label drawing
function update_axis_labels() {
    console.log(map_features)

    // update the text boxes
    document.getElementById('x_axis_box').innerHTML = "Dimension " + map_features[0];
    document.getElementById('y_axis_box').innerHTML = "Dimension " + map_features[1];

}
