#!make
include .env

bundle:
	zip -r bundle.zip .next public package-lock.json package.json -x .next/cache/\*

upload_bundle:
	scp -i ./keys/web_server_key.pem bundle.zip ubuntu@${WEB_SERVER_HOST}:~/app/

upload_deploy_script:
	scp -i ./keys/web_server_key.pem deploy.sh ubuntu@${WEB_SERVER_HOST}:~/app/

execute_deploy_script:
	ssh -i ./keys/web_server_key.pem ubuntu@${WEB_SERVER_HOST}:/home/ubuntu "bash deploy.sh"

upload_public_folder:
	scp -i ./keys/web_server_key.pem -r public ubuntu@${WEB_SERVER_HOST}:/home/ubuntu/app
