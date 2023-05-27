import { useEffect, useState } from 'react';
import styles from './RenderLevel.module.css';
import Sprite from '../object-graphics/Sprite';
import { CELL_SIZE, LEVEL_THEMES, THEME_BACKGROUNDS } from '../../helpers/consts.js';
import LevelBackgroundTilesLayer from './LevelBackgroundTilesLayer';
import LevelPlacementsLayer from './LevelPlacementsLayer'
import { LevelState } from '../../classes/LevelState';
import MenuRow from '../menu-row/MenuRow';
import FlourCount from "../hud/FlourCount";
import LevelCompleteMessage from "../hud/LevelCompleteMessage";
import { useRecoilValue } from 'recoil';
import { currentLevelIdAtom } from '../../atoms/currentLevelIdAtom';
import TextList from '../text-objects/TextList';

export default function RenderLevel() {
	const [level, setLevel] = useState(null);
	const currentLevelId = useRecoilValue(currentLevelIdAtom);
	
	useEffect(() => {
		// Create and subscribe to state changes
		const levelState = new LevelState(currentLevelId, newState => {
			setLevel(newState);
		})
		
		// Get initial state
		setLevel(levelState.getState());
		
		// Destroy method when this component unmounts for cleanup
		return () => {
			levelState.destroy();
		}
	}, [currentLevelId]);
	
	if (!level) {
		return null;
	}
	
	return (
		<>
		<div
			className={styles.fullScreenContainer}
			style={{
				backgroundColor: THEME_BACKGROUNDS[level.theme],
			}}
		>
			<p
				style={{margin: 0}}
			>hello</p>
			<div
				className={styles.gameScreen}
				style={{
					width: `${16*7}px`
				}}
			>
				<LevelBackgroundTilesLayer level={level} />
				<LevelPlacementsLayer level={level} />
				{currentLevelId === "DemoLevel2" && (
					<TextList level={level} />
				)}
			</div>
			<MenuRow />
			{/*<FlourCount level={level} />*/}
			{level.isCompleted && <LevelCompleteMessage />}
		</div>
		</>
	);
}