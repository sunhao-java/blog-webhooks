FROM node:latest

LABEL maintainer="Sunhao <sunhao.java@gmail.com>"
LABEL VERSION="${IMAGE_VERSION}" ARCHITECURE="amd64"
LABEL Description="Blog Github Webhooks" Vendor="Sunhao<sunhao.java@gmail.com>"

# 设置时区
ENV TZ=Asia/Shanghai

# 设置工作目录
WORKDIR /home

# 复制工程文件
COPY ./ ./

# 安装依赖
RUN npm install hexo gitbook-cli -g && \
	npm install && \
	chmod u+x ./shell/*.sh

# 映射端口
EXPOSE 3000

# 启动
ENTRYPOINT ["npm", "start"]