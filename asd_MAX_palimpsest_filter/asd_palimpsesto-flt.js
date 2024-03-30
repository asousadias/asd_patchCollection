//
// =============================================================
//		ASD Palimpsest - javascript code
// =============================================================
//
// 		Antonio de Sousa Dias
// 		a.sousadias@belasartes.ulisboa.pt
//
// =============================================================
//    notes:
/*****************************************************************************************
 Originally programmed in 2002 in OpenMusic, this patch transposes to the note domain the operations of filtering and morphing that we find in the audio domain.
 His operating mode is anchored on the idea of palimpsest, and its operation mode can be described as follows:  it takes two music sequences as input (a source and a modulator) and produces a third sequence according to four main operation modes (the method parameters).

Time Scale (setTimeAdjustment $1):
    0, no time change;
    1, scale input A to time length B;
    2, scale input B to time length A;
    3, same as SF 1, scale input A to time length B, but takes last onsets as references for scaling factor;
    4, same as SF 2, scale input B to time length A, but takes last onsets as references for scaling factor.
 
 Gate Method (setMethodGate $1)
    0 adjusts note onsets and offsets to modulator events.
    1 passes only notes that have an attack inside modulator events time span.
 
 Pitch Method (setMethodPitch $1)
    0 passes all notes unchanged after de gate pass.
    1 keeps only the gated notes from the source file that are equal to the notes of the modulation file
    2 same as Method 1 but keeps notes having the same pitch class. It is thus a resulting hybridization between spectral multiplication and the use of comb filters.
    3, “rounds” all notes from the source file to the nearest notes of the modulation file
    4, same as Method 3, rounding the notes to the nearest modulation pitch class.
 
 NOTES: Requires the Bach library.
        Revision 2024 - added "gate" method as base and added scale factors on last onset.
 *****************************************************************************************/
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

var setInputTableNumber = 1;
var tabA = new TableRoll(); // Sinal de entrada
var tabA1 = new TableRoll(); // Sinal de entrada OP
var tabB = new TableRoll(); // Palimpsesto / Filtro
var tabB1 = new TableRoll(); // Palimpsesto / Filtro OP
var tabOUT = new TableRoll(); // Saída
var palimpTimeFactor = 0;
var palimpTimeFactorValue = 1; // default
var palimpMethodGate = 0;  // default
var palimpMethodPitch = 0;  // default

