using UnityEngine;
using System.Collections;

public class BulletsInARowScript : MonoBehaviour {

	public int amount;
	public float bulletDelayDistance;
	public float speed;

	public GameObject projectilePrefab;

	// Use this for initialization
	void Start () {
		for (int i=0; i<amount; i++) {
			InvokeRepeating("LaunchProjectile", 0, speed+bulletDelayDistance*i);			
		}
	}
	
	// Update is called once per frame
	void Update () {
		
 	
	}

	private void LaunchProjectile(){
		Instantiate( projectilePrefab, transform.position, Quaternion.identity);
	}
}
