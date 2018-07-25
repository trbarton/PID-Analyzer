import tornado
from tornado import websocket, web, ioloop
import os, uuid
import json
from PIDAnalyzer import runThenMessageOnCompletion, publisher

cl = []
__UPLOADS__ = "uploads/"

# ------------ create a listener ------------------

def listener1(arg1):
    print('Function listener1 received:')
    print('  arg1 =', arg1)
    for c in cl:
      c.write_message(json.dumps(arg1))


# ------------ register listener ------------------

publisher.subscribe(listener1, 'rootTopic')


class BaseHandler(web.RequestHandler):

    def set_default_headers(self, *args, **kwargs):
        self.set_header("Access-Control-Allow-Origin", "http://127.0.0.1:4200")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

    def post(self):
        self.write('some post')

    def get(self):
        self.write('some get')

    def options(self):
        # no body
        self.set_status(204)
        self.finish()

# class IndexHandler(BaseHandler):
#     def get(self):
#         self.render("index.html")

class UploadHandler(BaseHandler):

    def post(self):
        fileinfo = self.request.files['myFile'][0]
        fname = fileinfo['filename']
        extn = os.path.splitext(fname)[1]
        cname = str(uuid.uuid4()) + extn
        fh = open(__UPLOADS__ + cname, 'wb')
        fh.write(fileinfo['body'])
        response = {
          'name': cname
        }
        self.finish(json.dumps(response))

class SocketHandler(websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        if self not in cl:
            cl.append(self)

    def on_message(self, message):
        message = json.loads(message)
        if 'message_type' in message.keys():
          if message['message_type'] == "start":
            figures = runThenMessageOnCompletion(message['logfile'], cl)
            self.write_message(json.dumps({
              'message_type': 'finish',
              'plot1': figures[0],
              'plot2': figures[1],
            }))

    def on_close(self):
        if self in cl:
            cl.remove(self)

def broadcastMessage(message):
  data = {"message_type": 'update', "message" : message}
  data = json.dumps(data)
  for c in cl:
    c.write_message(data)

app = web.Application([
    # (r'/', IndexHandler),
    (r"/api/upload", UploadHandler),
    (r'/api/ws', SocketHandler),
    (r'/plots/(.*)', tornado.web.StaticFileHandler, {'path': './uploads/plot'})
], debug=True)

if __name__ == '__main__':
    app.listen(8888)
    ioloop.IOLoop.instance().start()