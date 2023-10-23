# documentation-cipher

#### Development notes

run: `gunicorn -k eventlet -w 1 --reload app:app` to start python socketio

To keep frontend code looking clean run `pnpm prettier --write . --plugin=prettier-plugin-astro`

#### docker

run `docker build -t app . ` and `docker run -d --name app -p 8000:8000 app`

Helpful
`docker logs app`, `docker rm [NAME]`

## ToDo's

#### Must haves
* Write tests
* update frontend UI
     - Preserve history with ongoing chat.
     - make chat scrollable [figma](https://www.figma.com/file/S7j0TsmtRqde6y8DR2NIpq/document-cypher?type=design&node-id=0%3A1&mode=design&t=KO9d9XwnjJCCykbk-1) 
* Separate Javascript from HTML
     - Client js in public directory should be updated.
* Deploy - Discovery required [review](https://medium.com/containers-on-aws/building-a-socket-io-chat-app-and-deploying-it-using-aws-fargate-86fd7cbce13f)
* Update readme files

#### Nice to haves
* Show documents referenced under response
* authentication 
* update document reader to pull live from Notion - Discovery required
* Show users history
* Show frequently asked questions in the organization
* Collect information from users on if a response was useful. This can be added to a management dashboard to update documentation.
* Show frequently asked questions outside of company documentation
* Create different ways for users to ask questions  

