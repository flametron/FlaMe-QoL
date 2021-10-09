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
		Logger.info(`Loaded the Overweight stuff`);
		this.applyTheMods();
	}
	applyTheMods(){
		
        const config = require("../config/config.json");
        const database = DatabaseServer.tables;
        const globals = database.globals.config;
        const items = database.templates.items;

		


		if(config.useMasterForWeightLimit){
			globals.Stamina.WalkOverweightLimits.x = config.masterWeightLimit;
			globals.Stamina.WalkOverweightLimits.y = config.masterWeightLimit;
			globals.Stamina.BaseOverweightLimits.x = config.masterWeightLimit;
			globals.Stamina.BaseOverweightLimits.y = config.masterWeightLimit;
			globals.Stamina.SprintOverweightLimits.x = config.masterWeightLimit;
			globals.Stamina.SprintOverweightLimits.y = config.masterWeightLimit;
			globals.Stamina.WalkSpeedOverweightLimits.x = config.masterWeightLimit;
			globals.Stamina.WalkSpeedOverweightLimits.y = config.masterWeightLimit;

		}
		else{
			globals.Stamina.WalkOverweightLimits.x = config.separateWeightLimits.WalkOverweightLimits.x;
			globals.Stamina.WalkOverweightLimits.y = config.separateWeightLimits.WalkOverweightLimits.y;
			globals.Stamina.BaseOverweightLimits.x = config.separateWeightLimits.BaseOverweightLimits.x;
			globals.Stamina.BaseOverweightLimits.y = config.separateWeightLimits.BaseOverweightLimits.y;
			globals.Stamina.SprintOverweightLimits.x = config.separateWeightLimits.SprintOverweightLimits.x;
			globals.Stamina.SprintOverweightLimits.y = config.separateWeightLimits.SprintOverweightLimits.y;
			globals.Stamina.WalkSpeedOverweightLimits.x = config.separateWeightLimits.WalkSpeedOverweightLimits.x;
			globals.Stamina.WalkSpeedOverweightLimits.y = config.separateWeightLimits.WalkSpeedOverweightLimits.y;
		}
		// FOG REMOVE
		if (config.noFog) {
			WeatherConfig.weather.fog.max = 0.002;

		}
		//CHange money stacks
		if (config.changeMoneyStack){
			for (let i in items){
					if (items[i]._id === "5449016a4bdc2d6f028b456f")
						items[i]._props.StackMaxSize = config.stacks.rubles;
					if (items[i]._id === "5696686a4bdc2da3298b456a")
						items[i]._props.StackMaxSize = config.stacks.dollars;
					if (items[i]._id === "569668774bdc2da2298b4568")
						items[i]._props.StackMaxSize = config.stacks.euros;
			}
		}
		// Christmas and Halloween
		if (config.EnableChristmas || config.EnableHalloween ){
			if (config.EnableChristmas && config.EnableHalloween){
				Logger.log(`[QoL] Christmas and Halloween events - enabled`,"white","green");
				globals.EventType = ["Christmas", "Halloween"];
			}
			else if (config.EnableChristmas) {
				Logger.log(`[QoL] Christmas event - enabled`,"white","green");
				globals.EventType = ["Christmas"];
			}
			else if (config.EnableHalloween) {
				Logger.log(`[QoL] Halloween event - enabled`,"white","green");
				globals.EventType = ["Halloween"];
			}	
		}
		// add my favourite sights
		setTimeout(this.addSights,2000);
	}

	addSights(){
		
        const items = DatabaseServer.tables.templates.items;
		const frontsights = ["5d3eb536a4b9363b1f22f8e2","5c07b36c0db834002a1259e9","5f3e78a7fbf956000b716b8e","5a7d90eb159bd400165484f1","5e8708d4ae379e67d22e0102","5a7d9104159bd400134c8c21"];
		const rearsights = ["5c07b3850db834002330045b","5d3eb4aba4b93650d64e497d","5f3e7897ddc4f03b010e204a","5a7d9122159bd4001438dbf4","5a7d912f159bd400165484f3"];
		for (let i in items){
			if (items[i]._parent === "55818a104bdc2db9688b4569")
				for(let j in items[i]._props.Slots)
					if(items[i]._props.Slots[j]._name==="mod_sight_front"){
						for(let sght in frontsights)
							items[i]._props.Slots[j]._props.filters[0].Filter.push(frontsights[sght]);
					}
			if (items[i]._parent === "55818a304bdc2db5418b457d")
				for(let j in items[i]._props.Slots)
					if(items[i]._props.Slots[j]._name==="mod_sight_rear"){
						for(let sght in rearsights)
							items[i]._props.Slots[j]._props.filters[0].Filter.push(rearsights[sght]);
					}
		}
		Logger.info(`CUSTOM SIGHTS ADDED`);
	}
}

module.exports.myEdits = fuckIt;
