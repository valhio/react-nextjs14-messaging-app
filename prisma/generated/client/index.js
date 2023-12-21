
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  detectRuntime,
} = require('./runtime/library')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.7.0
 * Query Engine version: 79fb5193cf0a8fdbef536e4b4a159cad677ab1b9
 */
Prisma.prismaVersion = {
  client: "5.7.0",
  engine: "79fb5193cf0a8fdbef536e4b4a159cad677ab1b9"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

/**
 * Enums
 */
exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  hashedPassword: 'hashedPassword',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  conversationIds: 'conversationIds',
  seenMessageIds: 'seenMessageIds'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.ConversationScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  lastMessageAt: 'lastMessageAt',
  name: 'name',
  isGroup: 'isGroup',
  messagesIds: 'messagesIds',
  userIds: 'userIds'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  body: 'body',
  image: 'image',
  createdAt: 'createdAt',
  seenIds: 'seenIds',
  conversationId: 'conversationId',
  senderId: 'senderId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};


exports.Prisma.ModelName = {
  User: 'User',
  Account: 'Account',
  Conversation: 'Conversation',
  Message: 'Message'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\booya\\Desktop\\RilaTalks\\rila-talks\\prisma\\generated\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "5.7.0",
  "engineVersion": "79fb5193cf0a8fdbef536e4b4a159cad677ab1b9",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mongodb",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Ly8gVGhpcyBpcyB5b3VyIFByaXNtYSBzY2hlbWEgZmlsZSwNCi8vIGxlYXJuIG1vcmUgYWJvdXQgaXQgaW4gdGhlIGRvY3M6IGh0dHBzOi8vcHJpcy5seS9kL3ByaXNtYS1zY2hlbWENCg0KZ2VuZXJhdG9yIGNsaWVudCB7DQogIHByb3ZpZGVyID0gInByaXNtYS1jbGllbnQtanMiDQogIG91dHB1dCA9ICIuL2dlbmVyYXRlZC9jbGllbnQiDQp9DQoNCmRhdGFzb3VyY2UgZGIgew0KICBwcm92aWRlciA9ICJtb25nb2RiIg0KICB1cmwgICAgICA9IGVudigiREFUQUJBU0VfVVJMIikNCn0NCg0KbW9kZWwgVXNlcnsNCiAgLy8gU29tZSBmaWVsZHMgaGF2ZSBiZWVuIHNldCB0byBvcHRpb25hbCBiZWNhdXNlIHNvY2lhbCBtZWRpYSBsb2dpbnMgYXJlIGVuYWJsZWQgYW5kIHRoZXkgZG9uJ3QgaGF2ZSBhbGwgdGhlIGZpZWxkcyB0aGF0IGFyZSByZXF1aXJlZCBmb3IgYSBub3JtYWwgbG9naW4uDQogIC8vIGlkICAgICAgICBTdHJpbmcgICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkNCiAgaWQgICAgICAgIFN0cmluZyAgICBAaWQgQGRlZmF1bHQoYXV0bygpKSBAbWFwKCJfaWQiKSBAZGIuT2JqZWN0SWQgLy8gV2hhdCB0aGlzIGRvZXMgaXMgdGhhdCBpdCB0ZWxscyBQcmlzbWEgdG8gdXNlIHRoZSBfaWQgZmllbGQgaW4gTW9uZ29EQiBhcyB0aGUgaWQgZmllbGQgaW4gUHJpc21hLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIE1vbmdvREIgdXNlcyBfaWQgYXMgdGhlIGRlZmF1bHQgcHJpbWFyeSBrZXkgZmllbGQgbmFtZS4gSWYgeW91IGRvbid0IGRvIHRoaXMsIFByaXNtYSB3aWxsIGNyZWF0ZSBhIG5ldyBpZCBmaWVsZCBpbiBNb25nb0RCIGFuZCB1c2UgdGhhdCBhcyB0aGUgcHJpbWFyeSBrZXkgaW5zdGVhZC4NCiAgbmFtZSAgICAgIFN0cmluZz8NCiAgZW1haWwgICAgIFN0cmluZz8gICAgQHVuaXF1ZQ0KICBlbWFpbFZlcmlmaWVkIERhdGVUaW1lPyANCiAgaW1hZ2UgICAgIFN0cmluZz8NCiAgaGFzaGVkUGFzc3dvcmQgU3RyaW5nPw0KICBjcmVhdGVkQXQgRGF0ZVRpbWUgIEBkZWZhdWx0KG5vdygpKQ0KICB1cGRhdGVkQXQgRGF0ZVRpbWUgIEB1cGRhdGVkQXQNCg0KLy8gVGhpcyBjb252ZXJzYXRpb24gcmVsYXRpb25zaGlwIGlzIGEgb25lLXRvLW1hbnkgcmVsYXRpb25zaGlwLiBJdCB0ZWxscyBQcmlzbWEgdGhhdCBhIHVzZXIgY2FuIGhhdmUgbWFueSBjb252ZXJzYXRpb25zLiBUaGUgZmllbGRzOiBbY29udmVyc2F0aW9uSWRzXSB0ZWxscyBQcmlzbWEgdGhhdCB0aGUgY29udmVyc2F0aW9uSWRzIGZpZWxkIGluIHRoZSB1c2VyIG1vZGVsIGlzIHJlbGF0ZWQgdG8gdGhlIGlkIGZpZWxkIGluIHRoZSBjb252ZXJzYXRpb24gbW9kZWwuIFRoZSByZWZlcmVuY2VzOiBbaWRdIHRlbGxzIFByaXNtYSB0aGF0IHRoZSBpZCBmaWVsZCBpbiB0aGUgY29udmVyc2F0aW9uIG1vZGVsIGlzIHJlbGF0ZWQgdG8gdGhlIGNvbnZlcnNhdGlvbklkcyBmaWVsZCBpbiB0aGUgdXNlciBtb2RlbC4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBQcmlzbWEgbmVlZHMgdG8ga25vdyBob3cgdG8gcmVsYXRlIHRoZSB0d28gbW9kZWxzLg0KICBjb252ZXJzYXRpb25JZHMgU3RyaW5nW10gQGRiLk9iamVjdElkIC8vIFRoaXMgaXMgYW4gYXJyYXkgb2YgY29udmVyc2F0aW9uIGlkcy4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBNb25nb0RCIGRvZXNuJ3Qgc3VwcG9ydCBtYW55LXRvLW1hbnkgcmVsYXRpb25zaGlwcy4gU28gd2UgaGF2ZSB0byBzdG9yZSB0aGUgaWRzIG9mIHRoZSBjb252ZXJzYXRpb25zIHRoYXQgYSB1c2VyIGlzIGEgcGFydCBvZiBpbiBhbiBhcnJheSBpbiB0aGUgdXNlciBtb2RlbC4NCiAgY29udmVyc2F0aW9ucyBDb252ZXJzYXRpb25bXSBAcmVsYXRpb24oZmllbGRzOiBbY29udmVyc2F0aW9uSWRzXSwgcmVmZXJlbmNlczogW2lkXSkgLy8gVGhpcyBpcyB0aGUgcmVsYXRpb25zaGlwLiBJdCB0ZWxscyBQcmlzbWEgdGhhdCB0aGUgY29udmVyc2F0aW9uc0lkcyBmaWVsZCBpbiB0aGUgdXNlciBtb2RlbCBpcyByZWxhdGVkIHRvIHRoZSBpZCBmaWVsZCBpbiB0aGUgY29udmVyc2F0aW9uIG1vZGVsLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIFByaXNtYSBuZWVkcyB0byBrbm93IGhvdyB0byByZWxhdGUgdGhlIHR3byBtb2RlbHMuDQoNCi8vIFRoaXMgbWVzc2FnZSByZWxhdGlvbnNoaXAgaXMgYSBvbmUtdG8tbWFueSByZWxhdGlvbnNoaXAuIEl0IHRlbGxzIFByaXNtYSB0aGF0IGEgdXNlciBjYW4gaGF2ZSBtYW55IG1lc3NhZ2VzLiBUaGUgZmllbGRzOiBbbWVzc2FnZUlkc10gdGVsbHMgUHJpc21hIHRoYXQgdGhlIG1lc3NhZ2VJZHMgZmllbGQgaW4gdGhlIHVzZXIgbW9kZWwgaXMgcmVsYXRlZCB0byB0aGUgaWQgZmllbGQgaW4gdGhlIG1lc3NhZ2UgbW9kZWwuIFRoZSByZWZlcmVuY2VzOiBbaWRdIHRlbGxzIFByaXNtYSB0aGF0IHRoZSBpZCBmaWVsZCBpbiB0aGUgbWVzc2FnZSBtb2RlbCBpcyByZWxhdGVkIHRvIHRoZSBtZXNzYWdlSWRzIGZpZWxkIGluIHRoZSB1c2VyIG1vZGVsLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIFByaXNtYSBuZWVkcyB0byBrbm93IGhvdyB0byByZWxhdGUgdGhlIHR3byBtb2RlbHMuDQogIHNlZW5NZXNzYWdlSWRzIFN0cmluZ1tdIEBkYi5PYmplY3RJZCAvLyBUaGlzIGlzIGFuIGFycmF5IG9mIG1lc3NhZ2UgaWRzLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIE1vbmdvREIgZG9lc24ndCBzdXBwb3J0IG1hbnktdG8tbWFueSByZWxhdGlvbnNoaXBzLiBTbyB3ZSBoYXZlIHRvIHN0b3JlIHRoZSBpZHMgb2YgdGhlIG1lc3NhZ2VzIHRoYXQgYSB1c2VyIGhhcyBzZWVuIGluIGFuIGFycmF5IGluIHRoZSB1c2VyIG1vZGVsLg0KICBzZWVuTWVzc2FnZXMgTWVzc2FnZVtdIEByZWxhdGlvbigiU2VlbiIsIGZpZWxkczogW3NlZW5NZXNzYWdlSWRzXSwgcmVmZXJlbmNlczogW2lkXSkgLy8gVGhpcyBpcyB0aGUgcmVsYXRpb25zaGlwLiBJdCB0ZWxscyBQcmlzbWEgdGhhdCB0aGUgc2Vlbk1lc3NhZ2VzSWRzIGZpZWxkIGluIHRoZSB1c2VyIG1vZGVsIGlzIHJlbGF0ZWQgdG8gdGhlIGlkIGZpZWxkIGluIHRoZSBtZXNzYWdlIG1vZGVsLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIFByaXNtYSBuZWVkcyB0byBrbm93IGhvdyB0byByZWxhdGUgdGhlIHR3byBtb2RlbHMuIFRoZSAiU2VlbiIgaXMgdGhlIG5hbWUgb2YgdGhlIHJlbGF0aW9uc2hpcC4gSXQgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugd2UgaGF2ZSB0d28gcmVsYXRpb25zaGlwcyBiZXR3ZWVuIHRoZSB1c2VyIGFuZCBtZXNzYWdlIG1vZGVscy4gT25lIGlzIHRoZSAibWVzc2FnZXMiIHJlbGF0aW9uc2hpcCBhbmQgdGhlIG90aGVyIGlzIHRoZSAic2Vlbk1lc3NhZ2VzIiByZWxhdGlvbnNoaXAuIFNvIHdlIGhhdmUgdG8gZ2l2ZSB0aGVtIGRpZmZlcmVudCBuYW1lcyBzbyB0aGF0IFByaXNtYSBjYW4gZGlmZmVyZW50aWF0ZSBiZXR3ZWVuIHRoZW0uDQoNCiAgYWNjb3VudHMgQWNjb3VudFtdDQogIG1lc3NhZ2VzIE1lc3NhZ2VbXQ0KfQ0KDQptb2RlbCBBY2NvdW50ew0KICBpZCAgICAgICAgU3RyaW5nICAgIEBpZCBAZGVmYXVsdChhdXRvKCkpIEBtYXAoIl9pZCIpIEBkYi5PYmplY3RJZCAvLyBXaGF0IHRoaXMgZG9lcyBpcyB0aGF0IGl0IHRlbGxzIFByaXNtYSB0byB1c2UgdGhlIF9pZCBmaWVsZCBpbiBNb25nb0RCIGFzIHRoZSBpZCBmaWVsZCBpbiBQcmlzbWEuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgTW9uZ29EQiB1c2VzIF9pZCBhcyB0aGUgZGVmYXVsdCBwcmltYXJ5IGtleSBmaWVsZCBuYW1lLiBJZiB5b3UgZG9uJ3QgZG8gdGhpcywgUHJpc21hIHdpbGwgY3JlYXRlIGEgbmV3IGlkIGZpZWxkIGluIE1vbmdvREIgYW5kIHVzZSB0aGF0IGFzIHRoZSBwcmltYXJ5IGtleSBpbnN0ZWFkLg0KICB1c2VySWQgICAgU3RyaW5nICAgQGRiLk9iamVjdElkDQogIHR5cGUgICAgICBTdHJpbmcNCiAgcHJvdmlkZXIgIFN0cmluZyAvLyBUaGlzIGlzIHRoZSBuYW1lIG9mIHRoZSBwcm92aWRlci4gRm9yIGV4YW1wbGUsIEdvb2dsZSwgRmFjZWJvb2ssIGV0Yy4NCiAgcHJvdmlkZXJBY2NvdW50SWQgU3RyaW5nIC8vIFRoaXMgaXMgdGhlIGlkIHRoYXQgdGhlIHByb3ZpZGVyIGdpdmVzIHRvIHRoZSB1c2VyLiBGb3IgZXhhbXBsZSwgR29vZ2xlIGdpdmVzIGEgdXNlciBhIEdvb2dsZSBpZC4gRmFjZWJvb2sgZ2l2ZXMgYSB1c2VyIGEgRmFjZWJvb2sgaWQuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugd2UgbmVlZCB0byBrbm93IHdoaWNoIHVzZXIgaXMgbG9nZ2VkIGluLg0KICByZWZyZXNoX3Rva2VuIFN0cmluZz8gQGRiLlN0cmluZyANCiAgYWNjZXNzX3Rva2VuIFN0cmluZz8gQGRiLlN0cmluZw0KICBleHBpcmVzX2F0IEludD8NCiAgdG9rZW5fdHlwZSBTdHJpbmc/DQogIHNjb3BlIFN0cmluZz8NCiAgaWRfdG9rZW4gU3RyaW5nPyBAZGIuU3RyaW5nDQogIHNlc3Npb25fc3RhdGUgU3RyaW5nPw0KDQogIHVzZXIgVXNlciBAcmVsYXRpb24oZmllbGRzOiBbdXNlcklkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpIC8vIFdoYXQgdGhpcyBkb2VzIGlzIGl0IG1hcHMgdGhlIFVzZXIgbW9kZWwgdG8gdGhlIHVzZXJJZCBmaWVsZCBpbiB0aGUgQWNjb3VudCBtb2RlbC4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBQcmlzbWEgbmVlZHMgdG8ga25vdyBob3cgdG8gcmVsYXRlIHRoZSB0d28gbW9kZWxzIGFuZCB0aGVuIGl0IHJlZmVyZW5jZXMgdGhlIGlkIGZpZWxkIGluIHRoZSBVc2VyIG1vZGVsLiBUaGUgb25EZWxldGU6IENhc2NhZGUgdGVsbHMgUHJpc21hIHRoYXQgaWYgYSB1c2VyIGlzIGRlbGV0ZWQsIHRoZW4gYWxsIG9mIHRoZSBhY2NvdW50cyB0aGF0IGFyZSByZWxhdGVkIHRvIHRoYXQgdXNlciBzaG91bGQgYWxzbyBiZSBkZWxldGVkLg0KDQogIEBAdW5pcXVlKFtwcm92aWRlciwgcHJvdmlkZXJBY2NvdW50SWRdKSAvLyBUaGlzIHRlbGxzIFByaXNtYSB0aGF0IHRoZSBjb21iaW5hdGlvbiBvZiB0aGUgcHJvdmlkZXIgYW5kIHByb3ZpZGVyQWNjb3VudElkIGZpZWxkcyBzaG91bGQgYmUgdW5pcXVlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIGEgdXNlciBjYW4ndCBoYXZlIHR3byBhY2NvdW50cyB3aXRoIHRoZSBzYW1lIHByb3ZpZGVyIGFuZCBwcm92aWRlckFjY291bnRJZC4NCiB9DQoNCg0KbW9kZWwgQ29udmVyc2F0aW9uew0KICBpZCAgICAgICAgU3RyaW5nICAgIEBpZCBAZGVmYXVsdChhdXRvKCkpIEBtYXAoIl9pZCIpIEBkYi5PYmplY3RJZCAvLyBXaGF0IHRoaXMgZG9lcyBpcyB0aGF0IGl0IHRlbGxzIFByaXNtYSB0byB1c2UgdGhlIF9pZCBmaWVsZCBpbiBNb25nb0RCIGFzIHRoZSBpZCBmaWVsZCBpbiBQcmlzbWEuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgTW9uZ29EQiB1c2VzIF9pZCBhcyB0aGUgZGVmYXVsdCBwcmltYXJ5IGtleSBmaWVsZCBuYW1lLiBJZiB5b3UgZG9uJ3QgZG8gdGhpcywgUHJpc21hIHdpbGwgY3JlYXRlIGEgbmV3IGlkIGZpZWxkIGluIE1vbmdvREIgYW5kIHVzZSB0aGF0IGFzIHRoZSBwcmltYXJ5IGtleSBpbnN0ZWFkLg0KICBjcmVhdGVkQXQgRGF0ZVRpbWUgIEBkZWZhdWx0KG5vdygpKQ0KICAvLyBsYXN0TWVzc2FnZUF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQ0KICBsYXN0TWVzc2FnZUF0IERhdGVUaW1lIEB1cGRhdGVkQXQgDQogIG5hbWUgICAgICBTdHJpbmc/DQogIGlzR3JvdXAgICBCb29sZWFuIEBkZWZhdWx0KGZhbHNlKQ0KDQogIG1lc3NhZ2VzSWRzIFN0cmluZ1tdIEBkYi5PYmplY3RJZCAvLyBUaGlzIGlzIGFuIGFycmF5IG9mIG1lc3NhZ2UgaWRzLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIE1vbmdvREIgZG9lc24ndCBzdXBwb3J0IG1hbnktdG8tbWFueSByZWxhdGlvbnNoaXBzLiBTbyB3ZSBoYXZlIHRvIHN0b3JlIHRoZSBpZHMgb2YgdGhlIG1lc3NhZ2VzIHRoYXQgYXJlIGluIGEgY29udmVyc2F0aW9uIGluIGFuIGFycmF5IGluIHRoZSBjb252ZXJzYXRpb24gbW9kZWwuDQogIG1lc3NhZ2VzIE1lc3NhZ2VbXSANCg0KICB1c2VySWRzIFN0cmluZ1tdIEBkYi5PYmplY3RJZCAvLyBUaGlzIGlzIGFuIGFycmF5IG9mIHVzZXIgaWRzLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIE1vbmdvREIgZG9lc24ndCBzdXBwb3J0IG1hbnktdG8tbWFueSByZWxhdGlvbnNoaXBzLiBTbyB3ZSBoYXZlIHRvIHN0b3JlIHRoZSBpZHMgb2YgdGhlIHVzZXJzIHRoYXQgYXJlIGluIGEgY29udmVyc2F0aW9uIGluIGFuIGFycmF5IGluIHRoZSBjb252ZXJzYXRpb24gbW9kZWwuDQogIHVzZXJzIFVzZXJbXSBAcmVsYXRpb24oZmllbGRzOiBbdXNlcklkc10sIHJlZmVyZW5jZXM6IFtpZF0pIC8vIFRoaXMgaXMgdGhlIHJlbGF0aW9uc2hpcC4gSXQgdGVsbHMgUHJpc21hIHRoYXQgdGhlIHVzZXJJZHMgZmllbGQgaW4gdGhlIGNvbnZlcnNhdGlvbiBtb2RlbCBpcyByZWxhdGVkIHRvIHRoZSBpZCBmaWVsZCBpbiB0aGUgdXNlciBtb2RlbC4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBQcmlzbWEgbmVlZHMgdG8ga25vdyBob3cgdG8gcmVsYXRlIHRoZSB0d28gbW9kZWxzLg0KfQ0KDQptb2RlbCBNZXNzYWdlew0KICBpZCAgICAgICAgU3RyaW5nICAgIEBpZCBAZGVmYXVsdChhdXRvKCkpIEBtYXAoIl9pZCIpIEBkYi5PYmplY3RJZCAvLyBXaGF0IHRoaXMgZG9lcyBpcyB0aGF0IGl0IHRlbGxzIFByaXNtYSB0byB1c2UgdGhlIF9pZCBmaWVsZCBpbiBNb25nb0RCIGFzIHRoZSBpZCBmaWVsZCBpbiBQcmlzbWEuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgTW9uZ29EQiB1c2VzIF9pZCBhcyB0aGUgZGVmYXVsdCBwcmltYXJ5IGtleSBmaWVsZCBuYW1lLiBJZiB5b3UgZG9uJ3QgZG8gdGhpcywgUHJpc21hIHdpbGwgY3JlYXRlIGEgbmV3IGlkIGZpZWxkIGluIE1vbmdvREIgYW5kIHVzZSB0aGF0IGFzIHRoZSBwcmltYXJ5IGtleSBpbnN0ZWFkLg0KICBib2R5ICAgICAgU3RyaW5nPw0KICBpbWFnZSAgICAgU3RyaW5nPw0KICBjcmVhdGVkQXQgRGF0ZVRpbWUgIEBkZWZhdWx0KG5vdygpKQ0KDQogIHNlZW5JZHMgU3RyaW5nW10gQGRiLk9iamVjdElkIC8vIFRoaXMgaXMgYW4gYXJyYXkgb2YgdXNlciBpZHMuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgTW9uZ29EQiBkb2Vzbid0IHN1cHBvcnQgbWFueS10by1tYW55IHJlbGF0aW9uc2hpcHMuIFNvIHdlIGhhdmUgdG8gc3RvcmUgdGhlIGlkcyBvZiB0aGUgdXNlcnMgdGhhdCBoYXZlIHNlZW4gYSBtZXNzYWdlIGluIGFuIGFycmF5IGluIHRoZSBtZXNzYWdlIG1vZGVsLg0KICBzZWVuIFVzZXJbXSBAcmVsYXRpb24oIlNlZW4iLCBmaWVsZHM6IFtzZWVuSWRzXSwgcmVmZXJlbmNlczogW2lkXSkgLy8gVGhpcyBpcyB0aGUgcmVsYXRpb25zaGlwLiBJdCB0ZWxscyBQcmlzbWEgdGhhdCB0aGUgc2VlbklkcyBmaWVsZCBpbiB0aGUgbWVzc2FnZSBtb2RlbCBpcyByZWxhdGVkIHRvIHRoZSBpZCBmaWVsZCBpbiB0aGUgdXNlciBtb2RlbC4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBQcmlzbWEgbmVlZHMgdG8ga25vdyBob3cgdG8gcmVsYXRlIHRoZSB0d28gbW9kZWxzLiBUaGUgIlNlZW4iIGlzIHRoZSBuYW1lIG9mIHRoZSByZWxhdGlvbnNoaXAuIEl0IGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHdlIGhhdmUgdHdvIHJlbGF0aW9uc2hpcHMgYmV0d2VlbiB0aGUgdXNlciBhbmQgbWVzc2FnZSBtb2RlbHMuIE9uZSBpcyB0aGUgIm1lc3NhZ2VzIiByZWxhdGlvbnNoaXAgYW5kIHRoZSBvdGhlciBpcyB0aGUgInNlZW5NZXNzYWdlcyIgcmVsYXRpb25zaGlwLiBTbyB3ZSBoYXZlIHRvIGdpdmUgdGhlbSBkaWZmZXJlbnQgbmFtZXMgc28gdGhhdCBQcmlzbWEgY2FuIGRpZmZlcmVudGlhdGUgYmV0d2VlbiB0aGVtLg0KDQogIGNvbnZlcnNhdGlvbklkIFN0cmluZyBAZGIuT2JqZWN0SWQNCiAgY29udmVyc2F0aW9uIENvbnZlcnNhdGlvbiBAcmVsYXRpb24oZmllbGRzOiBbY29udmVyc2F0aW9uSWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSkgLy8gVGhpcyBpcyB0aGUgcmVsYXRpb25zaGlwLiBJdCB0ZWxscyBQcmlzbWEgdGhhdCB0aGUgY29udmVyc2F0aW9uSWQgZmllbGQgaW4gdGhlIG1lc3NhZ2UgbW9kZWwgaXMgcmVsYXRlZCB0byB0aGUgaWQgZmllbGQgaW4gdGhlIGNvbnZlcnNhdGlvbiBtb2RlbC4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBQcmlzbWEgbmVlZHMgdG8ga25vdyBob3cgdG8gcmVsYXRlIHRoZSB0d28gbW9kZWxzLg0KDQogIHNlbmRlcklkIFN0cmluZyBAZGIuT2JqZWN0SWQNCiAgc2VuZGVyIFVzZXIgQHJlbGF0aW9uKGZpZWxkczogW3NlbmRlcklkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpIC8vIFRoaXMgaXMgdGhlIHJlbGF0aW9uc2hpcC4gSXQgdGVsbHMgUHJpc21hIHRoYXQgdGhlIHNlbmRlcklkIGZpZWxkIGluIHRoZSBtZXNzYWdlIG1vZGVsIGlzIHJlbGF0ZWQgdG8gdGhlIGlkIGZpZWxkIGluIHRoZSB1c2VyIG1vZGVsLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIFByaXNtYSBuZWVkcyB0byBrbm93IGhvdyB0byByZWxhdGUgdGhlIHR3byBtb2RlbHMuDQp9",
  "inlineSchemaHash": "bdfd4d92f9195ad19e1e5455e936c01d666efb9608171f99b7a46c08a8d10416",
  "noEngine": false
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "prisma/generated/client",
    "generated/client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emailVerified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hashedPassword\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"conversationIds\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Conversation\",\"relationName\":\"ConversationToUser\",\"relationFromFields\":[\"conversationIds\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seenMessageIds\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seenMessages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Message\",\"relationName\":\"Seen\",\"relationFromFields\":[\"seenMessageIds\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accounts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Account\",\"relationName\":\"AccountToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Message\",\"relationName\":\"MessageToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Account\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerAccountId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refresh_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"access_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scope\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"session_state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"AccountToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"provider\",\"providerAccountId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"provider\",\"providerAccountId\"]}],\"isGenerated\":false},\"Conversation\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastMessageAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isGroup\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messagesIds\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Message\",\"relationName\":\"ConversationToMessage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userIds\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"users\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ConversationToUser\",\"relationFromFields\":[\"userIds\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Message\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"body\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seenIds\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seen\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"Seen\",\"relationFromFields\":[\"seenIds\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Conversation\",\"relationName\":\"ConversationToMessage\",\"relationFromFields\":[\"conversationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"senderId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sender\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"MessageToUser\",\"relationFromFields\":[\"senderId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined


const { warnEnvConflicts } = require('./runtime/library')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "prisma/generated/client/query_engine-windows.dll.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "prisma/generated/client/schema.prisma")
