#pragma strict

private var colorF:Color;

function Start () {
	colorF =   GetComponent(SpriteRenderer).color ;
	colorF.a=0.03;
}

function Update () {
	this.transform.localScale*=0.97881;
	if(transform.localScale.y<0.1)
		{
			Destroy(this.GetComponent(SpriteRenderer));
			Destroy(this);
		}
//	if(color.a>=0)
//	color.a-=0.1;
//	Debug.Log("color "+ color.a);
}