# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


deployment on AWS for Frontend

signup in AWS
create an ec2 instance - i choose ubuntu
then connect using ssh client from command line and establish the connection to server using those commands 
chmod 400 "dev-tinder-secret.pem" secret-key
ssh -i "dev-tinder-secret.pem" ubuntu@ec2-3-144-175-225.us-east-2.compute.amazonaws.com //to connect to aws ec2 instance



install node.js 
to run without errors install version which is same as in your local pc i.e., mine now is 22.11.0

use curl command shown in node.js website
restart the terminal
 then install exact version by using nvm install i.e., 22.11.0

 then locate the folders in github and get the code by http link and write
 git clone "github link"
 now the project is clone and we can see by using ls command
 then do npm install and then npm run build
 then install nginx before that update the system by using
 sudo apt update then do 
 sudo apt install nginx
 then to start ngnix we write as 
 sudo systemctl start nginx
 then to keep it running we do 
 sudo systemctl enable nginx
 then enable port 80 on instance as nginx run on port 80
 then on instance find an option as security group then add a rule  to allow access to port 80
 add a rule in inbound rules and ip select as 0.0.0.0/0 which means anywhere this can be accessed and save the rules 


for Backend
updated password for database
in mongo db account allow network access of AWS IP address which is given for instance public IP address 
my backend is active on port 3000
so to accept request from port 3000, i will add this port in security groups in the instance
pm2 is a process manager that helps to manage and keep application running 24/7 for backend for node.js
npm install pm2 -g (-g means intall it globally)
to keep running our backend using pm2 in prod mode
pm2 start npm -- start

pm2 logs - to check the logs if application is not running or any failure occurs

pm2 flush npm  - to clear the logs of npm 

now if we check we dont see the application

pm2 list -  list all the process started by pm2

pm2 delete npm - to delete the process with name npm

pm2 start npm -- name "devtinder backend" -- start //to give custom name to the application 

To connect backend with frontend
Frontend: http://18.191.18.30 running here
Backend: http://18.191.18.30:3000 running here

if Domain name: eg: Devtinder   mapped to => 18.191.18.30
then it becomes 

Frontend: devtinder.com 
Backend: devtinder.com:3000 we can map this as => devtinder.com/api

we can achieve the above process by nginx by nginx proxy pass
nginx is a web server but also works as load balancer

to access nginx config file, we need root level permission
sudo nano /etc/nginx/sites-available/default

write this codes below

update server name with ip address 18.191.18.30

 location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
    rewrite ^/api/(.*)$ /$1 break;
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_cache_bypass $http_upgrade;
}

save the code written in nginx and then restart nginx
using sudo systemctl restart nginx

if any failure occurs change the above code run backend server using pm2 make sure to check the logs with status as online and running then restart nginx it will work

update the base-url in the frontend which was localhost:3000 to /api and before /api the url directly comes here
