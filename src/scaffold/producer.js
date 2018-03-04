/**
 * Created by dm on 3/3/18.
 */

var Kafka = require('node-rdkafka');
var uuidv1 = require('uuid/v1');


var producer = new Kafka.Producer({
  //'debug' : 'all',
  'client.id': 'producer1',
  'metadata.broker.list': 'kafka1:9092,kafka1:9093,kafka1:9094',
  'dr_cb': true  //delivery report callback
});

var topicName = 'test';

//logging debug messages, if debug is enabled
producer.on('event.log', function(log) {
  console.log(log);
});

//logging all errors
producer.on('event.error', function(err) {
  console.error('Error from producer');
  console.error(err);
});

//counter to stop this sample after maxMessages are sent
var counter = 0;
var maxMessages = 1000;

producer.on('delivery-report', function(err, report) {
  console.log('delivery-report: ' + JSON.stringify(report));
  counter++;
});

//Wait for the ready event before producing
producer.on('ready', function(arg) {
  console.log('producer ready.' + JSON.stringify(arg));

  for (var i = 0; i < maxMessages; i++) {
    var value = new Buffer('{"id":'+'"'+uuidv1()+'",'+'"value":' +i+'}');
    var key = "key-"+i;
    // if partition is set to -1, librdkafka will use the default partitioner
    var partition = -1;
    producer.produce(topicName, partition, value, key);
  }

  //need to keep polling for a while to ensure the delivery reports are received
  var pollLoop = setInterval(function() {
    console.log(counter);
    producer.poll();
    if (counter === maxMessages) {
      clearInterval(pollLoop);
      producer.disconnect();
    }
  }, 1000);

});

producer.on('disconnected', function(arg) {
  console.log('producer disconnected. ' + JSON.stringify(arg));
});

//starting the producer
producer.connect();
