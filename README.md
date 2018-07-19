# Urbit Constitution client module


## Validation and Formatting Functions


#### `toAddress(name)`
Returns an int of the ship's Urbit address


#### `valGalaxy(galaxy)`
Returns a bool 


#### `valStar(star)`
Returns a bool


#### `valShip(ship)`
Returns a bool


#### `valAddress(address)`
Returns a bool for an Ether address


#### `formatShipName(ship)`
Adds a tilde to a valid Urbit ship name


#### `toShipName(address)`
Converts an Urbit address to a ship name


## Read from the blockchain


#### `buildOwnedShips(ethAddress, callback)`
Returns an object loaded with the ships owned by `address`


#### `getSpawnCandidate(address)`
Returns a random child ship from the Urbit ship `address`


#### `getConstitutionOwner(callback)`
Returns the Ether address of the owner of the Urbit constitution


#### `readShipData(ship, callback)`
Returns `hasBeenBooted` bool for `ship`


#### `readHasOwner(ship, callback)`
Returns a bool for whether `ship` has an owner


#### `readIsOwner(ship, child, callback)`
Returns a bool for whether `ship` owns `child`


#### `readPoolAssets(poolAddress, callback)`
Returns the total Spark assets of the pool at `poolAddress`


#### `readBalance(poolAddress, callback)`
Returns the balance of Spark assets in the pool at `poolAddress` held by the given wallet 


#### `readParent(ship, callback)`
Returns the parent ship address of `ship`


#### `readOwnedShips(ethAddress, callback)`
Returns the list of ships owned by `ethAddress`


#### `readIsRequestingEscapeTo(ship, sponsor, callback)`
Returns a bool for whether `ship` is currently requesting an escape to `sponsor`


#### `readKeys(ship, callback)`
Returns the keys for `ship`


#### `readIsSpawnProxy(ship, ethAddress, callback)`
Returns a bool for whether `ethAddress` is the spawn proxy of `ship`


## Create blockchain transactions

Each of the `do` functions returns a signed transaction


#### `doCreateGalaxy(galaxy, callback)`
Create `galaxy`


#### `doDeposit(star, poolAddress, callback)`
Deposit `star` into the pool


#### `doWithdraw(star, poolAddress, callback)`
Withdraw `star` from the pool


#### `doSpawn(ship, callback)`
Spawn `ship`


#### `doSetSpawnProxy(ship, ethAddress, callback)`
Set `ethAddress` as the spawn proxy of `ship`


#### `doConfigureKeys(ship, encryptionKey, authenticationKey, discontinuous, callback)`
Set `encryptionKey` and `authenticationKey` as the keys for `ship`. bool `discontinuous` optionally increments the continuity number of `ship`


#### `doTransferShip(ship, ethAddress, reset, callback)`
Transfer `ship` to `ethAddress`. bool `reset` optionally clears the keys and breaks continuity


#### `doSetTransferProxy(ship, ethAddress, callback)`
Set `ethAddress` as the transfer proxy for `ship`


#### `doEscape(ship, sponsor, callback)`
Escape `ship` to `sponsor`


#### `doAdopt(sponsor, escapee, callback)`
`sponsor` accepts `escapee`


#### `doReject(sponsor, escapee, callback)`
`sponsor` rejects `escapee`


#### `doApprove(ethAddress, ship, callback)`
Approve `ethAddress` to transfer `ship`


#### `doSafeTransferFrom(fromAddress, toAddress, ship, callback)`
Conduct a safe transfer of `ship` from `fromAddress` to `toAddress`


#### `doCastConstitutionVote(galaxy, prop, vote, callback)`
Cast `vote` from `galaxy` on constitution proposal at `prop`


#### `doCastDocumentVote(galaxy, prop, vote, callback)`
Cast `vote` from `galaxy` on document proposal at `prop`




## Send signed transactions

#### `sendTx(signedTx, callback)`
Submit `signedTx` to the blockchain


## Command Line Examples

### Get a spawn candidate for a ship you own and then spawn it 

#### Call `getSpawnCandidate` passing in the Urbit address of a ship you own 
`node -pe 'require("./index").getSpawnCandidate(256)'`

