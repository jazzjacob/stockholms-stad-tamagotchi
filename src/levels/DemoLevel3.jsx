 import {
	 LEVEL_THEMES,
	 PLACEMENT_TYPE_FLOUR,
	 PLACEMENT_TYPE_GOAL,
	 PLACEMENT_TYPE_HERO,
	 PLACEMENT_TYPE_WALL,
	 PLACEMENT_TYPE_ICON,
	 PLACEMENT_TYPE_ARROW
 } from "../helpers/consts";
 
 const level = {
	 theme: LEVEL_THEMES.GRAY,
	 tilesWidth: 5,
	 tilesHeight: 5,
	 placements: [
		 { x: 4, y: 3, type: PLACEMENT_TYPE_HERO },
		 { x: 2, y: 1, type: PLACEMENT_TYPE_ICON },
		 { x: 4, y: 5, type: PLACEMENT_TYPE_ICON }
	 ],
 };
 
 export default level;