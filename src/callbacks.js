"use strict";

class Callbacks {

    constructor() {
        HttpRouter.onStaticRoute["/client/game/start"].aki = this.giveEnergyHydration.bind(this);
        HttpRouter.onStaticRoute["/client/game/logout"].aki = this.resetEnergyHydration.bind(this);
        this.config = require('../config/config.json');
    }

    giveEnergyHydration(url, info, sessionID) {
        const config = require("../config/config.json");
        if(config.changeHealth){
            const PMC = ProfileController.getPmcProfile(sessionID); 
            const health = PMC.Health; 
            if(config.health.changeEnergy){
                health.Energy.Maximum=config.health.energy;
                health.Energy.Current=config.health.energy;
                Logger.log(`Energy Changed`,"white","green");
            }
            if(config.health.changeHydration){
                health.Hydration.Maximum=config.health.hydration;
                health.Hydration.Current=config.health.hydration;
                Logger.log(`Hydration Changed`,"white","green");
            }
        }
        const bodyParts = config.GodMode.bodyParts; 

        if (config.GodModeEnabled) { 
            const PMC = ProfileController.getPmcProfile(sessionID); 
            const pmcBodyParts = PMC.Health.BodyParts; 
            for (let bodyPart in pmcBodyParts) {
                Logger.log(`Give God:${bodyPart}`,"white","green");

                pmcBodyParts[bodyPart].Health.Maximum = bodyParts[bodyPart];
                pmcBodyParts[bodyPart].Health.Current = bodyParts[bodyPart];
            }
        }
        
        return HttpResponse.nullResponse();
    }

    resetEnergyHydration(url, info, sessionID) {
        const config = require("../config/config.json");
        const defaults = require('../src/defaults.json');
        if(config.changeHealth){
            const PMC = ProfileController.getPmcProfile(sessionID); 
            const health = PMC.Health; 
            if(config.health.changeEnergy){
                health.Energy.Maximum=defaults.health.energy;
                health.Energy.Current=defaults.health.energy;
                Logger.log(`Energy Defaulted`,"white","red");
            }
            if(config.health.changeHydration){
                health.Hydration.Maximum=defaults.health.hydration;
                health.Hydration.Current=defaults.health.hydration;
                Logger.log(`Hydration Defaulted`,"white","red");
            }
        }
        const bodyParts = defaults.Health.bodyParts;

        if (this.config.GodModeEnabled) {
            const PMC = ProfileController.getPmcProfile(sessionID);
            const pmcBodyParts = PMC.Health.BodyParts;
            for (let bodyPart in pmcBodyParts) {
                Logger.log(`Take God:${bodyPart}`,"white","red");

                pmcBodyParts[bodyPart].Health.Maximum = bodyParts[bodyPart];
                pmcBodyParts[bodyPart].Health.Current = bodyParts[bodyPart];
            }
        }
        return HttpResponse.nullResponse();
    }
}

module.exports.Callbacks = Callbacks; 