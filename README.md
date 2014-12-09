Debade Mater Daemon
============

## CLI

* debade-master start
* debade-master stop
* debade-master restart

## 配置文件

* /etc/debade/debade.conf: 存放debade启动的相关信息

        
        {
            ## 作为连接rabbitMQ Server的客户端的配置
            "master": {
                ## rabbitMQ的地址
                "server": "localhost",
                "port": 5672,
                "user": "guest",
                "password": "guest"
            },
            ## 依赖redis
            "redis": {
                "host": "localhost",
                "port": 80,
                "channel": "debade"
            }
        }

## RabbitMQ的安装参考：[rabbitmq.com](http://www.rabbitmq.com/download.html)

### Ubuntu

* Add the following line to your /etc/apt/sources.list:

        deb http://www.rabbitmq.com/debian/ testing main

* To avoid warnings about unsigned packages, add our public key to your trusted key list using apt-key(8):

        wget http://www.rabbitmq.com/rabbitmq-signing-key-public.asc
        sudo apt-key add rabbitmq-signing-key-public.asc

* apt-get update

* sudo apt-get install rabbitmq-server

* edit '/etc/rabbitmq/rabbitmq.config'
    
        [{rabbit, [{loopback_users, []}]}].
