import { smsg } from './lib/simple.js'
import { format } from 'util' 
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fetch from 'node-fetch'

const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

export async function handler(chatUpdate) {
    this.msgqueque = this.msgqueque || []
    if (!chatUpdate) return
    this.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m) return
    if (global.db.data == null) await global.loadDatabase()
    try {
        m = smsg(this, m) || m
        if (!m) return
        m.exp = 0
        m.limit = false
        try {
            let user = global.db.data.users[m.sender] || {}
            global.db.data.users[m.sender] = {
                exp: user.exp || 0,
                limit: user.limit || 10,
                premium: user.premium || false,
                premiumTime: user.premiumTime || 0,
                registered: user.registered || false,
                name: user.name || m.name,
                age: user.age || -1,
                regTime: user.regTime || -1,
                afk: user.afk || -1,
                afkReason: user.afkReason || '',
                banned: user.banned || false,
                useDocument: user.useDocument || false,
                bank: user.bank || 0,
                level: user.level || 0,
            }

            let chat = global.db.data.chats[m.chat] || {}
            global.db.data.chats[m.chat] = {
                isBanned: chat.isBanned || false,
                bienvenida: chat.bienvenida || true,
                antiLink: chat.antiLink || false,
                onlyLatinos: chat.onlyLatinos || false,
                nsfw: chat.nsfw || false,
                expired: chat.expired || 0,
            }

            let settings = global.db.data.settings[this.user.jid] || {}
            global.db.data.settings[this.user.jid] = {
                self: settings.self || false,
                autoread: settings.autoread || false,
                status: settings.status || 0,
            }
        } catch (e) {
            console.error(e)
        }

        if (opts['nyimak']) return
        if (!m.fromMe && opts['self']) return
        if (opts['swonly'] && m.chat !== 'status@broadcast') return
        if (typeof m.text !== 'string') m.text = ''

        const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number.replace(/[^0-9]/g, '') + '@s.whatsapp.net')].includes(m.sender)
        const isOwner = isROwner || m.fromMe
        const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || user.premium == true

        if (opts['queque'] && m.text && !(isMods || isPrems)) {
            let queque = this.msgqueque, time = 1000 * 5
            const previousID = queque[queque.length - 1]
            queque.push(m.id || m.key.id)
            setInterval(async () => {
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                await delay(time)
            }, time)
        }

        if (m.isBaileys) return
        m.exp += Math.ceil(Math.random() * 10)

        let usedPrefix

        const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
        const participants = (m.isGroup ? groupMetadata.participants : []) || []
        const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {}
        const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {}
        const isRAdmin = user?.admin === 'superadmin' || false
        const isAdmin = isRAdmin || user?.admin === 'admin' || false
        const isBotAdmin = bot?.admin || false

        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
        for (let name in global.plugins) {
            let plugin = global.plugins[name]
            if (!plugin || plugin.disabled) continue

            const __filename = join(___dirname, name)
            if (typeof plugin.all === 'function') {
                try {
                    await plugin.all.call(this, m, { chatUpdate, __dirname: ___dirname, __filename })
                } catch (e) {
                    console.error(e)
                }
            }

            // Custom prefix and commands
            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
            let _prefix = plugin.customPrefix || conn.prefix || global.prefix
            let match = (_prefix instanceof RegExp ? [[_prefix.exec(m.text), _prefix]] :
                Array.isArray(_prefix) ? _prefix.map(p => [p.exec(m.text), p]) :
                typeof _prefix === 'string' ? [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                [[[], new RegExp]]
            ).find(p => p[1])
            
            // Run plugin
            if (typeof plugin.before === 'function') {
                try {
                    await plugin.before.call(this, m, { match, conn: this, groupMetadata, participants, isROwner, isOwner, isAdmin, isBotAdmin, isPrems, __dirname: ___dirname, __filename })
                } catch (e) {
                    console.error(e)
                }
            }
        }
    } catch (e) {
        console.error(e)
    }
}

global.dfail = (type, m, conn) => {
    let msg = {
        rowner: '⚠️ Este comando solo puede ser usado por el Creador.',
        owner: '⚠️ Este comando es exclusivo del Creador.',
        mods: '⚠️ Este comando requiere permisos de Moderador.',
        premium: '⚠️ Este comando es exclusivo de usuarios Premium.',
        group: '⚠️ Este comando solo funciona en grupos.',
        private: '⚠️ Este comando solo funciona en privado.',
        admin: '⚠️ Este comando requiere permisos de Administrador.',
        botAdmin: '⚠️ Este comando requiere que el bot sea Administrador.',
    }[type]
    if (msg) conn.reply(m.chat, msg, m)
}

watchFile(global.__filename(import.meta.url), () => {
    unwatchFile(global.__filename(import.meta.url))
    console.log(chalk.magenta('Se actualizó el archivo handler.js'))
})