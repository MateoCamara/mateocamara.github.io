# Optimization Techniques for a Physical Model of Male & Female Vocalisation

## Authors: Mateo Cámara and José Luis Blanco

## Abstract

We employed black-box and grey-box optimization techniques on the parameters of a simplified physical synthesizer, the Pink Trombone, which we modified to emulate both male and female vocal tract characteristics, to generate vocalic and non-speech sounds. Leveraging prior research, we utilized a genetic optimizer and Mel-spectrogram representations to infer the articulatory parameters from human recordings through a direct spectral comparison with the synthesizer's output. Optimization was carried out over temporal windows, introducing an improvement to the state-of-the-art objective metric to ensure temporal coherence in the synthesized signal. We also investigated grey-box approaches, utilizing algorithms such as pYIN for fundamental frequency prediction and developing a ResNet-based neural network as a foundation for the optimization process. Subjective tests validated our methodology, demonstrating a marked superiority over previous state-of-the-art techniques. Moreover, these subjective evaluations allowed us to fine-tune the established perceptual metric ViSQOL, providing a calibrated tool for future research to assess auditory metrics in the domain of physical synthesizer modeling.

## Audio Samples

### p1

| Audio 1 | Audio 2 | Audio 3 | Audio 4 |
| --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p1/a_f_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p1/a_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p1/a_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p1/a_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |


### p2

| Audio 1 | Audio 2 | Audio 3 | Audio 4 |
| --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p2/e_f_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p2/e_f_segment_length_2400_penalization_8_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p2/e_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p2/e_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |


### p3

| Audio 1 | Audio 2 | Audio 3 | Audio 4 |
| --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p3/i_f_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p3/i_f_segment_length_2400_penalization_1_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p3/i_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p3/i_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p4

| Audio 1 | Audio 2 | Audio 3 | Audio 4 |
| --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p4/o_f_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p4/o_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p4/o_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p4/o_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p5

| Audio 1 | Audio 2 | Audio 3 | Audio 4 |
| --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p5/u_f_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p5/u_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p5/u_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p5/u_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p6

| Audio 1 | Audio 2 | Audio 3 | Audio 4 |
| --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p6/aeiou_segment_length_1200_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p6/aeiou_segment_length_1200_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p6/aeiou_segment_length_1200_penalization_8_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p6/aeiou_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p7

| Audio 1 | Audio 2 | Audio 3 | Audio 4 |
| --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p7/eiu_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p7/eiu_segment_length_2400_penalization_1_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p7/eiu_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p7/eiu_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p8

| Audio 1 | Audio 2 | Audio 3 | Audio 4 |
| --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p8/roy_segment_length_1200_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p8/roy_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p8/roy_segment_length_2400_penalization_1_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p8/roy_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p9

| Audio 1 | Audio 2 | Audio 3 | Audio 4 |
| --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p9/roy_f_segment_length_2400_penalization_0_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p9/roy_f_segment_length_2400_penalization_1_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p9/roy_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p9/roy_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p10

| Audio 1 | Audio 2 | Audio 3 | Audio 4 | Audio 5 |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p10/a.wav"></audio> | <audio controls=""><source src="preguntas_test/p10/a_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p10/a_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p10/a_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p10/a_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p11

| Audio 1 | Audio 2 | Audio 3 | Audio 4 | Audio 5 |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p11/a_f.wav"></audio> | <audio controls=""><source src="preguntas_test/p11/a_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p11/a_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p11/a_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p11/a_f_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p12

| Audio 1 | Audio 2 | Audio 3 | Audio 4 | Audio 5 |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p12/aio.wav"></audio> | <audio controls=""><source src="preguntas_test/p12/aio_segment_length_2400_penalization_1_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p12/aio_segment_length_2400_penalization_1_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p12/aio_segment_length_2400_penalization_1_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p12/aio_segment_length_2400_penalization_1_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p13

| Audio 1 | Audio 2 | Audio 3 | Audio 4 | Audio 5 |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p13/ao.wav"></audio> | <audio controls=""><source src="preguntas_test/p13/ao_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p13/ao_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p13/ao_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p13/ao_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p14

| Audio 1 | Audio 2 | Audio 3 | Audio 4 | Audio 5 |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p14/e_f.wav"></audio> | <audio controls=""><source src="preguntas_test/p14/e_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p14/e_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p14/e_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p14/e_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p15

| Audio 1 | Audio 2 | Audio 3 | Audio 4 | Audio 5 |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p15/roy_f.wav"></audio> | <audio controls=""><source src="preguntas_test/p15/roy_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p15/roy_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p15/roy_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p15/roy_f_segment_length_2400_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p16

| Audio 1 | Audio 2 | Audio 3 | Audio 4 | Audio 5 |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p16/roy.wav"></audio> | <audio controls=""><source src="preguntas_test/p16/roy_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p16/roy_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p16/roy_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p16/roy_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p17

| Audio 1 | Audio 2 | Audio 3 | Audio 4 | Audio 5 |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p17/yawn1.wav"></audio> | <audio controls=""><source src="preguntas_test/p17/yawn1_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p17/yawn1_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p17/yawn1_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p17/yawn1_segment_length_2400_penalization_4_penalize_frequency_1_pyin_False_nn_False_fft_False.wav"></audio> |

### p18

| Audio 1 | Audio 2 | Audio 3 | Audio 4 | Audio 5 |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p18/yawn2.wav"></audio> | <audio controls=""><source src="preguntas_test/p18/yawn2_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p18/yawn2_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p18/yawn2_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p18/yawn2_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p19

| Audio 1 | Audio 2 | Audio 3 | Audio 4 | Audio 5 |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p19/yawn3.wav"></audio> | <audio controls=""><source src="preguntas_test/p19/yawn3_segment_length_2400_penalization_8_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p19/yawn3_segment_length_2400_penalization_8_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p19/yawn3_segment_length_2400_penalization_8_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p19/yawn3_segment_length_2400_penalization_8_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p20

| Audio 1 | Audio 2 | Audio 3 | Audio 4 | Audio 5 |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p20/eiu.wav"></audio> | <audio controls=""><source src="preguntas_test/p20/eiu_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p20/eiu_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p20/eiu_segment_length_2400_penalization_4_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p20/eiu_segment_length_2400_penalization_4_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

### p21

| Audio 1 | Audio 2 | Audio 3 | Audio 4 | Audio 5 |
| --- | --- | --- | --- | --- |
| <audio controls=""><source src="preguntas_test/p21/oioioi.wav"></audio> | <audio controls=""><source src="preguntas_test/p21/oioioi_segment_length_1200_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p21/oioioi_segment_length_1200_penalization_2_penalize_frequency_0_pyin_False_nn_False_fft_True.wav"></audio> | <audio controls=""><source src="preguntas_test/p21/oioioi_segment_length_1200_penalization_2_penalize_frequency_0_pyin_False_nn_True_fft_False.wav"></audio> | <audio controls=""><source src="preguntas_test/p21/oioioi_segment_length_1200_penalization_2_penalize_frequency_0_pyin_True_nn_False_fft_False.wav"></audio> |

---

## References

If you use this project in your research, please include the following citation:

[Once published!]
