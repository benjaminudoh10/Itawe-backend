import { app } from './src/app';
import { Database } from './src/connection/connection';

async function run() {
  try {
    await new Database().getConnection();
  } catch (e) {
    console.log('Failed to connect to database');
  }
  const PORT = parseInt(process.env.PORT as string, 10);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

run()
  .then(() => console.log('Running'))
  .catch((e) => console.log('Error', e));
