define("ember-data/-private/system/store/finders", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/system/store/common", "ember-data/-private/system/store/serializer-response", "ember-data/-private/system/store/serializers"], function (exports, _ember, _debug, _common, _serializerResponse, _serializers) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports._find = _find;
  exports._findMany = _findMany;
  exports._findHasMany = _findHasMany;
  exports._findBelongsTo = _findBelongsTo;
  exports._findAll = _findAll;
  exports._query = _query;
  exports._queryRecord = _queryRecord;
  var Promise = _ember.default.RSVP.Promise;


  function payloadIsNotBlank(adapterPayload) {
    if (Array.isArray(adapterPayload)) {
      return true;
    } else {
      return Object.keys(adapterPayload || {}).length;
    }
  }

  function _find(adapter, store, modelClass, id, internalModel, options) {
    var snapshot = internalModel.createSnapshot(options);
    var modelName = internalModel.modelName;

    var promise = adapter.findRecord(store, modelClass, id, snapshot);
    var serializer = (0, _serializers.serializerForAdapter)(store, adapter, modelName);
    var label = "DS: Handle Adapter#findRecord of '" + modelName + "' with id: '" + id + "'";

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, id, 'findRecord');


      return store._push(payload);
    }, function (error) {
      internalModel.notFound();
      if (internalModel.isEmpty()) {
        internalModel.unloadRecord();
      }

      throw error;
    }, "DS: Extract payload of '" + modelName + "'");
  }

  function _findMany(adapter, store, modelName, ids, internalModels) {
    var snapshots = _ember.default.A(internalModels).invoke('createSnapshot');
    var modelClass = store.modelFor(modelName); // `adapter.findMany` gets the modelClass still
    var promise = adapter.findMany(store, modelClass, ids, snapshots);
    var serializer = (0, _serializers.serializerForAdapter)(store, adapter, modelName);
    var label = "DS: Handle Adapter#findMany of '" + modelName + "'";

    if (promise === undefined) {
      throw new Error('adapter.findMany returned undefined, this was very likely a mistake');
    }

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, null, 'findMany');
      return store._push(payload);
    }, null, "DS: Extract payload of " + modelName);
  }

  function _findHasMany(adapter, store, internalModel, link, relationship) {
    var snapshot = internalModel.createSnapshot();
    var modelClass = store.modelFor(relationship.type);
    var promise = adapter.findHasMany(store, snapshot, link, relationship);
    var serializer = (0, _serializers.serializerForAdapter)(store, adapter, relationship.type);
    var label = "DS: Handle Adapter#findHasMany of '" + internalModel.modelName + "' : '" + relationship.type + "'";

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, internalModel));

    return promise.then(function (adapterPayload) {
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, null, 'findHasMany');
      var internalModelArray = store._push(payload);

      internalModelArray.meta = payload.meta;
      return internalModelArray;
    }, null, "DS: Extract payload of '" + internalModel.modelName + "' : hasMany '" + relationship.type + "'");
  }

  function _findBelongsTo(adapter, store, internalModel, link, relationship) {
    var snapshot = internalModel.createSnapshot();
    var modelClass = store.modelFor(relationship.type);
    var promise = adapter.findBelongsTo(store, snapshot, link, relationship);
    var serializer = (0, _serializers.serializerForAdapter)(store, adapter, relationship.type);
    var label = "DS: Handle Adapter#findBelongsTo of " + internalModel.modelName + " : " + relationship.type;

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, internalModel));

    return promise.then(function (adapterPayload) {
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, null, 'findBelongsTo');

      if (!payload.data) {
        return null;
      }

      return store._push(payload);
    }, null, "DS: Extract payload of " + internalModel.modelName + " : " + relationship.type);
  }

  function _findAll(adapter, store, modelName, sinceToken, options) {
    var modelClass = store.modelFor(modelName); // adapter.findAll depends on the class
    var recordArray = store.peekAll(modelName);
    var snapshotArray = recordArray._createSnapshot(options);
    var promise = adapter.findAll(store, modelClass, sinceToken, snapshotArray);
    var serializer = (0, _serializers.serializerForAdapter)(store, adapter, modelName);
    var label = "DS: Handle Adapter#findAll of " + modelClass;

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, null, 'findAll');

      store._push(payload);
      store.didUpdateAll(modelName);

      return store.peekAll(modelName);
    }, null, 'DS: Extract payload of findAll ${modelName}');
  }

  function _query(adapter, store, modelName, query, recordArray) {
    var modelClass = store.modelFor(modelName); // adapter.query needs the class
    var promise = adapter.query(store, modelClass, query, recordArray);

    var serializer = (0, _serializers.serializerForAdapter)(store, adapter, modelName);

    var label = "DS: Handle Adapter#query of " + modelClass;

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, null, 'query');

      var internalModels = store._push(payload);

      recordArray._setInternalModels(internalModels, payload);

      return recordArray;
    }, null, "DS: Extract payload of query " + modelName);
  }

  function _queryRecord(adapter, store, modelName, query) {
    var modelClass = store.modelFor(modelName); // adapter.queryRecord needs the class
    var promise = adapter.queryRecord(store, modelClass, query);
    var serializer = (0, _serializers.serializerForAdapter)(store, adapter, modelName);
    var label = "DS: Handle Adapter#queryRecord of " + modelName;

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, null, 'queryRecord');

      return store._push(payload);
    }, null, "DS: Extract payload of queryRecord " + modelName);
  }
});