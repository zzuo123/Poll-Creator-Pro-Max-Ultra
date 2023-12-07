import express from 'express';
import morgan from 'morgan';
import winston from 'winston';

const port = process.env.PORT || 4000;
const servicePorts = [4001, 4002, 4004];

const app = express();
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
            return `[${info.timestamp}] event-bus service (${process.pid}) ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'event-bus.log' }),
    ],
});

app.use(morgan('dev'));
app.use(express.json());

app.post('/events', async (req, res) => {
  const event = req.body;
  logger.info(`Event Bus (Received Event) ${event.type}`);
  for (const port of servicePorts) {
    try {
      logger.info(`Event Bus (Sending Event to ${port}) ${event.type}`);

      await fetch(`http://localhost:${port}/events`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      logger.error(`Event Bus (Error Sending Event to ${port}) ${event.type} ${err}`);
    }
  }
  res.send({ message : 'ok' });
});

app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
});
