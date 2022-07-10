import { createApp } from './app';

const DEFAULT_PORT = 3000;

async function main() {
  // Initialise the server framework and routing
  const server = createApp()

  server.listen(DEFAULT_PORT);

  console.info(`Server listening at http://localhost:${DEFAULT_PORT}`);
}

main();
