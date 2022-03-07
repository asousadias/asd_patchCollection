// 
// =============================================================
//		ASD GlosaFig - javascript code
// =============================================================
//
// 		Antonio de Sousa Dias  		
// 		a.sousadias@belasartes.ulisboa.pt
//
// =============================================================
/*
Given as inputs<br>
- a melodic sequence as a _Cantus Firmus_ (CF) and
- a _melodic sequence_ (MS) as an ornamentation reservoir,<br>
This patch, for each two notes of the CF, computes all excerpts belonging to MS whose extreme notes form the same interval.
This technique lies somewhere between the _glosa_ technique (Ortiz 1553) and the _Gel_ technique used by composer Michael Jarrell (Szendzy 1992).
The resulting data is feed into a Bach.roll object for later use with a score editor.

References
- Ortiz, D. (1553). Trattado de Glosas. https://imslp.org/wiki/Trattado_de_Glosas_(Ortiz%2C_Diego)
- Sousa Dias, A. (2008) Two examples of free transposition of audio processing techniques to the note domain in “Dói-me o luar” and Ressonâncias – Memórias. C. Agon, G. Assayag, J. Bresson (org.), _The OM Composer´s Book 2_, Paris, IRCAM / Delatour. ISBN: 2-84426-399-2. http://recherche.ircam.fr/equipes/repmus/OMBook/
- Szendy, P. (1992). “Congruences”, in Michael Jarrel, IRCAM-Centre Pompidou, Paris.
*/
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


var listCF; // Cantus Firnus - list of midi pitches
var listGLOS; // Glose figur - list of midi pitches
var listGLOSretro;
var listRES;

var listCFdx;
var listGLOSdx;
var listGLOSretrodx;

var iCFdur = 4000;
var iGLOSdur = 125;
var iGLOStab = 2000;
var iVoices = 14;

var include_equalIntervals = true; // show same note ornamentation 
// if glosa contains two or more equal pitches

var include_diffIntervals = true; // show interval mouvement
var offset_safe = true; // add safegard to accomodate more figurs - TODO
var show_glosa = true; // add Glose figur line transposed to CF pitch - TODO
var dups_remove = true;
// =============================================================
//                Functions start here 
// =============================================================
function bang(){
	
	outlet(0, "toBachRoll", "clear" );
	if(listGLOS && listCF) {
		studyIntervals();
	} else {
		if(listCF) {  } else {post("asd_GlosaFig ERROR: list CF not defined\n");};
		if(listGLOS) {  } else {post("asd_GlosaFig ERROR: list GLOS not defined\n");};		
	}
	
}

// =============================================================
function init() {
	
}

// =============================================================
function CFdur( idur ) {
	iCFdur = idur;
	if( iCFdur < 1 ) iCFdur = 1;
}

// =============================================================
function GLOSdur( idur ) {
	iGLOSdur = idur;
	if( iGLOSdur < 1 ) iGLOSdur = 1;
}

// =============================================================
function GLOStab( idur ) {
	iGLOStab = idur;
	if( iGLOStab < 1 ) iGLOStab = 1;
}

// =============================================================
function nVoices( iv ) {
	iVoices = iv;
	if( iVoices < 2 ) iVoices = 2; // minimum of voices needed
	outlet(0, "toBachRoll", "numvoices", iVoices );
}

// =============================================================
function include_uniss( i ) {
	include_equalIntervals = true;
	if( i == 0 ) include_equalIntervals = false;
}

// =============================================================
function include_intervals( i ) {
	include_diffIntervals = true;
	if( i == 0 ) include_diffIntervals = false;
}

// =============================================================
function safe_offset( i ) {
	offset_safe = true;
	if( i == 0 ) offset_safe = false;
}
// =============================================================
function show_figur( i ) {
	show_glosa = true;
	if( i == 0 ) show_glosa = false;
	
}
// =============================================================
function remove_dups( i ) {
	dups_remove = true;
	if( i == 0 ) dups_remove = false;
}

// =============================================================
function fCF() {
	outlet(0, "toBachRoll", "clear" );
	listCF = arrayfromargs(arguments);
	
	outlet(0, "CF", listCF);
	// post("\nCF", listCF);
	setCFdx();
	
	outlet(0, "toBachRoll", "clear" );
	// FILL BACH.ROLL with CF - voice 1
	for( var i = 0; i<listCF.length; i++) {
		send2BachRoll( 1, i * iCFdur, listCF[ i ], iCFdur, 100);
	}
	
}

// =============================================================
function fGLOS() {
	
	listGLOS = arrayfromargs(arguments);
	listGLOSretro = new Array();
	for( var i=0; i<listGLOS.length; i++) listGLOSretro[ i ] = listGLOS[ listGLOS.length - 1 - i];
	
	outlet(0, "GLOS", listGLOS);
	// post("\nasd_GlosaFig GLOS-O", listGLOS);
	// post("\nasd_GlosaFig GLOS-R", listGLOSretro);
	setGLSdx();
}

