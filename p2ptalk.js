import { Server } from "https://js.sabae.cc/Server.js";
import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

const data = new JSONDB("sdp.json");

class MyServer extends Server {
  api(path, req) {
    if (path == "/api/list") {
      return data.data;
    } else if (path == "/api/get") {
      return data.data.find(d => d.id == req);
    } else if (path == "/api/set") {
      const n = data.data.findIndex(d => d.id == req);
      if (n < 0) {
        data.data.push(req);
      } else {
        data.data[n] = req;
      }
      data.write();
      return "ok";
    } else if (path == "/api/add") {
      data.data.push(req);
      data.write();
      return "ok";
    } else if (path == "/api/remove") {
      if (Array.isArray(req)) {
        req.forEach(id => {
          const n = data.data.findIndex(d => d.id == id);
          if (n >= 0) {
            data.data.splice(n, 1);
          }
        });
      } else {
        const n = data.data.findIndex(d => d.id == req);
        if (n >= 0) {
          data.data.splice(n, 1);
        }
      }
      data.write();
      return "ok";
    }
  }
}

const port = Deno.args[0] || 8001;
new MyServer(port);
