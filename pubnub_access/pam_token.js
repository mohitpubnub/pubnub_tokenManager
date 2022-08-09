const PubNub = require('pubnub')
require('dotenv').config();

const pubnub = new PubNub({
  publishKey: env.process.PUBLISH_KEY,
  subscribeKey: env.process.SUBSCRIBE_KEY,
  secretKey: env.process.SECRET_KEY,
  uuid: 'server-user',
});

async function createPAMToken(userId, ttl, authorizedUserId, resourcesPermissions, patternsPermissions) {
  pubnub.setUUID(userId);
  let token = null;
  try {
  token = await pubnub.grantToken(
  {
    ttl: ttl,
    authorized_uuid: authorizedUserId,
    resources: resourcesPermissions,
    patterns: patternsPermissions
  })
  } catch(e) {
    console.log()
    throw e.status.errorData.error.details
  }
  
  return token
}

module.exports = {
  createPAMToken
}