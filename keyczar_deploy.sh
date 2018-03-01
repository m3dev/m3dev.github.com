#!/bin/sh 

cd $HOME
rm -rf keyczar_deploy
mkdir keyczar_deploy
cd keyczar_deploy
git clone git@github.com:m3dev/m3dev.github.com.git
git clone https://code.google.com/p/keyczar/

cd keyczar/java/code
mvn -DaltDeploymentRepository=release-repo::default::file:$HOME/keyczar_deploy/m3dev.github.com/mvn-repo/releases clean deploy

echo ""
echo "--------------------------"
echo "### And then... ###"
echo ""
echo "cd $HOME/keyczar_deploy/m3dev.github.com"
echo "git add . -v"
echo "git commit -m'Deployed keyczar x.x.x'"
echo "git push origin master"
echo ""
echo "--------------------------"
echo ""

