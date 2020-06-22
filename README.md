# Created simple game
Made in Unity3d. Ball move inside maze. Random skybox for each level. Maze's wall is as one object created by triangle planes merged in one Mesh. Gameplay: ball collect diamonds, each next level generate diamond number incremented by one. In future may be add more scenes and characters.

# Publishing game build
In own site game load but if hosting have limit on bandwidth usage it will be problem. File with huge size can be moved to other service that have CORS-allowed api for download and split by more parts. The python script `Build.py` split big files and edit javascript code that load that files and change index page to show loading progress.

# Publish to Gamearter
The python script `Build_GA_H96.py` split big files and edit index page (all path to files system set to link on index page so need create element that load file content). But more files as scripts joined to html freeze browser and OS. 
