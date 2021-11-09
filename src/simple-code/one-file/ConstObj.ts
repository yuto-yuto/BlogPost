// export { }


// type Values<T> = T[keyof T];

// const Modes = {
//     Local: 0,
//     Remote: 1,
// } as const;

// const States = {
//     Initializing: 0,
//     Stop: 1,
//     Running: 2,
// } as const

// interface Status {
//     mode: Values<typeof Modes>;
//     state: Values<typeof States>;
// }

// export function isIn<T>(object: T, value: unknown): value is T {
//     return Object.values(object).includes(value);
// }

// function run(): Status {
//     const mode = parseInt("1", 10);
//     const state = parseInt("3", 10);

//     console.log(mode in Modes);
//     console.log(mode === Modes.Remote);
//     console.log(state in States);

//     if (!isIn(Modes, mode)) { throw new Error(); }
//     if (!isIn(States, state)) { throw new Error(); }

//     return { mode, state };
// }

// run();