# Decoding Vocal Articulations from Acoustic Latent Representations

## Authors: Mateo Cámara, Fernando Marcos, and José Luis Blanco

## Abstract

We present a novel neural encoder system for acoustic-to-articulatory inversion. We leverage the Pink Trombone voice synthesizer that reveals articulatory parameters (e.g tongue position and vocal cord configuration). Our system is designed to identify the articulatory features responsible for producing specific acoustic characteristics contained in a neural latent representation. To generate the necessary latent embeddings, we employed two main methodologies. The first was a self-supervised variational autoencoder trained from scratch to reconstruct the input signal at the decoder stage. We conditioned its bottleneck layer with a subnetwork called the "projector," which decodes the voice synthesizer's parameters.

The second methodology utilized two pretrained models: EnCodec and Wav2Vec. They eliminate the need to train the encoding process from scratch, allowing us to focus on training the projector network. This approach aimed to explore the potential of these existing models in the context of acoustic-to-articulatory inversion. By reusing the pretrained models, we significantly simplified the data processing pipeline, increasing efficiency and reducing computational overhead.

The primary goal of our project was to demonstrate that these neural architectures can effectively encapsulate both acoustic and articulatory features. This prediction-based approach is much faster than traditional methods focused on acoustic feature-based parameter optimization. We validated our models by predicting six different parameters and evaluating them with objective and ViSQOL subjective-equivalent metric using both synthesizer- and human-generated sounds. The results show that the predicted parameters can generate human-like vowel sounds when input into the synthesizer. We provide the dataset, code, and detailed findings to support future research in this field.

## Additional information

![Image showing tongue position during the utterance of /ieaou/. This sound is particularly interesting because only one articulator changes with each shift, allowing clear observation of tongue position at all times. Physical boundaries are marked by the purple line.](imgs\3d.png)

![Histogram of the VISQOL results. This visualization is equivalent to Figure 2 in the paper.](imgs\histogram.png)

## Audio Samples

### /a/ sound

| Original | VAE+Synth slow | VAE+Synth fast | Wav2vec slow | Wav2vec fast | Encodec slow | Encodec fast |
| --- | --- | --- | --- | --- | --- | --- |
| <audio controls><source src="original\a.wav"></audio> | <audio controls><source src="regen\a_filtered_betaVAESynth_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\a_filtered_betaVAESynth_dynamic_10changes_version_2.wav"></audio> | <audio controls><source src="regen\a_filtered_wav2vec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\a_filtered_wav2vec_dynamic_10changes_version_1.wav"></audio> | <audio controls><source src="regen\a_filtered_encodec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\a_filtered_encodec_dynamic_10changes_version_1.wav"></audio> |

### /e/ sound

| Original | VAE+Synth slow | VAE+Synth fast | Wav2vec slow | Wav2vec fast | Encodec slow | Encodec fast |
| --- | --- | --- | --- | --- | --- | --- |
| <audio controls><source src="original\e.wav"></audio> | <audio controls><source src="regen\e_filtered_betaVAESynth_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\e_filtered_betaVAESynth_dynamic_10changes_version_2.wav"></audio> | <audio controls><source src="regen\e_filtered_wav2vec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\e_filtered_wav2vec_dynamic_10changes_version_1.wav"></audio> | <audio controls><source src="regen\e_filtered_encodec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\e_filtered_encodec_dynamic_10changes_version_1.wav"></audio> |

### /i/ sound

| Original | VAE+Synth slow | VAE+Synth fast | Wav2vec slow | Wav2vec fast | Encodec slow | Encodec fast |
| --- | --- | --- | --- | --- | --- | --- |
| <audio controls><source src="original\i.wav"></audio> | <audio controls><source src="regen\i_filtered_betaVAESynth_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\i_filtered_betaVAESynth_dynamic_10changes_version_2.wav"></audio> | <audio controls><source src="regen\i_filtered_wav2vec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\i_filtered_wav2vec_dynamic_10changes_version_1.wav"></audio> | <audio controls><source src="regen\i_filtered_encodec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\i_filtered_encodec_dynamic_10changes_version_1.wav"></audio> |

### /o/ sound

| Original | VAE+Synth slow | VAE+Synth fast | Wav2vec slow | Wav2vec fast | Encodec slow | Encodec fast |
| --- | --- | --- | --- | --- | --- | --- |
| <audio controls><source src="original\o.wav"></audio> | <audio controls><source src="regen\o_filtered_betaVAESynth_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\o_filtered_betaVAESynth_dynamic_10changes_version_2.wav"></audio> | <audio controls><source src="regen\o_filtered_wav2vec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\o_filtered_wav2vec_dynamic_10changes_version_1.wav"></audio> | <audio controls><source src="regen\o_filtered_encodec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\o_filtered_encodec_dynamic_10changes_version_1.wav"></audio> |

