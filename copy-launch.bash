# bin/bash

for d in /Users/jerson/Desktop/p5js-projects/*; do

  if [ -d "$d/.vscode" ]
	then
		cp -fr "./launch.json" "$d/.vscode/launch.json"
		echo "se copió launcher en:" "$d"
	fi
done