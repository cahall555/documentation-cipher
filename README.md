# documentation-cipher

## Project description

On boarding new employees, getting them trained in their job function, and ensuring they understand company policies and procedures is a large undertaking. The burden continues as an employee becomes more tenured. Documentation changes overtime, and it is important to continuously reference documentation to ensure the needs of different departments are met. Creating a tool that will allow team members to quickly search company documentation using questions written in natural language will greatly speed up the time an employee spends searching for the answer, and will increase compliance with updated documentation for tenured employees.

By using tools available through LangChain and Open AI, this project strives to help employees process company documentation quickly, and in a manner similar to chatGPT. This proof of concept uses Notion as the documentation tool.


#### Development notes

run: `gunicorn -k eventlet -w 1 --reload app:app` to start python socketio

To keep frontend code looking clean run `pnpm prettier --write . --plugin=prettier-plugin-astro`

#### docker

run `docker build -t app . ` and `docker run -d --name app -p 8000:8000 app`

Helpful
`docker logs app`, `docker rm [NAME]`

#### Test commands

for python run `python3 -m unittest [FILENAE] (ie. test_app.py`

for playwrite (frontend) `pnpm playwright test [FILENAME] (ie index.spec.ts)`

## ToDo's

#### Must haves
* Write tests
* Deploy - Discovery required [review](https://medium.com/containers-on-aws/building-a-socket-io-chat-app-and-deploying-it-using-aws-fargate-86fd7cbce13f)
* Update readme files
* Make UI mobile friendly

#### Nice to haves
* Show documents referenced under response
* authentication 
* update document reader to pull live from Notion - Discovery required
* Show users history
* Show frequently asked questions in the organization
* Collect information from users on if a response was useful. This can be added to a management dashboard to update documentation.
* Show frequently asked questions outside of company documentation
* Create different ways for users to ask questions  

