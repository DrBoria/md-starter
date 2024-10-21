"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_path = __toESM(require("path"));
var import_core4 = require("@keystone-6/core");

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var import_client = require("@redis/client");

// env.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var NODE_ENV = process.env.NODE_ENV;
var DATABASE_URL = process.env.DATABASE_URL;
var REDIS_URL = process.env.REDIS_URL;
var SESSION_SECRET = process.env.SESSION_SECRET;
var ALLOW_ROLES_MANAGEMENT = process.env.ALLOW_ROLES_MANAGEMENT;
var APP_HOST = process.env.KEYSTONE_APP_HOST;
var KEYSTONE_ENV = process.env.KEYSTONE_ENV;
var KEYSTONE_APP_NAME = process.env.KEYSTONE_APP_NAME;
var APP_PORT = 3e3;
var SITE_URL = APP_HOST === "localhost" ? `http://${APP_HOST}:${APP_PORT}` : `https://${APP_HOST}`;

// auth.ts
var redis = (0, import_client.createClient)({
  url: REDIS_URL
});
redis.on("error", (err) => console.log("Redis Client Error", err));
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: SESSION_SECRET
});
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "id createdAt role { id name } locked",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});

// schema/Example.ts
var import_core = require("@keystone-6/core");
var import_fields4 = require("@keystone-6/core/fields");

// schema/access-control/roles.ts
var isAdmin = ({ session: session2 }) => {
  if (!session2?.itemId) return false;
  return session2.data?.role?.name === "Admin";
};
var isOwner = ({ session: session2 }) => {
  if (!session2?.itemId) return false;
  return session2.data?.role?.name === "Owner";
};
var isViewer = ({ session: session2 }) => {
  if (!session2?.itemId) return false;
  return session2.data?.role?.name === "Viewer";
};
var isSameUser = ({ session: session2, item }) => {
  if (!session2?.itemId || !item) return false;
  return session2.data?.id === item.id;
};

// schema/fields/createdAt.ts
var import_fields = require("@keystone-6/core/fields");

// schema/access-control/readOnly.ts
var import_access = require("@keystone-6/core/access");
var readOnlyFieldProps = {
  isReadOnly: true,
  access: {
    read: import_access.allowAll,
    create: import_access.denyAll,
    update: import_access.denyAll
  },
  graphql: {
    omit: {
      create: true,
      update: true
    }
  },
  ui: {
    createView: {
      fieldMode: () => "hidden"
    },
    itemView: {
      fieldMode: () => "read"
    },
    listView: {
      fieldMode: () => "read"
    }
  }
};

// schema/fields/createdAt.ts
function createdAt() {
  return (0, import_fields.timestamp)({
    defaultValue: { kind: "now" },
    db: {
      map: "created_at",
      isNullable: false
    },
    ...readOnlyFieldProps
  });
}

// schema/fields/isActive.ts
var import_fields2 = require("@keystone-6/core/fields");
function isActive() {
  return (0, import_fields2.checkbox)({
    defaultValue: true,
    db: {
      map: "is_active"
    }
  });
}

// schema/fields/updatedAt.ts
var import_fields3 = require("@keystone-6/core/fields");
function updatedAt() {
  return (0, import_fields3.timestamp)({
    db: {
      map: "updated_at",
      updatedAt: true
    },
    ...readOnlyFieldProps
  });
}

// schema/Example.ts
var Example = (0, import_core.list)({
  access: isAdmin,
  db: {
    map: "example"
  },
  fields: {
    shortedText: (0, import_fields4.text)({
      label: "ShortedText",
      ui: {
        createView: { fieldMode: "edit" },
        itemView: { fieldMode: "edit" },
        description: "This input field will have ... at the end of the line in list view",
        views: "./admin/system-components/CustomFields/Text/views"
      },
      defaultValue: "",
      db: { map: "shorted_text", isNullable: false }
    }),
    exampleType: (0, import_fields4.select)({
      validation: { isRequired: true },
      options: ["first", "second"],
      db: {
        isNullable: false
      }
    }),
    customRelationship: (0, import_fields4.relationship)({
      label: "Custom Relationship",
      ref: "User",
      db: { foreignKey: { map: "user_id" } },
      ui: {
        displayMode: "select",
        description: "This is relationship with customizeable fieltr - filter by multiple fields or it's specific values",
        views: "./admin/system-components/CustomFields/Relationship/views"
      }
    }),
    checkbox: isActive(),
    timestamp_updateAt: updatedAt(),
    timestamp_createdAt: createdAt()
  },
  ui: {
    label: "Example"
  }
});

