using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class Press : MonoBehaviour, IPointerDownHandler, IPointerUpHandler, IPointerEnterHandler, IPointerExitHandler
{
	public ButtonSide bSide;
	static bool isKeyPressed;
	Maze mazer;

    // Start is called before the first frame update
    void Start()
    {
		mazer = FindObjectOfType<Maze>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

	public void OnPointerDown(PointerEventData eventData)
	{
		mazer.AcceptCommand(ButtonCommand.down, bSide, isKeyPressed);
		isKeyPressed = true;
	}

	public void OnPointerUp(PointerEventData eventData)
	{
		isKeyPressed = false;
		mazer.AcceptCommand(ButtonCommand.up, bSide, isKeyPressed);
	}

	public void OnPointerEnter(PointerEventData eventData)
	{
		mazer.AcceptCommand(ButtonCommand.enter, bSide, isKeyPressed);
	}

	public void OnPointerExit(PointerEventData eventData)
	{
		mazer.AcceptCommand(ButtonCommand.exit, bSide, isKeyPressed);
	}
}

public enum ButtonSide { left, center, right }
public enum ButtonCommand { up, down, enter, exit }
