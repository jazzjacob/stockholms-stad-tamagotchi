import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { currentViewAtom } from '../../atoms/currentViewAtom';
import { currentLevelIdAtom } from '../../atoms/currentLevelIdAtom';
import LevelsMap from '../../levels/LevelsMap';
import { ARROW_TILES_MAP } from '../../helpers/consts';

export default function TextList({ level }) {
	const [currentId, setCurrentId] = useRecoilState(currentLevelIdAtom);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [navigationStarted, setNavigationStarted] = useState(false);
	const [currentArrowIndex, setCurrentArrowIndex] = useState(0);
	
	const projectList = [
		{name: "Slussen", distance: 0.1, direction: "DOWN_RIGHT"},
		{name: "Albano", distance: 4, direction: "UP"},
		{name: "Kista", distance: 7, direction: "UP_LEFT"},
	];
	
	useEffect(() => {
		console.log(level.placements)
		//if (!level.placements[0].hasBeenCollected) {
			//level.placements[0].unCollect();			
		//}
		setCurrentIndex(0);
	}, []);
	
	function handleUpButton() {
		const nextIndex = currentIndex - 1 < 0 ? projectList.length - 1 : currentIndex - 1;
		setCurrentIndex(nextIndex);
		level.placements[0].setArrowDirection(projectList[nextIndex].direction);
	}
	
	function handleDownButton() {
		const nextIndex = currentIndex + 1 > projectList.length - 1 ? 0 : currentIndex + 1;
		setCurrentIndex(nextIndex);
		level.placements[0].setArrowDirection(projectList[nextIndex].direction);
	}
	
	function handleOKButton() {
		console.log(projectList[currentIndex])
		
		setNavigationStarted(!navigationStarted);
		level.placements[0].unCollect();
		level.placements[0].setArrowDirection(projectList[currentIndex].direction);
		// Go to Active Level
		/*const levelsArray = Object.keys(LevelsMap);
		const currentIndex = levelsArray.findIndex(id => {
			return id === currentId;
		});
		const nextLevelId = levelsArray[currentIndex + 1] ?? levelsArray[0];*/
	}
	
	function handleArrowDisplay() {
		level.placements[0].toggleDisplay();
		console.log(level.placements[0])
	}
	
	function handleArrowDirection() {
		const array = Object.keys(ARROW_TILES_MAP);
		console.log("Changing arrow directions...")
		console.log(currentArrowIndex);
		level.placements[0].setArrowDirection(array[currentArrowIndex]);
		if (currentArrowIndex === array.length - 1) {
			console.log("HELLO")
			setCurrentArrowIndex(0);
		} else {
			console.log("THERE")
			setCurrentArrowIndex(currentArrowIndex + 1);
		}
	}
	
	return (
			<>
				<div style={{
					height: `${16*5}px`,
					width: `${16*5}px`,
					//backgroundColor: "lightgray",
					fontSize: "0.3rem",
					lineHeight: "1px",
					zIndex: 1,
					position: "absolute",
					top: `${16*1}px`,
					left: `${16*1}px`,
					border: "0.5px solid red",
					paddingLeft: "2px"
				}}>
					{navigationStarted ? (
						<>
							<p>{projectList[currentIndex].name}</p>
							<div style={{ marginBottom: "42px"}}>{projectList[currentIndex].distance} km</div>
						</>
					) : (
						<>
							{projectList.map((projectItem, index) => {
								if (index === currentIndex) {
									return <p>>{projectItem.distance}km {projectItem.name}</p>
								}
								return <p>{projectItem.distance}km {projectItem.name}</p>
							})}
						</>
					)}
				</div>
				<div style={{
					position: "absolute",
					left: "200px",
				}}>
					<p><button onClick={() => handleUpButton()}>↑</button></p>
					<p><button onClick={() => handleDownButton()}>↓</button></p>
					<button onClick={() => handleOKButton()}>OK</button>
					<button onClick={() => handleArrowDisplay()}>Arrow on/off</button>
					<button onClick={() => handleArrowDirection()}>Arrow direction</button>
				</div>
			</>
	)
}