document.addEventListener('DOMContentLoaded', function() {
    try {
        const app = firebase.app();

        const features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');

        // document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;

        const database = app.database();
        tapa(database);
        getContent(database);
    } catch (e) {
        console.error(e);
         document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
});

function getContent(database) {
	var starCountRef = database.ref('users');
	starCountRef.on('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			console.table(childSnapshot);
			console.table(childSnapshot.key);
			console.table(childSnapshot.val());
		});

	});
}

function tapa(database) {
    var tapa = document.querySelector("#tapa");
    tapa.onclick = function(e) {
        e.preventDefault();
        var name = document.querySelector("#name");
        if (name.value) {
            database.ref('users').push({
                username: name.value,
		    time: firebase.database.ServerValue.TIMESTAMP
            });
        }
    };
}
