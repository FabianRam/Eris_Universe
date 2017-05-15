#pragma strict

var speed : float = 40.0;
public static var LOCK_CARD:boolean=false;
private var startY;

function Start () {
	startY=transform.position.y;
}
  
  // Moves object according to finger movement on the screen
 function Update () {
       if(!LOCK_CARD){
       if (Input.touchCount > 0 && 
       Input.GetTouch(0).phase == TouchPhase.Moved) {
     
         // Get movement of the finger since last frame
         var touchDeltaPosition:Vector2 = Input.GetTouch(0).deltaPosition;
         
         // Move object across XY plane
         transform.Translate (touchDeltaPosition.x * speed, 
                     touchDeltaPosition.y * speed, 0);
     }
      var move = Vector3(Input.GetAxis("Horizontal"), 0, 0);
     transform.position += move * -speed * Time.deltaTime;
     
     if(transform.position.x<0-200)
     	transform.position.x =0-200;
     else if(transform.position.x>=Screen.width*1.5f)
     	transform.position.x=Screen.width*1.5f;
	
	if(transform.position.y!=Screen.height/2)
	transform.position.y=Screen.height/2;
	
}
 }
 