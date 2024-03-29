import {
	PLACEMENT_TYPE_HERO,
	PLACEMENT_TYPE_GOAL,
	PLACEMENT_TYPE_WALL,
	PLACEMENT_TYPE_CELEBRATION,
	PLACEMENT_TYPE_FLOUR,
	PLACEMENT_TYPE_ARROW,
	PLACEMENT_TYPE_ICON
} from '../helpers/consts';
 import { HeroPlacement } from "../game-objects/HeroPlacement";
 import { GoalPlacement } from "../game-objects/GoalPlacement";
 import { WallPlacement } from "../game-objects/WallPlacement";
 import { FlourPlacement } from "../game-objects/FlourPlacement";
 import { CelebrationPlacement } from "../game-objects/CelebrationPlacement";
 import { ArrowPlacement } from '../game-objects/ArrowPlacement';
 import { IconPlacement } from '../game-objects/IconPlacement';
 
 const placementTypeClassMap = {
		[PLACEMENT_TYPE_HERO]: HeroPlacement,
		[PLACEMENT_TYPE_GOAL]: GoalPlacement,
		[PLACEMENT_TYPE_WALL]: WallPlacement,
		[PLACEMENT_TYPE_FLOUR]: FlourPlacement,
		[PLACEMENT_TYPE_CELEBRATION]: CelebrationPlacement,
		[PLACEMENT_TYPE_ARROW]: ArrowPlacement,
		[PLACEMENT_TYPE_ICON]: IconPlacement
	};

class PlacementFactory {
	createPlacement(config, level) {
		const placementClass = placementTypeClassMap[config.type];
		if (!placementClass) {
			console.warn("NO TYPE FOUND", config.type);
		}
		// Generate a new instance with random ID
		const instance = new placementClass(config, level);
		instance.id = Math.floor(Math.random() * 9999999) + 1;
		return instance;
	}
}

export const placementFactory = new PlacementFactory();