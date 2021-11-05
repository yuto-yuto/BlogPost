import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ strict: true });

addFormats(ajv);

function isValid(json: any): boolean {
    const check = (obj: any, name: string) => {
        if (!Object.prototype.hasOwnProperty.call(obj, name)) {
            console.error(`missing property [${name}]`);
            return false;
        }
        return true;
    }
    return check(json, "version")
        && check(json, "name")
        && check(json, "timestamp")
        && check(json, "contactInfo")
        && check(json.contactInfo, "tel")
        && check(json.contactInfo, "address")
        && check(json.contactInfo, "postalCode");
}

const json = {
    version: 0.1,
    name: "Yuto",
    timestamp: "2021-12-12T10:10:10.111Z",
    contactInfo: {
        tel: "000-1111-2222",
        address: "somewhere",
        postalCode: 12345,
    },
    languages: [
        {
            language: "Japanese",
            native: true
        },
        {
            language: "English",
            native: false
        },
        {
            language: "German",
            native: false
        }
    ],
};

console.log("--- validate without schema---");
console.log(isValid(json));

const schema = {
    type: "object",
    properties: {
        version: {
            type: "number"
        },
        name: {
            type: "string"
        },
        timestamp: {
            type: "string",
            format: "date-time"
        },
        contactInfo: {
            type: "object",
            properties: {
                tel: {
                    type: "string",
                    pattern: "\\d{3}-\\d{4}-\\d{4}"
                },
                address: {
                    type: "string",
                },
                postalCode: {
                    type: "integer",
                    maximum: 99999
                },
            }
        },
        languages: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    language: {
                        enum: ["Japanese", "English", "German"],
                    },
                    native: {
                        type: "boolean"
                    }
                }
            }
        }
    }
};

const validateBySchema = (json: any, schema: any) => {
    const validate = ajv.compile(schema);
    const result = validate(json);
    console.log(result);
    if (!result) {
        console.log(validate.errors);
    }
}
validateBySchema(json, schema);

{
    console.log("--- simplest ---");
    const schema = { type: "number" };
    validateBySchema(42, schema);
    validateBySchema("42", schema);
    validateBySchema(0xFF, schema);
}
{
    console.log("--- object1 ---");
    const schema = {
        type: "object",
        properties: {
            foo: {
                type: "string",
            }
        }
    }
    validateBySchema({ foo: "foo" }, schema);
    validateBySchema({ foo: "foo", hoge: 12 }, schema);
    validateBySchema({ foo: ["foo", "foo2"] }, schema);
    const schema2 = { ...schema, additionalProperties: false };
    validateBySchema({ foo: "foo", hoge: 12 }, schema2);
}
{
    console.log("--- object2 ---");
    const json = {
        obj1: {
            foo: 1,
            hoge: "hoge"
        },
        obj2: {
            foo: 2,
            hoge: "hoge2"
        },
        values: [22, 42, 55]
    };
    const schema = {
        type: "object",
        properties: {
            obj1: {
                type: "object",
                properties: {
                    foo: { type: "integer" },
                    hoge: { type: "string", }
                }
            },
            obj2: {
                type: "object",
                properties: {
                    foo: { type: "integer" },
                    hoge: { type: "string", }
                }
            },
            values: {
                type: "array",
                items: { type: "integer", }
            }
        }
    };
    const schema2 = {
        $defs: {
            objProperties: {
                type: "object",
                properties: {
                    foo: { type: "integer" },
                    hoge: { type: "string", }
                }
            }
        },
        type: "object",
        properties: {
            obj1: { $ref: "#/$defs/objProperties" },
            obj2: { $ref: "#/$defs/objProperties" },
            values: {
                type: "array",
                items: { type: "integer", }
            }
        }
    };
    validateBySchema(json, schema);
    validateBySchema(json, schema2);
}

{
    console.log("--- date time ---")
    const schema = {
        type: "string",
        format: "date-time"
    }
    validateBySchema("2020-10-10T11:11:11", schema);
    validateBySchema("2020-10-10T11:11:11.123Z", schema);
    validateBySchema("2020-10-10T11:11:11+02:00", schema);
    validateBySchema("2020.10.10 11:11:11", schema);
}
{
    console.log("--- enum ---");
    const schema = {
        enum: ["Japanese", "English", "German"],
    }
    validateBySchema("Japanese", schema);
    validateBySchema("English", schema);
    validateBySchema("German", schema);
    validateBySchema("Italian", schema);
}