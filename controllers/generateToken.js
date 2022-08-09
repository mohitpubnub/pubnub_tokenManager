const { createPAMToken } = require('../pubnub_access/pam_token')
const { saveToken } = require('../pubnub_access/data_provider')

const generateTokenController = async (req, res) => {
  
  const userId = req.query.userId

  const { tokenId } = req.params

  if (userId === null || tokenId === null) {
    res.code(400).send({error : [{message: 'userId and tokenId are mandatory'}]})
  }

  const { ttl, authorizedUserId, resources, patterns } = req.body

  let tokenString

  try {
    tokenString = await createPAMToken(userId, ttl, authorizedUserId, resources, patterns)
  } catch (e){
    res.code(400).send({error : e})
  }
  
  saveToken(tokenId, tokenString,ttl)

  res.send({ token: tokenString })

}
module.exports = {
  generateTokenController,
}
