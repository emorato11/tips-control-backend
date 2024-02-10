export const streamToBufferAsync = async ({stream, toUTF8 = false}) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    stream.on('end', () => {
      const buffer = Buffer.concat(chunks);

      if (toUTF8) {
        buffer.toString('utf8');
      }

      resolve(buffer);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}
