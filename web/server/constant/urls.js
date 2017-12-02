const urls = { // urls de produção
  baseURL: 'http://192.168.29.147:8088',
  baseDNS: 'http://voluntariado.algar.com.br:8088',
  baseWEB: 'http://voluntariado.algar.com.br',
}

// urls de homologação
if (process.env.NODE_ENV === 'test') {
  urls.baseURL = 'http://192.168.29.19:8088'
  urls.baseDNS = 'http://voluntariadohml.algar.local:8088'
  urls.baseWEB = 'http://voluntariadohml.algar.local'
}
// urls de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  // urls.baseURL = 'http://192.168.1.114:8088'
  // urls.baseDNS = 'http://192.168.1.114:8088'
  // urls.baseWEB = 'http://192.168.1.114:8000'
  urls.baseURL = 'http://localhost:8088'
  urls.baseDNS = 'http://localhost:8088'
  urls.baseWEB = 'http://localhost:8000'
}

module.exports = urls
