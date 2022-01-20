import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";

const ajv = new Ajv2020({ strict: true });

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
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "/base",
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
            $id: "/base/contactInfo",
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


{
    const schema2 = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "/schema2",
        $ref: "base#",
        required: [
            "name",
            "additionalProp",
        ],
        type: "object",
        properties: {
            additionalProp: {
                type: "string",
            }
        }
    };
    console.log("--- Refer another schema ---");
    const myAjv = new Ajv2020({
        allowUnionTypes: true,
    });
    addFormats(myAjv);
    myAjv.addSchema(schema);
    const validate = myAjv.compile(schema2);
    {
        const result = validate({
            name: "Yuto",
            additionalProp: "value1",
        });
        console.log(result, validate.errors);
    }

    {
        const result = validate({
            name: "Yuto",
            additionalProp: 12345,
        });
        console.log(result, validate.errors);
    }

    {
        const result = validate({
            additionalProp: "value1",
        });
        console.log(result, validate.errors);
    }

    {
        const result = validate({
            name: "Yuto",
        });
        console.log(result, validate.errors);
    }
}

{
    console.log("--- refer to a nested property ---");

    const schema2 = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "/schema2",
        $ref: "base#",
        type: "object",
        properties: {
            contactInfo: {
                $ref: "base/contactInfo",
                type: "object",
                required: ["tel", "additional"],
                properties: {
                    additional: {
                        type: "string"
                    }
                }
            }
        }
    };
    const myAjv = new Ajv2020({ allErrors: true });
    addFormats(myAjv);
    myAjv.addSchema(schema);
    const validate = myAjv.compile(schema2);
    {
        const result = validate({
            name: "Yuto",
            contactInfo: {
                tel: "000-1111-2222",
                address: "somewhere",
                postalCode: 12345,
                additional: "additional-value",
            }
        });
        console.log(result, validate.errors);
    }
    {
        const result = validate({
            name: "Yuto",
            contactInfo: {
                address: "somewhere",
                postalCode: 12345,
            }
        });
        console.log(result, validate.errors);
    }
}


{
    console.log("--- allErrors ---");
    const myAjv = new Ajv2020({
        allowUnionTypes: true,
        allErrors: true,
    });
    addFormats(myAjv);
    const validate = myAjv.compile(schema);
    const result = validate({
        version: "string-version",
        name: 123,
        languages: "French",
    });
    console.log(result, validate.errors);
}