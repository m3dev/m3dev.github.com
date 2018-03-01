#!/bin/sh

if [ $# -eq 0 ];then
  echo "[usage] ./keygen.sh [name]"
  exit 1
fi

base_dir=`dirname $0`
cd ${base_dir}
name=$1
mkdir ${name}
java -jar KeyczarTool-0.71f.jar create --location=${name} --purpose=crypt --name="${name}"
java -jar KeyczarTool-0.71f.jar addkey --location=${name} --status=primary

echo "Done."
echo "Please check ${base_dir}/${name}"

