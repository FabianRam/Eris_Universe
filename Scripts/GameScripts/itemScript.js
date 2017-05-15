#pragma strict

public var kindOfItem:String;
public var advantage:float;
private var speed:int=1;
public var durationSec:float=2.0;
private var shipControl:ShipControl;

private var time:float;
private var curTime:float;
private var aktiv:boolean=false;


function Start () {
	shipControl = GameObject.Find("spaceship").GetComponent(ShipControl);
}

function Update () {
}

function move(){
	transform.position.y-=Random.Range(0.01,0.02);
}

function OnTriggerEnter2D(obj : Collider2D) {  
 var obName=obj.gameObject.name;
 if (obName == "spaceship") {
	Debug.Log("ITEM "+ name); 
	aktiv=true;
	time=Time.time;
	Debug.Log("START TIME" + Time.time);
	
	shipControl.setItemCounter(kindOfItem,advantage,durationSec);
	var audio = GetComponent.<AudioSource>();
	audio.Play();
	gameObject.transform.localScale*=1.4;
	Destroy(gameObject,.1);
	speed=0;
	this.GetComponent.<Collider2D>().enabled=false;

 }
	
 
 
}