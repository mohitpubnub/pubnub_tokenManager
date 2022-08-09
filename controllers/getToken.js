const { getTokenStringById } = require('../pubnub_access/data_provider')


const getTokenController = (req, res) => {

  const { tokenId } = req.params

  if ( tokenId === null) {
    res.code(400).send({error : {message: 'Please provide a valid tokenId'}})
  }
  
  let tokenString
  try {
  
    tokenString = getTokenStringById(tokenId)
  
  } catch(e){
    res.code(404).send({error : e.error })
  }

  res.send({ token: tokenString })
}
module.exports = {
  getTokenController,
}