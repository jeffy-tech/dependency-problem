import app from './app';

const DEFAULT_PORT = process.env.PORT || 3000;

app.listen(DEFAULT_PORT, () => {
  console.log(`Server listening at http://localhost:${DEFAULT_PORT}`);
});
