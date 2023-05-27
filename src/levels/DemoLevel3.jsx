 import {
	 LEVEL_THEMES,
	 PLACEMENT_TYPE_FLOUR,
	 PLACEMENT_TYPE_GOAL,
	 PLACEMENT_TYPE_HERO,
	 PLACEMENT_TYPE_WALL,
 } from "../helpers/consts";
 
 const level = {
	 theme: LEVEL_THEMES.PINK,
	 tilesWidth: 5,
	 tilesHeight: 5,
	 placements: [
		 { x: 4, y: 4, type: PLACEMENT_TYPE_HERO },
	 ],
 };
 
 export default level;