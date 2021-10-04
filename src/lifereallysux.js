"use strict";

class fuckIt
{
    constructor()
    {
        this.mod = "Flame-MyOwnEdits";
        ModLoader.onLoad[this.mod] = this.load.bind(this);
        Logger.info(`Loading: Edits for overweight`);
    }

    load()
    {
		this.noMoreLoadLimits();
	}
	noMoreLoadLimits(){
		
        const config = require("../config/config.json");
        const database = DatabaseServer.tables;
        const globals = database.globals.config;
		
		globals.Stamina.WalkOverweightLimits.x = config.WalkOverweightLimits.x;
		globals.Stamina.WalkOverweightLimits.y = config.WalkOverweightLimits.y;
		globals.Stamina.BaseOverweightLimits.x = config.BaseOverweightLimits.x;
		globals.Stamina.BaseOverweightLimits.y = config.BaseOverweightLimits.y;
		globals.Stamina.SprintOverweightLimits.x = config.SprintOverweightLimits.x;
		globals.Stamina.SprintOverweightLimits.y = config.SprintOverweightLimits.y;
		globals.Stamina.WalkSpeedOverweightLimits.x = config.WalkSpeedOverweightLimits.x;
		globals.Stamina.WalkSpeedOverweightLimits.y = config.WalkSpeedOverweightLimits.y;
	}
}

module.exports.myEdits = fuckIt;
