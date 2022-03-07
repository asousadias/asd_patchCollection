// 
// =============================================================
//		ASD Palimpsesto Filter - javascript code
// =============================================================
//
// 		Antonio de Sousa Dias  		
// 		a.sousadias@belasartes.ulisboa.pt
//
// =============================================================
//	notes:
/*
Originally programmed in 2002 in OpenMusic, this patch transposes to the note domain the operations of filtering and morphing that we find in the audio domain.
His operating mode is anchored on the idea of palimpsest, and its operation mode can be described as follows:  it takes two music sequences as input (a source and a modulator) and produces a third sequence according to four main operation modes (the Method parameter).
Method 1 keeps only the notes from the source file that are equal to the notes of the modulation file,while, in a slight variant possibility, method 2 keeps those notes having the same pitch class. It is thus a resulting hybridization between spectral multiplication and the use of comb filters.
Method 3, “rounds” all notes from the source file to the nearest notes of the modulation file, and method 4, in a slight variant possibility, rounds them to the near modulation pitch class.
The time scale factor parameter also affects operation mode. Scale factor = 0, no change; scale factor =  1, scale time input 2 to itime length 1; scale factor =  2, scale input times 1 to time length 2.
NOTE: Requires the Bach library.
*/
//		- 
// =============================================================
//                inlets and outlets 
// =============================================================
inlets = 1 ;
outlets = 1 ;
// ============= set up inlets/outlets/assist strings
setinletassist(0,"messages to object");
setoutletassist(0,"output general messages");
// =============================================================
//                global variables and arrays 
// =============================================================
autowatch = 1;


// variaveis de parsing
var slotRoll = new Array();
var slotTimeLength = 0;
var voice_n = 0;
var chord_n = 0;
var note_onset = 0;
var note_offset = 0;
var note_dur = 0;
var note_MIDI = 0;
var note_n = 0;
var slotEvents = new Array();
var nSlot;
// variaveis de tratamento
var bpMode = 0;
var bpScale = 0;



// =============================================================
//                Functions start here 
// =============================================================
function bang(){
	
}

// =============================================================
function init() {
	
}

// =============================================================
function send2BachRoll( ivoice, ion, inot, id, iv) {
	var iOnset = ion;
	var iNote = inot;
	var iVelo = iv;
	var iVoice = ivoice;
	var iDur = id;
	outlet(0, "toBachRoll", "addchord",iVoice,"[",iOnset,"[",iNote,iDur,iVelo,"]","]" );
}

// =============================================================
function rollGen() {
	slotRoll = arrayfromargs(arguments);
	
	voice_n = 0;
	chord_n = 0;
	note_onset = 0;
	note_offset = 0;
	note_dur = 0;
	note_MIDI = 0;
	note_n = 0;
	
	ilevel = 0;
	
	var i = 0;
	if( slotRoll[ i ] == "[") {
		nSlot = 0;
		
		
	} else {
		nSlot = slotRoll[ i ];
		i++;
	}
	post("Setup slot : ",nSlot);
	
	slotEvents[ nSlot ] = new Array();
	slotEvents[ nSlot ].timeLength = 0;
	slotEvents[ nSlot ].numvoices = 0;
	
	var icase ="nn";
	while ( i < slotRoll.length ) {
		if( slotRoll[ i ] == "[") {
			ilevel++;
			icase ="nn";
			switch(ilevel) {
			case 1:
				icase ="Voice";
				voice_n++;
				//post("\nNivel : ",ilevel," > ",icase,voice_n);
				break;
			case 2:
				icase ="Chord";
				chord_n++
				i++;
				note_onset = slotRoll[ i ];
				//post("\nNivel : ",ilevel," > ",icase,chord_n);
				break;
			case 3:
				icase ="Note";
				note_n++;
				
				i++;
				note_MIDI = slotRoll[ i ];
				i++;
				note_offset = slotRoll[ i ] + note_onset;
				note_dur = slotRoll[ i ];
				
				slotEvents[ nSlot ][ note_n -1 ] = new Array();
				slotEvents[ nSlot ][ note_n -1 ].MIDI = note_MIDI;
				slotEvents[ nSlot ][ note_n -1 ].onset = note_onset;
				slotEvents[ nSlot ][ note_n -1 ].dur = note_dur;
				slotEvents[ nSlot ][ note_n -1 ].offset = note_offset;
				slotEvents[ nSlot ][ note_n -1 ].voice = voice_n;
				
				if( slotEvents[ nSlot ].timeLength < note_offset ) 				slotEvents[ nSlot ].timeLength = note_offset;
				
				//post("\nNivel : ",ilevel," > ",icase,note_n);
				//post(" : <",note_onset,note_offset,note_MIDI,">");
				break;
			default:
				break;
				
			}
			
		}
		if( slotRoll[ i ] == "]") {
			ilevel--;
		}
		i++;
	}
	slotEvents[ nSlot ].numvoices = voice_n;
	
	post(" - time length : ",slotEvents[ nSlot ].timeLength,"\n");
	
	outlet(0, "toBachRoll", "clear" );
	outlet(0, "toBachRoll", "numvoices", slotEvents[ nSlot ].numvoices);
	
	for( i = 0; i < slotEvents[ nSlot ].length; i++) {
		
		send2BachRoll( slotEvents[ nSlot ][ i ].voice, slotEvents[ nSlot ][ i ].onset, slotEvents[ nSlot ][ i ].MIDI, slotEvents[ nSlot ][ i ].dur, 100);
		
	}
	
}

