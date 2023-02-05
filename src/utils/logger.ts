const pino = require("pino");
const log = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  //timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
