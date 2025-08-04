# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


deployment on AWS

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
 