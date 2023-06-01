import { Placement } from "./Placement";
import Sprite from "../components/object-graphics/Sprite";
import { ARROW_TILES_MAP } from "../helpers/consts";
 
export class ArrowPlacement extends Placement {
	constructor(hasBeenCollected) {
		super(hasBeenCollected);
		this.hasBeenCollected = true;
		this.arrowTileCoord = ARROW_TILES_MAP.DOWN;
	}
	 
	isSolidForBody(_body) {
		return true;
	}
	
	setArrowDirection(direction) {
		this.arrowTileCoord = ARROW_TILES_MAP[direction];
	}
 
	renderComponent() {
		return <Sprite frameCoord={this.arrowTileCoord} />;
	}
}