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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../utils/db"));
const user = {
    /**
     * Creates a new user.
     *
     * @param {UserCreateType} data
     * @returns {UserReturnType}
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.user.create({ data });
                return result;
            }
            catch (_a) {
                return null;
            }
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.user.findFirst({
                    where: {
                        id
                    }
                });
                return result;
            }
            catch (_a) {
                return null;
            }
        });
    },
    /**
     * Finds a user by email.
     *
     * @param {UserType} filter
     * @returns {UserReturnType}
     */
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.user.findUnique({
                    where: {
                        email
                    }
                });
                return result;
            }
            catch (_a) {
                return null;
            }
        });
    },
    /**
     * Gets many users.
     *
     * @param {UserType} filter
     * @param {number | undefined} skip
     * @param {number | undefined} take
     * @returns
     */
    findMany(filter, skip, take) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.user.findMany({
                    where: Object.assign({}, filter),
                    skip: skip !== null && skip !== void 0 ? skip : 0,
                    take: take !== null && take !== void 0 ? take : 10
                });
                return result;
            }
            catch (_a) {
                return null;
            }
        });
    }
};
exports.default = user;
