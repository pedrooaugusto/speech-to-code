"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class M {
    proxy(fn, args) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            let m = yield this[fn](args);
            console.log(m);
        });
    }
    write(a) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(a);
            return yield 9;
        });
    }
}
var c = new M();
c.proxy('write', 8);
//# sourceMappingURL=client-test.js.map