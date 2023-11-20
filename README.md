This is a full-stack project. And this project was created with [ViteJs](https://vitejs.dev/) for the front end and also for backend [Nodejs](https://nodejs.org/en/). Also, I used [TyprORM](https://typeorm.io/) for database design.

Video available on the youtube
```
https://youtu.be/m3_qqCoLs00
```
or [CLICK ME](https://youtu.be/m3_qqCoLs00)

To use this code, you have to just clone this repository with this command and following the below command
```
git clone https://github.com/devlopersabbir/full-stack-app-with-vite-and-typeorm.git
```
Now you can see, here have two different folders called `api` and `client`
 - Now, just go to the api folder with `cd api` command and then make a command `yarn` or `npm install` if you are using yarn then you can use just `yarn` otherwise you can use `npm install`.
 - In the same way, you have to change your directory using `cd ../client` then just make `yarn` or `npm install` command. That's it.

> So far our repository clone successfully and also our dependency installed.

Now, we have to create our database inside our localhost. For this purpose, I'm using [MySQL](https://www.mysql.com/) and to run the local server I used [Xammp](https://www.apachefriends.org/) which is very popular. Or if you want you can use any others application to run your localhost server and DB. 
#### If you are finished everything with me then, I have to must say congratulations.
At that time, we have to just change our DB name.
```js
export const AppDataSource = new DataSource({
	type: "mysql", // this is our DB type. at that moment I'm using mySQL database
	host: "localhost", // It's our hostname
	port: 3306, // and this is our port number. If you want you can search on the google what is the port number for mySQL db. then you found it very easyly
	username: "root", // this is user DB username
	password: "", // And this is our DB password
	database: "youtube", // my database name is {{youtube}}
	synchronize: false, // for the one time you have replaced with false to true
	logging: false, // if you make it logging: true then you can see all log in your console
	entities: [Books], // It's our entity...
});
```
You can find this code into your `api/src/data-source.ts` directory.
##### Alright, everything is finished
Now we are ready to run our `client side` and also `api` to do that, just type
```
For backend start
npm run dev
or
yarn dev

For front-end start
npm run dev
or
yarn dev
```

## For Support just Buy Me A Coffee
https://www.buymeacoffee.com/devlopersabbir
