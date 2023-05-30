import { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { currentViewAtom } from '../../atoms/currentViewAtom';
import { currentLevelIdAtom } from '../../atoms/currentLevelIdAtom';
import LevelsMap from '../../levels/LevelsMap';
import { ARROW_TILES_MAP } from '../../helpers/consts';
import { mapDataAtom } from '../../atoms/mapDataAtom';
import { defaultValuesAtom } from '../../atoms/defaultValuesAtom';


export default function TextList({ level }) {
	const [currentId, setCurrentId] = useRecoilState(currentLevelIdAtom);
	const [defaultValues, setDefaultValues] = useRecoilState(defaultValuesAtom);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [navigationStarted, setNavigationStarted] = useState(false);
	const [currentArrowIndex, setCurrentArrowIndex] = useState(0);
	const previousDirection = useRef(null);
	
	//const mapData = useRecoilValue(mapDataAtom);
	const [mapData, setMapData] = useRecoilState(mapDataAtom);
	const array = Object.keys(ARROW_TILES_MAP);
	
	const projectList = [
		{name: "Slussen", listedDefaultDistance: 0.1, defaultDistance: 144, direction: "DOWN_RIGHT", scale: 2},
		{name: "Albano", listedDefaultDistance: 4, defaultDistance: 417,direction: "UP", scale: 4},
		{name: "Kista", listedDefaultDistance: 7, defaultDistance: 732, direction: "UP_LEFT", scale: 6},
	];
	
	useEffect(() => {
		console.log(level.placements)
		//if (!level.placements[0].hasBeenCollected) {
			//level.placements[0].unCollect();			
		//}
		setCurrentIndex(0);
		setDefaultValues({
			distance: projectList[0].defaultDistance,
			direction: projectList[0].direction,
			scale: projectList[0].scale
		});
	}, []);
	
	useEffect(() => {
		setDefaultValues({
			distance: projectList[currentIndex].defaultDistance,
			direction: projectList[currentIndex].direction,
			scale: projectList[currentIndex].scale
		});
	}, [currentIndex])
	
	useEffect(() => {
		if (mapData) {
			//console.log(previousDirection.current)
			if (previousDirection.current !== mapData.direction) {
				//level.placements[0].setArrowDirection("UP");
				level.placements[0].setArrowDirection(getArrowIndexFromDirection(mapData.direction));
				//level.placements[0].setArrowDirection(array[mapData.direction - 1]);
				console.log(array[mapData.direction - 1]);
				console.log("EY YO")
			}
			previousDirection.current = mapData.direction;
		} else if (defaultValues) {
			level.placements[0].setArrowDirection(defaultValues.direction)
		}
		//console.log(mapData)
	}, [mapData]);
	
	function getArrowIndexFromDirection(direction) {
		switch (direction) {
			case "1":
				return "DOWN_LEFT";
			case "2":
			return "LEFT";
			case "3":
			return "UP_LEFT";
			case "4":
			return "UP";
			case "5":
			return "UP_RIGHT";
			case "6":
			return "RIGHT";
			case "7":
				return "DOWN_RIGHT";
			default:
				return "DOWN";
		}
	}
	
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
							<div>{projectList[currentIndex].listedDefaultDistance} km</div>
						</>
					) : (
						<>
							{projectList.map((projectItem, index) => {
								if (index === currentIndex) {
									return <p>>{projectItem.listedDefaultDistance}km {projectItem.name}</p>
								}
								return <p>{projectItem.listedDefaultDistance}km {projectItem.name}</p>
							})}
						</>
					)}
					{ mapData && (
						<>
							<p style={{marginTop: "12px"}}>{mapData.direction}</p>
							<p>Distance: {mapData.distance ? mapData.distance * defaultValues.scale : defaultValues.distance} m</p>
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