### /u/ sound

| Original | VAE+Synth slow | VAE+Synth fast | Wav2vec slow | Wav2vec fast | Encodec slow | Encodec fast |
| --- | --- | --- | --- | --- | --- | --- |
| <audio controls><source src="original\u.wav"></audio> | <audio controls><source src="regen\u_filtered_betaVAESynth_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\u_filtered_betaVAESynth_dynamic_10changes_version_2.wav"></audio> | <audio controls><source src="regen\u_filtered_wav2vec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\u_filtered_wav2vec_dynamic_10changes_version_1.wav"></audio> | <audio controls><source src="regen\u_filtered_encodec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\u_filtered_encodec_dynamic_10changes_version_1.wav"></audio> |

### /eiu/ sound

| Original | VAE+Synth slow | VAE+Synth fast | Wav2vec slow | Wav2vec fast | Encodec slow | Encodec fast |
| --- | --- | --- | --- | --- | --- | --- |
| <audio controls><source src="original\eiu.wav"></audio> | <audio controls><source src="regen\eiu_filtered_betaVAESynth_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\eiu_filtered_betaVAESynth_dynamic_10changes_version_2.wav"></audio> | <audio controls><source src="regen\eiu_filtered_wav2vec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\eiu_filtered_wav2vec_dynamic_10changes_version_1.wav"></audio> | <audio controls><source src="regen\eiu_filtered_encodec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\eiu_filtered_encodec_dynamic_10changes_version_1.wav"></audio> |

### /roy/ sound

| Original | VAE+Synth slow | VAE+Synth fast | Wav2vec slow | Wav2vec fast | Encodec slow | Encodec fast |
| --- | --- | --- | --- | --- | --- | --- |
| <audio controls><source src="original\roy.wav"></audio> | <audio controls><source src="regen\roy_filtered_betaVAESynth_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\roy_filtered_betaVAESynth_dynamic_10changes_version_2.wav"></audio> | <audio controls><source src="regen\roy_filtered_wav2vec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\roy_filtered_wav2vec_dynamic_10changes_version_1.wav"></audio> | <audio controls><source src="regen\roy_filtered_encodec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\roy_filtered_encodec_dynamic_10changes_version_1.wav"></audio> |

### /ieaou/ sound

| Original | VAE+Synth slow | VAE+Synth fast | Wav2vec slow | Wav2vec fast | Encodec slow | Encodec fast |
| --- | --- | --- | --- | --- | --- | --- |
| <audio controls><source src="original\ieaou.wav"></audio> | <audio controls><source src="regen\ieaou_filtered_betaVAESynth_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\ieaou_filtered_betaVAESynth_dynamic_10changes_version_2.wav"></audio> | <audio controls><source src="regen\ieaou_filtered_wav2vec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\ieaou_filtered_wav2vec_dynamic_10changes_version_1.wav"></audio> | <audio controls><source src="regen\ieaou_filtered_encodec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\ieaou_filtered_encodec_dynamic_10changes_version_1.wav"></audio> |

### /oiu/ sound

| Original | VAE+Synth slow | VAE+Synth fast | Wav2vec slow | Wav2vec fast | Encodec slow | Encodec fast |
| --- | --- | --- | --- | --- | --- | --- |
| <audio controls><source src="original\oiu.wav"></audio> | <audio controls><source src="regen\oiu_filtered_betaVAESynth_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\oiu_filtered_betaVAESynth_dynamic_10changes_version_2.wav"></audio> | <audio controls><source src="regen\oiu_filtered_wav2vec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\oiu_filtered_wav2vec_dynamic_10changes_version_1.wav"></audio> | <audio controls><source src="regen\oiu_filtered_encodec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\oiu_filtered_encodec_dynamic_10changes_version_1.wav"></audio> |

### /aio/ sound

| Original | VAE+Synth slow | VAE+Synth fast | Wav2vec slow | Wav2vec fast | Encodec slow | Encodec fast |
| --- | --- | --- | --- | --- | --- | --- |
| <audio controls><source src="original\aio.wav"></audio> | <audio controls><source src="regen\aio_filtered_betaVAESynth_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\aio_filtered_betaVAESynth_dynamic_10changes_version_2.wav"></audio> | <audio controls><source src="regen\aio_filtered_wav2vec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\aio_filtered_wav2vec_dynamic_10changes_version_1.wav"></audio> | <audio controls><source src="regen\aio_filtered_encodec_dynamic_version_1.wav"></audio> | <audio controls><source src="regen\aio_filtered_encodec_dynamic_10changes_version_1.wav"></audio> |

---

## References

If you use this project in your research, please include the following citation:

[Once published! :)]
