// Copyright 2007 The Closure Library Authors. All Rights Reserved.
// Use of this source code is governed by the Apache License, Version 2.0.

goog.provide('goog.graphics.ext.coordinatesTest');
goog.setTestOnly('goog.graphics.ext.coordinatesTest');

goog.require('goog.graphics');
goog.require('goog.graphics.ext.coordinates');
goog.require('goog.testing.jsunit');

function testIsPercent() {
  assert('50% is a percent',
      goog.graphics.ext.coordinates.isPercent_('50%'));
  assert('50 is not a percent',
      !goog.graphics.ext.coordinates.isPercent_('50'));
}

function testIsPixels() {
  assert('50px is pixels', goog.graphics.ext.coordinates.isPixels_('50px'));
  assert('50 is not pixels', !goog.graphics.ext.coordinates.isPixels_('50'));
}

function testIsSpecial() {
  assert('50px is special', goog.graphics.ext.coordinates.isSpecial('50px'));
  assert('50% is special', goog.graphics.ext.coordinates.isSpecial('50%'));
  assert('50 is not special', !goog.graphics.ext.coordinates.isSpecial('50'));
}

function testComputeValue() {
  assertEquals('50% of 100 is 50', 50,
      goog.graphics.ext.coordinates.computeValue('50%', 100, null));
  assertEquals('50.5% of 200 is 101', 101,
      goog.graphics.ext.coordinates.computeValue('50.5%', 200, null));
  assertEquals('50px = 25 units when in 2x view', 25,
      goog.graphics.ext.coordinates.computeValue('50px', null, 2));
}

function testGenericGetValue() {
  var getValue = goog.graphics.ext.coordinates.getValue;

  var cache = {};

  assertEquals('Testing 50%', 50,
      getValue('50%', false, 100, 2, cache));

  var count = 0;
  for (var x in cache) {
    count++;
    cache[x] = 'OVERWRITE';
  }

  assertEquals('Testing cache size', 1, count);
  assertEquals('Testing cache usage', 'OVERWRITE',
      getValue('50%', false, 100, 2, cache));

  cache = {};

  assertEquals('Testing 0%', 0,
      getValue('0%', false, 100, 2, cache));
}
