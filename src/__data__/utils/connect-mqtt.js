import mqtt from 'mqtt'

import { TOPIC, CONNECTION_URL} from '../constants'

export const connectMqtt = (dispatch) => {
  const client  = mqtt.connect(CONNECTION_URL)

  client.on('connect', function () {
    client.subscribe(TOPIC, function (err) {
      if (!err) {
        client.publish(TOPIC, 'Hello mqtt')
      }
    })
  })

  client.on('message', function (topic, message) {
    console.log(message.toString())
    client.end()
  })
}