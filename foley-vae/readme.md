# FOLEY-VAE: GENERACIÓN DE EFECTOS DE AUDIO PARA CINE CON INTELIGENCIA ARTIFICIAL

#### Autores: Mateo Cámara and José Luis Blanco

#### Resumen: En esta investigación, presentamos una interfaz basada en Autocodificadores Variacionales entrenados con una amplia gama de sonidos naturales para la creación innovadora de efectos de Foley. El modelo tiene la capacidad de operar en tiempo real para transferir nuevas características sonoras a audios pregrabados o voz capturada por micrófono. Además, permite la modificación interactiva de las variables latentes, lo que facilita la realización de ajustes artísticos precisos y personalizados.

#### Tomando como punto de partida nuestro estudio previo sobre Autocodificadores Variacionales presentado en este mismo congreso el año pasado, profundizamos sobre una implementación existente: RAVE [1]. Este modelo se ha entrenado específicamente para la producción de efectos de audio. Se ha logrado generar con éxito una variedad de efectos de audio que abarcan desde sonidos electromagnéticos, de ciencia ficción, de agua… entre otros muchos que se publican junto a este trabajo.

#### Este enfoque innovador ha sido la base de la creación artística del primer cortometraje español con efectos de sonido asistidos por inteligencia artificial. Este hito ilustra de manera palpable el potencial transformador de esta tecnología en la industria cinematográfica, abriendo la puerta a nuevas posibilidades de creación de sonido y a la mejora de la calidad artística en las producciones fílmicas.

#### Abstract: In this research, we present an interface based on Variational Autoencoders trained with a wide range of natural sounds for the innovative creation of Foley effects. The model can transfer new sound features to prerecorded audio or microphone-captured speech in real time. In addition, it allows interactive modification of latent variables, facilitating precise and customized artistic adjustments.

#### Taking as a starting point our previous study on Variational Autoencoders presented at this same congress last year, we analyzed an existing implementation: RAVE [1]. This model has been specifically trained for audio effects production. Various audio effects have been successfully generated, ranging from electromagnetic, science fiction, and water sounds, among others published with this work.

#### This innovative approach has been the basis for the artistic creation of the first Spanish short film with sound effects assisted by artificial intelligence. This milestone illustrates palpably the transformative potential of this technology in the film industry, opening the door to new possibilities for sound creation and the improvement of artistic quality in film productions. 


