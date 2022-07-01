# Comparison of Phase Audio Processing Methods for Variational Autoencoders

#### Authors: Mateo Cámara and José Luis Blanco

#### Abstract: This paper analyzes the impact of signal phase handling} in one of the most popular architectures for generative synthesis of audio effects: Variational Autoencoders (VAEs). Until quite recently, autoencoders based on the Fast Fourier Transform routinely avoided the phase of the signal. They store the phase information and retrieve it at the output or rely on signal phase regenerators such as Griffin-Lim. We evaluate different Variational Autoencoder networks capable of generating a latent space with intrinsic information from signal amplitude and phase. The Modulated Complex Lapped Transform has been evaluated as an alternative to the Fourier Transform. A novel database on beats has been designed for testing the architectures. Results were compared in objective, and subjective-equivalent terms with autoencoders on FFT and MCLT representations, using Griffin-Lim phase regeneration, multi-channel networks, as well as the Complex VAE. The autoencoders successfully learned to represent the phase information and handle it in a holistic approach. State-of-the-art quality standards were reached for audio effects. The autoencoders show a remarkable ability to generalize and deliver new sounds, while overall quality depends on the reconstruction of phase and amplitude.

## Results using STFT

<div class="figure">
    <table>
        <tbody><tr>
            <th>Original</th>
            <th>Drumstick with wood</th>
            <th>Drumstick with metal</th>
            <th>Drumstick with terrasso</th>
            <th>Drumstick with rubber</th>
            <th>mallet with wood</th>
            <th>mallet with metal</th>
            <th>mallet with terrasso</th>
            <th>mallet with rubber</th>
        </tr>
        <tr>
            <td><b>Original</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a1.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a2.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a3.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a5.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a7.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a8.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>2D-VAE with STFT</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/a1.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/a2.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/a3.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/a4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/a5.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/a6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/a7.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/a8.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>3D-VAE with STFT</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/a1.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/a2.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/a3.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/a4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/a5.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/a6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/a7.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/a8.wav">
                </audio>
            </td>
        </tr>         
        <tr>
            <td><b>STFT + Griffin-Lim</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values_halved/a1.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values_halved/a2.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values_halved/a3.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values_halved/a4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values_halved/a5.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values_halved/a6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values_halved/a7.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values_halved/a8.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>CVAE with STFT</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/a1.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/a2.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/a3.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/a4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/a5.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/a6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/a7.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/a8.wav">
                </audio>
            </td>
        </tr>
    </tbody></table>
</div>

## Results using MCLT

<div class="figure">
    <table>
        <tbody><tr>
            <th>Original</th>
            <th>Drumstick with wood</th>
            <th>Drumstick with metal</th>
            <th>Drumstick with terrasso</th>
            <th>Drumstick with rubber</th>
            <th>mallet with wood</th>
            <th>mallet with metal</th>
            <th>mallet with terrasso</th>
            <th>mallet with rubber</th>
        </tr>
        <tr>
            <td><b>Original</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a1.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a2.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a3.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a5.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a7.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/a8.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>2D-VAE with MCLT</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/a1.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/a2.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/a3.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/a4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/a5.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/a6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/a7.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/a8.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>3D-VAE with MCLT</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/a1.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/a2.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/a3.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/a4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/a5.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/a6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/a7.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/a8.wav">
                </audio>
            </td>
        </tr>         
        <tr>
            <td><b>MCLT + Griffin-Lim</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/a1.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/a2.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/a3.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/a4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/a5.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/a6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/a7.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/a8.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>CVAE with MCLT</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/a1.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/a2.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/a3.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/a4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/a5.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/a6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/a7.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/a8.wav">
                </audio>
            </td>
        </tr>
    </tbody></table>
</div>