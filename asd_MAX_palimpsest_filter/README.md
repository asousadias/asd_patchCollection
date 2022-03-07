# The _palimpsesto flt_ MAX patch

Design and programming<br>
Antonio de SOUSA DIAS<br>
a.sousadias@belasartes.ulisboa.pt

## Description:
The “palimpsesto flt” is a Max patch, originally programmed in 2002 in OpenMusic, that transposes to the note domain the operations of filtering and morphing that we find in the audio domain.<br>
Its operating mode is anchored on the idea of palimpsest, and can be described as follows:  given two input sequences in Bach.roll format (a source file and a modulator file), it produces a third Bach.roll sequence "filtering" the input 2 with input 1.<br>
Method 0, keeps all notes from input 2, as long as they fall in the time intervals of input 1. All the other methos add more conditions to this one. Method 1 keeps only the notes from the source file that are equal to the notes of the modulation file, while, in a slight variant possibility, method 2 keeps those notes having the same pitch class. It is thus a resulting hybridization between spectral multiplication and the use of comb filters.<br>
Method 3, “rounds” all notes from the source file to the nearest notes of the modulation file, and method 4, in a slight variant possibility, rounds them to the near modulation pitch class.
The Time Adjust parameter also affects operation mode. Scale factor = 0, no change; scale factor =  1, scale time input 2 to itime length 1; scale factor =  2, scale input times 1 to time length 2.<br>


## Operation mode:
- Feed the js object with two sequences, stored in two slots.
- Send the message bandpass with parameters to process data.
- See contents of each slot with message "info n", where n is an integer

### Input:
The js object accepts the following input messages:
- rollGen n (contents of a Bach.portal - @out t - roll object); n is an integer refering to a slot where data will be stored
example:
	rollGen 0 [ [ 174.285721 [ 6800. 241. 100 0 ] 0 ] [ 320. [ 7100. 241. 100 0 ] 2 ] [ 602.857117 [ 6600. 241. 100 0 ] [ 7600. 241. 100 0 ] 0 ] 0 ] [ [ 515. [ 4800. 1137. 100 0 ] 0 ] 0 ] 

- info n
example:
	info 0

- bandpass slot1 slot2 slot3 method timeAdjust
where
	- slot1: number of slot where chord-seq 1 that will be used as filter/modulator is stored.
	- slot2: number of slot where chord-seq 2 that will be used as source is stored.
	- slot3: number of slot where the output will be stored.
	- Method (integer):<br>
 	 	- 0-Band pass all notes of input 2 according to onsets of input 1;
 	   	- 1-Band pass note;
		- 2-Band pass pitch class;
		- 3-Set each event of input 2 to corresponding note of input 1;
		- 4-Set each event of input 2 to nearest pitch of the pitch class note of input 1.
	- Time adjust (integer):
		- 0-No change. Slots will be considered and compared according to their original events onset;
  	  	- 1-The two input sequences are adjusted to the same time length and result will have slot1 time length;
 	   	- 2 (or else) - The same as above, but the result will have slot2 time length.
	
### Output:
- Instructions for a Bach.roll object.
Note: connect output to a route object to retrieve data: [route toBachRoll]->[Bach.roll]

## Remarks
The current folder consists of:<br>
- asd_palimpsesto-flt.maxpat - the main patch.<br>
- asd_palimpsesto-flt.js - the js file containing the core processing.<br>
- README.md - this read me file.<br>

## References
For operating details see:<br>
Sousa Dias, A. (2008) Two examples of free transposition of audio processing techniques to the note domain in “Dói-me o luar” and Ressonâncias – Memórias. C. Agon, G. Assayag, J. Bresson (org.), _The OM Composer´s Book 2_, Paris, IRCAM / Delatour. ISBN: 2-84426-399-2. http://recherche.ircam.fr/equipes/repmus/OMBook/


## Revision history:
- 2022, March; release of Max version.
- 2018, May (OM version): Release on GitHub<br>
- 2010, Jan 12 (OM version): Minor correction to adjust select values on select object<br>
- 2009, Jan (OM version): Initial release on CICM site. Time Adjust parameter added to adjust the length of the two input chord sequences.<br>
- 2002-2003 (OM version): Initial design and programming for use in _Ressonâncias-Memórias_ (2003).<br>

## Disclaimer:
These patches are distributed in the hope that they will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.<br>

Faculdade de Belas-Artes,<br>
Universidade de Lisboa<br>
Largo da Academia Nacional de Belas-Artes<br>
1249-058 Lisboa, Portugal<br>