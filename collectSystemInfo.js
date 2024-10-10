import { promises as fs } from 'node:fs'
import si from 'systeminformation'
import os from 'os'

// Funcao para coletar informacoes do sistema
async function collectSystemInfo() {
  try {
    const system = await si.system()
    const cpu = await si.cpu()
    const memory = await si.mem()

    // Criacao de um objeto com as informacoes desejadas
    const data = {
      'Nome do Computador': system.model,
      'Versão do Sistema Operacional': os.version(),
      'Serial Number da BIOS': system.bios?.serial || 'N/A',
      'Modelo do Computador': system.model,
      'Modelo da CPU': cpu.brand,
      'Qualidade de Memória RAM': `${Math.round((memory.active / memory.total) * 100)}`
    }

    // Conversao do objeto para CSV
    const csv = Object.keys(data).join(',') + '\n' + Object.values(data).join(',')

    //Salvando o CSV em um arquivo
    await fs.writeFile('system_info.csv', csv)
    console.log('Informações salvas em system_info.csv')
  } catch (error) {
    console.error('Erro ao coletar informações do sistema:', error)
  }
}

// Executando a funcao
collectSystemInfo()