# The “glosa-figur” Max patch

Design and programming<br>
Antonio de SOUSA DIAS<br>
a.sousadias@belasartes.ulisboa.pt


## Description:
Given as inputs<br>
- a melodic sequence as a _Cantus Firmus_ (CF) and<br>
- a _melodic sequence_ (MS) as an ornamentation reservoir,<br>

This patch, for each two notes of the CF, finds all excerpts belonging to MS whose extreme notes form the same interval.<br>
This technique lies somewhere between the _glosa_ technique (Ortiz 1553) and the _Gel_ technique used by composer Michael Jarrell (Szendzy 1992).<br>
The resulting data is feed into a Bach.roll object for later use with a score editor.<br>

### Input:
The js object accepts the following input messages:
- fCF followed by a list of MIDI note values the "Cantus Firmus".<br>
- fGLOS followed by a list of MIDI note values the melodic sequence to be used as an ornamentation reservoir.<br>
- _bang_ triggers output.<br>
- CFdur _integer_: Length of CF notes, for score viewing purposes (ms, default 4000).<br>
- GLOSdur _integer_: Length of each generated note (ms, default 125).<br>
- GLOStab _integer_: Length of each tab if exceds the number of voices available (ms, default 2000).<br>
- nVoices _integer_: The number of staves/lines (channels).<br>
- include_intervals 0/1: Show generated melodic sequences starting with current CF note and ending with next CF note.<br>
- include_uniss 0/1: Show generated melodic sequences starting and ending with current CF note.<br>
- safe_offset 0/1: Add tabs in case of sequence overlap.<br>
- show_figur 0/1: Add a voice with the ornamentation reservoir transposed to each of the CF notes.<br>
- remove_dups 0/1: Removes duplicated ornamentation sequence generated for each of the CF notes.<br>

### Output:
- Instructions for a Bach.roll object.<br>
Note: connect output to a route object to retrieve data: [route toBachRoll]->[Bach.roll]<br>

## Remarks
The current folder contains:<br>
- asd_glosaFig.maxpat - the main patch.<br>
- asd_glosaFig.maxpat - the js file containing the core processing.<br>
- README.md - this read me file.<br>

## References
- Ortiz, D. (1553). Trattado de Glosas. https://imslp.org/wiki/Trattado_de_Glosas_(Ortiz%2C_Diego)<br>
- Sousa Dias, A. (2008) Two examples of free transposition of audio processing techniques to the note domain in “Dói-me o luar” and Ressonâncias – Memórias. C. Agon, G. Assayag, J. Bresson (org.), _The OM Composer´s Book 2_, Paris, IRCAM / Delatour. ISBN: 2-84426-399-2. http://recherche.ircam.fr/equipes/repmus/OMBook/<br>
- Szendy, P. (1992). “Congruences”, in Michael Jarrel, IRCAM-Centre Pompidou, Paris.<br>

## Revision history:
- 2022, March; release of Max version.
- 2018, May (OM version): Release on GitHub<br>
- 2009, Jan (OM version): Initial release on CICM site<br>
- 2001 (OM version): Initial design and programming for use in _"Doi-me o luar"_(2001) under the name _Recursivus_<br>


### Disclaimer:
These patches are distributed in the hope that they will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.<br>



Faculdade de Belas-Artes,<br>
Universidade de Lisboa<br>
Largo da Academia Nacional de Belas-Artes<br>
1249-058 Lisboa, Portugal<br>
http://www.belasartes.ulisboa.pt/



