using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class PressByAxes : MonoBehaviour, IPointerDownHandler, IPointerUpHandler, IPointerEnterHandler, IPointerExitHandler
{
	public AButtonSide bSide;
	static bool isKeyPressed;

	// Start is called before the first frame update
	void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

	public void OnPointerDown(PointerEventData eventData)
	{
		isKeyPressed = true;
		SendAxes(bSide);
	}

	public void OnPointerUp(PointerEventData eventData)
	{
		isKeyPressed = false;
		SendAxes(AButtonSide.None);
	}

	public void OnPointerEnter(PointerEventData eventData)
	{
		if(isKeyPressed) SendAxes(bSide);
	}

	public void OnPointerExit(PointerEventData eventData)
	{
		SendAxes(AButtonSide.None);
	}

	void SendAxes(AButtonSide abs)
	{
		switch (abs)
		{
			case AButtonSide.Center:
				GeneralControllGame.SetAxis("Vertical", 1.0);
				break;
			case AButtonSide.Left:
				GeneralControllGame.SetAxis("Horizontal", -1.0);
				break;
			case AButtonSide.Right:
				GeneralControllGame.SetAxis("Horizontal", 1.0);
				break;
			case AButtonSide.None:
				GeneralControllGame.SetAxis("Vertical", 0.0);
				GeneralControllGame.SetAxis("Horizontal", 0.0);
				break;
		}
	}

	public enum AButtonSide { Left, Center, Right, None }
}
