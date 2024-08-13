

import axios from "axios"

let handler = async (m, {command, conn, usedPrefix}) => {
let res = (await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/anime-${command}.json`)).data  
let haha = await res[Math.floor(res.length * Math.random())]   
conn.sendFile(m.chat, haha, 'error.jpg', `*${command}*`, m, null, rcanal)
}

handler.command = handler.help = ['alisa', 'aihoshino', 'remcham', 'akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumitokisaki', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura']
handler.tags = ['anime']
} catch {
}}
handler.help = ['anime']
handler.tags = ['img']
handler.command = ['anime']
handler.register = true 
//handler.limit = 1
export default handler


