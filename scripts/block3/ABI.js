const https = require('https');

module.exports = (address, apiKey, network) => {
  return new Promise((resolve, reject) => {
    let chain = 'api';
    if (network || network !== 'mainnet') chain += `-${network}`;
    const path = `https://${chain}.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;
    https.get(path, (resp) => {
      let data = '';

      resp.on('data', (chunk) => data += chunk);

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        const { result } = JSON.parse(data);
        const abi = JSON.parse(result);

        return resolve(abi);
      });
    })
    .on("error", (e) => {
      return reject(e);
    });
  });
};
