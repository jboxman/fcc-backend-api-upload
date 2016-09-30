import fs from 'fs';
import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';

// For testing:
// https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
export default function() {
  const app = express();

  const port = process.env.PORT || 3100;

  // __dirname is '/' after babel
  app.use(express.static(`${process.cwd()}/public`));

  app.use(bodyParser.json());

  app.post(
    '/post',

    multer({
      dest: '/tmp',
      limits: {fileSize: 1024*1024*5}
    }).any(),

    (req, res) => {
      let fileSize = 0;
      let fileName = '';
      let path = '';

      if(req.files && req.files[0]) {
        fileSize = req.files[0].size;
        fileName = req.files[0].originalname;
        path = req.files[0].path;
      }

      // unlink
      if(path) {
        fs.unlinkSync(path);
      }

      res.status(200).json({
        fileName,
        fileSize
      });
  });

  app.use(function(req, res, next) {
    res.status(404).send('Not Found');
  });

  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('error');
  });

  const server = app.listen(port, () => console.log(`Listening on ${port}`));
  return server;
};
