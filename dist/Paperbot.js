"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SteamAPI_1 = require("./API/SteamAPI");
var Step;
(function (Step) {
    Step[Step["REGISTRATION_CONFIRM_NAME"] = 0] = "REGISTRATION_CONFIRM_NAME";
})(Step || (Step = {}));
class Paperbot {
    constructor(discord, database) {
        this.discord = discord;
        this.database = database;
        this.historyStack = [];
    }
    messageHandler(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.member.bot) {
                const unresolvedActions = this.historyStack.filter(a => a.userId === msg.member.id);
                if (unresolvedActions.length) {
                    console.log("Found unresolved action for this message's userId", unresolvedActions);
                    for (let action of unresolvedActions) {
                        switch (action.step) {
                            case Step.REGISTRATION_CONFIRM_NAME:
                                if (/\b(yes|y|ye|yeah|ok)\b/i.test(msg.content)) {
                                    // Code to add new user here
                                }
                                break;
                        }
                        this.historyStack = this.historyStack.filter(a => a !== action);
                    }
                }
                if (msg.content.startsWith('!help')) {
                    this.discord.createMessage(msg.channel.id, "Type !register to register yourself with Paperbot, " +
                        "after which you can join in on game selection rounds");
                }
                if (msg.content.startsWith('!register')) {
                    const parameters = msg.content.match(/([^ ])+/gi);
                    const username = parameters.length > 1 ? parameters[1] : msg.member.user.username;
                    const steamid = yield SteamAPI_1.SteamAPI.Instance.getUserID(username);
                    const summary = yield SteamAPI_1.SteamAPI.Instance.getUserSummary(steamid);
                    console.log(parameters);
                    this.discord.createMessage(msg.channel.id, {
                        embed: {
                            title: "**Found the following user:**",
                            // description: "Found the following user:",
                            thumbnail: {
                                url: summary.avatarmedium
                            },
                            color: 0x008000,
                            url: summary.profileurl,
                            fields: [
                                {
                                    name: "Username",
                                    value: summary.personaname + (summary.realname ? `\n*aka* ${summary.realname}` : ""),
                                    inline: true
                                },
                                {
                                    name: "Country",
                                    value: `${summary.loccountrycode}`,
                                    inline: true
                                },
                            ],
                            footer: {
                                text: "Is this correct?"
                            }
                        }
                    });
                    this.historyStack.push({
                        userId: msg.member.user.id,
                        step: Step.REGISTRATION_CONFIRM_NAME
                    });
                    //msg.member.user.id;
                    //msg.member.user.username;
                    /*let newUser: User;
                    newUser.id = msg.member.id;
                    newUser.steamId =
    
                    console.log("New user:", newUser);
                    this.database.createNewUser({id: 1, games: "test", steamId: "12345678"})*/
                }
            }
        });
    }
}
exports.Paperbot = Paperbot;
//# sourceMappingURL=Paperbot.js.map