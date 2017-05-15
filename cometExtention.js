#pragma strict

private var upVar:int=3;

function Start () {

}

function Update () {

}

public function onSplit()
{

//	Debug.Log("ON SPLIT");
	var randR:int=Random.Range(0,4);
	for(var i=0;i<randR;i++){
	var newC=Instantiate(this.gameObject);
	var randSize:float=Random.Range(0.4,0.8);
	var randDegree:int=Random.Range(0,360);
	newC.transform.localScale*=randSize;
	
	var posC:Vector3;
	if(i==0)
	posC=new Vector3(transform.position.x-0.2f,transform.position.y+0.5f+upVar,1);
	if(i==1)
	posC=new Vector3(transform.position.x-0.2f,transform.position.y-0.5f+upVar,1);
	if(i==2)
	posC=new Vector3(transform.position.x-0.2f,transform.position.y+0.5f+upVar,1);
	else
	posC=new Vector3(transform.position.x-0.2f,transform.position.y-0.5f+upVar,1);
	
	newC.transform.position+= posC;
	var eneyScript=newC.GetComponent(EnemyScript);
	eneyScript.criticalHit();
	
	newC.transform.Rotate(new Vector3(0,0,randDegree));
//	newC.transform.position.x+=(Screen.width/4);
//	newC.transform.position.y+=(Screen.height/10);
	}
}