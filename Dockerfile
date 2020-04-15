FROM node:latest

WORKDIR /home

# 复制工程文件
COPY ./ ./

# 安装依赖
RUN npm install hexo gitbook-cli -g && \
	npm install && \
	chmod u+x ./shell/*.sh

EXPOSE 3000

# 启动
ENTRYPOINT ["npm", "start"]