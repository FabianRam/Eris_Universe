#pragma strict

private var size:float;

public var rotateSpeed:int;

public var junk1:Sprite;
public var junk2:Sprite;
public var junk3:Sprite;
public var junk4:Sprite;
public var junk5:Sprite;

public var junk:int;
public var cristals:int;

var differentReviews :Sprite []; 
private var textureChooser:int;
private var chosenRecourcenSpirte:Sprite;
//NUmber must between 0 and 100
public var dropChange:int;
public var disapierTime:int;
public var isCristal:boolean;

function Start () {
	var randomNumber:int=Random.Range(0,100);
	if(randomNumber>dropChange)
	{
		 Destroy(gameObject);
	}
	else
	 Destroy(gameObject,disapierTime);
	
	
	differentReviews= [junk1,junk2,junk3,junk4,junk5];
	textureChooser=Random.Range(0,differentReviews.Length);
	chosenRecourcenSpirte=differentReviews[textureChooser];
	GetComponent(SpriteRenderer).sprite = chosenRecourcenSpirte;
	var scale:float= Random.Range(0.5, 1);
	transform.localScale= Vector3(scale,scale,scale);
}

function Update () {
//	transform.Rotate(Vector3(rotateSpeed,0,0) * rotateSpeed);
	GetComponent.<Rigidbody2D>().angularVelocity = rotateSpeed*Random.Range(10, 70);;
}