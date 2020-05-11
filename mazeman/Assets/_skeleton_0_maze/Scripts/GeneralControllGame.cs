using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GeneralControllGame : MonoBehaviour
{
	public string[] defaultAxes;

	private static GeneralControllGame singletone = null;
	private Dictionary<string, double> axes;
	private Dictionary<string, double> queue;

    // Start is called before the first frame update
    void Start()
    {
		if (singletone == null)
		{
			singletone = this;
			axes = new Dictionary<string, double>();
			queue = new Dictionary<string, double>();
		}
		else Debug.LogError("one element already exist");
		foreach(string s0 in defaultAxes)
		{
			if (!axes.ContainsKey(s0))
			{
				axes.Add(s0, double.PositiveInfinity);
			}
		}
    }

    // Update is called once per frame
    void Update()
    {
        
    }

	public static double GetAxis(string axis)
	{
		if (singletone == null) return double.NegativeInfinity;
		else
		{
			if (singletone.axes.ContainsKey(axis))
			{
				return singletone.axes[axis];
			}
			else return double.NaN;
		}
	}

	/*public static bool RegisterController(MonoBehaviour owner, )
	{

	}*/

	public static void SetAxis(string axis, double value)
	{
		if (singletone == null) return;
		if (singletone.queue == null) return;
		if (singletone.queue.ContainsKey(axis))
		{
			singletone.queue[axis] = value;
		}
		else
		{
			singletone.queue.Add(axis, value);
		}
	}

	private void LateUpdate()
	{
		if (singletone == null) return;
		if (singletone.queue == null) return;
		if (singletone.axes == null) return;
		foreach (KeyValuePair<string, double> kvp in queue)
		{
			if (singletone.axes.ContainsKey(kvp.Key))
				singletone.axes[kvp.Key] = kvp.Value;
		}
	}

	public static bool RegisterAxis(string axis)
	{
		if (singletone == null) return false;
		if (singletone.axes == null) return false;
		if (singletone.axes.ContainsKey(axis)) return false;
		else
		{
			singletone.axes.Add(axis, double.PositiveInfinity);
		}
		return false;
	}


}
