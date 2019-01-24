"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Game_1 = require("./Game");
let Trailer = class Trailer {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Trailer.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Trailer.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Trailer.prototype, "webm480", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Trailer.prototype, "webmFull", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Game_1.Game, game => game.trailers),
    __metadata("design:type", Game_1.Game)
], Trailer.prototype, "game", void 0);
Trailer = __decorate([
    typeorm_1.Entity("trailers")
], Trailer);
exports.Trailer = Trailer;
//# sourceMappingURL=Trailer.js.map