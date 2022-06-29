# Comparison of Phase Audio Processing Methods for Variational Autoencoders

#### Authors: Mateo Cámara and José Luis Blanco

#### Abstract: This paper presents an analysis of how to tackle the signal phase in one of the most popular architectures for synthesizing audio effects: Variational autoencoders. Autoencoders based on the Fast Fourier Transform routinely avoid any considerations related to the phase of the signal. They need to store this information to retrieve it at the output or rely on signal phase regenerators such as Griffin-Lim. We introduce a system based on Variational Autoencoder capable of generating a latent space with intrinsic information from both the signal amplitude and the phase of the sound. The Modulated Complex Lapped Transform has been used as an alternative transformation for the autoencoder input signal, maintaining the phase information. A novel database has been designed based on beats simulating human footsteps on different materials to test these architectures. This database will be made available to the scientific community and is part of the research contributions. The motivation of this research project is to demonstrate the importance of using phase-preserving structures and stop bypassing the problem. The results prove that the autoencoders can handle the phase. State-of-the-art standards are reached while keeping the system as a unified scheme. The results have been compared in objective and subjective terms with an autoencoder based on Fast Fourier Transform with phase regeneration based on Griffin-Lim.

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
                    <source src="github_samples2/original/Baqueta-ancho#02-chunk1.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Baqueta-ancho#04-chunk15.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Baqueta-ancho#04-chunk27.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Mazo-goma#01-chunk6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Mazo-goma#02-chunk4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Mazo-goma#04-chunk6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Mazo-goma#04-chunk16.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>2D-VAE with STFT</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/Baqueta-ancho#01-chunk2.wav.npy.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/Baqueta-ancho#02-chunk1.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/Baqueta-ancho#04-chunk15.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/Baqueta-ancho#04-chunk27.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/Mazo-goma#01-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/Mazo-goma#02-chunk4.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/Mazo-goma#04-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_2D/Mazo-goma#04-chunk16.wav.npy.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>3D-VAE with STFT</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/Baqueta-ancho#01-chunk2.wav.npy.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/Baqueta-ancho#02-chunk1.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/Baqueta-ancho#04-chunk15.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/Baqueta-ancho#04-chunk27.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/Mazo-goma#01-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/Mazo-goma#02-chunk4.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/Mazo-goma#04-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_3D/Mazo-goma#04-chunk16.wav.npy.wav">
                </audio>
            </td>
        </tr>         
        <tr>
            <td><b>STFT + Griffin-Lim</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values/Baqueta-ancho#01-chunk2.wav.npy.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values/Baqueta-ancho#02-chunk1.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values/Baqueta-ancho#04-chunk15.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values/Baqueta-ancho#04-chunk27.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values/Mazo-goma#01-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values/Mazo-goma#02-chunk4.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values/Mazo-goma#04-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_absolute_values/Mazo-goma#04-chunk16.wav.npy.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>CVAE with STFT</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/Baqueta-ancho#01-chunk2.wav.npy.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/Baqueta-ancho#02-chunk1.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/Baqueta-ancho#04-chunk15.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/Baqueta-ancho#04-chunk27.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/Mazo-goma#01-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/Mazo-goma#02-chunk4.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/Mazo-goma#04-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/Mazo-goma#04-chunk16.wav.npy.wav">
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
                    <source src="github_samples2/original/Baqueta-ancho#01-chunk2.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Baqueta-ancho#02-chunk1.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Baqueta-ancho#04-chunk15.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Baqueta-ancho#04-chunk27.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Mazo-goma#01-chunk6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Mazo-goma#02-chunk4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Mazo-goma#04-chunk6.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/original/Mazo-goma#04-chunk16.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>2D-VAE with MCLT</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/Baqueta-ancho#01-chunk2.wav.npy.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/Baqueta-ancho#02-chunk1.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/Baqueta-ancho#04-chunk15.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/Baqueta-ancho#04-chunk27.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/Mazo-goma#01-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/Mazo-goma#02-chunk4.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/Mazo-goma#04-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_2D/Mazo-goma#04-chunk16.wav.npy.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>3D-VAE with MCLT</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/Baqueta-ancho#01-chunk2.wav.npy.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/Baqueta-ancho#02-chunk1.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/Baqueta-ancho#04-chunk15.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/Baqueta-ancho#04-chunk27.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/Mazo-goma#01-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/Mazo-goma#02-chunk4.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/Mazo-goma#04-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_3D/Mazo-goma#04-chunk16.wav.npy.wav">
                </audio>
            </td>
        </tr>         
        <tr>
            <td><b>MCLT + Griffin-Lim</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/Baqueta-ancho#01-chunk2.wav.npy.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/Baqueta-ancho#02-chunk1.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/Baqueta-ancho#04-chunk15.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/Baqueta-ancho#04-chunk27.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/Mazo-goma#01-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/Mazo-goma#02-chunk4.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/Mazo-goma#04-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_absolute_values_halved/Mazo-goma#04-chunk16.wav.npy.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>CVAE with MCLT</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/Baqueta-ancho#01-chunk2.wav.npy.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/Baqueta-ancho#02-chunk1.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/fft_complex_values_halved/Baqueta-ancho#04-chunk15.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/Baqueta-ancho#04-chunk27.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/Mazo-goma#01-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/Mazo-goma#02-chunk4.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/Mazo-goma#04-chunk6.wav.npy.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples2/mclt_complex_value_halved/Mazo-goma#04-chunk16.wav.npy.wav">
                </audio>
            </td>
        </tr>
    </tbody></table>
</div>