# Audio Intellimixer

Beta version of the Audio Intellimixer application to generate sounds from the latent space sampling of a VAE directly hosted in the browser.

The application can be found on the web at https://mateocamara.com/intellimixer/ . We recommend watching the following video to quickly understand how it works:

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/qaBuuZhWuqA/0.jpg)](https://www.youtube.com/watch?v=qaBuuZhWuqA)

It is a beta version, so there may be instabilities. We are working on improving the performance of the application. A github with the commented and structured code will be enabled to encourage the collaboration of the scientific community when the seed paper has been published. 

Here is a small written user guide (equivalent to the video) for a very simple usage. Advanced uses of the application are described in detail in the seed paper.

#### Workflow

The application initializes the GUI while downloading the default encoder and decoder models. When they are loaded, the user is allowed to write a query to Freesound. As many sounds as the user requests are obtained by HTTP request. These files are preprocessed to convert them into spectrograms. These signals are transferred to the encoder, which may optionally have been replaced through the GUI by a user's personal model. The audios are encoded in a latent space of D variables. Two of these dimensions are displayed in the GUI waiting for the user to click on an intermediate value. This value is registered in the latent space as an Euclidean distance between all source audios downloaded from Freesound. The sampled point is fed into the decoder, which returns a new spectrogram. This is post-processed to achieve an audible waveform. It is then sent to the GUI for user playback and download.

#### Layout

On the right side of the application there are a series of buttons and inputs for the user to modify. Each of the interfaces sorted from top to bottom are:

Text input to identify the Freesound API keyword. Next to the input box, there is a "go" button to launch the HTTP request. Footstep is the default keyword.

Drop-down menu to select the variable to place on the X-axis. This menu is empty until the autoencoder is loaded. At that point, the one-dimensional vector of size D of the latent space can be known. The drop-down menu is filled with D values for the user to choose from. By 
default, dimension 1 is chosen.

Drop-down menu to select the variable to place on the Y-axis. Identical performance as in the previous case. By default, dimension 2 is chosen.

Buttons to upload an autoencoder. To use a personal VAE, users can upload multiple files, being essential the JSON file defining the architecture and the binary files defining the network weights.

Non-interactive dialog that identifies the status of the application. In this section there is a loading bar with a representative message so that the user can check the state of the execution.

#### User interaction

When the application has loaded the freesound audios, the user can click anywhere in the latent space. A new audio will be generated from the latent space sampling. This sound can be downloaded to the local storage.



#### Notes on running this in different browsers

The application has been tested using Google Chrome. It has not been tested in other browsers. In case you detect any inconsistencies, please check your browser. If you are still testing in Chrome and it still gives problems, please refer to the video and contact the developers to fix it.

#### Contact

Any questions, problems, congratulations or comments, please send an email to mateoDOTcamaraATupmDOTes.