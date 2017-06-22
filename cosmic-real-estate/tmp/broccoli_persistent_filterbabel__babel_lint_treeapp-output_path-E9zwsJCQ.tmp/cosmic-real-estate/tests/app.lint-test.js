define('cosmic-real-estate/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/listing.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'adapters/listing.js should pass ESLint\n\n3:1 - Unexpected console statement. (no-console)\n7:28 - \'snapshot\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/real-estate-listing.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/real-estate-listing.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/format-price.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/format-price.js should pass ESLint\n\n3:40 - \'rest\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('helpers/format-upvotes.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/format-upvotes.js should pass ESLint\n\n');
  });

  QUnit.test('models/listing.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/listing.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/listings.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/listings.js should pass ESLint\n\n');
  });

  QUnit.test('routes/listings/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/listings/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/listings/listing.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/listings/listing.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/listing.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'serializers/listing.js should pass ESLint\n\n39:23 - \'options\' is defined but never used. (no-unused-vars)');
  });
});