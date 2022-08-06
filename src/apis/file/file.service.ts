import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);

    const storage = new Storage({
      projectId: 'omega-research-357204',
      // keyFilename: 'omega-research-357204-a9c0c0e69b89.json',
      //배포용?
      keyFilename: '/my-secret/omega-research-357204-a9c0c0e69b89.json',
    }).bucket('dabaeimage0');

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`dabaeimage0/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    );

    return results;
  }
}
