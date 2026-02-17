Le frontend a été fait. Mais le projet fonctionne très bien sans.  


**Commandes:**  

Terminal 1:
```
cd ./backend/
npm i
npm run dev
```

Terminal 2:
```
cd ./frontend/
npm i
npm run dev
```

Requêtes:
```
POST /api/auth/login
POST /api/auth/register

GET /api/pokemons
GET /api/pokemons?type=Fire
GET /api/pokemons?name=char
GET /api/pokemons?sort=-base.HP
GET /api/pokemons?page=2&limit=20
GET /api/pokemons?type=Fire&sort=-base.Attack&page=1&limit=5

GET /api/pokemons/:id

POST /api/pokemons
PUT /api/pokemons/:id
DELETE /api/pokemons/:id

POST /api/favorites/:pokemonId
DELETE /api/favorites/:pokemonId

GET /api/favorites

POST /api/teams
GET /api/teams
GET /api/teams/:id
PUT /api/teams/:id
DELETE /api/teams/:id

GET /api/stats
```

**🔒 Routes protégées**  
``` 
GET /api/pokemons	❌ Auth requise  
GET /api/pokemons/:id	❌ Auth requise  
POST /api/pokemons	✅ Auth requise  
PUT /api/pokemons/:id	✅ Auth requise  
DELETE /api/pokemons/:id	✅ Auth requise  
/api/favorites/*	✅ Auth requise  
/api/teams/*	✅ Auth requise  
``` 
