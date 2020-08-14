const mqtt = require('mqtt').connect('mqtt://192.168.3.4');
const fs = require('fs');
const redis = require('redis').createClient(6379, '127.0.0.1');






var data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var res = [0, 0, 0, 0];





mqtt.on('connect', function () {
  mqtt.subscribe('#', function (err) {
    if (!err) {
      console.log('Connected...');
      mqtt.publish('hass/refresh', '1');
    }
  })
})



setInterval(()=>{
 let o = [];

 let date = new Date();

 o = o.concat(data)
 o.push(date.getHours())
 o.push(date.getMonth()+1)
 o = o.concat(res);

 o = o.map(Number)
 redis.get('smartMode', (e, v)=>{
  if(v=='0'){
  //console.log(date.valueOf(), o);
    fs.appendFile('/var/dataset/'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'.dat', '['+o+']\n', ()=>{}); 
  }

 });
}, 1000);





mqtt.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic.toString(), message.toString());
  if(topic.toString() == 'hass/snsr/hall/p0'){
    data[0] = message.toString();
  }else if(topic.toString() == 'hass/snsr/hall/p1'){
    data[1] = message.toString();
  }else if(topic.toString() == 'hass/snsr/hall/p2'){
    data[2] = message.toString();
  }else if(topic.toString() == 'hass/snsr/hall/p3'){
    data[3] = message.toString();
  }else if(topic.toString() == 'hass/snsr/din/p0'){
    data[4] = message.toString();
  }else if(topic.toString() == 'hass/snsr/din/p1'){
    data[5] = message.toString();
  }else if(topic.toString() == 'hass/snsr/din/p2'){
    data[6] = message.toString();
  }else if(topic.toString() == 'hass/snsr/din/p3'){
    data[7] = message.toString();
  }else if(topic.toString() == 'hass/snsr/kit/p0'){
    data[8] = message.toString();
  }else if(topic.toString() == 'hass/snsr/kit/p1'){
    data[9] = message.toString();
  }else if(topic.toString() == 'hass/snsr/kit/p2'){
    data[10] = message.toString();
  }else if(topic.toString() == 'hass/snsr/kit/p3'){
    data[11] = message.toString();
  }else if(topic.toString() == 'hass/snsr/liv/p0'){
    data[12] = message.toString();
  }else if(topic.toString() == 'hass/snsr/liv/p1'){
    data[13] = message.toString();
  }else if(topic.toString() == 'hass/snsr/liv/p2'){
    data[14] = message.toString();
  }else if(topic.toString() == 'hass/snsr/liv/p3'){
    data[15] = message.toString();
  }else if(topic.toString() == 'hass/snsr/livb/p0'){
    data[16] = message.toString();
  }else if(topic.toString() == 'hass/snsr/livb/p1'){
    data[17] = message.toString();
  }else if(topic.toString() == 'hass/snsr/livb/p2'){
    data[18] = message.toString();
  }else if(topic.toString() == 'hass/snsr/livb/p3'){
    data[19] = message.toString();
  }

 
  
  if(topic.toString() == 'hass/snsr/hall/light'){
    res[0] = message.toString();
  }else if(topic.toString() == 'hass/snsr/din/light'){
    res[1] = message.toString();
  }else if(topic.toString() == 'hass/snsr/kit/light'){
    res[2] = message.toString();
  }else if(topic.toString() == 'hass/snsr/liv/light'){
    res[3] = message.toString();
  }


  if(topic.toString() == 'inner/smartLightMode'){
    redis.set('smartMode', message.toString());
  }


})
