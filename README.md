# blog-webhooks

1. docker build

        docker build -t blog-webhooks .

2. 配置.env文件

        # 钉钉机器人token
        DING_TOKEN=xxx

3. 修改`docker-compose.yml`        

3. 运行

        docker-compose up -d

4. gitlab配置
    - 打开每一个需要自动构建发布工程的gitlab页面
    - `settings` -> `integrations`
    - `add webhooks`
    - url: `http://ip:port/publish?type=[hexo|gitbook]`
    - event: Push Event