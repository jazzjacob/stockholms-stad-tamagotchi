 import {
	 DIRECTION_UP,
	 DIRECTION_DOWN,
	 DIRECTION_RIGHT,
	 DIRECTION_LEFT,
 } from "../helpers/consts";

export class DirectionControls {
	constructor() {
		this.directionKeys = {
			ArrowDown: DIRECTION_DOWN,
		 	ArrowUp: DIRECTION_UP,
		 	ArrowLeft: DIRECTION_LEFT,
		 	ArrowRight: DIRECTION_RIGHT,
		 	s: DIRECTION_DOWN,
		 	w: DIRECTION_UP,
		 	a: DIRECTION_LEFT,
		 	d: DIRECTION_RIGHT,
		}
		
		this.heldDirections = [];
		
		this.directionKeyDownHandler = (event) => {
			const direction = this.directionKeys[event.key];
			if (direction && this.heldDirections.indexOf(direction) === -1) {
				this.heldDirections.unshift(direction);
				console.log(this.heldDirections)
			}
		}
		
		this.directionKeyUpHandler = (event) => {
			const direction = this.directionKeys[event.key];
			const index = this.heldDirections.indexOf(direction)
			if (index > -1) {
				this.heldDirections.splice(index, 1);
			}
		}
		
		document.addEventListener(
			"keydown",
			this.directionKeyDownHandler
		);
		document.addEventListener(
			"keyup",
			this.directionKeyUpHandler
		);
	}
	
	get direction() {
		return this.heldDirections[0];
	}
	
	unbind() {
		document.removeEventListener(
			"keydown",
			this.directionKeyDownHandler
		);
		document.removeEventListener(
			"keyup",
			this.directionKeyUpHandler
		);
	}
	
}