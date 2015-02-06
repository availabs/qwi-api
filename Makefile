basics:
	npm install sails-postgresql -save
	npm install react -save
	sails generate api qwi
	cp ../Qwi-React/config/connections.js config/connections.js 
	cp ../Qwi-React/config/log.js config/log.js 
	cp ../Qwi-React/config/models.js config/ 
	cp ../Qwi-React/config/routes.js config/ 
	echo add react to tasks/register/compileAssets.js tasks/register/syncAssets.js
