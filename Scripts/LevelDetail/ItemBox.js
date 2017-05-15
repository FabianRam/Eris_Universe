#pragma strict

private var conditionScript:ConditionScript;
private var boxBackground:GameObject;

private var collectSound:AudioSource;
public var isGoalBox:boolean=true;
private var isCollected:boolean=false;

function Start () {
	conditionScript=Camera.main.GetComponent(ConditionScript);
	boxBackground=GameObject.Find("box_background");
	collectSound=GetComponent(AudioSource);
}

function Update () {
		transform.Rotate(Vector3.forward * Time.deltaTime*10);
		
		
	if(-Camera.main.orthographicSize>=transform.position.y+GetComponent.<Renderer>().bounds.size.y)
    {
       Destroy(gameObject);
	}
}


function OnTriggerEnter2D(obj : Collider2D) {  
	if(obj.gameObject.tag=="player"&&!isCollected)
	{
		isCollected=true;
		
		collectSound.Play();
		 yield WaitForSeconds (1);
		 
		if(isGoalBox)
		conditionScript.collektBox();
		
		Destroy(gameObject);
	}
}