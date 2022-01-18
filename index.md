# Comparison of Phase Audio Processing Methods for Variational Autoencoders

#### Authors: Mateo Cámara and José Luis Blanco

#### Abstract: This paper presents an analysis of how to tackle the signal phase in one of the most popular architectures for synthesizing audio effects: Variational autoencoders. Autoencoders based on the Fast Fourier Transform routinely avoid any considerations related to the phase of the signal. They need to store this information to retrieve it at the output or rely on signal phase regenerators such as Griffin-Lim. We introduce a system based on Variational Autoencoder capable of generating a latent space with intrinsic information from both the signal amplitude and the phase of the sound. The Modulated Complex Lapped Transform has been used as an alternative transformation for the autoencoder input signal, maintaining the phase information. A novel database has been designed based on beats simulating human footsteps on different materials to test these architectures. This database will be made available to the scientific community and is part of the research contributions. The motivation of this research project is to demonstrate the importance of using phase-preserving structures and stop bypassing the problem. The results prove that the autoencoders can handle the phase. State-of-the-art standards are reached while keeping the system as a unified scheme. The results have been compared in objective and subjective terms with an autoencoder based on Fast Fourier Transform with phase regeneration based on Griffin-Lim.

## Results

<div class="figure">
    <table>
        <tbody><tr>
            <th>Chunk</th>
            <th>Original</th>
            <th>MCLT-3DVAE</th>
            <th>FFT-VAE</th>
            <th>MCLT-2DVAE</th>
        </tr>
        <tr>
            <td><b>Drumstick with wood</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/original/a1.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/3dvae/a1.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples/fft/a1.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/2dvae/a1.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>Drumstick with metal</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/original/a2.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/3dvae/a2.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples/fft/a2.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/2dvae/a2.wav">
                </audio>
            </td>
        </tr>          
        <tr>
            <td><b>Drumstick with rubber</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/original/a3.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/3dvae/a3.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples/fft/a3.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/2dvae/a3.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>Screwdriver with metal</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/original/a4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/3dvae/a4.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples/fft/a4.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/2dvae/a4.wav">
                </audio>
            </td>
        </tr>
        <tr>
            <td><b>Drumstick with terrasso</b></td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/original/a5.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/3dvae/a5.wav">
                </audio>
            </td>
           <td>
                <audio controls=""> 
                    <source src="github_samples/fft/a5.wav">
                </audio>
            </td>
            <td>
                <audio controls=""> 
                    <source src="github_samples/2dvae/a5.wav">
                </audio>
            </td>
        </tr>
    </tbody></table>
</div>
