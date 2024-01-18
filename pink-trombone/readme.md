# Parameter Optimization for a Physical Model of the Vocal System

## Authors: Mateo Cámara, José Luis Blanco and Joshua D. Reiss

## Abstract

We evaluated black-box and grey-box optimization techniques on the parameters of a simplified physical synthesizer, the Pink Trombone, to emulate both male and female vocal tract characteristics for vocalic and non-speech sounds. Leveraging prior research, we utilized a genetic optimizer and Mel-spectrogram representations to infer the articulatory parameters from human recordings through a direct spectral comparison with the synthesizer's output. Optimization was carried out over temporal windows, introducing variations to the state-of-the-art objective metric to ensure temporal coherence across the synthesized signal. We also investigated grey-box approaches, utilizing algorithms such as pYIN for fundamental frequency prediction and developing a ResNet-based neural network as a foundation for the optimization process. Subjective tests validated our methodology and confirmed that the synthesizer effectively mimics human vocal sounds. Results demonstrate a marked superiority over previous state-of-the-art techniques, proving its practical utility and accuracy in real-world conditions. Moreover, these subjective evaluations allowed us to fine-tune the established perceptual metric ViSQOL, providing a calibrated tool for future research to assess auditory metrics in the domain of physical synthesizer modeling.

## Video

