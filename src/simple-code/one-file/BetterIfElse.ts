import assert from "assert";

interface Product {
    price: number;
    category: string;
    isDiscount: boolean;
}

function if0_1(baseSalary: number, role: string, isManager: boolean): number {
    let result = baseSalary;

    if (isManager) {
        if (role == "team leader") {
            result = baseSalary * 1.2;
        } else if (role == "product manager") {
            result = baseSalary * 1.3;
        } else if (role == "project manager") {
            result = baseSalary * 1.4;
        } else {
            result = baseSalary * 1.1;
        }
    }

    return result;
}

function if0_2(baseSalary: number, role: string, isManager: boolean): number {
    let result = baseSalary;

    if (!isManager) {
        return result;
    }

    if (role == "team leader") {
        result = baseSalary * 1.2;
    } else if (role == "product manager") {
        result = baseSalary * 1.3;
    } else if (role == "project manager") {
        result = baseSalary * 1.4;
    } else {
        result = baseSalary * 1.1;
    }

    return result;
}
function if0_3(baseSalary: number, role: string, isManager: boolean): number {
    if (!isManager) {
        return baseSalary;
    }

    if (role == "team leader") {
        return baseSalary * 1.2;
    } else if (role == "product manager") {
        return baseSalary * 1.3;
    } else if (role == "project manager") {
        return baseSalary * 1.4;
    }

    return baseSalary * 1.1;
}

function validateif0(cb: (baseSalary: number, role: string, isManager: boolean) => number) {
    assert(cb(10, "team leader", true) == 12)
    assert(cb(10, "product manager", true) == 13)
    assert(cb(10, "project manager", true) == 14)
    assert(cb(10, "unknown", true) == 11)
    assert(cb(10, "product manager", false) == 10)
}

validateif0(if0_1)
validateif0(if0_2)
validateif0(if0_3)

function if1_1(product: Product): number {
    let result = 0;

    if (product.category == "food") {
        if (product.isDiscount) {
            result = product.price * 0.8;
        } else {
            result = product.price;
        }
    } else if (product.category == "kitchen") {
        if (product.isDiscount) {
            result = product.price * 0.7;
        } else {
            result = product.price;
        }
    } else {
        if (product.isDiscount) {
            result = product.price * 0.9;
        } else {
            result = product.price;
        }
    }

    return result;
}

function if1_2(product: Product): number {
    if (product.category == "food") {
        if (product.isDiscount) {
            return product.price * 0.8;
        } else {
            return product.price;
        }
    } else if (product.category == "kitchen") {
        if (product.isDiscount) {
            return product.price * 0.7;
        } else {
            return product.price;
        }
    } else {
        if (product.isDiscount) {
            return product.price * 0.9;
        } else {
            return product.price;
        }
    }
}

function if1_3(product: Product): number {
    if (product.category == "food") {
        if (product.isDiscount) {
            return product.price * 0.8;
        }
        return product.price;
    } else if (product.category == "kitchen") {
        if (product.isDiscount) {
            return product.price * 0.7;
        }
        return product.price;
    }

    if (product.isDiscount) {
        return product.price * 0.9;
    }
    return product.price;
}

function if1_4(product: Product): number {
    if (product.category == "food" && product.isDiscount) {
        return product.price * 0.8;
    }
    if (product.category == "kitchen" && product.isDiscount) {
        return product.price * 0.7;
    }

    if (product.isDiscount) {
        return product.price * 0.9;
    }

    return product.price;
}

function if1_5(product: Product): number {
    const isFoodDiscount = product.category == "food" && product.isDiscount;
    if (isFoodDiscount) {
        return product.price * 0.8;
    }

    const isKitchenDiscount = product.category == "kitchen" && product.isDiscount;
    if (isKitchenDiscount) {
        return product.price * 0.7;
    }

    if (product.isDiscount) {
        return product.price * 0.9;
    }

    return product.price;
}

function validateIf1(cb: (product: Product) => number) {
    assert(cb({ category: "food", isDiscount: true, price: 10 }) == 8)
    assert(cb({ category: "food", isDiscount: false, price: 10 }) == 10)
    assert(cb({ category: "kitchen", isDiscount: true, price: 10 }) == 7)
    assert(cb({ category: "kitchen", isDiscount: false, price: 10 }) == 10)
    assert(cb({ category: "other", isDiscount: true, price: 10 }) == 9)
    assert(cb({ category: "other", isDiscount: false, price: 10 }) == 10)
}
validateIf1(if1_1)
validateIf1(if1_2)
validateIf1(if1_3)
validateIf1(if1_4)

function if2_1(value: number): number {
    let result = 0;

    if (value > 10) {
        if (value > 20) {
            if (value <= 30) {
                result = 25;
            } else {
                result = 99;
            }
        }
        else {
            result = 15;
        }
    } else {
        result = 5;
    }

    return result;
}

function if2_2(value: number): number {
    if (value <= 10) {
        return 5;
    }
    if (value <= 20) {
        return 15
    }
    if (value <= 30) {
        return 25
    }
    return 99;
}

function validateIf2(cb: (value: number) => number) {
    assert(cb(10) == 5)
    assert(cb(11) == 15)
    assert(cb(20) == 15)
    assert(cb(21) == 25)
    assert(cb(30) == 25)
    assert(cb(31) == 99)
}

validateIf2(if2_1)
validateIf2(if2_2)