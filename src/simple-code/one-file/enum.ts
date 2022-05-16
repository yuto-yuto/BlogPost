{
    console.log("-----basic------")
    enum WithoutValues {
        First,
        Second,
        Third,
    }
    console.log(WithoutValues.First);
    console.log(WithoutValues.Second);
    console.log(WithoutValues.Third);


    enum WithValues1 {
        First = 5,
        Second,
        Third,
    }
    console.log(WithValues1.First);
    console.log(WithValues1.Second);
    console.log(WithValues1.Third);


    enum WithValues2 {
        First,
        Second = 5,
        Third,
    }
    console.log(WithValues2.First);
    console.log(WithValues2.Second);
    console.log(WithValues2.Third);

    enum LogLevel {
        Trace = -20,
        Debug = -10,
        Info = 0,
        Warn = 10,
        Error = 20,
        Off = 99,
    }

    enum LogLevelString {
        Trace = "Trace-Level",
        Debug = "Debug-Level",
        Info = "Info-Level",
        Warn = "Warn-Level",
        Error = "Error-Level",
        Off = "Off-Level",
    }

    enum MixEnum {
        Trace = -20,
        Debug = "Debug-Level",
        Info = "Info",
    }

    console.log("-----check------")
    console.log(LogLevel.Error);
    console.log(LogLevelString.Error);

    console.log("-----keys------")
    console.log(Object.keys(LogLevel));
    console.log(Object.keys(LogLevelString));

    {
        const keys = Object.keys(LogLevel).filter((x) => Number.isNaN(Number(x)));
        console.log(keys);
    }

    console.log("-----values------")
    {
        const values = Object.keys(LogLevel).filter((x) => !Number.isNaN(Number(x)));
        console.log(values);
    }
    console.log(Object.values(LogLevelString));

    console.log("-----check if the value is in enum------")
    console.log(10 in LogLevel);
    // true
    console.log(11 in LogLevel);
    // false
    console.log("Debug-Level" in LogLevelString);
    // false
    console.log(-20 in MixEnum);
    console.log("Debug-Level" in MixEnum);

    {
        const exists = (value: string) => Object.values(LogLevelString).includes(value as any);
        console.log(exists("Debug-Level"));
        console.log(exists("Undefined-Level"));
    }

    console.log("-----get key------")
    {
        function getKeyName(value: LogLevel) {
            return LogLevel[value];
        }
        console.log(getKeyName(-20)); // Trace
        console.log(getKeyName(-22)); // undefined
    }

    {
        function getKeyName(value: string) {
            return Object.entries(LogLevelString).find(([key, val]) => val === value)?.[0];
        }
        console.log(getKeyName("Warn-Level"));
        console.log(getKeyName("Undefined-Level"));
    }

    console.log("-----get value------")
    {
        function getValueByKeyForNumberEnum(value: string) {
            return Object.entries(LogLevel).find(([key, val]) => key === value)?.[1];
        }
        // function getValueByKeyError(value: string) {
        //     return LogLevel[value];
        // }
        console.log(LogLevel["Warn"]);
        console.log(getValueByKeyForNumberEnum("Error"));
    }
    {
        function getValueByKeyForStringEnum(value: string) {
            return Object.entries(LogLevelString).find(([key, val]) => key === value)?.[1];
        }
        console.log(getValueByKeyForStringEnum("Warn"));
        console.log(getValueByKeyForStringEnum("Error"));
    }

    console.log("-----mix------")
    {
        console.log(Object.keys(MixEnum));
        console.log(Object.values(MixEnum));
        const keyList = Object.keys(MixEnum).filter((x) => Number.isNaN(Number(x)));
        console.log(keyList);
        const valueList = Object.values(MixEnum).filter((val) => {
            const keys = Object.keys(MixEnum).filter((x) => Number.isNaN(Number(x)));
            return !keys.includes(val as any);
        });
        console.log(valueList);
    }
    {
        type MixEnumKey = { [key in MixEnum]: unknown };
        type MixEnumKey2 = Record<MixEnum, unknown>;

        const obj: MixEnumKey | MixEnumKey2 = {
            [MixEnum.Debug]: "aaaa",
            [MixEnum.Info]: 123,
            [MixEnum.Trace]: "cccc",
        };

        type NullableMixEnumKey = { [key in MixEnum]?: unknown };
        const obj2: NullableMixEnumKey = {
            [MixEnum.Debug]: "aaaa",
            [MixEnum.Info]: 123,
        };
    }
}
