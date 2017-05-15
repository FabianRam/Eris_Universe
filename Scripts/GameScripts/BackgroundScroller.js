#pragma strict  
  

var speed :float;
var resetDistance : float;  
var initialDistance : float;  
var isVertical : boolean = false;  
var stayWhenReach:boolean=false;  
  
function Start () {  
  
}  
  
function Update ()  
{  
	
    var move : float = speed * Time.deltaTime;  
    if (isVertical) {  
        transform.Translate(Vector3.down * move, Space.World);  
        if (transform.position.y < resetDistance)  
        {  
        	if(!stayWhenReach)
            transform.position = Vector3(transform.position.x, initialDistance, transform.position.z);
            else
            {
            move=0;
            speed=0;
              }  
           // Debug.Log("Position"+transform.position);
        }
        
        // Debug.Log("Position"+transform.position);
    }else{  
        transform.Translate(Vector3.left * move, Space.World);  
        if (transform.position.x < resetDistance)  
        {  
            transform.position = Vector3(initialDistance, transform.position.y, transform.position.z);  
        }  
    }  
}  