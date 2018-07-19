'use strict';
var validator = function() {}

validator.ethFuncs = null; // = require('./ethFuncs');
validator.ethUtil = null; // = require('ethereumjs-util');
validator.globalFuncs = null; // = require('./globalFuncs');

validator.isValidAddress = function(address) {
    if (address && address == "0x0000000000000000000000000000000000000000") return false;
    if (address)
        return this.ethFuncs.validateEtherAddress(address);
    return false;
}
validator.isChecksumAddress = function(address) {
    return this.ethFuncs.isChecksumAddress(address);
}
validator.isValidENSorEtherAddress = function(address) {
    return (this.isValidAddress(address) || this.isValidENSAddress(address));
}
validator.isValidENSName = function(str) {
    try {
        return (str.length > 6 && ens.normalise(str) != '' && str.substring(0, 2) != '0x');
    } catch (e) {
        return false;
    }
}
validator.isValidTxHash = function(txHash) {
    return txHash.substring(0, 2) == "0x" && txHash.length == 66 && this.isValidHex(txHash);
}
validator.isValidENSAddress = function(address) {
    address = ens.normalise(address);
    var tld = address.substr(address.lastIndexOf('.') + 1);
    var _ens = new ens();
    var validTLDs = {
        eth: true,
        test: true,
        reverse: true
    }
    if (validTLDs[tld]) return true;
    return false;
}
validator.isValidBTCAddress = function(address) {
    return this.ethUtil.WAValidator.validate(address, 'BTC');
}
validator.isPositiveNumber = function(value) {
    return this.globalFuncs.isNumeric(value) && parseFloat(value) >= 0;
}
validator.isValidHex = function(hex) {
    return this.ethFuncs.validateHexString(hex);
}
validator.isValidPrivKey = function(privkeyLen) {
    return privkeyLen == 64 || privkeyLen == 66 || privkeyLen == 128 || privkeyLen == 132;
}
validator.isValidMnemonic = function(mnemonic) {
    return hd.bip39.validateMnemonic(mnemonic);
}
validator.isPasswordLenValid = function(pass, len) {
    if (pass === 'undefined' || pass == null) return false;
    return pass.length > len;
}
validator.isAlphaNumeric = function(value) {
    return this.globalFuncs.isAlphaNumeric(value);
}
validator.isAlphaNumericSpace = function(value) {
    if (!value) return false;
    return this.globalFuncs.isAlphaNumeric(value.replace(/ /g, ''));
}
validator.isJSON = function(json) {
    return this.ethUtil.solidityUtils.isJson(json);
}
validator.isValidURL = function(str) {
    var pattern = new RegExp('^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}
module.exports = validator;
