# blog-webhooks

1. docker build

        docker build -t blog-webhooks .

2. 配置.env文件

        # 邮件配置
        # 发件箱地址
        MAIL_SMTP_HOST=xxx
        # 发件箱端口
        MAIL_SMTP_PORT=xxx
        # 是否启用ssl[true/false]
        MAIL_SMTP_SSL=xxx
        # 发件人
        MAIL_SMTP_USER=xxx
        # 发件人密码
        MAIL_SMTP_PASSWORD=xxx

3. 运行

        docker-compose up -d

4. gitlab配置
    - 打开每一个需要自动构建发布工程的gitlab页面
    - `settings` -> `integrations`
    - `add webhooks`
    - url: `http://ip:port/publish`
    - event: Push Event