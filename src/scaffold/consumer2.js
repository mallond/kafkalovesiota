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

var stream = Kafka.KafkaConsumer.createReadStream({
  'client.id': 'consumer2',
  'metadata.broker.list': 'kafka1:9092',
  'group.id': 'consumer-group-b',
  'enable.auto.commit': true
}, {}, {
  topics: 'test',
  waitInterval: 0,
  objectMode: false
});

stream.on('ready', function(arg) {
  console.log('consumer ready.' + JSON.stringify(arg));

  stream.subscribe(['test']);
  // Read one message every 1000 milliseconds
  setInterval(function() {
    stream.consume(1);
  }, 1000);

});

stream.on('error', function(err) {
  if (err) console.log(err);
  process.exit(1);
});

stream.on('data', function(message) {
  console.log('Got message');
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