// =============================================================
function bandpass( sl1, sl2, sl3, imode, iscale ) {
	bpMode = 0;
	if(!imode) { bpMode = 0; } else { bpMode = Math.min(4, imode); }
	bpScale = 0;
	if(!iscale) { bpScale = 0; } else { bpScale = Math.min(2, iscale); }
	
	post("\nbandpass MODES bpMode-",bpMode," bpScale:", bpScale);
	
	
	
	if( slotEvents[ sl1 ] ) {
		var k = -1;
		slotEvents[ sl3 ] = new Array();
		slotEvents[ sl3 ].timeLength = 0;
		slotEvents[ sl3 ].numvoices = 0;
		var sf1, sf2, scaleFactor = 1; // ajustar tempo
		switch(bpScale) {
		case 1: // set length 2 to timelength 1 (keep 1)
			sf1 = 1/slotEvents[ sl1 ].timeLength;
			sf2 = 1/slotEvents[ sl2 ].timeLength;
			slotEvents[ sl3 ].timeLength = slotEvents[ sl1 ].timeLength;
			scaleFactor = slotEvents[ sl3 ].timeLength;
			break;
		case 2: // set length 1 to timelength 2 (keep 2)
			sf1 = 1/slotEvents[ sl1 ].timeLength;
			sf2 = 1/slotEvents[ sl2 ].timeLength;
			slotEvents[ sl3 ].timeLength = slotEvents[ sl2 ].timeLength;
			scaleFactor = slotEvents[ sl3 ].timeLength;
			break;
		case 0:
		default: // keep both time lengths
			sf1 = sf2 = 1;
			scaleFactor = 1;
			break;			
		}
		
		for( var i = 0; i < slotEvents[ sl1 ].length; i++) {
			if( slotEvents[ sl2 ] ) {
				
				for( j = 0; j < slotEvents[ sl2 ].length; j++) {
					// compara onsets e offsets
					// verifica se o ataque da nota_j está dentro da duração da nota_i
					var onset2 = slotEvents[ sl2 ][ j ].onset * sf2;
					var onset1 = slotEvents[ sl1 ][ i ].onset * sf1;
					var offset1 = slotEvents[ sl1 ][ i ].offset * sf1;
					var addNote = false;
					if( onset2  >= onset1 && onset2 <= offset1) {
						
						var midi1 = slotEvents[ sl1 ][ i ].MIDI;
						var midi2 = slotEvents[ sl2 ][ j ].MIDI;
						var midi3 = 0;
						var pc1 = midi1 % 1200;
						var pc2 = midi2 % 1200;
						
						switch(bpMode) {
						case 0: // all band pass: pass if inside
							midi3 = midi2;
							addNote = true;
							break;
						case 3: // round MIDI2 to MIDI1
							midi3 = midi1;
							addNote = true;
							break;
						case 4: // round MIDI2 to near MIDI1 pc set
							var midiDistance = midi2-midi1;
							var midiD = (pc2 - pc1)*1200;
							var midi3a = midi1;
							if(midiDistance>1200) midi3a = midi2 - midiD;
							if(midiDistance<-1200) midi3a = midi2 - midiD;
							midi3 = midi3a;
							addNote = true;
							break;
						case 1: // band pass MIDI2 pass if equal to MIDI1
							if(midi1 == midi2) addNote = true;
							midi3 = midi2;
							break;
						case 2: // band pass PC pass if equal PC
							if(pc1 == pc2) addNote = true;
							midi3 = midi2;
							break;
						default:							
							//
							break;			
							
						}
						if( addNote ) {
							k++;
							slotEvents[ sl3 ][ k ] = new Array();
							slotEvents[ sl3 ][ k ].MIDI = midi3;
							slotEvents[ sl3 ][ k ].onset = slotEvents[ sl2 ][ j ].onset * sf2 * scaleFactor;
							slotEvents[ sl3 ][ k ].dur = slotEvents[ sl2 ][ j ].dur * sf2 * scaleFactor;
							slotEvents[ sl3 ][ k ].offset = slotEvents[ sl2 ][ j ].offset * sf2 * scaleFactor;
							slotEvents[ sl3 ][ k ].voice = slotEvents[ sl1 ][ i ].voice;
							
							slotEvents[ sl3 ].timeLength = Math.max(slotEvents[ sl3 ].timeLength, slotEvents[ sl3 ][ k ].offset);
							
							slotEvents[ sl3 ].numvoices = Math.max(slotEvents[ sl3 ].numvoices, slotEvents[ sl3 ][ k ].voice);
						}
					}
				}
				
				
				
			} else {
				post("\n>>No slot ",sl2,"\n");
			};
			
		}
		post("\Found ",k," notes.");
		outlet(0, "toBachRoll", "clear" );
		outlet(0, "toBachRoll", "numvoices", slotEvents[ sl3 ].numvoices );				
		info( sl3 );

	}  else {
		post("\n>>No slot ",sl1,"\n");
	}
	
}
// =============================================================
function info( sl1 ) {
	
	var infoSl = sl1;
	outlet(0, "toBachRoll", "clear" );
	
	outlet(0, "toBachRoll", "keys", "C" );
	if( slotEvents[ infoSl ] ) {
		post("\nInfo for slot : ",infoSl," ; L=",slotEvents[ infoSl ].length," - time length : ",slotEvents[ infoSl ].timeLength,"\n");
		
		var numvoices = 1;
		for( var i = 0; i < slotEvents[ infoSl ].length; i++) {
			numvoices = Math.max(slotEvents[ infoSl ][ i ].voice,numvoices);
		}
		outlet(0, "toBachRoll", "numvoices", numvoices );
		for( var i = 0; i < slotEvents[ infoSl ].length; i++) {
			
			send2BachRoll( slotEvents[ infoSl ][ i ].voice, slotEvents[ infoSl ][ i ].onset, slotEvents[ infoSl ][ i ].MIDI, slotEvents[ infoSl ][ i ].dur, 100);
			
		}
	}
	
}
// =============================================================
function infopost( sl1 ) {
	// not in use - just for control purposes
	var infoSl = sl1;
	if( slotEvents[ infoSl ] ) {
		post("\nInfo for slot : ",infoSl," ; L=",slotEvents[ infoSl ].length," - time length : ",slotEvents[ infoSl ].timeLength,"\n");
		for( var i = 0; i < slotEvents[ infoSl ].length; i++) {
			
			post( "\n>>",slotEvents[ infoSl ][ i ].voice, slotEvents[ infoSl ][ i ].onset, " note: ", slotEvents[ infoSl ][ i ].MIDI, slotEvents[ infoSl ][ i ].dur);
			
		}
	}
	
}
