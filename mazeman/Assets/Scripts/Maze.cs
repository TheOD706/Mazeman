using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Maze : MonoBehaviour
{
	public int level;
	bool[][] field;
	public GameObject spawnObject, targetItem;
	public Material matWal;
	public Material[] matSky;
	public Transform man;
	public bool inverseMeshTriangles;
	public Transform ground;
	public float angularSpeed, diamondClaimed, diamondAll;
	Vector2 angleHeightViewDiapazone = new Vector2(0, 30), angleHeightViewSpeedAndTarget = new Vector2(0.2f, 20);
	KeyStatus keyStatus;
	public UnityEngine.UI.Text txtLevel, txtDiam;

	// Start is called before the first frame update
	void Start()
	{
		if (matSky != null && matSky.Length > 0)
		{
			var q0 = GetComponent<Skybox>();
			q0.material = matSky[Random.Range(0, matSky.Length)];
		}
		keyStatus = KeyStatus.ksNone;
		level = 1;
		StartCoroutine(generate_maze(level + 6));
	}

	// Update is called once per frame
	void Update()
	{
		if (Input.GetKey(KeyCode.UpArrow) || keyStatus == KeyStatus.ksGo || keyStatus == KeyStatus.ksGoRight || keyStatus == KeyStatus.ksGoLeft)
		{
			Vector3 prewpos = man.position;
			man.Translate(man.forward * Time.deltaTime, Space.World);
			Vector3 newpos = spawnObject.transform.InverseTransformPoint(man.position);
			//detect length to all sides (<0.25) and cross of field grid
			float f0 = newpos.x - Mathf.Floor(newpos.x);
			if(f0 < 0.25f && field[Mathf.FloorToInt(newpos.x) - 1][Mathf.FloorToInt(newpos.z)])
			{
				newpos.x = 0.25f + Mathf.Floor(newpos.x);
				man.position = spawnObject.transform.TransformPoint(newpos);
			}
			if(f0 > 0.75f && field[Mathf.FloorToInt(newpos.x) + 1][Mathf.FloorToInt(newpos.z)])
			{
				newpos.x = 0.75f + Mathf.Floor(newpos.x);
				man.position = spawnObject.transform.TransformPoint(newpos);
			}
			f0 = newpos.z - Mathf.Floor(newpos.z);
			if(f0 < 0.25f && field[Mathf.FloorToInt(newpos.x)][Mathf.FloorToInt(newpos.z) - 1])
			{
				newpos.z = 0.25f + Mathf.Floor(newpos.z);
				man.position = spawnObject.transform.TransformPoint(newpos);
			}
			if(f0 > 0.75f && field[Mathf.FloorToInt(newpos.x)][Mathf.FloorToInt(newpos.z) + 1])
			{
				newpos.z = 0.75f + Mathf.Floor(newpos.z);
				man.position = spawnObject.transform.TransformPoint(newpos);
			}
		}
		if (Input.GetKey(KeyCode.RightArrow) || keyStatus == KeyStatus.ksRight || keyStatus == KeyStatus.ksGoRight)
		{
			man.Rotate(0, angularSpeed * Time.deltaTime, 0);
		}
		if (Input.GetKey(KeyCode.LeftArrow) || keyStatus == KeyStatus.ksLeft || keyStatus == KeyStatus.ksGoLeft)
		{
			man.Rotate(0, -angularSpeed * Time.deltaTime, 0);
		}
		Vector3 v0 = transform.localRotation.eulerAngles;
		if (Mathf.Abs(v0.x - angleHeightViewSpeedAndTarget.y) < Time.deltaTime * angleHeightViewSpeedAndTarget.x)
		{
			angleHeightViewSpeedAndTarget.y = Random.Range(angleHeightViewDiapazone.x, angleHeightViewDiapazone.y);
		}
		else
		{
			v0.x = Mathf.Lerp(v0.x, angleHeightViewSpeedAndTarget.y, angleHeightViewSpeedAndTarget.x * Time.deltaTime);
			transform.localRotation = Quaternion.Euler(v0);
		}
		//cheattest
		/*if (Input.GetKey(KeyCode.Home))
		{
			EndRound();
		}*/
	}

	IEnumerator generate_maze(int dimension = -1)
	{
		yield return new WaitForSeconds(2);
		if (dimension < 6) dimension = level + 6;
		if (dimension % 2 == 0) dimension++;
		// Initialize the field.
		field = new bool[dimension][];
		for (var i = 0; i < dimension; i++)
		{
			field[i] = new bool[dimension];
			for (var j = 0; j < dimension; j++)
			{
				field[i][j] = true;
			}
		}

		// Gnerate the maze recursively.
		field = iterate(field, 1, 1, dimension);
		/*if(dimension % 2 == 0)
		{
			var nf = new bool[dimension + 1][];
			for(int i0 = 0; i0 < dimension; i0++)
			{
				nf[i0] = new bool[dimension + 1];
				for(int i1 = 0; i1 < dimension; i1++)
				{
					nf[i0][i1] = field[i0][i1];
				}
			}
			field = nf;
			dimension++;
			field[dimension - 1] = new bool[dimension];
			for (int i0 = 0; i0 < dimension; i0++)
			{
				field[i0][dimension - 1] = true;
				field[dimension - 1][i0] = true;
			}
		}*/
		for (var i0 = 0; i0 < dimension; i0++)
		{
			field[1 + Random.Range(0, dimension - 2)][1 + Random.Range(0, dimension - 2)] = false;
		}
		if (spawnObject != null)
		{
			GameObject o0 = GameObject.Find("Maze");
			if (o0 != null) Destroy(o0);
			GameObject go0 = Instantiate<GameObject>(spawnObject);
			go0.name = "Maze";
			//go0.transform.Rotate(90, -90, 0);
			var mf = go0.AddComponent<MeshFilter>();
			mf.mesh = generate_maze_mesh(field, dimension);
			var mr = go0.AddComponent<MeshRenderer>();
			if (matWal != null)
			{
				mr.material = matWal;
				mr.material.SetTextureScale("_MainTex", new Vector2(dimension, dimension * 2));
			}
			if (man != null)
			{
				man.position = spawnObject.transform.TransformPoint(1.5f, 0.5f, 1.5f);
				//man.Rotate(-90, 0, 180);
			}
			if(ground != null)
			{
				ground.position = spawnObject.transform.TransformPoint(0.5f * dimension, 0, 0.5f * dimension);
				ground.localScale = Vector3.one * 0.1f * dimension;
				ground.GetComponent<Renderer>().material.SetTextureScale("_MainTex", new Vector2(dimension, dimension * 2));
			}
			/*go0.AddComponent<MeshCollider>();
			Rigidbody rb0 = go0.AddComponent<Rigidbody>();
			rb0.constraints = RigidbodyConstraints.FreezeAll;
			rb0.mass = 999999;*/
		}
		if(matSky != null && matSky.Length > 0)
		{
			var q0 = GetComponent<Skybox>();
			q0.material = matSky[Random.Range(0, matSky.Length)];
		}
		if(targetItem != null)
		{
			int randpick = dimension * 100;
			List<uint> unique = new List<uint>();
			diamondAll = 0;
			diamondClaimed = 0;
			while(diamondAll < level + 6)
			{
				int j0 = Random.Range(1, dimension);
				int j1 = Random.Range(2, dimension);
				if(!field[j0][j1])
				{
					uint j2 = (uint)(j0 * dimension + j1);
					if (!unique.Contains(j2))
					{
						unique.Add(j2);
						GameObject o0 = Instantiate<GameObject>(targetItem, ground);
						o0.transform.position = spawnObject.transform.TransformPoint( j0 + .5f, 0.25f, j1  + .5f);
						o0.transform.localScale = Vector3.one * 0.2f;
						diamondAll++;
					}
				}
				else
				{
					if (randpick < 0)
					{
						uint j2 = (uint)(j0 * dimension + j1);

						while (unique.Contains(j2) || field[j0][j1])
						{
							++j1;
							if (j1 >= dimension)
							{
								j1 = 2;
								++j0;
								if (j0 >= dimension) j0 = 1;
							}
							j2 = (uint)(j0 * dimension + j1);
						}

						unique.Add(j2);
						GameObject o0 = Instantiate<GameObject>(targetItem, ground);
						o0.transform.position = spawnObject.transform.TransformPoint(j0 + .5f, 0.5f, j1 + .5f);
						diamondAll++;
					}
				}
				--randpick;
			}
		}
		if(txtLevel != null)
		{
			txtLevel.text = level.ToString();
		}
		if(txtDiam != null)
		{
			txtDiam.text = diamondClaimed.ToString() + "/" + diamondAll.ToString();
		}
	}

	bool[][] iterate(bool[][] field, int x, int y, int dimension)
	{
		field[x][y] = false;
		List<int[]> directions;
		while (true)
		{
			directions = new List<int[]>();
			if (x > 1 && field[x - 2][y] == true)
			{
				directions.Add(new int[] { -1, 0 });
			}
			if (x < dimension - 2 && field[x + 2][y] == true)
			{
				directions.Add(new int[] { 1, 0 });
			}
			if (y > 1 && field[x][y - 2] == true)
			{
				directions.Add(new int[] { 0, -1 });
			}
			if (y < dimension - 2 && field[x][y + 2] == true)
			{
				directions.Add(new int[] { 0, 1 });
			}
			if (directions.Count == 0)
			{
				return field;
			}
			int[] dir = directions[Random.Range(0, directions.Count)];
			field[x + dir[0]][y + dir[1]] = false;
			field = iterate(field, x + dir[0] * 2, y + dir[1] * 2, dimension);
		}
	}

	Mesh generate_maze_mesh(bool[][] field, int dimension)
	{
		//inverseMeshTriangles = dimension % 2 == 1;
		int vert_dim = 2 * (dimension - 1) * (dimension - 1); 
		Vector3[] verts = new Vector3[vert_dim];
		Vector2[] uv0s = new Vector2[vert_dim];
		int vind = 0;
		//System.Text.StringBuilder sb0 = new System.Text.StringBuilder();
		List<int> lof = new List<int>();
		for (int i0 = 1; i0 < dimension; i0++)
		{
			for (int i1 = 1; i1 < dimension; i1++)
			{
				//sb0.Append((field[i0][i1]) ? "O" : "=");
				uv0s[vind] = new Vector2(1.0f * (i0 - 1) / (dimension - 1), 1.0f * (i1 - 1) / (dimension - 1));
				verts[vind++] = new Vector3(i0, 0, i1);
				uv0s[vind] = new Vector2(1.0f * (i0 - 0.5f) / (dimension - 1), 1.0f * (i1 - 0.5f) / (dimension - 1));
				verts[vind++] = new Vector3(i0, 1, i1);
				//t2b
				if (!field[i0][i1 - 1] == inverseMeshTriangles)
				{
					if (field[i0][i1] == inverseMeshTriangles)
					{
						int j0 = 2 * (i0 - 1) * (dimension - 1) + 2 * (i1 - 1);
						if (j0 + 2 * dimension - 1 < vert_dim)
						{
							lof.Add(j0 + 1);
							lof.Add(j0 + 1 + 2 * (dimension - 1));
							lof.Add(j0);
							lof.Add(j0 + 2 * (dimension - 1) + 1);
							lof.Add(j0 + 2 * (dimension - 1));
							lof.Add(j0);
						}
						//else print("debug " + (j0 + 2 * dimension - 1).ToString() + " / " + vert_dim);
					}
				}
				//b2t
				if (!field[i0][i1] == inverseMeshTriangles)
				{
					if (field[i0][i1 - 1] == inverseMeshTriangles)
					{
						int j0 = 2 * (i0 - 1) * (dimension - 1) + 2 * (i1 - 1) + 1;

						if (j0 + 2 * (dimension - 1) - 1 < vert_dim)
						{
							lof.Add(j0);
							lof.Add(j0 - 1);
							lof.Add(j0 + 2 * (dimension - 1) - 1);
						}
						if(j0 + 2 * (dimension - 1) < vert_dim)
						{
							lof.Add(j0 + 2 * (dimension - 1) - 1);
							lof.Add(j0 + 2 * (dimension - 1));
							lof.Add(j0);
						}
					}
				}
				//l2r
				if(!field[i0 - 1][i1] == inverseMeshTriangles)
				{
					if (field[i0][i1] == inverseMeshTriangles)
					{
						int j0 = 2 * (i0 - 1) * (dimension - 1) + 2 * (i1 - 1);
						lof.Add(j0 + 1);
						lof.Add(j0 + 2);
						lof.Add(j0 + 3);
						lof.Add(j0 + 1);
						lof.Add(j0);
						lof.Add(j0 + 2);
					}
				}
				//r2l
				if (!field[i0][i1] == inverseMeshTriangles)
				{
					if (field[i0 - 1][i1] == inverseMeshTriangles)
					{
						int j0 = 2 * (i0 - 1) * (dimension - 1) + 2 * (i1 - 1);
						lof.Add(j0 + 3);
						lof.Add(j0 + 2);
						lof.Add(j0 + 1);
						lof.Add(j0 + 2);
						lof.Add(j0);
						lof.Add(j0 + 1);
					}
				}
			}
			//sb0.Append("\n");
		}

		//print(sb0.ToString());

		Mesh m0 = new Mesh();
		m0.vertices = verts;
		m0.triangles = lof.ToArray();
		m0.uv = uv0s;
		return m0;
	}

	public void AcceptCommand(ButtonCommand bc, ButtonSide bs, bool pressed)
	{
		switch (bc)
		{
			case ButtonCommand.down:
				if (bs == ButtonSide.center) keyStatus = KeyStatus.ksGo;
				if (bs == ButtonSide.left) keyStatus = KeyStatus.ksLeft;
				if (bs == ButtonSide.right) keyStatus = KeyStatus.ksRight;
				break;
			case ButtonCommand.up:
				keyStatus = KeyStatus.ksNone;
				break;
			case ButtonCommand.enter:
				if (pressed)
				{
					if(bs == ButtonSide.center)
					{
						if (keyStatus == KeyStatus.ksLeft) keyStatus = KeyStatus.ksGoLeft;
						if (keyStatus == KeyStatus.ksRight) keyStatus = KeyStatus.ksGoRight;
					}
					if(bs == ButtonSide.left)
					{
						if (keyStatus == KeyStatus.ksGo) keyStatus = KeyStatus.ksGoLeft;
						if (keyStatus == KeyStatus.ksGoRight) keyStatus = KeyStatus.ksGoLeft;
						if (keyStatus == KeyStatus.ksRight) keyStatus = KeyStatus.ksGoBoth;
					}
					if(bs == ButtonSide.right)
					{
						if (keyStatus == KeyStatus.ksGo) keyStatus = KeyStatus.ksGoRight;
						if (keyStatus == KeyStatus.ksGoLeft) keyStatus = KeyStatus.ksGoRight;
						if (keyStatus == KeyStatus.ksLeft) keyStatus = KeyStatus.ksGoBoth;
					}
				}
				break;
			case ButtonCommand.exit:
				if (pressed)
				{
					if(bs == ButtonSide.center)
					{
						if (keyStatus == KeyStatus.ksGoLeft) keyStatus = KeyStatus.ksLeft;
						if (keyStatus == KeyStatus.ksGoRight) keyStatus = KeyStatus.ksRight;
					}
					if(bs == ButtonSide.left)
					{
						if (keyStatus == KeyStatus.ksGoBoth) keyStatus = KeyStatus.ksGoRight;
						if (keyStatus == KeyStatus.ksGoLeft) keyStatus = KeyStatus.ksGo;
					}
					if(bs == ButtonSide.right)
					{
						if (keyStatus == KeyStatus.ksGoBoth) keyStatus = KeyStatus.ksGoLeft;
						if (keyStatus == KeyStatus.ksGoRight) keyStatus = KeyStatus.ksGo;
					}
				}
				break;
		}
	}

	public void ClaimDiam()
	{
		diamondClaimed++;
		if (txtDiam != null)
		{
			txtDiam.text = diamondClaimed.ToString() + "/" + diamondAll.ToString();
		}
		if (diamondClaimed >= diamondAll)
		{
			++level;
			StartCoroutine(generate_maze(level + 6));
		}
	}

	public void EndRound()
	{
		if (diamondClaimed >= diamondAll) return;
		diamondClaimed = diamondAll;
		if (txtDiam != null)
		{
			txtDiam.text = diamondClaimed.ToString() + "/" + diamondAll.ToString();
		}
		if (diamondClaimed >= diamondAll)
		{
			++level;
			StartCoroutine(generate_maze(level + 6));
		}
		var ds0 = GameObject.Find("Ground").transform;
		for (int i0 = ds0.childCount - 1; i0 > -1; --i0) Destroy(ds0.GetChild(i0).gameObject);
	}

	public void turnAudio()
	{
		var a0 = GetComponent<AudioSource>();
		if (a0 != null) a0.enabled = !a0.enabled;
	}
}

enum KeyStatus { ksNone, ksGo, ksLeft, ksRight, ksGoLeft, ksGoRight, ksBoth, ksGoBoth }