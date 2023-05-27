import Sprite from '../object-graphics/Sprite';
import { CELL_SIZE } from '../../helpers/consts';

export default function MapCell({ x, y, frameCoord }) {
	return (
			<Sprite frameCoord={frameCoord} />
	)
}