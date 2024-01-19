import Realm, { ObjectSchema } from 'realm';
import { createRealmContext } from '@realm/react';

class Wallet extends Realm.Object<Wallet> {
  _id!: Realm.BSON.ObjectId;

  static schema: ObjectSchema = {
    name: 'Wallet',
    properties: {
      _id: 'objectId',
      type: 'string',
      privateKeys: 'string',
      nmemonic: 'string',
      address: 'string',
    },
    primaryKey: '_id',
  };
}

const realmConfig: Realm.Configuration = {
  schema: [Wallet],
  schemaVersion: 1,
};

const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig);

export { RealmProvider, useRealm, useObject, useQuery };
