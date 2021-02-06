const fetch = require('node-fetch');
class Router {
  constructor(rest, method, path, options) {
    this.rest = rest;
    this.method = method;
    this.options = options;
    this.path = `${path}`;
    let queryString = '';
    if (options.query) {
      const query = Object.entries(options.query)
        .filter(([, value]) => ![null, 'null', 'undefined'].includes(value) && typeof value !== 'undefined')
        .flatMap(([key, value]) => (Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]));
      queryString = new URLSearchParams(query).toString();
    }
    this.path = `${path}${queryString && `?${queryString}`}`;
    this.route = this.path;


  }
  make() {
     const url = this.rest.path + this.path;
    return fetch(url, { method: this.method, headers: this.options.headers })
  }
}


const noop = () => {};
const methods = ['get', 'post', 'delete', 'patch', 'put'];
const reflectors = [
  'toString',
  'valueOf',
  'inspect',
  'constructor',
  Symbol.toPrimitive,
  Symbol.for('nodejs.util.inspect.custom'),
];

function buildRoute(manager) {
  const route = [''];
  const handler = {
    get(target, name) {
      if (reflectors.includes(name)) return () => route.join('/');
      if (methods.includes(name)) {
        const routeBucket = [];
        for (let i = 0; i < route.length; i++) {
          routeBucket.push(route[i]);
        }
        return options =>
          manager.request(
            name,
            route.join('/'),
            options
          )
      }
      route.push(name);
      return new Proxy(noop, handler);
    }

  };
  return new Proxy(noop, handler);
}
module.exports = {Router,buildRoute};
