#pragma strict

private var upgradeHandler:GameObject;
private var upgradeScript:UpgradeScript;

public var upgradeCostText:UnityEngine.UI.Text;
public var upgradeHealthText:UnityEngine.UI.Text;
public var upgradeSpecialText:UnityEngine.UI.Text;

public var upgradeMenuePopupScript:UpgradeMenuePopup;

function Start () {
	upgradeHandler=GameObject.Find("UpgradeHandler");
	upgradeScript=upgradeHandler.GetComponent(UpgradeScript);
}

function Update () {

}

function updatePopUp(){
	var strings=upgradeScript.getUpgradeText();
	upgradeCostText.text=strings[0];
	upgradeHealthText.text=strings[1];
	upgradeSpecialText.text=strings[2];
	
	upgradeMenuePopupScript.updateLevel(upgradeScript.currentUpPart,upgradeScript.currentLevel);
}