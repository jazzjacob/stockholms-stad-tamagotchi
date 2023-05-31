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
import SingleRowText from '../text-objects/SingleRowText'

export default function RenderLevel() {
	const [level, setLevel] = useState(null);
	const [currentLevelId, setCurrentLevelId] = useRecoilState(currentLevelIdAtom);
	const [currentView, setCurrentView] = useRecoilState(currentViewAtom);
	const [notificationSteps, setNotificationSteps] = useState(null)
	
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
	
	useEffect(() => {
		setNotificationSteps(null)
	}, [])
	
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
	
	function handleAButton() {
		console.log('A button')
		console.log(level.placements[0])
		level.placements[0].collect()
		level.placements[1].collect()
		
		if (notificationSteps == null) {
			setNotificationSteps(0)
		} else if (notificationSteps + 1 === 3) {
			console.log("HÄR SKA VI SÄTTA DATA TILL EN GLOBAL STATE OM SAMRÅDSMÖTE")
			setCurrentLevelId("DemoLevel1");
			setNotificationSteps(null);
		} else {
			setNotificationSteps(notificationSteps + 1)
		}
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
			<p>{notificationSteps !== null && notificationSteps}</p>
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
				{currentLevelId === "DemoLevel3" && (
					
					<>
						{notificationSteps === null ? (
							<SingleRowText text={'Press'} level={level} />
						) : (
							<>
								<div style={{
									position: 'absolute',
									fontSize: '6px',
									letterSpacing: '0.5px',
									left: '16px',
									padding: '2px',
									top: '16px'
									
								}}>
									{notificationSteps == 0 && (
										<>
											<p>{'>> SAMRADSMOTE! <<'}</p>
											<p>Projekt:</p>
											<p>STUDENT- OCH FORSKARBOSTADER</p>
											<p>Norra Djurgarden</p>
										</>
									)}
									{notificationSteps == 1 && (
										<>
											<p>{'>> SAMRADSMOTE! <<'}</p>
											<p style={{margin: '0px'}}>
												STUDENT- OCH FORSKARBOSTADER
											</p>
											<p>
												Spara samradet?
											</p>
										</>
									)}
									{notificationSteps == 2 && (
										<>
											<p>{'>> SAMRADSMOTE! <<'}</p>
											<p style={{margin: '0px'}}>
												STUDENT- OCH FORSKARBOSTADER
											</p>
											<p>
												SPARAT!
											</p>
											<p style={{margin: '0px'}}>
												I din lista
											</p>
										</>
									)}
								</div>
								<SingleRowText text={'Fortsatt'} level={level} />
							</>
						)}
						<button
							onClick={() => handleAButton()}
							style={{
								position: 'absolute',
								top: '115px',
								left: '60px',
								height: "12px",
								fontSize: "6px"
							}}
						>
							A
						</button>
					</>
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