[![Demo Video](https://img.youtube.com/vi/Nvkuxy711YY/hqdefault.jpg)](https://youtu.be/Nvkuxy711YY)

## ViSQOL Pink Trombone SVR Model

To use the Pink Trombone - ViSQOL model, first you should download the model:

[Download SVR model](visqol_model/libsvm_svr_pinktrombone_model.txt)

Next, you should check out the [ViSQOL user guide](https://github.com/google/visqol). Once ViSQOL is installed, to use the model you should run the following code:

This will render as a formatted code block in the Markdown file:

```bash
./bazel-bin/visqol --reference_file ref1.wav --degraded_file deg1.wav --similarity_to_quality_model libsvm_svr_pinktrombone_model.txt
```

## Link to the perceptual tests in Go Listen (in Spanish, use google translate if needed)

[Link to Go Listen app](https://www.mateocamara.com/pruebas-subjetivas)

[The questionnaire is available here](https://mateocamara.github.io/pink-trombone/questionnaire/)

## Pink Trombone online demo

A demo with all the yawns and some of the vowels is available online. This is just a tiny demonstration; all the audio samples used in the study are presented below.

[Link to the interactive non-exhaustive demo](https://mateocamara.com/pink-trombone/)

## Audio Samples

### /A/ sound (original files not presented in test)

| Masculine original | Femenine original | Old method femenine | New method femenine | Old method masculine | New method masculine |
| --- | --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p1/a.wav"></audio> | <audio controls=""><source src="preguntas_test/p1/a_f.wav"></audio> | <audio controls=""><source src="preguntas_test/p1/a_f_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p1/a_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p1/a_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p1/a_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### /E/ sound (original files not presented in test)

| Masculine original | Femenine original | Old method femenine | New method femenine | Old method masculine | New method masculine |
| --- | --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p2/e.wav"></audio> | <audio controls=""><source src="preguntas_test/p2/e_f.wav"></audio> | <audio controls=""><source src="preguntas_test/p2/e_f_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p2/e_f_segment_length_2400_penalization_8_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p2/e_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p2/e_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |


### /I/ sound (original files not presented in test)

| Masculine original | Femenine original | Old method femenine | New method femenine | Old method masculine | New method masculine |
| --- | --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p3/i.wav"></audio> | <audio controls=""><source src="preguntas_test/p3/i_f.wav"></audio> | <audio controls=""><source src="preguntas_test/p3/i_f_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p3/i_f_segment_length_2400_penalization_1_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p3/i_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p3/i_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### /O/ sound (original files not presented in test)

| Masculine original | Femenine original | Old method femenine | New method femenine | Old method masculine | New method masculine |
| --- | --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p4/o.wav"></audio> | <audio controls=""><source src="preguntas_test/p4/o_f.wav"></audio> | <audio controls=""><source src="preguntas_test/p4/o_f_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p4/o_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p4/o_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p4/o_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### /U/ sound (original files not presented in test)

| Masculine original | Femenine original | Old method femenine | New method femenine | Old method masculine | New method masculine |
| --- | --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p5/u.wav"></audio> | <audio controls=""><source src="preguntas_test/p5/u_f.wav"></audio> | <audio controls=""><source src="preguntas_test/p5/u_f_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p5/u_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p5/u_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p5/u_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### /A-E-I-O-U/ sound (original files not presented in test)

| Original | 0 penalization | 1 penalization | 2 penalization | 4 penalization |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p6/aeiou_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p6/aeiou.wav"></audio> | <audio controls=""><source src="preguntas_test/p6/aeiou_segment_length_1200_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p6/aeiou_segment_length_1200_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p6/aeiou_segment_length_1200_penalization_8_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio>  |

### /E-I-U/ sound (original files not presented in test)

| Original | 0 penalization | 1 penalization | 2 penalization | 4 penalization |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p7/eiu.wav"></audio> | <audio controls=""><source src="preguntas_test/p7/eiu_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p7/eiu_segment_length_2400_penalization_1_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p7/eiu_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p7/eiu_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### /ROY/ sound (original files not presented in test)

| Original | 0 penalization | 1 penalization | 2 penalization | 4 penalization |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p8/roy.wav"></audio> | <audio controls=""><source src="preguntas_test/p8/roy_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p8/roy_segment_length_2400_penalization_1_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p8/roy_segment_length_1200_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p8/roy_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### Femenine /ROY/ sound (original files not presented in test)

| Original | 0 penalization | 1 penalization | 2 penalization | 4 penalization |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p9/roy_f.wav"></audio> | <audio controls=""><source src="preguntas_test/p9/roy_f_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p9/roy_f_segment_length_2400_penalization_1_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p9/roy_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p9/roy_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p10

| Original | No initialization | Using multiespectral error | Using Neural Network | Using pYIN |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p10/a.wav"></audio> | <audio controls=""><source src="preguntas_test/p10/a_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p10/a_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p10/a_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p10/a_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p11

| Original | No initialization | Using multiespectral error | Using Neural Network | Using pYIN |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p11/a_f.wav"></audio> | <audio controls=""><source src="preguntas_test/p11/a_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p11/a_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p11/a_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p11/a_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p12

| Original | No initialization | Using multiespectral error | Using Neural Network | Using pYIN |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p12/aio.wav"></audio> | <audio controls=""><source src="preguntas_test/p12/aio_segment_length_2400_penalization_1_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p12/aio_segment_length_2400_penalization_1_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p12/aio_segment_length_2400_penalization_1_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p12/aio_segment_length_2400_penalization_1_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p13

| Original | No initialization | Using multiespectral error | Using Neural Network | Using pYIN |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p13/ao.wav"></audio> | <audio controls=""><source src="preguntas_test/p13/ao_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p13/ao_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p13/ao_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p13/ao_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p14

| Original | No initialization | Using multiespectral error | Using Neural Network | Using pYIN |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p14/e_f.wav"></audio> | <audio controls=""><source src="preguntas_test/p14/e_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p14/e_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p14/e_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p14/e_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p15

| Original | No initialization | Using multiespectral error | Using Neural Network | Using pYIN |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p15/roy_f.wav"></audio> | <audio controls=""><source src="preguntas_test/p15/roy_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p15/roy_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p15/roy_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p15/roy_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p16

| Original | No initialization | Using multiespectral error | Using Neural Network | Using pYIN |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p16/roy.wav"></audio> | <audio controls=""><source src="preguntas_test/p16/roy_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p16/roy_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p16/roy_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p16/roy_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p17

| Original | No initialization | Using multiespectral error | Using Neural Network | Using pYIN |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p17/yawn1.wav"></audio> | <audio controls=""><source src="preguntas_test/p17/yawn1_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p17/yawn1_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p17/yawn1_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p17/yawn1_segment_length_2400_penalization_4_penalize_frequency_1_pyin_False_nn_False_fft_False.wav"></audio> |

### p18

| Original | No initialization | Using multiespectral error | Using Neural Network | Using pYIN |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p18/yawn2.wav"></audio> | <audio controls=""><source src="preguntas_test/p18/yawn2_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p18/yawn2_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p18/yawn2_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p18/yawn2_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p19

| Original | No initialization | Using multiespectral error | Using Neural Network | Using pYIN |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p19/yawn3.wav"></audio> | <audio controls=""><source src="preguntas_test/p19/yawn3_segment_length_2400_penalization_8_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p19/yawn3_segment_length_2400_penalization_8_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p19/yawn3_segment_length_2400_penalization_8_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p19/yawn3_segment_length_2400_penalization_8_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p20

| Original | No initialization | Using multiespectral error | Using Neural Network | Using pYIN |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p20/eiu.wav"></audio> | <audio controls=""><source src="preguntas_test/p20/eiu_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p20/eiu_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p20/eiu_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p20/eiu_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p21

| Original | No initialization | Using multiespectral error | Using Neural Network | Using pYIN |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p21/oioioi.wav"></audio> | <audio controls=""><source src="preguntas_test/p21/oioioi_segment_length_1200_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p21/oioioi_segment_length_1200_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p21/oioioi_segment_length_1200_penalization_2_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p21/oioioi_segment_length_1200_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

---

## References

If you use this project in your research, please include the following citation:

[Once published! :)]
