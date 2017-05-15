#pragma strict
private var shipControl : ShipControl;
private var weaponChooser: GameObject;
public var kindOfWeapon:int;
private var secBtn:GameObject;
private var secondWeaponScript:secondWeapon;
 private var callSecondaryWeapons:CallSecondaryWeapons;

function Start () {
callSecondaryWeapons=Camera.main.GetComponent(CallSecondaryWeapons);
weaponChooser = GameObject.Find("SecundaryBTNs");
 shipControl = GameObject.Find("spaceship").GetComponent(ShipControl);
}

function Update () {

}


function OnMouseDown()
{
     	shipControl.shootSecondWeapon(kindOfWeapon);
     	callSecondaryWeapons.isOn=false;
}

public function shootSecondWeapon(){
		
		Debug.Log("HELLO");
}