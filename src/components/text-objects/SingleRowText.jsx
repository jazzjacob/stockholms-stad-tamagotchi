import { useEffect } from 'react';
import {  currentLevelIdAtom } from '../../atoms/currentLevelIdAtom';
import { useRecoilState } from 'recoil';

export default function SingleRowText({ text, level }) {
	const [currentLevelId, setCurrentLevelId] = useRecoilState(currentLevelIdAtom);
	
	useEffect(() => {
		if (3 <= level.placements.length) {
			level.placements[2].setIcon("A_BUTTON");
		}
		console.log(level.placements)
	}, [level.placements]);
	
	return (
		<div style={{
			position: 'absolute',
			height: '16px',
			width: `${16*2}px`,
			fontSize: '5px',
			letterSpacing: '0.5px',
			left: `${16 * 2}px`,
			top: `${16 * 5}px`,
			paddingLeft: '2px',
			paddingRight: '2px',
			display: 'flex',
			justifyContent: 'right',
			alignItems: 'center',
		}}>
			{text}
		</div>
	);
}