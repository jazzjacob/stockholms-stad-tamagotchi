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
import { useRecoilValue, useRecoilState } from 'recoil';
import { currentLevelIdAtom } from '../../atoms/currentLevelIdAtom';
import { currentViewAtom } from '../../atoms/currentViewAtom';
import TextList from '../text-objects/TextList';
import Map from '../map/Map';

export default function RenderLevel() {
	const [level, setLevel] = useState(null);
	const [currentLevelId, setCurrentLevelId] = useRecoilState(currentLevelIdAtom);
	const [currentView, setCurrentView] = useRecoilState(currentViewAtom);
	
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
	
	// HANDLE LEVEL SWITCHING
	useEffect(() => {
		console.log("Current view: ", currentView)
		if (currentView == 0) {
			setCurrentLevelId("DemoLevel1")
		}
		if (currentView == 1) {
			setCurrentLevelId("DemoLevel2");
		}
		
	}, [currentView]);
	
	if (!level) {
		return null;
	}
	
	function toggleLevel() {
		console.log("Toggling level")
		if (currentLevelId == "DemoLevel1") {
			setCurrentLevelId("DemoLevel3");
		} else {
			setCurrentLevelId("DemoLevel1");
		}
		console.log(currentLevelId)	
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
			>Current level: {currentLevelId}</p>
			{(currentLevelId === "DemoLevel1" || currentLevelId === "DemoLevel3") && (	
				<button onClick={() => toggleLevel()} style={{width: "100px", marginBottom: "12px"}}>Toggle level</button>
			)}
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
			<Map />
			<MenuRow />
			{/*<FlourCount level={level} />*/}
			{level.isCompleted && <LevelCompleteMessage />}
		</div>
		</>
	);
}