const urls = { // urls de produção
  baseURL: '',
  baseDNS: '',
  baseWEB: '',
}

// urls de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  urls.baseURL = 'http://172.10.100.58:8088'
  urls.baseDNS = 'http://172.10.100.58:8088'
  urls.baseWEB = 'http://172.10.100.58:8088'
}

module.exports = urls
