import socketio
from main import ask_question

sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/' : './static/', '/static/favicon.svg' :"favicon.svg",
})

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

@sio.event
def handle_query(sid, query):
    print('question ', query)
    sio.emit('question', {'question': query}, to=sid)
    answer = ask_question(query)
    print('answer ', answer)
    sio.emit('answer', {'answer': answer}, to=sid)
