#pragma strict

public var movingGameObject:GameObject;
private var collider2d:Collider2D;
public var anim:Animator;

public var meters:float=0.5f;
private var curMeters:float=0.01;

private var MOVE_RIGHT:int=1;
private var MOVE_LEFT:int=2;
private var MOVE:int=0;

private var thisGameObject:GameObject;
function Start () {
	thisGameObject=this.gameObject;
	collider2d=movingGameObject.GetComponent(Collider2D);
	 InvokeRepeating("moveLeft", 0, 10);
	 InvokeRepeating("moveRight", 5, 10);
	
}

function moveLeft(){
	anim.Play("FlyLeftAnimation");
}

function moveRight(){
	anim.Play("FlyRightAnimation");
}

function Update () {
	
	
}

function OnTriggerEnter2D(obj : Collider2D) {  
	
}