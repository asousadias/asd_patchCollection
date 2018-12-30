{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 2,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 34.0, 79.0, 1004.0, 552.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-47",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 126.0, 128.0, 163.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 126.0, 128.0, 163.0, 20.0 ],
					"text" : "must refer the coll to process"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-46",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 5.0, 104.0, 74.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 5.0, 104.0, 74.0, 22.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-45",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 693.0, 78.0, 97.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 693.0, 78.0, 97.0, 20.0 ],
					"text" : "Coll to process"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-44",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 632.0, 383.0, 139.0, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 733.0, 393.0, 341.0, 18.0 ],
					"text" : "Argument: <syntax filename>"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-43",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 486.5, 78.0, 151.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 486.5, 78.0, 151.0, 20.0 ],
					"text" : "coll is read outside patcher"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 105.5, 78.0, 153.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 105.5, 78.0, 153.0, 20.0 ],
					"text" : "coll is read inside patcher"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-41",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 693.0, 150.0, 221.0, 33.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 693.0, 150.0, 221.0, 33.0 ],
					"text" : "Each line represents an event containing several commands to trigger."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-40",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 693.0, 100.0, 221.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 693.0, 100.0, 221.0, 20.0 ],
					"text" : "Example of list of commands to process"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-36",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 455.5, 196.0, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 455.5, 196.0, 50.0, 22.0 ],
					"text" : "next"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-37",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 387.5, 155.0, 31.0, 31.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 387.5, 155.0, 31.0, 31.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.866666666666667, 0.866666666666667, 0.866666666666667, 1.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-38",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 387.5, 196.0, 56.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 387.5, 196.0, 56.0, 22.0 ],
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"triscale" : 0.9
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-35",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 673.0, 338.0, 79.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 673.0, 338.0, 79.0, 22.0 ],
					"text" : "help"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-32",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 604.5, 338.0, 58.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 604.5, 338.0, 58.0, 22.0 ],
					"text" : "read"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-33",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 539.5, 338.0, 58.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 539.5, 338.0, 58.0, 22.0 ],
					"text" : "open"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-34",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 539.5, 317.0, 117.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 539.5, 317.0, 117.0, 20.0 ],
					"text" : "SYNTAX definition"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"id" : "obj-31",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 213.0, 383.0, 139.0, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 177.0, 458.0, 341.0, 18.0 ],
					"text" : "Argument: <syntax filename>"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-30",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 387.5, 78.0, 97.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 387.5, 78.0, 97.0, 20.0 ],
					"text" : "== Version 2 =="
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-29",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 5.0, 78.0, 97.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 5.0, 78.0, 97.0, 20.0 ],
					"text" : "== Version 1 =="
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.754705,
					"id" : "obj-54",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 327.0, 7.0, 147.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 327.0, 7.0, 147.0, 21.0 ],
					"text" : "António de Sousa Dias",
					"textcolor" : [ 0.200000002980232, 0.200000002980232, 0.200000002980232, 1.0 ],
					"varname" : "autohelp_top_digest[1]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-24",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 357.0, 29.0, 119.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 357.0, 29.0, 119.0, 20.0 ],
					"text" : "www.sousadias.com"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Arial",
					"fontsize" : 18.0,
					"id" : "obj-26",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 7.0, 4.0, 350.0, 27.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 7.0, 4.0, 350.0, 27.0 ],
					"text" : "asd.syntaxParser.maxpat"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-27",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 7.0, 33.0, 345.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 7.0, 33.0, 408.0, 20.0 ],
					"text" : "Two example patches to split commands stored in a <coll> line."
				}

			}
