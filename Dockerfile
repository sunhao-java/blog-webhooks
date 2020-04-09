FROM node:latest

WORKDIR /home

# 复制工程文件
COPY ./ ./

# 安装依赖
RUN npm install hexo -g --registry=https://registry.npm.taobao.org && \
	chmod u+x ./shell/*.sh && \
	npm install --registry=https://registry.npm.taobao.org 

EXPOSE 3000

# 启动
ENTRYPOINT ["npm", "start"]