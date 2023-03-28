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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.sendMessage = void 0;
var google_sheet_provider_1 = require("../../providers/google-sheet.provider");
var mail_service_1 = require("../../services/mail.service");
var contact_message_mail_1 = require("../../templates/contact-message.mail");
var sendMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, phone, company_size, message, re, rePhone, googleSheets, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, email = _a.email, phone = _a.phone, company_size = _a.company_size, message = _a.message;
                // validate required fields
                if (!name_1 || !email || !phone || !message)
                    return [2 /*return*/, res.status(400).send({ message: "error_required_fields" })];
                // validate fields not empty
                if (!name_1.trim() || !email.trim() || !phone.trim() || !company_size.trim() || !message.trim())
                    return [2 /*return*/, res.status(400).send({ message: "error_no_empty_fields" })];
                re = /\S+@\S+\.\S+/;
                if (!re.test(email))
                    return [2 /*return*/, res.status(400).send({ message: "error_invalid_email" })];
                rePhone = /^\+\d{12,14}$/;
                if (!rePhone.test(phone))
                    return [2 /*return*/, res.status(400).send({ message: "error_invalid_phone" })];
                // send email
                (0, mail_service_1.sendMail)((0, contact_message_mail_1.ContactMessageMail)(req));
                googleSheets = new google_sheet_provider_1.GoogleSheetProvider();
                return [4 /*yield*/, googleSheets.addMessage([name_1, email, phone, company_size, message])];
            case 1:
                _b.sent();
                res.send({ message: "OK" });
                return [2 /*return*/];
            case 2:
                error_1 = _b.sent();
                console.log("error", error_1);
                res.status(500).send({ message: "server_error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendMessage = sendMessage;
var getMessages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var googleSheets, messages, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                googleSheets = new google_sheet_provider_1.GoogleSheetProvider();
                return [4 /*yield*/, googleSheets.getMessages()];
            case 1:
                messages = _a.sent();
                res.send({ message: "OK", data: messages });
                return [2 /*return*/];
            case 2:
                error_2 = _a.sent();
                console.log("error", error_2);
                res.status(500).send({ message: "server_error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMessages = getMessages;
