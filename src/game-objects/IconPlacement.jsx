import { Placement } from "./Placement";
import Sprite from "../components/object-graphics/Sprite";
import { ICON_TILES_MAP } from "../helpers/consts";
 
export class IconPlacement extends Placement {
	constructor(hasBeenCollected) {
		super(hasBeenCollected);
		this.hasBeenCollected = false;
		this.iconTileCoord = ICON_TILES_MAP.EXCLAMATION_POINT;
	}
	 
	isSolidForBody(_body) {
		return true;
	}
	
	setIcon(icon) {
		this.iconTileCoord = ICON_TILES_MAP[icon];
	}
 
	renderComponent() {
		return <Sprite frameCoord={"0x22"} />;
	}
}