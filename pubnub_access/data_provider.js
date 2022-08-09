const fs = require('fs')
require('dotenv').config()

const dataFile = process.env.DATA_FILE

const getAllTokens = function(){
  var isFile = fs.existsSync(dataFile)
  if (isFile) {
  let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'))
  let tokensMap = new Map(Object.entries(data))
  return tokensMap
  } 
  return null
}

const saveToken = function(tokenId,token, ttl){
  let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'))
  let tokensMap = new Map(Object.entries(data))
  let tokenDetails = {
    token: token,
    timestamp: Date.now(),
    ttl: ttl
  }
  tokensMap.set(tokenId, tokenDetails)
  fs.writeFileSync(dataFile, JSON.stringify(Object.fromEntries(tokensMap), null, 2))
  return true
}

const getTokenDetailsById = function(tokenId){
  let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'))
  let tokensMap = new Map(Object.entries(data))
  var exist = tokensMap.has(tokenId)
  if(exist){
    var tokenDetails = tokensMap.get(tokenId)
    return tokenDetails
  }
  return null
}

const isTokenExpired = function(tokenId){
  const { timestamp, ttl } = getTokenDetailsById(tokenId)
  
  let minuteDifference = (Date.now() - timestamp)/60000

  return  ttl - minuteDifference <= 0
}

const getTokenStringById = function(tokenId){
  let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'))
  let tokensMap = new Map(Object.entries(data))
  var exist = tokensMap.has(tokenId)
  if(exist){
    var tokenDetails = tokensMap.get(tokenId)
    return tokenDetails.token
  }
  throw {error: `token with id ${tokenId} not found`}
}
  
module.exports = {
  saveToken,
  getTokenStringById,
  isTokenExpired
}