#### Vídeo utilizando Foley-VAE

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/qtZIa1xbdBs/0.jpg)](https://www.youtube.com/watch?v=qtZIa1xbdBs)

## Ejemplos de regeneración de audio

<div class="figure">
    <table>
        <tbody>
            <!-- Row 1 -->
            <tr>
                <th>Material</th>
                <td><b>Original</b></td>
                <td><b>Reconstruído</b></td>
            </tr>
            <!-- Row 2 -->
            <tr>
                <th>Madera 1</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/original/SNEAK_HW2_FNM_ST_02-05_WALK_KMR81.R.wav">
                    </audio>
                </td>
                <td>
                    <audio controls="">
                        <source src="github_samples3/reconstruido/SNEAK_HW2_FNM_ST_02-05_WALK_KMR81.R.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 3 -->
            <tr>
                <th>Madera 2</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/original/HEEL_HW5 DOCK_05-06_WALK_416.L.wav">
                    </audio>
                </td>
                <td>
                    <audio controls="">
                        <source src="github_samples3/reconstruido/HEEL_HW5 DOCK_05-06_WALK_416.L.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 4 -->
            <tr>
                <th>Metal 1</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/original/HEEL_METAL1_05-04_WALK_KMR81.R.wav">
                    </audio>
                </td>
                <td>
                    <audio controls="">
                        <source src="github_samples3/reconstruido/HEEL_METAL1_05-04_WALK_KMR81.R.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 5 -->
            <tr>
                <th>Metal 2</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/original/SNEAK_GRATE_07-07_WALK_KMR81.R.wav">
                    </audio>
                </td>
                <td>
                    <audio controls="">
                        <source src="github_samples3/reconstruido/SNEAK_GRATE_07-07_WALK_KMR81.L.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 6 -->
            <tr>
                <th>Roca 1</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/original/DRESS_ASPH_06-04_WALK_KMR81.R.wav">
                    </audio>
                </td>
                <td>
                    <audio controls="">
                        <source src="github_samples3/reconstruido/DRESS_ASPH_06-04_WALK_KMR81.R.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 7 -->
            <tr>
                <th>Roca 2</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/original/FLAT_MARBLE_08-06_WALK_416.L.wav">
                    </audio>
                </td>
                <td>
                    <audio controls="">
                        <source src="github_samples3/reconstruido/FLAT_MARBLE_08-06_WALK_416.R.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 8 -->
            <tr>
                <th>Tela 1</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/original/BOOT_CARP1_19-04_WALK_KMR81.R.wav">
                    </audio>
                </td>
                <td>
                    <audio controls="">
                        <source src="github_samples3/reconstruido/BOOT_CARP1_19-04_WALK_KMR81.R.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 9 -->
            <tr>
                <th>Tela 2</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/original/HEEL_CARP1_06-05_WALK_416.L.wav">
                    </audio>
                </td>
                <td>
                    <audio controls="">
                        <source src="github_samples3/reconstruido/HEEL_CARP1_06-05_WALK_416.L.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 10 -->
            <tr>
                <th>Tierra 1</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/original/BOOT_GRASS_WALK_416.L.wav">
                    </audio>
                </td>
                <td>
                    <audio controls="">
                        <source src="github_samples3/reconstruido/BOOT_GRASS_WALK_416.L.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 11 -->
            <tr>
                <th>Tierra 2</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/original/BOOT_DIRT_WALK_KMR81.R.wav">
                    </audio>
                </td>
                <td>
                    <audio controls="">
                        <source src="github_samples3/reconstruido/BOOT_DIRT_WALK_KMR81.R.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 12 -->
            <tr>
                <th>Otros 1</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/original/SNEAK_SNOW_SWEET_WALK_KMR81.R.wav">
                    </audio>
                </td>
                <td>
                    <audio controls="">
                        <source src="github_samples3/reconstruido/SNEAK_SNOW_SWEET_WALK_KMR81.R.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 13 -->
            <tr>
                <th>Otros 2</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/original/SNEAK_WATER_SWEET_WALK_KMR81.R.wav">
                    </audio>
                </td>
                <td>
                    <audio controls="">
                        <source src="github_samples3/reconstruido/SNEAK_WATER_SWEET_WALK_KMR81.R.wav">
                    </audio>
                </td>
            </tr>
        </tbody>
    </table>
</div>


## Ejemplos de mezclas de audio

<div class="figure">
    <table>
        <tbody>
            <!-- Row 1 -->
            <tr>
                <th>Mezcla</th>
                <td><b>Audio</b></td>
            </tr>
            <!-- Row 2 -->
            <tr>
                <th>Asfalto + madera</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_ASPH_CREAK.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 3 -->
            <tr>
                <th>Asfalto + barro</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_ASPH_DIRT.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 4 -->
            <tr>
                <th>Asfalto + madera</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_ASPH_H6.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 5 -->
            <tr>
                <th>Alfombra + césped</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_CARP1_GRASS.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 6 -->
            <tr>
                <th>Alfombra + madera</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_CARP1_HW4.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 7 -->
            <tr>
                <th>Alfombra + agua</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_CARP1_WATER.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 8 -->
            <tr>
                <th>Barro + rocas</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_DIRT_ROCKS.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 9 -->
            <tr>
                <th>Barro + madera</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_DIRT_TILE.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 10 -->
            <tr>
                <th>Césped + gravilla</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_GRASS_GRAVEL.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 11 -->
            <tr>
                <th>Césped + madera</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_GRASS_H1.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 12 -->
            <tr>
                <th>Madera + nieve</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_H3_SNOW.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 13 -->
            <tr>
                <th>Nadera + charco</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_H4_PUDDLE.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 14 -->
            <tr>
                <th>Madera + linoleo</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_H5 DOCK_lino.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 15 -->
            <tr>
                <th>Mármol + madera</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_MARBLE_H3.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 16 -->
            <tr>
                <th>Metal + hormigón</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_METAL1_CONC .wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 17 -->
            <tr>
                <th>Metal + madera</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_METAL1_H1.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 18 -->
            <tr>
                <th>Metal + charco</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_METAL1_PUDDLE.wav">
                    </audio>
                </td>
            </tr>
            <!-- Row 19 -->
            <tr>
                <th>Madera + rocas</th>
                <td>
                    <audio controls="">
                        <source src="github_samples3/mezcla/mezcla_TILE_ROCKS.wav">
                    </audio>
                </td>
            </tr>
        </tbody>
    </table>
</div>
