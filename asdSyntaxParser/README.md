# Syntax Parser
Utility to split an incoming line containing a list of commands programmed in Max.

Design and programming<br>
Antonio de SOUSA DIAS<br>
a.sousadias@belasartes.ulisboa.pt


## Description:
These patches (version1 and version2) split an incoming line containing a list of commands.<br/>
 Each version can read a file containing a list of events where each event contains one or more commands to process.<br/>
Each line or event is parsed according to a simple syntax defined by the user and stored in a separate text file and the output consists of as many lines as commands contained in the input line.<br/>

### Aim
The aim was to allow the control of a device in an easier way: a gesture triggers the reading of a single line containing several commands. In addition, each commands can be located anywhere in this line.<br/> 
Indeed, in 2002, I encountered a problem for the programming of Jorge Peixinho's Sax Blue: the absence of a similar device led me to program a single line instruction method to control the use of a Korg SE500 simulacrum (Sousa Dias 2009) which was very rigid. With syntax parser, when you need to trigger a gesture composed of multiple actions, a line containing multiple commands is used. This allows for greater efficiency regarding the creation, editing and debugging of commands.<br/>

This means you can program your own language containing  different length commands and trigger instructions in a <coll> object.<br/>
There's no need to write each action in a line in any specific order. Moreover, you can input data from an external editor patch or by other mean.<br/>

### Grammar definition
This general purpose language parser requires that a score (text) must comply the following grammar definition:<br/>

- Score ::= Line ';' [\<cr\> Line ';']*<br/>
(means that a score is a list of lines)<br/>

- Line ::= lineNumber , Action [, Action]*<br/>
(each line has a line number, followed by a comma, followed by one or more actions, ending with a dot-comma)<br/>

- Action ::= Keyword [Parameter [ Parameter]*]<br/>
(an action is simply a symbol, \<loop\>, \<uncleBennie\>, etc. It can be followed by parameters. Note there are no commas in between)<br/>

- lineNumber ::= <positive integer including 0><br/>
- Keyword ::= \<symbol\><br/>
- Parameter ::= \<symbol\>|\<float\>|\<integer\><br/>
- \<cr\> - carriage return<br/>

OBS: Note that brackets [ ] mean that stuff inside is optional, [ ]* means that stuff inside is optional and can be repeated.<br/>

An example of a __syntax file__:<br/>
`loop, 1;` (means keyword _loop_ must be followed by one parameter)<br/>
`liss-x, 4;` (means keyword _liss-x_ must be followed by four parameters)<br/>
`liss-y, 4;` (means keyword _liss-y_ must be followed by four parameters)<br/>
`point, 2;` (means keyword _point_ must be followed by two parameters)<br/>

Example of a score file that complies with the above grammar:<br/>
`1, _loop_ sample liss-x 2 2 2 2 liss-y 3 3 3 3 point -1. 0.75 loop 1;`<br/>
`2, liss-x 1 2 3 4 loop boink;`<br/>
`3, liss-y 3 3 3 3  point 2. 2.;`<br/>

## Operation Mode
Define a syntax file (see _SYNTAX.txt_ for example)<br/>
Create a text file with events containing commands to be triggered.<br/>
Instantiate a new _asd.syntaxParser1_ or  _asd.syntaxParser2_. Must have as argument your syntax filename.<br/>
In __version 1__ you must refer the coll containing the events.  __version 2__ is more flexible: you send each line directly.<br/>
See the _asd.syntaxParser.maxhelp_ patch to test and play around.<br>

## Patch List
- asd.syntaxParser.maxhelp - main patch help.
- asd.syntaxParser1.maxpat - main patch version 1.
- asd.syntaxParser2.maxpat - main patch version 2.
- asdSPhelp.txt - help description file: syntax definition.
- SYNTAX.txt - syntax example file.


## Revision history
- 2018, December 29: Initial release on GitHub.
- 2002: First design and programming.

## Disclaimer:
These patches are distributed in the hope that they will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.<br>




Universidade de Lisboa, Faculdade de Belas-Artes<br>
Largo da Academia Nacional de Belas-Artes<br>
1249-058 Lisboa, Portugal<br>
http://www.belasartes.ulisboa.pt/

www.sousadias.com
