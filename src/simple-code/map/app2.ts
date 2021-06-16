import { performance } from "perf_hooks";

// const loop = 100
// for (let i = 0; i < loop; i++) {
//     console.log(`[${i}, '${i}']`);
// }
// for (let i = 0; i < loop; i++) {
//     console.log(`case ${i}: return '${i}';`);
// }
// for (let i = 1; i < loop; i++) {
//     console.log(`else if(value === ${i}) {return '${i}'}`);
// }

const statusMap = new Map([
    [0, '0'],
    [1, '1'],
    [2, '2'],
    [3, '3'],
    [4, '4'],
    [5, '5'],
    [6, '6'],
    [7, '7'],
    [8, '8'],
    [9, '9'],
    [10, '10'],
    [11, '11'],
    [12, '12'],
    [13, '13'],
    [14, '14'],
    [15, '15'],
    [16, '16'],
    [17, '17'],
    [18, '18'],
    [19, '19'],
    [20, '20'],
    [21, '21'],
    [22, '22'],
    [23, '23'],
    [24, '24'],
    [25, '25'],
    [26, '26'],
    [27, '27'],
    [28, '28'],
    [29, '29'],
    [30, '30'],
    [31, '31'],
    [32, '32'],
    [33, '33'],
    [34, '34'],
    [35, '35'],
    [36, '36'],
    [37, '37'],
    [38, '38'],
    [39, '39'],
    [40, '40'],
    [41, '41'],
    [42, '42'],
    [43, '43'],
    [44, '44'],
    [45, '45'],
    [46, '46'],
    [47, '47'],
    [48, '48'],
    [49, '49'],
    [50, '50'],
    [51, '51'],
    [52, '52'],
    [53, '53'],
    [54, '54'],
    [55, '55'],
    [56, '56'],
    [57, '57'],
    [58, '58'],
    [59, '59'],
    [60, '60'],
    [61, '61'],
    [62, '62'],
    [63, '63'],
    [64, '64'],
    [65, '65'],
    [66, '66'],
    [67, '67'],
    [68, '68'],
    [69, '69'],
    [70, '70'],
    [71, '71'],
    [72, '72'],
    [73, '73'],
    [74, '74'],
    [75, '75'],
    [76, '76'],
    [77, '77'],
    [78, '78'],
    [79, '79'],
    [80, '80'],
    [81, '81'],
    [82, '82'],
    [83, '83'],
    [84, '84'],
    [85, '85'],
    [86, '86'],
    [87, '87'],
    [88, '88'],
    [89, '89'],
    [90, '90'],
    [91, '91'],
    [92, '92'],
    [93, '93'],
    [94, '94'],
    [95, '95'],
    [96, '96'],
    [97, '97'],
    [98, '98'],
    [99, '99'],
]);
function getStatusByMap(value: number) {
    return statusMap.get(value);
}
function getStatusBySwitch(value: number) {
    switch (value) {
        case 0: return '0';
        case 1: return '1';
        case 2: return '2';
        case 3: return '3';
        case 4: return '4';
        case 5: return '5';
        case 6: return '6';
        case 7: return '7';
        case 8: return '8';
        case 9: return '9';
        case 10: return '10';
        case 11: return '11';
        case 12: return '12';
        case 13: return '13';
        case 14: return '14';
        case 15: return '15';
        case 16: return '16';
        case 17: return '17';
        case 18: return '18';
        case 19: return '19';
        case 20: return '20';
        case 21: return '21';
        case 22: return '22';
        case 23: return '23';
        case 24: return '24';
        case 25: return '25';
        case 26: return '26';
        case 27: return '27';
        case 28: return '28';
        case 29: return '29';
        case 30: return '30';
        case 31: return '31';
        case 32: return '32';
        case 33: return '33';
        case 34: return '34';
        case 35: return '35';
        case 36: return '36';
        case 37: return '37';
        case 38: return '38';
        case 39: return '39';
        case 40: return '40';
        case 41: return '41';
        case 42: return '42';
        case 43: return '43';
        case 44: return '44';
        case 45: return '45';
        case 46: return '46';
        case 47: return '47';
        case 48: return '48';
        case 49: return '49';
        case 50: return '50';
        case 51: return '51';
        case 52: return '52';
        case 53: return '53';
        case 54: return '54';
        case 55: return '55';
        case 56: return '56';
        case 57: return '57';
        case 58: return '58';
        case 59: return '59';
        case 60: return '60';
        case 61: return '61';
        case 62: return '62';
        case 63: return '63';
        case 64: return '64';
        case 65: return '65';
        case 66: return '66';
        case 67: return '67';
        case 68: return '68';
        case 69: return '69';
        case 70: return '70';
        case 71: return '71';
        case 72: return '72';
        case 73: return '73';
        case 74: return '74';
        case 75: return '75';
        case 76: return '76';
        case 77: return '77';
        case 78: return '78';
        case 79: return '79';
        case 80: return '80';
        case 81: return '81';
        case 82: return '82';
        case 83: return '83';
        case 84: return '84';
        case 85: return '85';
        case 86: return '86';
        case 87: return '87';
        case 88: return '88';
        case 89: return '89';
        case 90: return '90';
        case 91: return '91';
        case 92: return '92';
        case 93: return '93';
        case 94: return '94';
        case 95: return '95';
        case 96: return '96';
        case 97: return '97';
        case 98: return '98';
        case 99: return '99';
        default: return "Undefined";
    }
}
function getStatusByIfElse(value: number) {
    if (value === 0) { return "0"; }
    else if (value === 1) { return '1' }
    else if (value === 2) { return '2' }
    else if (value === 3) { return '3' }
    else if (value === 4) { return '4' }
    else if (value === 5) { return '5' }
    else if (value === 6) { return '6' }
    else if (value === 7) { return '7' }
    else if (value === 8) { return '8' }
    else if (value === 9) { return '9' }
    else if (value === 10) { return '10' }
    else if (value === 11) { return '11' }
    else if (value === 12) { return '12' }
    else if (value === 13) { return '13' }
    else if (value === 14) { return '14' }
    else if (value === 15) { return '15' }
    else if (value === 16) { return '16' }
    else if (value === 17) { return '17' }
    else if (value === 18) { return '18' }
    else if (value === 19) { return '19' }
    else if (value === 20) { return '20' }
    else if (value === 21) { return '21' }
    else if (value === 22) { return '22' }
    else if (value === 23) { return '23' }
    else if (value === 24) { return '24' }
    else if (value === 25) { return '25' }
    else if (value === 26) { return '26' }
    else if (value === 27) { return '27' }
    else if (value === 28) { return '28' }
    else if (value === 29) { return '29' }
    else if (value === 30) { return '30' }
    else if (value === 31) { return '31' }
    else if (value === 32) { return '32' }
    else if (value === 33) { return '33' }
    else if (value === 34) { return '34' }
    else if (value === 35) { return '35' }
    else if (value === 36) { return '36' }
    else if (value === 37) { return '37' }
    else if (value === 38) { return '38' }
    else if (value === 39) { return '39' }
    else if (value === 40) { return '40' }
    else if (value === 41) { return '41' }
    else if (value === 42) { return '42' }
    else if (value === 43) { return '43' }
    else if (value === 44) { return '44' }
    else if (value === 45) { return '45' }
    else if (value === 46) { return '46' }
    else if (value === 47) { return '47' }
    else if (value === 48) { return '48' }
    else if (value === 49) { return '49' }
    else if (value === 50) { return '50' }
    else if (value === 51) { return '51' }
    else if (value === 52) { return '52' }
    else if (value === 53) { return '53' }
    else if (value === 54) { return '54' }
    else if (value === 55) { return '55' }
    else if (value === 56) { return '56' }
    else if (value === 57) { return '57' }
    else if (value === 58) { return '58' }
    else if (value === 59) { return '59' }
    else if (value === 60) { return '60' }
    else if (value === 61) { return '61' }
    else if (value === 62) { return '62' }
    else if (value === 63) { return '63' }
    else if (value === 64) { return '64' }
    else if (value === 65) { return '65' }
    else if (value === 66) { return '66' }
    else if (value === 67) { return '67' }
    else if (value === 68) { return '68' }
    else if (value === 69) { return '69' }
    else if (value === 70) { return '70' }
    else if (value === 71) { return '71' }
    else if (value === 72) { return '72' }
    else if (value === 73) { return '73' }
    else if (value === 74) { return '74' }
    else if (value === 75) { return '75' }
    else if (value === 76) { return '76' }
    else if (value === 77) { return '77' }
    else if (value === 78) { return '78' }
    else if (value === 79) { return '79' }
    else if (value === 80) { return '80' }
    else if (value === 81) { return '81' }
    else if (value === 82) { return '82' }
    else if (value === 83) { return '83' }
    else if (value === 84) { return '84' }
    else if (value === 85) { return '85' }
    else if (value === 86) { return '86' }
    else if (value === 87) { return '87' }
    else if (value === 88) { return '88' }
    else if (value === 89) { return '89' }
    else if (value === 90) { return '90' }
    else if (value === 91) { return '91' }
    else if (value === 92) { return '92' }
    else if (value === 93) { return '93' }
    else if (value === 94) { return '94' }
    else if (value === 95) { return '95' }
    else if (value === 96) { return '96' }
    else if (value === 97) { return '97' }
    else if (value === 98) { return '98' }
    else if (value === 99) { return '99' }
}
function measure(cb: (value: number) => void) {
    const start = performance.now();
    for (let i = 0; i < 100000; i++) {
        const val = i % 100;
        cb(val);
    }
    const end = performance.now();
    return end - start;
}

function run() {
    const a = measure(getStatusByMap);
    const b = measure(getStatusByIfElse);
    const c = measure(getStatusBySwitch);
    console.log(`${a}|${b}|${c}`);
}

for (let i = 0; i < 10; i++) {
    run();
}