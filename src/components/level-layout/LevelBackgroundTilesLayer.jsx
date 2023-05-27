import MapCell from './MapCell';
import { THEME_TILES_MAP } from '../../helpers/consts';

export default function LevelBackgroundTilesLayer({ level }) {
	const widthWithWalls = level.tilesWidth + 1;
	const heightWithWalls = level.tilesHeight + 1;
	const tiles = THEME_TILES_MAP[level.theme];
	
	function getBackgroundTile(x, y) {
		switch (x) {
			case 0: return tiles.LEFT;
			case widthWithWalls: return tiles.RIGHT
		}
		switch (y) {
			case 0: return tiles.TOP;
			case heightWithWalls: return tiles.BOTTOM
		}
		return tiles.FLOOR;
	}
	
	let canvases = [];
	for (let y = 0 ; y <= heightWithWalls ; y++) {
		for (let x = 0 ; x <= widthWithWalls ; x++) {
			// Skip Botton Left and Bottom Right for intentional blank tile
			if (y === heightWithWalls) {
				if (x === 0 || x === widthWithWalls) {
					continue;
				}
			}
			
			// Add a cell to the map
			canvases.push(
				<MapCell
					key={`${x}_${y}`}
					x={x}
					y={y}
					frameCoord={getBackgroundTile(x, y)}
				/>
			)
		}
	} 
	
	return <>{canvases}</>;
}