export { };

interface Result {
    subject: string;
    score: number;
    result: "Pass" | "Failure";
}

type Mandatory<T, K extends keyof T> = Partial<T> & Pick<T, K>;
type Optional<T, K extends keyof T> = Partial<T> & Omit<T, K>;

type OptionalResult = Optional<Result, "result">;
type MandatoryResult = Mandatory<Result, "subject" | "score">;

let optionalResult: OptionalResult = {
    score: 11,
    subject: "hoge",
};

let mandatoryResult: MandatoryResult = {
    subject: "Math",
    score: 61
};

function addResult(obj: OptionalResult | MandatoryResult) {
    if (obj.score > 60) {
        obj = {
            ...obj,
            result: "Pass",
        };
        console.log(obj);
    } else {
        obj["result"] = "Failure";
        console.log(obj);
    }
}

addResult(mandatoryResult);
addResult(optionalResult);

let result = {
    score: 21,
    subject: "Math",
};
if (result.score > 60) {
    result = {
        ...result,
        // Type '{ result: string; score: number; subject: string; }' is not assignable to type '{ score: number; subject: string; }'.
        // Object literal may only specify known properties, and 'result' does not exist in type '{ score: number; subject: string; }'.ts(2322)
        // result: "Pass",
    }
    // Element implicitly has an 'any' type because expression of type '"result"' can't be used to index type '{ score: number; subject: string; }'.
    // Property 'result' does not exist on type '{ score: number; subject: string; }'.ts(7053)
    // result["result"] = "Pass";
}
