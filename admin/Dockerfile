FROM node:"14.16.1" as builder
RUN mkdir  -p /home/globeetrotteradmin
RUN mkdir /home/globeetrotteradmin/admin
WORKDIR /home/globeetrotteradmin/admin
ADD . /home/globeetrotteradmin/admin
ADD package.json /home/globeetrotteradmin/admin
#ADD protractor.conf.js /home/globeetrotteradmin/admin
ADD angular.json /home/globeetrotteradmin/admin
#ADD karma.conf.js /home/globeetrotteradmin/admin
RUN npm cache clean --force
RUN npm -g config set user root
#RUN npm set progress=false

#RUN rm -rf node_modules
RUN npm install -global typescript@4.1.5
RUN npm install -g @angular/cli@11.2.11
#RUN npm install ng2-charts@2.2.3
RUN npm install

#RUN npm list -g --depth=0
#RUN npm i -g npm-check-updates
#RUN npm-check-updates -u
#RUN npm install

#RUN ng build --aot=false
#RUN ng build --prod --build-optimizer
#RUN node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --prod --build-optimizer
RUN node --max_old_space_size=4192 node_modules/@angular/cli/bin/ng build --prod --build-optimizer

#RUN ls -al
#RUN ng serve --host=192.168.0.205 --port=4200
FROM nginx:latest
COPY conf.d/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html
COPY src/ /usr/share/nginx/html
RUN ls -al
COPY --from=builder /home/globeetrotteradmin/admin/dist/ /usr/share/nginx/html
COPY --from=builder /home/globeetrotteradmin/admin/src /usr/share/nginx/html/src
WORKDIR /usr/share/nginx/html
RUN ls -al

#EXPOSE 8083

CMD ["nginx", "-g", "daemon off;"]
#EXPOSE 4200
# Serve the app

#CMD ["npm", "start"]
