using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ClaimItem : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

	private void OnTriggerEnter(Collider other)
	{
		if (other.tag.Equals("Man"))
		{
			var o0 = FindObjectOfType<Maze>();
			o0.ClaimDiam();
			Destroy(transform.parent.gameObject, 2);
			var ps0 = transform.parent.GetComponentInChildren<ParticleSystem>(true);
			ps0.gameObject.SetActive(true);
			gameObject.SetActive(false);
		}
	}
}