// schema/User.ts
var import_core2 = require("@keystone-6/core");
var import_fields5 = require("@keystone-6/core/fields");
var User = (0, import_core2.list)({
  access: {
    operation: {
      query: () => true,
      create: (data) => !isViewer(data),
      update: (data) => !isViewer(data),
      delete: (data) => !isViewer(data)
    },
    filter: {
      query: ({ session: session2 }) => {
        if (ALLOW_ROLES_MANAGEMENT === "allow") return true;
        return isAdmin({ session: session2 }) || isOwner({ session: session2 });
      },
      update: ({ session: session2 }) => {
        if (ALLOW_ROLES_MANAGEMENT === "allow") return true;
        return isAdmin({ session: session2 }) || isOwner({ session: session2 });
      },
      delete: ({ session: session2 }) => {
        return isAdmin({ session: session2 }) || isOwner({ session: session2 });
      }
    }
  },
  db: {
    map: "user"
  },
  fields: {
    // todo: add unique together: organization, email
    // (not really supported by KeystoneJS
    email: (0, import_fields5.text)({
      validation: { isRequired: true },
      // by adding isIndexed: 'unique', we're saying that no user can have the same email as another user
      isIndexed: "unique",
      ui: {
        views: "./admin/system-components/CustomFields/Text/views"
      }
    }),
    password: (0, import_fields5.password)({
      validation: { isRequired: true },
      ui: {
        itemView: {
          fieldMode: (data) => isAdmin(data) || isOwner(data) ? "edit" : "hidden"
        }
      }
    }),
    locked: (0, import_fields5.checkbox)({
      ui: {
        itemView: {
          fieldMode: (data) => isAdmin(data) || isOwner(data) ? "edit" : "hidden"
        }
      }
    }),
    role: (0, import_fields5.relationship)({
      ref: "Role",
      many: false,
      ui: {
        hideCreate: true,
        itemView: {
          fieldMode: (data) => {
            if (isAdmin(data) || isOwner(data) || ALLOW_ROLES_MANAGEMENT === "allow") {
              if (isSameUser(data) && ALLOW_ROLES_MANAGEMENT !== "allow") {
                return "read";
              }
              return "edit";
            }
            return "hidden";
          }
        }
      }
    }),
    createdAt: createdAt()
  },
  ui: {
    labelField: "email",
    itemView: {
      defaultFieldMode: (data) => !isAdmin(data) || !isOwner(data) ? "read" : "edit"
    }
  }
});

// schema/Role.ts
var import_core3 = require("@keystone-6/core");
var import_fields6 = require("@keystone-6/core/fields");
var Role = (0, import_core3.list)({
  access: {
    operation: {
      query: () => true,
      create: () => false,
      update: (data) => {
        return ALLOW_ROLES_MANAGEMENT === "allow" || isAdmin(data);
      },
      delete: () => false
    },
    filter: {
      query: (...context) => {
        if (ALLOW_ROLES_MANAGEMENT === "allow") return true;
        if (isAdmin(...context)) return true;
        if (isOwner(...context)) {
          return { name: { not: { equals: "Admin" } } };
        }
        return false;
      }
    }
  },
  db: {
    map: "role"
  },
  fields: {
    name: (0, import_fields6.text)(),
    createdAt: createdAt()
  },
  ui: {
    label: "Role"
  }
});

// schema.ts
var lists = {
  Example,
  User,
  Role
};

// schema/access-control/isLocked.ts
var isLocked = ({ session: session2 }) => {
  if (!session2?.itemId) return true;
  return session2.data.locked;
};

// keystone.ts
var keystone_default = withAuth(
  (0, import_core4.config)({
    storage: {
      my_file_storage: {
        kind: "local",
        // or 's3' for S3
        type: "file",
        // or 'image' for image files
        /*******************************/
        /* Local storage configuration */
        /*******************************/
        generateUrl: (path2) => {
          return `http://localhost:3000/files${path2}`;
        },
        serverRoute: { path: "/files" },
        storagePath: "public/files"
        // Path where files will be stored locally
        /****************************/
        /* S3 storage configuration */
        /****************************/
        // bucketName: process.env.S3_BUCKET_NAME,
        // region: process.env.S3_REGION,
        // accessKeyId: process.env.S3_ACCESS_KEY_ID,
        // secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      }
    },
    db: {
      provider: "postgresql",
      url: DATABASE_URL,
      enableLogging: ["error", "warn"]
    },
    graphql: {
      // Set these fields to false to disable the playground and docs
      playground: true,
      apolloConfig: {
        introspection: true
      }
    },
    ui: {
      isAccessAllowed: (data) => !isLocked(data),
      // Disable admin view if user is locked
      getAdditionalFiles: [
        () => {
          return [
            {
              mode: "copy",
              inputPath: import_path.default.join(__dirname, "..", "public", "favicon.ico"),
              // Path relative to current file
              outputPath: "public/favicon.ico"
              // Output in the 'public' directory
            }
          ];
        }
      ]
    },
    lists,
    session,
    telemetry: false
  })
);
//# sourceMappingURL=config.js.map