// =============================================================
// Event properties and definitions
// =============================================================
function TableRoll() {
    this.name = "";
    this.voice = new Array();
    this.flag = 0;
    this.nVoices = 0;
    this.endOffset = -1; // last offset
    this.endOnset = -1; // last onset
    this.printRoll = printRoll;
    this.sendRoll2BachRoll = sendRoll2BachRoll;
    this.deepCopyTable = deepCopyTable;
}
// =============================================================
function VoiceEvent() {
    this.chord = new Array();
    this.flag = 0;
    this.chordsN = -1;
}
// =============================================================
function ChordEvent(onset, voice) {
    this.onset = onset;
    this.note = new Array();
    this.flag = 0;
    this.offset =  onset;
}
// =============================================================
function NoteEvent(onset) {
    this.pc =  0;
    this.dur =  0;
    this.vel =  0;
    this.flag = 0;
    this.offset =  onset; // Chord.onset + Note.dur
}
// =============================================================
function printRoll() {
    post("> ------------------------------------------------\n");
    post("Tabela ",this.name,"  (Voices: <",this.voice.length,">; vozes: <",this.nVoices,">)\n");
    for( var v=0; v<this.voice.length; v++) {
        post("-V[ ",v," ]:\n");
        
        for( var c = 0; c < this.voice[ v ].chord.length; c++) {
            post("--Chord[ ",c," ] onset=",this.voice[ v ].chord[ c ].onset," offset=",this.voice[ v ].chord[ c ].offset,"\n");
            for( var n = 0;n<this.voice[ v ].chord[ c ].note.length;n++) {
                var pc = this.voice[ v ].chord[ c ].note[ n ].pc;
                var dur = this.voice[ v ].chord[ c ].note[ n ].dur;
                var vel = this.voice[ v ].chord[ c ].note[ n ].vel;
                var offset = this.voice[ v ].chord[ c ].note[ n ].offset;
                post("    -- <",pc," ; ",dur," ; ",vel," ; (",offset,")>\n");
            }
        }
    }
    post(" -end = ",this.endOffset,"  -- Last onset = ",this.endOnset,".\n");
    post("> ------------------------------------------------\n");
}
// =============================================================
function sendRoll2BachRoll() {
    outlet(0, "toBachRoll", "clear" );
    if(this.nVoices > 0) {
        outlet(0, "toBachRoll", "numvoices", this.nVoices );
        var tableOUT = new Array();
        var tableI = 0;
        tableOUT[ tableI ] = "roll";
        for( var v=0; v<this.voice.length; v++) {
            tableOUT[ ++tableI ] = "[";
            for( var c=0; c<this.voice[v].chord.length; c++) {
                tableOUT[ ++tableI ] = "[";
                tableOUT[ ++tableI ] = this.voice[v].chord[ c ].onset;
                for( var n=0; n<this.voice[v].chord[ c ].note.length; n++) {
                    tableOUT[ ++tableI ] = "[";
                    tableOUT[ ++tableI ] = this.voice[v].chord[ c ].note[ n ].pc;
                    tableOUT[ ++tableI ] = this.voice[v].chord[ c ].note[ n ].dur;
                    tableOUT[ ++tableI ] = this.voice[v].chord[ c ].note[ n ].vel;
                    tableOUT[ ++tableI ] = "]";
                }
                tableOUT[ ++tableI ] = "]";
            }
            tableOUT[ ++tableI ] = "]";
        }
        outlet(0, "toBachRoll", tableOUT);
    }
}
// =============================================================
function deepCopyTable( oldTable ) {
    this.flag = oldTable.flag;
    this.name = oldTable.name+"copy";
    this.nVoices = oldTable.nVoices;
    this.endOffset = oldTable.endOffset;
    this.endOnset = oldTable.endOnset;
    
    for( v = 0; v< oldTable.voice.length; v++) {
        this.voice[ v ] = new VoiceEvent();
        this.voice[ v ].flag = oldTable.voice[ v ].flag;
        this.voice[ v ].nChords = oldTable.voice[ v ].nChords;
        for( c = 0; c< oldTable.voice[v].chord.length; c++) {
            this.voice[ v ].chord[ c ] = new ChordEvent();
            this.voice[ v ].chord[ c ].onset = oldTable.voice[ v ].chord[ c ].onset;
            this.voice[ v ].chord[ c ].flag = oldTable.voice[ v ].chord[ c ].flag;
            this.voice[ v ].chord[ c ].offset = oldTable.voice[ v ].chord[ c ].offset;
            
            for( n = 0; n< oldTable.voice[v].chord[ c ].note.length; n++) {
                this.voice[ v ].chord[ c ].note[ n ] = new NoteEvent();
                this.voice[ v ].chord[ c ].note[ n ].pc = oldTable.voice[ v ].chord[ c ].note[ n ].pc;
                this.voice[ v ].chord[ c ].note[ n ].dur = oldTable.voice[ v ].chord[ c ].note[ n ].dur;
                this.voice[ v ].chord[ c ].note[ n ].vel = oldTable.voice[ v ].chord[ c ].note[ n ].vel;
                this.voice[ v ].chord[ c ].note[ n ].flag = oldTable.voice[ v ].chord[ c ].note[ n ].flag;
                this.voice[ v ].chord[ c ].note[ n ].offset = oldTable.voice[ v ].chord[ c ].note[ n ].offset;
            }
        }
    }
}
// =============================================================
//                Functions start here
// =============================================================
function loadbang(){
    outlet(0, "toBachRoll", "clear" );
    outlet(0, "toBachRoll", "numvoices", 1 );
    outlet(0, "toReset", "bang");
}
// =============================================================
function init() {
    tabA = new TableRoll();
    tabB = new TableRoll();
    tabOUT = new TableRoll();
    setInputTableNumber = 1;
    palimpTimeFactor = 0;
    palimpTimeFactorValue = 1;
    palimpMethodPitch = 0;
    palimpMethodGate = 0;
}
// =============================================================
function bang(){
    // 1 - adjust time
    setTimeAdjustment( palimpTimeFactor );
    // 2 - do PALIMP_main
    setPalimpMain();
    // 3 - send outup to roll
    tabOUT.sendRoll2BachRoll();
}