Note that because this function doesn't take a callback this command uses the `-pe` flag in order to print the returned value.
#### Returns
`791085312`
This function is a random number generator, so returned values will vary


#### Call `doSpawn` with the returned spawn candidate address
```
node -e 'require("./index").doSpawn(791085312,console.log)'
```
#### Returns
```
{ 
  error: false,
  rawTx: 
  	'{
  		"nonce":"0x14",
  		"gasPrice":"0x04e3b29200",
  		"gasLimit":"0x0446c6",
  		"to":"0x098b6cb45da68c31c751d9df211cbe3056c356d1",
  		"value":"0x00",
  		"data":"0xa0d3253f000000000000000000000000000000000000000000000000000000002f2701000000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d",
  		"chainId":1
  	}',
  signedTx: '0xf8aa148504e3b29200830446c694098b6cb45da68c31c751d9df211cbe3056c356d180b844a0d3253f000000000000000000000000000000000000000000000000000000002f2701000000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d25a0f216335c74c4e7151feaa1afb83bf5d08cfc72eab336268e5edd4ffae6ca3f55a068ffbb95cd3eb20b2aaf83960df96e1ff6ff3ddce2d68ca4fd762de8fcd350cd',
  showRaw: true 
}
```


#### Call `sendTx` with `signedTx` from the value returned
```
node -e 'require("./index").sendTx("0xf8aa148504e3b29200830446c694098b6cb45da68c31c751d9df211cbe3056c356d180b844a0d3253f000000000000000000000000000000000000000000000000000000002f2701000000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d25a0f216335c74c4e7151feaa1afb83bf5d08cfc72eab336268e5edd4ffae6ca3f55a068ffbb95cd3eb20b2aaf83960df96e1ff6ff3ddce2d68ca4fd762de8fcd350cd",console.log)'
```
#### Returns
```
{ 
  error: false,
  data: 
   { 
   	resp: '0x5b32667f0ce0032007dba91c1011942a3140f826c69a6c689632caa91321c7b0',
     tx: 
      	{ 
      	  gasLimit: '',
          data: '',
          to: '',
          unit: 'ether',
          value: 0,
          nonce: null,
          gasPrice: null 
    	} 
    } 
}
```

#### Call `doCreateGalaxy` to create a galaxy
`node -e 'require("./index").doCreateGalaxy(42,console.log)'`
#### Returns
```
{ 
  error: false,
  rawTx: 
  	'{	
  		"nonce":"0x15",
  		"gasPrice":"0x04e3b29200",
  		"gasLimit":"0x0577b6",
  		"to":"0x098b6cb45da68c31c751d9df211cbe3056c356d1",
  		"value":"0x00",
  		"data":"0x26295b52000000000000000000000000000000000000000000000000000000000000002a0000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d",
  		"chainId":1
  	}',
  signedTx: '0xf8aa158504e3b29200830577b694098b6cb45da68c31c751d9df211cbe3056c356d180b84426295b52000000000000000000000000000000000000000000000000000000000000002a0000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d25a02715424816be87e8ee0681e1b466351cf86e3210b741fc7df0e62569bb0f1d50a01a7cd8598b75b45517bb8cedad308d90c83b92088cd7cdde35354d5462852cda',
  showRaw: true
}
```


#### Call `sendTx` with `signedTx` from the value returned 
```
node -e 'require("./index").sendTx("0xf8aa158504e3b29200830577b694098b6cb45da68c31c751d9df211cbe3056c356d180b84426295b5200000000000000000000000000000000000000000000000000000000000000290000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d26a04b2cc47836c34114b88e404c0537dee6274687966a0e66f917d0a825c6e0c5c2a025c9dd5c48565653c67090f5ac2afd946d1c38c1d7d338a87aebe29d9fe52a5d",console.log)'
```
#### Returns
```
{ 
  error: false,
  data: 
   { 
   	 resp: '0xad46510dd77f86fa0a1290978c957d6541df9ba12253d0875554bcd2458950b7',
     tx: 
      	{ 
      	  gasLimit: '',
          data: '',
          to: '',
          unit: 'ether',
          value: 0,
          nonce: null,
          gasPrice: null 
        } 
    } 
}


Find out more: https://urbit.org  