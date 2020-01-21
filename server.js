// Подключаем нужные библиотеки
var io = require('socket.io')(process.env.PORT || 1337);
var shortid = require('shortid');

// Выводим сообщение, что клиент запущен
console.log('server started');

// Это функция вызывается, как только подключается клиент
io.on('connection', function (socket) {

	// Генерируем ID для подсоединившегося клиента, т.е. для текущего
    var thisClientId = shortid.generate();

	// Выводим ID текущего клиента
    console.log('client connected, broadcasting spawn, id: ', thisClientId);
	
	// Отправляем сообщение всем клиентам
	socket.broadcast.emit(thisClientId + ' is connected');
	
	// Принимаем сообщение и отсылаем остальным клиентам
	socket.on('message', function (data) {
		// Выводим принятое сообщение в консоль
		console.log('from server: ' + data);
		// Пересылаем принятое сообщение остальным клиентам
		socket.broadcast.emit('message', data + '(from id/' + thisClientId + ')');
	});
	
	// Выводим сообщение, что клиент отсоединился
	socket.on('disconnect', function () {
        console.log('client disconnected');
    });
});