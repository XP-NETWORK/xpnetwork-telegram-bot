import { TelegramUpdate, TelegramUser, TelegramQueries, TelegramChatMember, TelegramChatMemberStatus } from "../types/telegramTypes";
import * as path from 'path'
import * as fs from 'fs'
import { randomId } from "../tools/string";

export const token = process.env.TOKEN 
export const API = 'https://xpdiemtelebee.herokuapp.com'
const axios = require('axios')
const captchagen = require('captchagen');
let users: any = {

}
export class TelegramBot {
    async processTelegramUpdate(update: TelegramUpdate) {
        const {
            message,
            callback_query,
        } = update
        if(message) {
            const {
                left_chat_member,
                new_chat_members,
                message_id,
                chat,
                from,
                text
            } = message
            const chat_id = chat.id
            if(left_chat_member) this.deleteMessage(chat_id, message_id)
            if(new_chat_members && new_chat_members.length > 0) {
                this.deleteMessage(chat_id, message_id)
                new_chat_members.forEach((n: TelegramUser) => {
                    const { id } = n
                    const name = this.getName(update)
                    this.sendCaptcha(chat_id, id, name)
                })
            }
            if(from) {
                const { is_bot, id } = from
                if(is_bot) this.kickChatMember(id, chat_id)
                if(users[id]) this.handlePendingCaptcha(update)
                else {
                    const userDetails = await this.getChatMember(chat_id, from.id)
                    if(userDetails) {
                        const { status } = userDetails
                        if(status === TelegramChatMemberStatus.Member) {
                            this.deleteMessage(chat_id, message_id)
                        }
                    }
                }
            }
        }
        if(callback_query) {
            const { data } = callback_query
            if(data?.includes(TelegramQueries.NewCaptcha)) {
                this.newCaptcha(update)
            }
        }
    }

    async handlePendingCaptcha(update: TelegramUpdate) {
        const name = this.getName(update)
        const { message } = update
        if(message) {
            const { text, from, chat } = message
            if(from && message && chat) {
                const chat_id = chat.id
                const {id} = from
                const { captcha, message_id, timeout } = users[id]
                if(text === captcha) {
                    delete users[id]
                    clearTimeout(timeout)
                    this.deleteMessage(chat_id, message_id)
                    this.deleteMessage(chat_id, message.message_id)
                    const welcomeMessage = await this.sendMessage(chat_id, `Captcha solved successfully!, ${name} Welcome to XPDiem!`)
                    setTimeout(() => {
                        this.deleteMessage(chat_id, welcomeMessage.result.message_id)
                    }, 1000 * 10)
                } else {
                    this.deleteMessage(chat_id, message.message_id)
                }
            }
        }

    }

    getName(update: TelegramUpdate) {
        const {message} = update
        if(message) {
            const { from } = message
            if(from) {
                const { username, first_name, last_name } = from
                return username ? `@${username}` : first_name + (last_name ? ` ${last_name}` : '')
            }
        }
        return ''
    }

    async deleteMessage(chat_id: number | string, message_id: number) {
        return await this.action('deleteMessage', {message_id, chat_id})
    }

    async sendMessage(chat_id: number, text: string) {
        return await this.action('sendMessage', {chat_id, text})
    }

    async kickChatMember(user_id: number, chat_id: number, unban?: boolean) {
        const kick = await this.action('kickChatMember', {user_id, chat_id})
        if(unban) await this.action('unbanChatMember', {chat_id, user_id, only_if_banned: true})
        return kick
    }

    async getChatMember(chat_id: number, user_id: number): Promise<TelegramChatMember> {
        const res = await this.action('getChatMember',{chat_id, user_id})
        return res.ok ? res.result : undefined
    }

    async newCaptcha(update: TelegramUpdate) {
        const { callback_query } = update
        console.log(update)
        if(callback_query) {
            const { message, from, data } = callback_query
            console.log(callback_query, message, from)
            if(message && from && data && data.includes(from.id.toString())) {
                const { id } = from
                const { chat, message_id, reply_markup, caption } = message
                const chat_id = chat.id
                const captcha = await this.generateCaptcha()
                await new TelegramBot().action('editMessageMedia', {
                    message_id,
                    chat_id,
                    reply_markup,
                    media: {
                        type:'photo',
                        media: API + captcha.id,
                        caption
                    }
                })
                users[id].captcha = captcha.captcha
            }

        }

    }

    async sendCaptcha(chat_id: number, user_id: number, name: string) {
        const captcha = await this.generateCaptcha()

        const data = await new TelegramBot().action('sendPhoto', {
            chat_id,
            photo: API + captcha.id,
            caption: `Hi ${name}, welcome to XPDiem. Please write a message with the numbers and/or letters in the image above to verify that you are human. If you fail to solve the captcha within 5 minutes of this message, you will be kicked from XPDiem's telegram group.`,
            reply_markup: {
                "inline_keyboard": [
                    [
                        {"text": "New Captcha", "callback_data": TelegramQueries.NewCaptcha + '-' + user_id},
                    ]
                ]
            }
        })
        // set timeout for kick and message deletion
        if(data) {
            const { message_id } = data.result
            const timeout = setTimeout(() => {
                console.log('Kicking user', user_id, name, 'from', chat_id)
                this.kickChatMember(user_id, chat_id, true)
                this.deleteMessage(chat_id, message_id)
            }, 1000 * 60 * 5)
            users[user_id] = {
                timeout,
                message_id,
                captcha: captcha.captcha
            }
        }

    }

    async generateCaptcha() {
        const captcha = captchagen.create()
        captcha.generate()
        const buffer = captcha.buffer()
        const id = `/public/${randomId(7)}.png`
        const p = path.resolve(__dirname + '/../..' + id)
        fs.writeFileSync(p, buffer)
        return {id, captcha: captcha.text()}
    }

    async action(action: string, params: any) {
        const config = {
            params
        }
        try {
            const res = await axios.get(`https://api.telegram.org/bot${token}/${action}`, config)
            const { ok } = res.data
            if(ok) return res.data
        } catch(err) {
            console.log(err.message, 'error', action ,params)
            return undefined
        }
    }
}