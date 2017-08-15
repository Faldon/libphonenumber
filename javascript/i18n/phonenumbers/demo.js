/**
 * @license
 * Copyright (C) 2010 The Libphonenumber Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview  Phone Number Parser Demo.
 *
 * @author Nikolaos Trogkanis
 */

goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberUtil');

/**
 * PhoneNumber
 * @constructor
 * @export
 */
function PhoneNumber(p, r, v, nr, nt, cc, ac, sc, ds) {
  this['IsPossible'] = p;
  this['Reason'] = r;
  this['IsValid'] = v;
  this['NumberRegion'] = nr;
  this['NumberType'] = nt;
  this['CountryCode'] = cc;
  this['AreaCode'] = ac;
  this['StationCode'] = sc;
  this['DialString'] = ds;
  return this;
}

/** @type {boolean} */
PhoneNumber.prototype.IsPossible;
/** @type {number} */
PhoneNumber.prototype.Reason;
/** @type {boolean} */
PhoneNumber.prototype.IsValid;
/** @type {null|string} */
PhoneNumber.prototype.NumberRegion;
/** @type {number} */
PhoneNumber.prototype.NumberType;
/** @type {number} */
PhoneNumber.prototype.CountryCode;
/** @type {string} */
PhoneNumber.prototype.AreaCode;
/** @type {string} */
PhoneNumber.prototype.StationCode;
/** @type {string} */
PhoneNumber.prototype.DialString;

function phoneNumberParser(sNumber, sCountry) {
  var phoneNumber = sNumber;
  var regionCode = sCountry;
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
    var p = phoneUtil.isPossibleNumber(number);
    if (!p) {
      var r = phoneUtil.isPossibleNumberWithReason(number);
    } else {
      var r = 0;
      var v = phoneUtil.isValidNumberForRegion(number, regionCode);
      var nr = phoneUtil.getRegionCodeForNumber(number);
      var nt = phoneUtil.getNumberType(number);
    }
    var cc = phoneUtil.getCountryCodeForRegion(regionCode);
    var numberArray = phoneUtil.format(
      number, i18n.phonenumbers.PhoneNumberFormat.NATIONAL
    ).split(" ");
    var ac = numberArray[0].replace(/[^\d.]/g, "");
    var sc = numberArray.slice(1).join("").replace(/[^\d.]/g, "");
    var ds = phoneUtil.format(
      number, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL
    );
  } catch (e) {
    console.dir(e);
    return false;
  }
  return new PhoneNumber(p,r,v,nr,nt,cc,ac,sc,ds);
}
window['PhoneNumber'] = PhoneNumber;
PhoneNumber.prototype['IsPossible'] = PhoneNumber.prototype.IsPossible;
PhoneNumber.prototype['Reason'] = PhoneNumber.prototype.Reason;
PhoneNumber.prototype['IsValid'] = PhoneNumber.prototype.IsValid;
PhoneNumber.prototype['NumberRegion'] = PhoneNumber.prototype.NumberRegion;
PhoneNumber.prototype['NumberType'] = PhoneNumber.prototype.NumberType;
PhoneNumber.prototype['CountryCode'] = PhoneNumber.prototype.CountryCode;
PhoneNumber.prototype['AreaCode'] = PhoneNumber.prototype.AreaCode;
PhoneNumber.prototype['StationCode'] = PhoneNumber.prototype.StationCode;
PhoneNumber.prototype['DialString'] = PhoneNumber.prototype.DialString;
goog.exportSymbol('phoneNumberParser', phoneNumberParser);

