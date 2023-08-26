const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

const nodeModulesPath = path.join(__dirname, 'node_modules');
const licensesPath = path.join(__dirname, 'licenses');

const downloadLicenses = async () => {
  try {
    if (!fs.existsSync(licensesPath)) {
      fs.mkdirSync(licensesPath);
    }

    const dependencies = packageJson.dependencies || {};

    for (const dependencyName in dependencies) {
      const dependencyPath = path.join(nodeModulesPath, dependencyName);
      const licenseFilePath = path.join(dependencyPath, 'LICENSE');
      const targetLicensePath = path.join(licensesPath, `LICENSE_${dependencyName.replace('/', '-')}`);

      if (fs.existsSync(licenseFilePath)) {
        const licenseContent = fs.readFileSync(licenseFilePath, 'utf-8');
        fs.writeFileSync(targetLicensePath, licenseContent);
        console.log(`Licença de ${dependencyName} salva em ${targetLicensePath}`);
      } else {
        console.log(`Licença não encontrada para ${dependencyName}`);
      }
    }
  } catch (error) {
    console.error('Erro:', error.message);
  }
};

downloadLicenses();
