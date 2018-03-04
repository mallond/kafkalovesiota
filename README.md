# kafkalovesiota
A simple development environment setup for Kafka and IOTA experiments

## Kafka full-stack compose

```
Place the host names in /etc/hosts (mac)
127.0.0.1     zoo1
127.0.0.1     kafka1
127.0.0.1     kafka2
127.0.0.1     kafka3
127.0.0.1     zoonavigator-web
127.0.0.1     sheepkiller
```

Development Build
1. docker-compose -f full-stack-single.yml up

Zookeeper monitor zktop
1. cd zktop
2./zktop.py -v --servers "zoo1:2181"

Zookeeper Navigator UI
1. http://zoonavigator-web:8004

Kafka Manager 
1. http://sheepkiller:900o

