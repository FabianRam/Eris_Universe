#pragma strict

private var visibleDuration:int=0.1f;
private var color:Color ;

function Start () {
	var randX=Random.Range(-Camera.main.orthographicSize/2,Camera.main.orthographicSize/2);
	var randY=Random.Range(-Camera.main.orthographicSize,Camera.main.orthographicSize);
	var glasPos=new Vector3(randX,randY,0);
	transform.position=glasPos;
	
	var r:float=Random.Range(0,360);
//  	glasSplit.transform.rotation = Quaternion.AngleAxis(30*r, Vector3.up);
  	var s=Random.Range(0.5f,1);
	transform.localScale=new Vector3(s,s,s);
	transform.rotation*= Quaternion.Euler(r,r,r);
//	transform.Rotate(0,0,40);
	
	
	color = GetComponent(Renderer).material.color;
	InvokeRepeating("slowDeath", 2, 0.3);
	
	
}

function Update () {

}

private function slowDeath()
{
	if(color.a>=0){
		color.a -= 0.10f;
		GetComponent.<Renderer>().material.color = color;
	}
	else{
		Destroy(this.gameObject);
	}
}