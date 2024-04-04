# The _palimpsesto flt_ MAX patch

Design and programming<br>
Antonio de SOUSA DIAS<br>
a.sousadias@belasartes.ulisboa.pt

Latest release: [asd_MAX_palimpsest_filter_2024_04_03](https://github.com/asousadias/asd_patchCollection/blob/master/asd_MAX_palimpsest_filter/releases/asd_MAX_palimpsest_filter_2024_04_03.zip)

## Description:
The "palimpsesto flt" is a Max patch, originally programmed in OpenMusic in 2002, that transposes the operations of filtering and morphing found in the audio domain to the note domain.<br>
Its operation is based on the idea of the palimpsest, and can be described as follows: given two input sequences in Bach.roll format (a source file and a modulator file), it produces a third Bach.roll sequence by "filtering" input 2 with input 1.<br>
Different "methods" adjust the behaviour of the operations and the result: (1) Time Adjust options adjust the file lengths; (2) Gate options parameter control how input notes are preserved; (3) Pitch options parameter control how input notes are preserved or transformed. See the Operation Mode section below for more information.<br>

## Operation mode:
- Feed the js object "asd_palimpsesto-flt.js" with two sequences. For each sequence, set slot (A or B) to store it.<br>
- Choose options (Time, Gate and Pitch).<br>
- Bang the js object (text button "Process"). Output is sent a "Bach.roll" object.<br>
- See contents of each slot (use _sendToRoll n_ message - or use the menu "Send to slot Bach.roll").<br>

NOTES:<br>
1) Slots A1 and B1 are working slots with time adjustment according to the selected options.<br>
2) Due to the restriction of the array size to 32767 elements, the input is limited. Consider splitting large Roll files.<br>

### Input:
The js object accepts the following input messages:
- _rollGen_ _n_ (contents of a _Bach.portal @out t_ roll object); n is an integer refering to a slot (1 or 2) where data will be stored<br>
example:<br>
	rollGen 1 [ [ 174.285721 [ 6800. 241. 100 0 ] 0 ] [ 320. [ 7100. 241. 100 0 ] 2 ] [ 602.857117 [ 6600. 241. 100 0 ] [ 7600. 241. 100 0 ] 0 ] 0 ] [ [ 515. [ 4800. 1137. 100 0 ] 0 ] 0 ] <br>

- _bang_ - Start process. Compute output.

- _setTimeAdjustment n_   - Time adjust (integer):<br>
-- 0-No time change. Working slots will have same length as their original slots;
-- 1-Scale input A to time length B (time adjustment takes biggest offsets).
-- 2- Scale input B to time length A.
-- 3-Same as 1 (scale input A to time length B), but takes last onsets as references for scaling factor.
-- 4-Same as 2 (scale input B to time length A), but takes last onsets as references for scaling factor.
- _setMethodGate n_  - GATE Method (integer):<br>
--0-Continuous pass -  adjusts note onsets and offsets inputs (slot A) to modulator events (slot B).
--0-Attack only pass -   passes only notes that have an attack inside modulator events time span.
- _setMethodPitch n_   - PITCH Method (integer):<br>
-- 0-Bypass - Passes all notes unchanged after de gate pass.
-- 1-Band pass -Keeps only the gated notes from A that are equal to the notes of B.
-- 2-Band pass Pc -Keeps only the gated notes from A that have the same pitch class as the notes of B.
-- 3-Band pass adjust -“Rounds” all notes from A to the nearest notes of B.
-- 4-Band pass adjust Pc -“Rounds” all notes from A to the nearest Pc note of B.
- _sendToRoll n_ - Send contens of slots A, B, OUT, A1 or B1 to _Bach.roll_ object.
- _infoPrint n_ - Send contens of slots A, B, OUT, A1 or B1 to the Max Console.

### Output:
- Instructions for a _Bach.roll_ object.
Note: connect output to a route object to retrieve data: [route toBachRoll]->[Bach.roll]<br>

## Remarks
The current folder consists of:<br>
- asd_palimpsesto-flt.maxpat - the main patch.<br>
- asd_palimpsesto-flt.js - the js file containing the core processing.<br>
- README.md - this read me file.<br>
- _asdPalimp\_A0.mid_ and _asdPalimp\_B0.mid_ - two MIDI files for testing.<br>

## References
For operating details see:<br>
Sousa Dias, A. (2008) Two examples of free transposition of audio processing techniques to the note domain in “Dói-me o luar” and Ressonâncias – Memórias. C. Agon, G. Assayag, J. Bresson (org.), _The OM Composer´s Book 2_, Paris, IRCAM / Delatour. ISBN: 2-84426-399-2. http://recherche.ircam.fr/equipes/repmus/OMBook/<br>


## Revision history:
- 2024, March-April (Max version): major revision. Code fully revised. Pitch processing splited into two processes: gate and "spectral/pitch" adjustment"; added experimental time adjustment through last onset comparision.
- 2022, March; release of Max version. Requires the Bach library.
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
