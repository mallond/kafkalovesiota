/**
 * Created by dm on 3/3/18.
 */

/*
 * node-rdkafka - Node.js wrapper for RdKafka C/C++ library
 *
 * Copyright (c) 2016 Blizzard Entertainment
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

var Transform = require('stream').Transform;
var Kafka = require('node-rdkafka');
var zookeeper = require('node-zookeeper-client');
var uuidv1 = require('uuid/v1');

var client = zookeeper.createClient('zoo1:2181,zoo2:2182,zoo3:2183');
var path = '/singleConsumerOnly';

client.once('connected', function () {
  console.log('Connected to the zookeeper server.');

  client.create(path, function (error) {
    if (error) {
      console.log('Failed to create node: %s due to: %s.', path, error);
    } else {
      console.log('Node: %s is successfully created.', path);
    }

    var data = new Buffer('{"id":'+uuidv1()+'"}');
    client.setData(path, data, function (error, stat) {
      if (error) {
        console.log('Got error when setting data: ' + error);
        return;
      }

      console.log(
        'Set data "%s" on node %s, version: %d.',
        data.toString(),
        path,
        stat.version
      );
      //client.close();
    });

    //client.close();
  });
});


client.connect();

var stream = Kafka.KafkaConsumer.createReadStream({
  'client.id': 'consumer1',
  'metadata.broker.list': 'kafka1:9092,kafka2:9093,kafka3:9094',
  'group.id': 'consumer-group-a',
  'enable.auto.commit': true
}, {}, {
  topics: 'test',
  waitInterval: 0,
  objectMode: false
});

stream.on('ready', function(arg) {
  console.log('consumer ready.' + JSON.stringify(arg));
  stream.subscribe(['test']);
  stream.consume();

});


stream.on('error', function(err) {
  if (err) console.log(err);
  process.exit(1);
});

stream.on('data', function(message) {
  console.log('Processing the message...');
  var data = JSON.parse(message);
  console.log(JSON.stringify(data));
});


stream.on('error', function(err) {
  console.log(err);
  process.exit(1);
});

stream.consumer.on('event.error', function(err) {
  console.log(err);
});

console.log('consumer');

console.log(Kafka.features);