const https = require('https');
const { buildRoute, Router } = require('./Router');
const { Collection } = require('discord.js')
class RESTManager {
  constructor(url, defaultOptions = {}) {
    this.path = url;
    this.default = defaultOptions;
    this.handlers = new Collection();

    if (this.path.startsWith('https')) {
      this.agent = new https.Agent({
        keepAlive: true
      });
      this.default.agent = this.agent;
    }
  };
  request(method, url, options = {}) {
    const apiRequest = new Router(this, method, url, options);
     let handler = this.handlers.get(apiRequest.route);

    if (!handler) {
      this.handlers.set(apiRequest.route, this);
    }
    return apiRequest.make()
  }

  get api() {
    return buildRoute(this);
  }
}
module.exports = RESTManager;