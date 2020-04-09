#!/bin/sh

# 工程名称
name=$1
# github地址
github_url=$2
# nginx目标地址
nginxDest=$3

cd ./shell

# clone
git clone $github_url $name
cloneFlag=$?
if [ 0 != $cloneFlag ]; then
  # 拉取代码失败
  exit 1
fi

# 初始化npm依赖
cd $name
npm install --registry=https://registry.npm.taobao.org
installFlag=$?
if [ 0 != $installFlag ]; then
  # npm install失败
  echo npm install失败！
  exit 1
fi

# 生成静态文件
hexo generate
generateFlag=$?
if [ 0 != $generateFlag ]; then
  # npm install失败
  echo 生成hexo静态文件失败！
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
cp -r generate/* $nginxDest/
cpFileFlag=$?
if [ 0 != $cpFileFlag ]; then
  # npm install失败
  echo 复制新静态文件到nginx目录失败！
  exit 1
fi