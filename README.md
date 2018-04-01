[kafkalovesiota](https://simplepipe.com)
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

![kafka-logo-no-text](https://user-images.githubusercontent.com/993459/36943840-04009b4c-1f56-11e8-8191-d848d85b83ca.png)
# Succent Notes - Super Condensed and to the Point
## What is Kafaka

> Kafka is a simple, high performance, scalable pub/sub messaging system. Created by linked.in and maintained by the 
Apache foundation 
   
## Why
* Decoupling   
  1. pub/sub  
* Less Coordination  
  1. Let's scale the organization  
  2. Super easy to add a consumer   
  3. Consumer can be added without a producer knowing
* Modern ETL     
* Scaling ETL is hard  
* Synchronization is hard  
* Events the source of truth - not Tables?    
  1. Streams as Ledgers  
* Horizontally scale - yea!  
  1. Near network speeds
  2. Linear scaling - real story  
  
## Retention of Data
*  Usually within hours or weeks  
*  Default value is 168 hours which is 7 days  

## Producers
*  Write messages to topics  
*  Messages are immutable and are written to the end of the log  

## Consumers
*  Pull messages from topics  
*  Track their own **offset** in each partition  
*  Can replay by an **offset**
*  When having a unique Group id, per consumer, you have a typical pub/sub process chain  
*  When sharing the same Group id, per consumer, you have a distributed round-robin process chain  
*  On failure, consumers restart from the last index  
*  On failure, shared group id, messages will be assigned to other consumers  

## Brokers
*  All data is persisted to disk - no keeping of data on the Heap
*  Topics replicated across the cluster  
*  Capacity can be added at runtime with zero downtime 
*  Topics can be larger than any single node can hold  
*  Need more parallelism, just add more partitions 

## Message Data Formats
* Only supports byte Arrays, which means that you can store anything :)
* Schema? Key, value and Timestamp, that' it!
* Immutable
* Append only
* Persisted to disk

## Much more, beyond these condensed notes
* Zookeeper
* Leaders
* Election of a Leader 
* Producer Partitions
* Log compaction 
* Replication
* Replication is topic based
* Auto rebalancing  
* Producer and consumer quotas 
* Pagecache to Socket - O/S bypasses data directly to the Network
* Delivery guarantees
  1. Producer - Async for performance - no guarantee - Network Speeds, super fast!
  2. Producer - Committed to Leader
  3. Producer - Committed to leader and committed to a quorum 
  4. Consumer - at least once (Default)
  5. Consumer - at most once
  6. Consumer - effectively once - no dup processing
  7. Consumer - exactly once - maybe? You will need to keep track of your offset [HARD]
 

## Dreaming of Kafka

![kafka_cartoon](https://user-images.githubusercontent.com/993459/38173661-dd9daa56-3587-11e8-84d7-b2d2c4718007.jpg)