// =============================================================
function setCFdx(){
	
	listCFdx = new Array();
	listCFdx[0] = listCF[0];
	
	// post("\nasd_GlosaFig ----------\nCF", 0, listCF[0], listCFdx[0]);
	for(var i = 1; i<listCF.length; i++) {
		// intervalos consecutivos
		listCFdx[i] = listCF[i]-listCF[i-1];
		
		// post("\nasd_GlosaFig CF", i, listCF[i], " interv ",listCFdx[i]);
		
	}
	// post();
}

// =============================================================
function setGLSdx(){
	
	listGLOSdx = new Array();
	listGLOSretrodx = new Array();
	// post("\nasd_GlosaFig ----------\nGLOS-O");
	// lista de listas
	//
	for(var i = 0; i<listGLOS.length; i++) {
		
		listGLOSdx[i] = new Array();
		listGLOSdx[i][0] = listGLOS[ i ];
		for(var j=1;j<listGLOS.length; j++) {
			
			var cindex = (i + j) % listGLOS.length;
			
			listGLOSdx[ i ][ j ] = listGLOS[ cindex ]-listGLOS[ i ];
			// post("\nGLdx", i, j, cindex, " interv de ", listGLOS[ i ], " a ",listGLOS[ cindex ]," : ",listGLOSdx[ i ][ j ]);
			
		}
		// intervalos em relação à primeira nota
	}	
	// post("\nasd_GlosaFig ----------\nGLOS-R");
	// lista de listas
	//
	for(var i = 0; i<listGLOSretro.length; i++) {
		
		listGLOSretrodx[i] = new Array();
		listGLOSretrodx[i][0] = listGLOSretro[ i ];
		for(var j=1;j<listGLOSretro.length; j++) {
			
			var cindex = (i + j) % listGLOSretro.length;
			
			listGLOSretrodx[ i ][ j ] = listGLOSretro[ cindex ]-listGLOSretro[ i ];
			// post("\nasd_GlosaFig GLdx", i, j, cindex, " interv de ", listGLOSretro[ i ], " a ",listGLOSretro[ cindex ]," : ",listGLOSretrodx[ i ][ j ]);
			
		}
		// intervalos em relação à primeira nota
	}	
	// post();
}

