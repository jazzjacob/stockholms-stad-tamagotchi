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
	
	changeArrowDirection(direction) {
		switch (this.arrowTileCoord) {
			case ARROW_TILES_MAP.UP:
				this.arrowTileCoord = ARROW_TILES_MAP.DOWN;
				break;
			case ARROW_TILES_MAP.DOWN:
				this.arrowTileCoord = ARROW_TILES_MAP.UP;
				break;
		}
	}
 
	renderComponent() {
		return <Sprite frameCoord={this.arrowTileCoord} />;
	}
}