, 			{
				"box" : 				{
					"coll_data" : 					{
						"count" : 3,
						"data" : [ 							{
								"key" : 1,
								"value" : [ "loop", "sample", "liss-x", 2, 2, 2, 2, "liss-y", 3, 3, 3, 3, "point", -1.0, 0.75, "loop", 1 ]
							}
, 							{
								"key" : 2,
								"value" : [ "loop", "boink", "liss-x", 1, 2, 3, 4 ]
							}
, 							{
								"key" : 3,
								"value" : [ "liss-y", 3, 3, 3, 3, "loop", 1 ]
							}
 ]
					}
,
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-23",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 387.5, 252.0, 120.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 387.5, 252.0, 120.0, 22.0 ],
					"saved_object_attributes" : 					{
						"embed" : 1
					}
,
					"text" : "coll An-Example",
					"textcolor" : [ 0.7843137383461, 0.996078431606293, 0.862745106220245, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-21",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 387.5, 411.0, 108.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 387.5, 411.0, 108.0, 22.0 ],
					"text" : "print Command2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-20",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 52.0, 220.0, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 52.0, 220.0, 50.0, 22.0 ],
					"text" : "next"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-18",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 188.0, 344.0, 58.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 188.0, 344.0, 58.0, 22.0 ],
					"text" : "read"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.274509803921569, 0.262745098039216, 0.607843137254902, 1.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 387.5, 381.0, 231.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 387.5, 381.0, 231.0, 22.0 ],
					"text" : "asd.syntaxParser2 SYNTAX.txt"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-6",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 5.0, 128.0, 113.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 5.0, 128.0, 113.0, 22.0 ],
					"text" : "refer An-Example",
					"textcolor" : [ 0.7843137383461, 0.996078431606293, 0.862745106220245, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"coll_data" : 					{
						"count" : 3,
						"data" : [ 							{
								"key" : 1,
								"value" : [ "loop", "sample", "liss-x", 2, 2, 2, 2, "liss-y", 3, 3, 3, 3, "point", -1.0, 0.75, "loop", 1 ]
							}
, 							{
								"key" : 2,
								"value" : [ "loop", "boink", "liss-x", 1, 2, 3, 4 ]
							}
, 							{
								"key" : 3,
								"value" : [ "liss-y", 3, 3, 3, 3, "loop", 1 ]
							}
 ]
					}
,
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 693.0, 122.0, 164.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 693.0, 122.0, 164.0, 22.0 ],
					"saved_object_attributes" : 					{
						"embed" : 1
					}
,
					"text" : "coll An-Example @embed 1",
					"textcolor" : [ 0.7843137383461, 0.996078431606293, 0.862745106220245, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-8",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 255.0, 344.0, 79.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 344.0, 79.0, 22.0 ],
					"text" : "help"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-9",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 123.0, 344.0, 58.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 123.0, 344.0, 58.0, 22.0 ],
					"text" : "open"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-10",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 69.0, 271.0, 58.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 69.0, 271.0, 58.0, 22.0 ],
					"text" : "open"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 34.0, 154.0, 31.0, 31.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 34.0, 154.0, 31.0, 31.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.866666666666667, 0.866666666666667, 0.866666666666667, 1.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-12",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 34.0, 191.0, 56.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 34.0, 191.0, 56.0, 22.0 ],
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"triscale" : 0.9
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 150.0, 234.0, 31.0, 31.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 150.0, 234.0, 31.0, 31.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-14",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 5.0, 411.0, 108.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 5.0, 411.0, 108.0, 22.0 ],
					"text" : "print Command1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-15",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 150.0, 271.0, 68.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 150.0, 271.0, 68.0, 22.0 ],
					"text" : "verbose $1"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.274509803921569, 0.262745098039216, 0.607843137254902, 1.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-16",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 5.0, 381.0, 199.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 5.0, 381.0, 199.0, 22.0 ],
					"text" : "asd.syntaxParser1 SYNTAX.txt"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-17",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 126.0, 323.0, 117.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 126.0, 323.0, 117.0, 20.0 ],
					"text" : "SYNTAX definition"
				}

			}
, 			{
				"box" : 				{
					"angle" : 0.0,
					"background" : 1,
					"grad1" : [ 0.619608, 0.701961, 0.8, 1.0 ],
					"grad2" : [ 0.9, 0.9, 0.9, 1.0 ],
					"id" : "obj-57",
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 5.0, 3.0, 469.0, 63.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 5.0, 3.0, 469.0, 63.0 ],
					"proportion" : 0.39,
					"varname" : "autohelp_top_panel"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 1 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 1 ],
					"source" : [ "obj-32", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 1 ],
					"source" : [ "obj-33", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 1 ],
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 0 ],
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-38", 0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 0 ],
					"source" : [ "obj-38", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 1 ],
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 1 ],
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "asd.syntaxParser1.maxpat",
				"bootpath" : "~/Documents/GitHub/asd_patchCollection/asdSyntaxParser",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "SYNTAX.txt",
				"bootpath" : "~/Documents/GitHub/asd_patchCollection/asdSyntaxParser",
				"patcherrelativepath" : ".",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "asd.syntaxParser2.maxpat",
				"bootpath" : "~/Documents/GitHub/asd_patchCollection/asdSyntaxParser",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
