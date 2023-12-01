# documentation-cipher

## Project description

On boarding new employees, getting them trained in their job function, and ensuring they understand company policies and procedures is a large undertaking. The burden continues as an employee becomes more tenured. Documentation changes overtime, and it is important to continuously reference documentation to ensure the needs of different departments are met. Creating a tool that will allow team members to quickly search company documentation using questions written in natural language will greatly speed up the time an employee spends searching for the answer, and will increase compliance with updated documentation for tenured employees.

By using tools available through LangChain and Open AI, this project strives to help employees process company documentation quickly, and in a manner similar to chatGPT. This proof of concept uses Notion as the documentation tool.


#### Development notes

To run application locally cd into app and run `pnpm run build` and then `gunicorn -k eventlet -w 1 --reload app:app` to start python socketio.

Then run `pnpm run preview` and open the preview in the web browser. This application can also be run in a docker container. See docker section below.

To keep frontend code looking clean run `pnpm prettier --write . --plugin=prettier-plugin-astro`

#### docker

To run in docker cd into app and run`docker build -t app . ` and `docker run -d --name app -p 8000:8000 app`

Helpful
`docker logs app`, `docker rm [NAME]`

#### Test commands

for python run `python3 -m unittest [FILENAME] (ie. test_app.py)`

for playwrite (frontend) `pnpm playwright test [FILENAME] (ie index.spec.ts)`


#### Backlog
* Show documents referenced under response
* authentication 
* update document reader to pull live from Notion - Discovery required
* Show users history
* Show frequently asked questions in the organization
* Collect information from users on if a response was useful. This can be added to a management dashboard to update documentation.
* Create different ways for users to ask questions  
* Explore ways to make pinecone more efficient.
