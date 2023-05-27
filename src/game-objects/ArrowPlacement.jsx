import { Placement } from "./Placement";
 import Sprite from "../components/object-graphics/Sprite";
 import { ARROW_TILES_MAP } from "../helpers/consts";
 
 export class ArrowPlacement extends Placement {
	 isSolidForBody(_body) {
		 return true;
	 }
 
	 renderComponent() {
		 const arrowTileCoord = ARROW_TILES_MAP.UP;
		 return <Sprite frameCoord={arrowTileCoord} />;
	 }
 }