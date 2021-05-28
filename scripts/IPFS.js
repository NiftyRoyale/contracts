require('dotenv').config();
const { NFTStorage, Blob } = require('nft.storage');
const { IPFS_API_KEY }= process.env;
const client = new NFTStorage({ token: IPFS_API_KEY });

const main = async (file, description, name, attributes) => {
  try {
    const fileCid = await client.storeDirectory(file);

    const metadata = JSON.stringify({
      description,
      external_url: "https://niftyroyale.com",
      image: `https://ipfs.io/ipfs/${fileCid}`,
      name,
      attributes
    });

    const content = new Blob(metadata);
    const cid = await client.storeBlob(content);

    console.log(`https://ipfs.io/ipfs/${cid}`);
  } catch (e) {
    console.error(e);
  }
}

const fs = require('fs');

fs.readFile('blaid-logo.png', (err, data) => {
  if (err) throw err // Fail if the file can't be read.
  main(data, 'test description', 'test name', ['value']);
});