// =============================================================
function setTableFocus( i ) {
    setInputTableNumber = i;
    post("Focus ",i,"\n");
}
// =============================================================
function makeCopies() {
    tabA1 = new TableRoll();
    tabA1.deepCopyTable( tabA );
    tabB1 = new TableRoll();
    tabB1.deepCopyTable( tabB );
}
// =============================================================
function setTimeAdjustment( i ) {
    palimpTimeFactor = i;
    makeCopies();
    switch(palimpTimeFactor) {
        case 0:
            // no change
            palimpTimeFactorValue = 1;
            break;
        case 1:
            // ajustar tabA1 a duracao de tabB1
            palimpTimeFactorValue = tabB.endOffset / tabA.endOffset ;
            setAdjustmentEvents(tabA1 , palimpTimeFactorValue);
            break;
        case 2:
            // ajustar tabB1 a duracao de tabA1
            palimpTimeFactorValue = tabA.endOffset / tabB.endOffset;
            setAdjustmentEvents(tabB1 , palimpTimeFactorValue);
            break;
        case 3:
            // em teste
            palimpTimeFactorValue = tabB.endOnset/tabA.endOnset;
            setAdjustmentEvents(tabA1 , palimpTimeFactorValue);
            break;
        case 4:
            // em teste
            palimpTimeFactorValue = tabA.endOnset/tabB.endOnset;
            setAdjustmentEvents(tabB1 , palimpTimeFactorValue);
            break;
        default:
            palimpTimeFactorValue = 1;
    }
    post( "Time adj = ",palimpTimeFactor,"Time adj value = ",palimpTimeFactorValue,"\n")
}
// =============================================================
function setAdjustmentEvents(arr , adj){
    arr.endOffset  *= adj; // last offset
    arr.endOnset  *= adj; // last onset
    for( var v = 0; v < arr.voice.length; v++) {
        for( var c = 0; c < arr.voice[ v ].chord.length; c++) {
            arr.voice[ v ].chord[ c ].onset *= adj;
            arr.voice[ v ].chord[ c ].offset *= adj;
            for( var n = 0; n < arr.voice[ v ].chord[ c ].note.length; n++) {
                arr.voice[ v ].chord[ c ].note[ n ].dur *= adj;
                arr.voice[ v ].chord[ c ].note[ n ].offset *= adj;
            }
        }
    }
}
// =============================================================
function setMethodGate( i ) {
    palimpMethodGate = i;
    palimpMethodGate = Math.max(palimpMethodGate,0);
    palimpMethodGate = Math.min(palimpMethodGate,1);
    post( "Method GATE = ",palimpMethodGate,"\n");
}
// =============================================================
function setMethodPitch( i ) {
    palimpMethodPitch = i;
    palimpMethodPitch = Math.max(palimpMethodPitch,0);
    palimpMethodPitch = Math.min(palimpMethodPitch,4);
    post( "Method PITCH = ",palimpMethodPitch,"\n");
}
// =============================================================
function setPalimpMain() {
    tabOUT =  new TableRoll(); //
    tabOUT.name = "Output";
    var oChord = -1;
    var oNote = -1;
    
    
    // 1a parte - criar OUTPUT com notas GATE
    for( var vA = 0; vA < tabA1.voice.length; vA++) { // each A voice
        tabOUT.voice[ vA ] = new VoiceEvent;
        tabOUT.nVoices = tabA1.voice.length;
        oChord = -1;
        for( var cA = 0; cA < tabA1.voice[ vA ].chord.length; cA++) { // each A chord
            var iA1 = tabA1.voice[ vA ].chord[ cA ].onset;
            var iA2 = tabA1.voice[ vA ].chord[ cA ].offset;
            
            for( var vB = 0; vB < tabB1.voice.length; vB++) { // each B voice
                for( var cB = 0; cB < tabB1.voice[ vB ].chord.length; cB++) { // each B chord
                    var iB1 = tabB1.voice[ vB ].chord[ cB ].onset;
                    var iB2 = tabB1.voice[ vB ].chord[ cB ].offset;
                    
                    var setChord = true;
                    if( iA2 <= iB1) setChord = false; // chord A ends before chord B
                    if( iA1 >= iB2 ) setChord = false; // chord A starts after chord B end
                    if( palimpMethodGate == 1 ) {
                        if( iA1 < iB1 ) setChord = false; // attack of chord A starts before attack of chord B
                    }
                    
                    if( setChord ) { // chord A fits in chord B
                        oChord++;
                        // post("> V ",vA," ; C ",oChord,". tB v ",vB,"; c ",cB," ================\n");
                        // prepare adjustment of onsets and offsets
                        var ic1 = Math.max( iB1, iA1);
                        var ic2 = Math.min( iB2, iA2);
                        
                        tabOUT.voice[ vA ].chord[ oChord ] = new ChordEvent();
                        tabOUT.voice[ vA ].chord[ oChord ].onset = ic1;
                        tabOUT.voice[ vA ].chord[ oChord ].offset = ic2;
                        tabOUT.endOnset = Math.max(tabOUT.endOnset, ic1);
                        tabOUT.endOffset = Math.max(tabOUT.endOffset, ic2);
                        
                        oNote=-1;
                        for( nA = 0; nA < tabA1.voice[ vA ].chord[ cA ].note.length; nA++) { // each note
                            var nPc = tabA1.voice[ vA ].chord[ cA ].note[ nA ].pc;
                            var nDur = tabA1.voice[ vA ].chord[ cA ].note[ nA ].dur;
                            var nVel = tabA1.voice[ vA ].chord[ cA ].note[ nA ].vel;
                            var nOff = tabA1.voice[ vA ].chord[ cA ].note[ nA ].offset;
                            
                            if( iA1 < iB1 ) nDur -= (iB1 - iA1);
                            if( ic1+nDur > iB2 ) nDur = iB2-ic1;
                            
                            
                            if( nDur > 0 ) {
                                oNote++;
                                // post("> V ",vA," ; C ",oChord," (dur ",nDur,") oN ",oNote,"\n");
                                tabOUT.voice[ vA ].chord[ oChord ].note[ oNote ] = new NoteEvent();
                                tabOUT.voice[ vA ].chord[ oChord ].note[ oNote ].pc = nPc;
                                tabOUT.voice[ vA ].chord[ oChord ].note[ oNote ].dur = nDur;
                                tabOUT.voice[ vA ].chord[ oChord ].note[ oNote ].vel = nVel;
                                tabOUT.voice[ vA ].chord[ oChord ].note[ oNote ].offset = nDur + ic1;
                            }
                            
                        }
                        
                    }
                }
            }
        }
    }
    
    // 2a parte: tratamento de alturas
    for( var vO = 0; vO < tabOUT.voice.length; vO++) {
        for( var cO = 0; cO < tabOUT.voice[ vO ].chord.length; cO++) {
            var iA1 = tabOUT.voice[ vO ].chord[ cO ].onset;
            var iA2 = tabOUT.voice[ vO ].chord[ cO ].offset;
            
            for( var vB = 0; vB < tabB1.voice.length; vB++) {
                for( var cB = 0; cB < tabB1.voice[ vB ].chord.length; cB++) {
                    var iB1 = tabB1.voice[ vB ].chord[ cB ].onset;
                    var iB2 = tabB1.voice[ vB ].chord[ cB ].offset;
                    var setChord = true;
                    if( iA2 <= iB1) setChord = false; // chord A ends before chord B
                    if( iA1 >= iB2 ) setChord = false; // chord A starts after chord B end
                    
                    if(setChord) {
                        
                        switch( palimpMethodPitch ) {
                            case 0: // gate
                                break;
                            case 1: // gate & pitch
                                
                                for( var nO = tabOUT.voice[ vO ].chord[ cO ].note.length-1; nO >=0; nO--) {
                                    var nOpc = tabOUT.voice[ vO ].chord[ cO ].note[ nO ].pc;
                                    var noteExist = false;
                                    for( var nB = 0; nB < tabB1.voice[ vB ].chord[ cB ].note.length; nB++) {
                                        var nBpc = tabB1.voice[ vB ].chord[ cB ].note[ nB ].pc;
                                        if( nOpc == nBpc ) noteExist = true;
                                        break;
                                    }
                                    if( !noteExist ) {
                                        tabOUT.voice[ vO ].chord[ cO ].note.splice(nO, 1);
                                    }
                                }
                                
                                break;
                            case 2: // gate & pitch PC
                                
                                for( var nO = tabOUT.voice[ vO ].chord[ cO ].note.length-1; nO >=0; nO--) {
                                    var nOpc = tabOUT.voice[ vO ].chord[ cO ].note[ nO ].pc;
                                    var noteExist = false;
                                    for( var nB = 0; nB < tabB1.voice[ vB ].chord[ cB ].note.length; nB++) {
                                        var nBpc = tabB1.voice[ vB ].chord[ cB ].note[ nB ].pc;
                                        if( nOpc%1200 == nBpc%1200 ) noteExist = true;
                                        break;
                                    }
                                    if( !noteExist ) {
                                        tabOUT.voice[ vO ].chord[ cO ].note.splice(nO, 1);
                                    }
                                }
                                
                                break;
                            case 3: // bandpass adjust
                                
                                for( var nO = tabOUT.voice[ vO ].chord[ cO ].note.length-1; nO >=0; nO--) {
                                    var nOpc = tabOUT.voice[ vO ].chord[ cO ].note[ nO ].pc;
                                    var dist = 10000;
                                    for( var nB = 0; nB < tabB1.voice[ vB ].chord[ cB ].note.length; nB++) {
                                        var nBpc = tabB1.voice[ vB ].chord[ cB ].note[ nB ].pc;
                                        dist = Math.min( dist, Math.abs(nOpc-nBpc));
                                    }
                                    for( var nB = 0; nB < tabB1.voice[ vB ].chord[ cB ].note.length; nB++) {
                                        var nBpc = tabB1.voice[ vB ].chord[ cB ].note[ nB ].pc;
                                        if(dist == Math.abs(nOpc-nBpc)) tabOUT.voice[ vO ].chord[ cO ].note[ nO ].pc = nBpc;
                                    }
                                }
                                // need cleaning (delete repeated pitches in same chord)
                                for( var nO = tabOUT.voice[ vO ].chord[ cO ].note.length-1; nO > 0; nO--) {
                                    var nOpc = tabOUT.voice[ vO ].chord[ cO ].note[ nO ].pc;
                                    var noteExist = false;
                                    for( var nO2 = nO-1; nO2 >= 0; nO2--) {
                                        var nO2pc = tabOUT.voice[ vO ].chord[ cO ].note[ nO2 ].pc;
                                        if(nOpc == nO2pc) noteExist = true;
                                        break;
                                    }
                                    if( noteExist ) tabOUT.voice[ vO ].chord[ cO ].note.splice( nO, 1);
                                }
                                
                                break;
                            case 4: // bandpass adjust PC
                                
                                for( var nO = tabOUT.voice[ vO ].chord[ cO ].note.length-1; nO >=0; nO--) {
                                    var nOpc = tabOUT.voice[ vO ].chord[ cO ].note[ nO ].pc;
                                    var dist = 10000;
                                    var distAbs = Math.abs(dist);
                                    var distKL;
                                    var distAbsKL;
                                    for( var nB = 0; nB < tabB1.voice[ vB ].chord[ cB ].note.length; nB++) {
                                        var nBpc = tabB1.voice[ vB ].chord[ cB ].note[ nB ].pc;
                                        distKL = (nBpc % 1200) - (nOpc % 1200);
                                        distAbsKL = Math.abs(distKL);
                                        
                                        if(distAbs > distAbsKL) {
                                            distAbs = distAbsKL;
                                            dist = distKL;
                                        }
                                    }
                                    tabOUT.voice[ vO ].chord[ cO ].note[ nO ].pc += dist;
                                }
                                // need cleaning (delete repeated pitches in same chord)
                                for( var nO = tabOUT.voice[ vO ].chord[ cO ].note.length-1; nO > 0; nO--) {
                                    var nOpc = tabOUT.voice[ vO ].chord[ cO ].note[ nO ].pc;
                                    var noteExist = false;
                                    for( var nO2 = nO-1; nO2 >= 0; nO2--) {
                                        var nO2pc = tabOUT.voice[ vO ].chord[ cO ].note[ nO2 ].pc;
                                        if(nOpc == nO2pc) noteExist = true;
                                        break;
                                    }
                                    if( noteExist ) tabOUT.voice[ vO ].chord[ cO ].note.splice( nO, 1);
                                }
                                
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
    }
    
    
    // Final cleaning B - delete empty chords
    for( var vO = 0; vO < tabOUT.voice.length; vO++) {
        
        for( var cO = tabOUT.voice[ vO ].chord.length-1; cO >=0; cO--) {
            
            if( tabOUT.voice[vO].chord[ cO ].note.length == 0) {
                tabOUT.voice[vO].chord.splice(cO,1);
            }
        }
    }
    
}

// =============================================================
// SET INPUT DATA (A & B)
// =============================================================
function rollGen() {
    var aTableBase0 = arrayfromargs(arguments);
    setInputTableNumber = aTableBase0[0];
    if( isNaN(setInputTableNumber) ) {
        post("ERROR: roll destination not known\n");
    } else {
        switch( setInputTableNumber ) {
            default:
                post("ERROR: outside limits. Assigning slot 1.\n");
            case 1:
                tabA = new TableRoll();
                tabA.name = "Signal";
                fillTable2( tabA, aTableBase0);
                tabA1 = new TableRoll();
                tabA1.deepCopyTable( tabA );
                break;
            case 2:
                tabB = new TableRoll();
                tabB.name = "Modulator";
                fillTable2( tabB, aTableBase0);
                tabB1 = new TableRoll();
                tabB1.deepCopyTable( tabB );
                break;
                
        }
    }
}
// =============================================================
function fillTable2( arr , aTableBase ) {
    
    var i = 1;
    var ilevel = 0; // voice level
    var ivoiceI= -1;
    var iChordI = -1;
    var iNoteI = -1;
    arr.endOffset = 0;
    arr.endOnset = 0;
    while( i < aTableBase.length ) {
        switch( aTableBase[ i ] ) {
            case "[":
                ilevel++;
                switch(ilevel){
                    case 1: // Voice
                        ivoiceI++;
                        //post("\nVoice ",ivoiceI," - ");
                        arr.voice[ ivoiceI] = new VoiceEvent();
                        arr.nVoices = ivoiceI+1;
                        iChordI = -1;
                        break;
                    case 2: // Chord
                        iChordI++;
                        //post("Chord ",iChordI," - ");
                        arr.voice[ivoiceI].nChords = iChordI+1;
                        arr.voice[ivoiceI].chord[iChordI] = new ChordEvent();
                        arr.voice[ivoiceI].chord[iChordI].onset = aTableBase[ ++i ];
                        arr.voice[ivoiceI].chord[iChordI].offset = arr.voice[ivoiceI].chord[iChordI].onset; // init offset
                        arr.endOnset = Math.max(arr.endOnset, arr.voice[ivoiceI].chord[iChordI].onset);
                        iNoteI = -1;
                        break;
                    case 3: // Note
                        iNoteI++;
                        //post("Note ",iNoteI,"; ");
                        arr.voice[ivoiceI].chord[iChordI].note[iNoteI] = new NoteEvent();
                        arr.voice[ivoiceI].chord[iChordI].note[iNoteI].pc = aTableBase[ ++i ];
                        
                        var onset = arr.voice[ivoiceI].chord[iChordI].onset;
                        var offset = arr.voice[ivoiceI].chord[iChordI].offset;
                        var dur = aTableBase[ ++i ];
                        arr.voice[ivoiceI].chord[iChordI].note[iNoteI].dur = dur;
                        arr.voice[ivoiceI].chord[iChordI].note[iNoteI].offset = onset + dur;
                        arr.voice[ivoiceI].chord[iChordI].offset = Math.max(offset, onset + dur);
                        arr.endOffset = Math.max(arr.endOffset, onset + dur);
                        
                        arr.voice[ivoiceI].chord[iChordI].note[iNoteI].vel = aTableBase[ ++i ];
                        i++;
                        if( aTableBase[ i ] == "[" ) { // it's slot time
                            ilevel++;
                            //post("Slot: Level: ",ilevel,"\n");
                            var otherLevel = ilevel;
                            while(otherLevel <= ilevel) {
                                i++;
                                switch(aTableBase[ i ]) {
                                        case "[": ilevel++; break;
                                        case "]": ilevel--; break;
                                        default: break;
                                }
                            }
                        }
                        
                        
                        break;
                    default: // Other commands (slot time)
                        //post("Other commands: Level: ",ilevel,"\n");
                        var otherLevel = ilevel;
                        while(otherLevel <= ilevel) {
                            i++;
                            switch(aTableBase[ i ]) {
                                    case "[": ilevel++;break;
                                    case "]": ilevel--; break;
                                    default: break;
                            }
                        }
                        break;
                }
                break;
            case "]":
                switch(ilevel){
                    case 1: // Voice
                        iChordI = 0;
                        break;
                    case 2: // Chord
                        iNoteI = 0;
                        break;
                    case 3: // Note
                        break;
                };
                ilevel--;
                break;
            default: // all data
                switch(ilevel){
                    case 1: // Voice
                        arr.voice[ivoiceI].flag = aTableBase[ i ];
                        break;
                    case 2: // Chord
                        arr.voice[ivoiceI].chord[iChordI].flag = aTableBase[ i ];
                        break;
                    case 3: // Note
                        arr.voice[ivoiceI].chord[iChordI].note[iNoteI].flag = aTableBase[ i ];
                        break;
                }
                break;
        }
        i++;
    }
    if( ilevel != 0 ) post("ERRO!\n");
    
}
// =============================================================
// MAX COMMUNNICATION
// =============================================================
function infoPrint( i ) {
    setTimeAdjustment( palimpTimeFactor );
    switch( i ) {
        case 1:
            post("=== Tabela A\n");
            tabA.printRoll();
            break;
        case 2:
            post("=== Tabela B\n");
            tabB.printRoll();
            break;
        case 3:
            post("=== Tabela OUT\n");
            tabOUT.printRoll();
            break;
        case 4:
            post("=== Tabela A1\n");
            tabA1.printRoll();
            break;
        case 5:
            post("=== Tabela B1\n");
            tabB1.printRoll();
            break;
        default:
            post("ERRO: Tabela não referenciada");
    }
}
// =============================================================
function sendToRoll( i ) {
    switch( i ) {
        case 1:
            post("=== Tabela A > roll\n");
            tabA.sendRoll2BachRoll();
            break;
        case 2:
            post("=== Tabela B > roll\n");
            tabB.sendRoll2BachRoll();
            break;
        case 3:
            post("=== Tabela OUT > roll\n");
            tabOUT.sendRoll2BachRoll();
            break;
        case 4:
            post("=== Tabela A1 > roll\n");
            tabA1.sendRoll2BachRoll();
            break;
        case 5:
            post("=== Tabela B1 > roll\n");
            tabB1.sendRoll2BachRoll();
            break;
        default:
            post("ERRO: Tabela não referenciada");
    }
}
