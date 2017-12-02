const urls = { // urls de produção
  baseURL: 'http://192.168.29.147:8088',
  baseDNS: 'http://voluntariado.algar.com.br:8088',
  baseWEB: 'http://voluntariado.algar.com.br',
}

// urls de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  urls.baseURL = 'http://172.10.100.58:8088'
  urls.baseDNS = 'http://172.10.100.58:8088'
  urls.baseWEB = 'http://172.10.100.58:8088'
}

module.exports = urls
