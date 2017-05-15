#pragma strict

private var startPosition : Vector3; // = transform.position;    //The starting position in world space
 var endPosition : Vector3;    //The ending position in world space
 var bending : Vector3 = Vector3.up;                //Bend factor (on all axes)
 var timeToTravel : float = 10.0;                //The total time it takes to move from start- to end position
private var multiplier:float;

function Start () {
		endPosition = Vector3(transform.position.x,transform.position.y-20,0); 

		timeToTravel=Random.Range(timeToTravel-2,timeToTravel+2);
		multiplier=Random.Range(-2.8f,2.8f);
		endPosition.x=multiplier;
		startPosition=transform.position;
		MoveToPosition ();
}

function Update () {

}

function MoveToPosition () {
     var timeStamp : float = Time.time;
     while (Time.time<timeStamp+timeToTravel) {
         var currentPos : Vector3 = Vector3.Lerp(startPosition, endPosition, (Time.time - timeStamp)/timeToTravel);
         
         currentPos.x += bending.x*Mathf.Sin(Mathf.Clamp01((Time.time - timeStamp)/timeToTravel) * Mathf.PI);
         currentPos.y += bending.y*Mathf.Sin(Mathf.Clamp01((Time.time - timeStamp)/timeToTravel) * Mathf.PI);
         currentPos.z += bending.z*Mathf.Sin(Mathf.Clamp01((Time.time - timeStamp)/timeToTravel) * Mathf.PI);
         
         transform.position = currentPos;
         
         yield;
     }
 }
 