// =============================================================
function studyIntervals(){
	outlet(0, "toBachRoll", "clear" );
	
	var CF_voice_offset = 0;
	// post("\nasd_GlosaFig ----- intervalos ------");
	for( var i = 0; i<listCF.length; i++) {
		
		
		// FILL BACH.ROLL with CF - voice 1
		send2BachRoll( 1, CF_voice_offset, listCF[ i ], iCFdur, 100);
		
		// FILL BACH.ROLL with  glosa as second line - voice 2
		if(show_glosa)  {
			var testG = new Array();
			testG[ 0 ] = listCF[ i ];
			for( var r = 0; r < listGLOS.length; r++) {
				var noteGl = listCF[ i ] + (listGLOS[ r ] - listGLOS[ 0 ]);
				testG[ r ] = noteGl;
				inoteOnset = CF_voice_offset + r * iGLOSdur;
				send2BachRoll( 2, inoteOnset, noteGl, iGLOSdur, 100);
			}
		}
		
		// ========================
		
		var ii ;
		ii = i+1 ;
		
		var gOutNoteList = new Array();
		var gNlist = -1;
		
		for(var j=1;j<listGLOS.length;j++) {
			
			for(var k=1;k<listGLOS.length;k++) {
				// variantes O e I
				if( listCFdx[i+1] == listGLOSdx[ j ][ k ] && include_diffIntervals) {
					var outNoteList = new Array();
					var notaBase = listCF[ i ];
					outNoteList.push(notaBase);
					for(var l = 1; l <= k; l++) {
						var novaNota = notaBase + listGLOSdx[ j ][ l ];
						outNoteList.push(novaNota);						
					}
					gNlist++;
					gOutNoteList[ gNlist ] = outNoteList;
					
					outlet(0, "GlosaSeq", "O >", outNoteList);
				}
				if( listGLOSdx[ j ][ k ] == 0 && include_equalIntervals) {
					//post("\nExiste: ",j, k, " intervalo ", listGLOSdx[ j ][ k ]);	
					var outNoteList = new Array();
					var notaBase = listCF[ i ];
					outNoteList.push(notaBase);
					for(var l = 1; l <= k; l++) {
						var novaNota = notaBase + listGLOSdx[ j ][ l ];
						outNoteList.push(novaNota);						
					}
					gNlist++;
					gOutNoteList[ gNlist ] = outNoteList;
					
					outlet(0, "GlosaSeq", "O >", outNoteList);
				}
				// ===================================== inversões
				if( listCFdx[i+1] == -listGLOSdx[ j ][ k ] && include_diffIntervals) {
					var outNoteList = new Array();
					var notaBase = listCF[ i ];
					outNoteList.push(notaBase);
					for(var l = 1; l <= k; l++) {
						var novaNota = notaBase - listGLOSdx[ j ][ l ];
						outNoteList.push(novaNota);
					}
					gNlist++;
					gOutNoteList[ gNlist ] = outNoteList;
					
					outlet(0, "GlosaSeq", "I >", outNoteList);
				}
				
				if( listGLOSdx[ j ][ k ] == 0 && include_equalIntervals) {
					var outNoteList = new Array();
					var notaBase = listCF[ i ];
					outNoteList.push(notaBase);
					for(var l = 1; l <= k; l++) {
						var novaNota = notaBase - listGLOSdx[ j ][ l ];
						outNoteList.push(novaNota);
					}
					gNlist++;
					gOutNoteList[ gNlist ] = outNoteList;
					
					outlet(0, "GlosaSeq", "I >", outNoteList);
				}
				// ===================================== variantes R e IR
				if( listCFdx[i+1] == listGLOSretrodx[ j ][ k ] && include_diffIntervals) {
					var outNoteList = new Array();
					var notaBase = listCF[ i ];
					outNoteList.push(notaBase);
					for(var l = 1; l <= k; l++) {
						var novaNota = notaBase + listGLOSretrodx[ j ][ l ];
						outNoteList.push(novaNota);
					}
					gNlist++;
					gOutNoteList[ gNlist ] = outNoteList;
					
					outlet(0, "GlosaSeq", "R >", outNoteList);
				}
				if( listGLOSretrodx[ j ][ k ] == 0 && include_equalIntervals ) {
					var outNoteList = new Array();
					var notaBase = listCF[ i ];
					outNoteList.push(notaBase);
					for(var l = 1; l <= k; l++) {
						var novaNota = notaBase + listGLOSretrodx[ j ][ l ];
						outNoteList.push(novaNota);
					}
					gNlist++;
					gOutNoteList[ gNlist ] = outNoteList;
					
					outlet(0, "GlosaSeq", "R >", outNoteList);
				}
				// ===================================== r-inversões
				if( listCFdx[i+1] == -listGLOSretrodx[ j ][ k ]  && include_diffIntervals) {
					//post("\nExiste: ",j, k, " intervalo inv ", listGLOSdx[ j ][ k ]," -- ");
					var outNoteList = new Array();
					var notaBase = listCF[ i ];
					outNoteList.push(notaBase);
					for(var l = 1; l <= k; l++) {
						var novaNota = notaBase - listGLOSretrodx[ j ][ l ];
						outNoteList.push(novaNota);
					}
					gNlist++;
					gOutNoteList[ gNlist ] = outNoteList;
					
					outlet(0, "GlosaSeq", "IR >", outNoteList);
				}
				if( listGLOSretrodx[ j ][ k ] == 0 && include_equalIntervals) {
					//post("\nExiste: ",j, k, " intervalo inv ", listGLOSdx[ j ][ k ]," -- ");
					var outNoteList = new Array();
					var notaBase = listCF[ i ];
					outNoteList.push(notaBase);
					for(var l = 1; l <= k; l++) {
						var novaNota = notaBase - listGLOSretrodx[ j ][ l ];
						outNoteList.push(novaNota);
					}
					gNlist++;
					gOutNoteList[ gNlist ] = outNoteList;
					
					outlet(0, "GlosaSeq", "IR >", outNoteList);
				}
			}
			// fim variantes
		} // end GLOS notes
		
		
		// cycle to remove duplicates
		if( dups_remove) {
			for(var k= gNlist-1; k>0; k--) {
				// post(" k = ",k, " gNlist = ",gNlist);

				for(var r= 0; r<k; r++) {
					
					if( gOutNoteList[ k ].length == gOutNoteList[ r ].length ) {
						var eraseList = true;
						for( var s= 0; s< gOutNoteList[ k ].length; s++){
							if( !(gOutNoteList[ k ][s] == gOutNoteList[ r ][s]) ) eraseList = false;						
						}
						
					}
					if( eraseList ) {
						gOutNoteList.splice(k, 1);
						gNlist--;
						break;
					}
					
					
				}
				
				
			} // END cycle to remove duplicates
		}
		
		
		// load lines in bach.roll
		var iVoiceOnset = (show_glosa? 2 : 1);
		var iGLtab = 0;
		for(var k= 0; k<gOutNoteList.length; k++) {
			
			iVoiceOnset++;
			if( iVoiceOnset > iVoices) {
				iVoiceOnset = (show_glosa? 3 : 2);
				iGLtab++;
			}
			for( var r = 0; r < gOutNoteList[ k ].length; r++) {
				inoteOnset = CF_voice_offset + r * iGLOSdur + iGLtab * iGLOStab;
				send2BachRoll( iVoiceOnset, inoteOnset, gOutNoteList[ k ][ r ], iGLOSdur, 100);
			}
			
		}                                              
		
		if(offset_safe) {
			if( CF_voice_offset < CF_voice_offset + iGLtab * iGLOStab ) CF_voice_offset += iGLtab * iGLOStab;		
		}
		
		
		CF_voice_offset += iCFdur;
	} // end CF - i
	
	// post();
}

// =============================================================
function send2BachRoll( ivoice, ion, inot, id, iv) {
	var iOnset = ion;
	var iNote = inot * 100;
	var iVelo = iv;
	var iVoice = ivoice;
	var iDur = id;
	outlet(0, "toBachRoll", "addchord",iVoice,"[",iOnset,"[",iNote,iDur,iVelo,"]","]" );
}

