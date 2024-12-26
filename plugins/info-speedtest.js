import cp from 'child_process';
import { promisify } from 'util';

const exec = promisify(cp.exec);

const handler = async (m) => {
  try {
    const { stdout } = await exec('python3 speed.py');
    if (stdout.trim()) m.reply(stdout);
  } catch (e) {
    m.reply('Hubo un error al ejecutar el test de velocidad.');
  }
};

handler.help = ['speedtest'];
handler.tags = ['info'];
handler.command = /^(speedtest|stest)$/i;

export default handler;