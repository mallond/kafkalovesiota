# [simplepipe.com](https://simpilepipe.com} 
A simple development environment setup for Kafka and IOTA experiments

>What is Kafka? A distributed replicated log - not a messaging system

![kafka-logo-no-text](https://user-images.githubusercontent.com/993459/36943840-04009b4c-1f56-11e8-8191-d848d85b83ca.png)

## Kafka full-stack compose

```
                           
+------------+   +-----------+  +--------------+
|zoo1:2181   |   |zoo2:2182  |  |zoo3:2183     |
|            |   |           |  |              |
+------------+   +-----------+  +--------------+

+------------+   +-----------+  +--------------+
|kafka1:9092 |   |kafka:9093 |  |kafka:9094    |
|            |   |           |  |              |
+------------+   +-----------+  +--------------+

+------------+   +-----------+
|kafka-manager   |zoo navigator
|sheepkiller:9000|zoonavigator-web:8004
+------------+   +-----------+
 
Place the host names in /etc/hosts (mac)
127.0.0.1     zoo1
127.0.0.1     zoo2
127.0.0.1     zoo3
127.0.0.1     kafka1
127.0.0.1     kafka2
127.0.0.1     kafka3
127.0.0.1     zoonavigator-web
127.0.0.1     sheepkiller



Also - for a clean build 

Clean up the Docker folders
$ rm -rf full-stack-build

Clean up nasty docker builds
$ docker rm $(docker ps -qa --no-trunc --filter "status=exited")

Share
Add the shared files in your docker preference - shared folders

```

Fullstack Web UI - see YOUR etc/hosts to configure

1. [Zoo-navigator](http://zoonavigator-web:8004)
2. [Kafka-manager](http://sheepkiller:9000)



Development Build

> Docker file3.5	Docker Version 17.12.0+

1. docker-compose -f full-stack-single.yml up
2. docker-compose -f full-stack.yml down

Zookeeper monitor zktop

1. cd zktop
2. zktop.py -v --servers "zoo1:2181"

Zookeeper Navigator UI

1. http://zoonavigator-web:8004

Kafka Manager UI

1. http://sheepkiller:900o

Blizzard node-rdkafka

1 https://github.com/Blizzard/node-rdkafka

Kafkat CLI tool

1. https://github.com/airbnb/kafkat

Kafka bin

1. cd kafka_2.11-1.0.0
2. http://ronnieroller.com/kafka/cheat-sheet
3. https://github.com/Landoop/kafka-cheat-sheet
4. https://gist.github.com/sahilsk/d2a6ec384f5f2333e3fef40a581a97e1
5. https://gist.github.com/filipefigcorreia/3db4c7e525581553e17442792a2e7489

Examples

1. Producer: node src/scaffold/producer.js 
2. Consumer: node src/scaffold/consumer-flow.js

![docker](https://user-images.githubusercontent.com/993459/36943874-a1dfa61e-1f56-11e8-9123-bba34f8192bd.png)

![iota369](https://user-images.githubusercontent.com/993459/35762946-de9bdea8-0866-11e8-8427-f0924b28b445.png)

On the Heap

1. Developing Real-Time Data Pipelines with Kafka https://www.youtube.com/watch?v=GRPLRONVDWY
2. Mesos http://mesos.apache.org/
3. Mesos and Kafka https://github.com/mesos/kafka
4. node-rdkafka https://blizzard.github.io/node-rdkafka/current/
5. Compose and Swarm https://docs.docker.com/engine/swarm/stack-deploy/#deploy-the-stack-to-the-swarm