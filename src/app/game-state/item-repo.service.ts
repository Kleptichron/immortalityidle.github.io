import { Injectable, Injector } from '@angular/core';
import { ActivityService } from '../activity-panel/activity.service';
import { LogService } from '../log-panel/log.service';
import { CharacterService } from './character.service';
import { HomeService } from './home.service';
import { Item, ItemType } from './inventory.service';

@Injectable({
  providedIn: 'root'
})
export class ItemRepoService {
  homeService?: HomeService;
  activityService?: ActivityService;

  rice: Item = {
    id: 'rice',
    name: 'rice',
    type: 'food',
    value: 1,
    description: 'A basic staple of life. One pouch will sustain you for a day.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      this.characterService.characterState.checkOverage();
    },
  };

  cabbage: Item = {
    id: 'cabbage',
    name: 'cabbage',
    type: 'food',
    value: 5,
    description: 'A simple, healthy vegetable.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly and helps you be healthy.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      if (Math.random() < 0.01){
        this.characterService.characterState.status.health.max++;
      }
      this.characterService.characterState.checkOverage();
    },
  };

  beans: Item = {
    id: 'beans',
    name: 'beans',
    type: 'food',
    value: 10,
    description: 'A handful of healthy vegetables.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly and helps you be healthy.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      if (Math.random() < 0.02){
        this.characterService.characterState.status.health.max++;
      }
      this.characterService.characterState.checkOverage();
    },
  };

  broccoli: Item = {
    id: 'broccoli',
    name: 'broccoli',
    type: 'food',
    value: 10,
    description: 'A very healthy vegetable.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly and helps you be healthy.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      if (Math.random() < 0.05){
        this.characterService.characterState.status.health.max++;
      }
      this.characterService.characterState.checkOverage();
    },
  };

  melon: Item = {
    id: 'melon',
    name: 'melon',
    type: 'food',
    value: 15,
    description: 'A delicious fruit.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly and helps you be healthy.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      if (Math.random() < 0.1){
        this.characterService.characterState.status.health.max++;
      }
      this.characterService.characterState.checkOverage();
    },
  };

  peach: Item = {
    id: 'peach',
    name: 'peach',
    type: 'food',
    value: 20,
    description: 'A highly prized and delicious fruit.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly and can even extend your life.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      if (Math.random() < 0.2){
        this.characterService.characterState.status.health.max++;
        this.characterService.characterState.lifespan += 10;
      }
      this.characterService.characterState.checkOverage();
    },
  };

  meat: Item = {
    id: 'meat',
    name: 'meat',
    type: 'food',
    value: 50,
    description: 'Some delicious meat.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly. Can also improve your health and stamina.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      this.characterService.characterState.status.health.max++;
      this.characterService.characterState.status.stamina.max++;
      this.characterService.characterState.checkOverage();
    },
  };

  herb: Item = {
    id: 'herb',
    name: 'herb',
    type: 'ingredient',
    value: 2,
    description: 'Useful herbs. Can be used in creating pills or potions.',
    useLabel: 'Use',
    useDescription: 'Restores a bit of health.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.health.value += 5;
      this.characterService.characterState.checkOverage();
    },
  };

  log: Item = {
    id: 'log',
    name: 'log',
    type: 'wood',
    value: 1,
    description: 'A good-quality log.',
  };

  metalOre: Item = {
    id: 'metalOre',
    name: 'metal ore',
    type: 'metal',
    value: 1,
    description: 'A chunk of metal ore.',
  };

  junk: Item = {
    id: 'junk',
    name: 'junk',
    type: 'metal',
    value: 1,
    description: 'Some metal junk.',
  };

  perpetualFarmingManual: Item = {
    id: 'perpetualFarmingManual',
    name: "Manual of Perpetual Farming",
    type: "manual",
    description: "This manual teaches you to automatically replant fields when they are harvested.",
    value: 10000,
    useLabel: "Read",
    useDescription: "Permanently unlock automatic farm replanting.",
    useConsumes: true,
    use: () => {
      // check if homeService is injected yet, if not, inject it (circular dependency issues)
      if (!this.homeService){
        this.homeService = this.injector.get(HomeService);
      }
      this.homeService.autoReplant = true;
      this.logService.addLogMessage("The teachings of the manual sink deep into your soul. You'll be able to apply this knowledge in all future reincarnations.", "STANDARD");
    },
    owned: () => {
      // check if homeService is injected yet, if not, inject it (circular dependency issues)
      if (!this.homeService){
        this.homeService = this.injector.get(HomeService);
      }
      return this.homeService?.autoReplant;
    }
  };

  restartActivityManual: Item = {
    id: 'restartActivityManual',
    name: "Manual of Remembered Plans",
    type: "manual",
    description: "This manual teaches you to automatically resume activities from your previous life. Only activities that you qualify for when you reach adulthood are available to resume.",
    value: 100000,
    useLabel: "Read",
    useDescription: "Permanently unlock preserving activity plans across reincarnations.",
    useConsumes: true,
    use: () => {
      // check if actvityService is injected yet, if not, inject it (circular dependency issues)
      if (!this.activityService){
        this.activityService = this.injector.get(ActivityService);
      }
      this.activityService.autoRestart = true;
      this.logService.addLogMessage("The teachings of the manual sink deep into your soul. You'll be able to apply this knowledge in all future reincarnations.", "STANDARD");
    },
    owned: () => {
      // check if actvityService is injected yet, if not, inject it (circular dependency issues)
      if (!this.activityService){
        this.activityService = this.injector.get(ActivityService);
      }
      return this.activityService?.autoRestart;
    }
  };

  constructor(private characterService: CharacterService,
    private injector: Injector,
    private logService: LogService) { }

    getItemById(id: ItemType): Item {
      switch (id) {
        case 'beans':
          return this.beans;
        case 'broccoli':
          return this.broccoli;
        case 'cabbage':
          return this.cabbage;
        case 'herb':
          return this.herb;
        case 'junk':
          return this.junk;
        case 'log':
          return this.log;
        case 'meat':
          return this.meat;
        case 'melon':
          return this.melon;
        case 'metalOre':
          return this.metalOre;
        case 'peach':
          return this.peach;
        case 'perpetualFarmingManual':
          return this.perpetualFarmingManual;
        case 'restartActivityManual':
          return this.restartActivityManual;
        case 'rice':
          return this.rice;
        default:
          throw new Error(`Failed to get item for ID: ${id}`);
      }
    }
}
