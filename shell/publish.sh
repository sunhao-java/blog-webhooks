#!/bin/sh

# 工程名称
name=$1
# github地址
githubUrl=$2
# nginx目标地址
nginxDestKey=$3
# 发布类型
type=$4

nginxDest=`eval echo '$'"${nginxDestKey}"`

cd ./shell

# clone or pull
if [ ! -d $name ]; then
  # 文件夹不存在，则clone
  git clone $githubUrl $name
  cloneFlag=$?
  if [ 0 != $cloneFlag ]; then
    # 拉取代码失败
    echo 拉取代码失败
    exit 1
  fi
  cd $name
else
  cd $name
  git pull
  pullFlag=$?
  if [ 0 != $pullFlag ]; then
    # 拉取代码失败
    echo 拉取代码失败
    exit 1
  fi
fi

# 初始化npm依赖
npm install --registry=https://registry.npm.taobao.org
installFlag=$?
if [ 0 != $installFlag ]; then
  # npm install失败
  echo npm install失败！
  exit 1
fi

# 生成静态文件
source=
type_hexo="hexo"
type_gitbook="gitbook"

if [ "$type_hexo"x = "$type"x ]; then
  # hexo
  hexo generate
  generateFlag=$?
  if [ 0 != $generateFlag ]; then
    # hexo generate失败
    echo 生成hexo静态文件失败！
    exit 1
  fi
  source="public"
elif [ "$type_gitbook"x = "$type"x ]; then
  # gitbook
  gitbook build
  gitbookFlag=$?
  if [ 0 != $gitbookFlag ]; then
    # gitbook build失败
    echo 生成gitbook静态文件失败！
    exit 1
  fi
  source="_book"
else
    echo 发布类型不合法！发布类型为$type
    exit 1
fi

# 首先删除原来的静态文件
rm -rf $nginxDest/*
rmOldFileFlag=$?
if [ 0 != $rmOldFileFlag ]; then
  # npm install失败
  echo 删除旧的静态文件失败！
  exit 1
fi

# 复制生成的静态文件
cp -r $source/* $nginxDest/
cpFileFlag=$?
if [ 0 != $cpFileFlag ]; then
  # npm install失败
  echo 复制新静态文件到nginx目录失败！
  exit 1
fi