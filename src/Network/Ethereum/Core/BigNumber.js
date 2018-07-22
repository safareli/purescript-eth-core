"use strict";
var BigNumber = require('bn.js');

//NOTE: According to the documentation, many binary operators can take a normal js Number
//by suffixing the version for BN with 'n'.

exports._intToBigNumber = function(value) {
  return new BigNumber(value.toString(10), 10);
};

exports._numberToBigNumber = function(value) {
    return new BigNumber(value);
};

exports._eqBigNumber = function(n) {
    return function(m) { return m.eq(n); };
};

exports._addBigNumber = function(n) {
    return function (m) { return n.add(m); };
};

exports._mulBigNumber = function(n) {
    return function (m) { return n.mul(m); };
};

exports._subBigNumber = function(n) {
    return function (m) { return n.sub(m); };
};

exports.comparedTo = function (a) {
  return function (b) {
    return a.cmp(b);
  };
};

exports.fromStringAsImpl = function (just) {
  return function (nothing) {
    return function (radix) {
      return function (s) {
        var result;
        try {
            if (radix === 16) {
              if (s.indexOf('0x') === 0 || s.indexOf('-0x') === 0) {
                result = new BigNumber(s.replace('0x',''), 16);
              } else {
                result = new BigNumber(s, radix);
              }
            } else {
              result = new BigNumber(s, radix);
            }
        } catch (_) {
          return nothing;
        }
        return just(result);
      };
    };
  };
};

exports.toString = function (radix) {
  return function (bn) { return bn.toString(radix); };
};

exports.toTwosComplement = function (bn) {
  if (bn.ltn(0)) {
      return new BigNumber("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16).add(bn).addn(1);
  } else {
    return bn;
  }
};

exports.floorBigNumber = function(bn) {
    var bnStr = bn.toString(10);
    var newBn = new BigNumber(bnStr, 10);
    return newBn;
};

exports.pow = function(n) {
    return function (m) {
        var exp = new BigNumber(m, 10);
        return n.pow(exp);
    };
};

exports.toNumber = function (n) {
    var newN = new BigNumber(n);
    return newN.toNumber();
};

var isBigNumber = function (object) {
    return object instanceof BigNumber ||
        (object && object.constructor && object.constructor.name === 'BigNumber');
};

var isString = function (object) {
    return typeof object === 'string' ||
        (object && object.constructor && object.constructor.name === 'String');
};

exports.divide = function (n) {
    return function (d) {
        var newN = n.div(d);
        return newN;
    };
};
