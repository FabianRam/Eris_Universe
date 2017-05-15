#pragma strict

public var crystalUpgradeProgressBar:UnityEngine.UI.Image[];
public var junkUpgradeProgressBar:UnityEngine.UI.Image[];

public var junkRepairProgressBar:UnityEngine.UI.Image[];

public var upgradeScript:UpgradeScript;

private var crystals:float;
private var junk:float;

private var levels:int[];//[normalWeaponLvl,cockpitLvl,secondWeaponLvl,wingsLvl,binLvl,mechanicsLvl]

private var neededCrystals:int;
private var neededJunk:int;

//upgradeJunk=30*(cockpitLvl+1);
		//upgradeCristal=5*(cockpitLvl+1);

function Start () {
	updateProgress();
	
}

public function updateProgress(){
crystals=PlayerPrefs.GetInt("crystals");
	junk=PlayerPrefs.GetInt("junk");
	
	levels=upgradeScript.getLevels();
	
	//ShieldGenerator	
	var crystalPercent:float=(crystals/ ( 5*(levels[4]+1)));
	var junkPercent:float=(junk/ ( 30*(levels[4]+1)));
	crystalUpgradeProgressBar[0].fillAmount=crystalPercent;
	junkUpgradeProgressBar[0].fillAmount=junkPercent;
	var fillAmount=(junk/upgradeScript.getRepairCosts()[0]);
	
	junkRepairProgressBar[0].fillAmount=fillAmount;
	
	
	//Cockpit
	crystalPercent=(crystals/ ( 5*(levels[1]+1)));
	junkPercent=(junk/ ( 50*(levels[1]+1)));
	crystalUpgradeProgressBar[1].fillAmount=crystalPercent;
	junkUpgradeProgressBar[1].fillAmount=junkPercent;
	fillAmount=(junk/upgradeScript.getRepairCosts()[2]);
	
	junkRepairProgressBar[1].fillAmount=fillAmount;
	
	//Wings	60*(wingsLvl+1)&&cristals>=1*(wingsLvl+1)
	crystalPercent=(crystals/ ( 1*(levels[3]+1)));
	junkPercent=(junk/ ( 60*(levels[3]+1)));

	crystalUpgradeProgressBar[6].fillAmount=crystalPercent;
	junkUpgradeProgressBar[6].fillAmount=junkPercent;
	fillAmount=(junk/upgradeScript.getRepairCosts()[1]);

	junkRepairProgressBar[6].fillAmount=fillAmount;
	
	crystalUpgradeProgressBar[3].fillAmount=crystalPercent;
	junkUpgradeProgressBar[3].fillAmount=junkPercent;
	
	fillAmount=(junk/upgradeScript.getRepairCosts()[1]);
	
	
	junkRepairProgressBar[3].fillAmount=fillAmount;
	
	//Mechanics
	crystalPercent=(crystals/ ( 5*(levels[5]+1)));
	junkPercent=(junk/ ( 30*(levels[5]+1)));
	crystalUpgradeProgressBar[2].fillAmount=crystalPercent;
	junkUpgradeProgressBar[2].fillAmount=junkPercent;
	fillAmount=(junk/upgradeScript.getRepairCosts()[3]);
	
	
	junkRepairProgressBar[2].fillAmount=fillAmount;
	
		//normalWeapon
	crystalPercent=(crystals/ ( 30*(levels[0]+1)));
	junkPercent=1;
	crystalUpgradeProgressBar[4].fillAmount=crystalPercent;
	junkUpgradeProgressBar[4].fillAmount=junkPercent;
	
		//sideArmWeapons
	crystalPercent=(crystals/ ( 30*(levels[2]+1)));
	junkPercent=1;
	crystalUpgradeProgressBar[5].fillAmount=crystalPercent;
	junkUpgradeProgressBar[5].fillAmount=junkPercent;
}

function Update () {

}