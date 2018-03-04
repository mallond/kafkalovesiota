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
  'metadata.broker.list': 'kafka1:9092',
  'group.id': 'test',
  'socket.keepalive.enable': true,
  'enable.auto.commit': true
}, {}, {
  topics: 'test',
  waitInterval: 0,
  objectMode: false
});

stream.on('error', function(err) {
  if (err) console.log(err);
  process.exit(1);
});

stream.pipe(process.stdout);

stream.on('error', function(err) {
  console.log(err);
  process.exit(1);
});

stream.consumer.on('event.error', function(err) {
  console.log(err);
});

console.log('consumer');

console.log(Kafka.features);