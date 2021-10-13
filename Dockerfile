FROM node:12-slim

WORKDIR /usr/src/app
COPY gen/srv .
RUN npm install
COPY app app/
RUN find app -name '*.cds' | xargs rm -f
RUN find app -name 'my.db' | xargs chmod 777
RUN chown -R node:node /usr/src/app/app/var
RUN chmod 777 /usr/src/app/app/var
RUN chmod +x /usr/src/app/app/entrypoint.sh
RUN chown -R node:node /usr/src/app/package.json
RUN chmod 777 /usr/src/app/package.json
RUN chmod 777 /usr/src/app
RUN chown -R node:node /usr/src/app/app/var/tmp
RUN chmod 777 /usr/src/app/app/var/tmp

EXPOSE 4004
# Changing to a non-root user prevents pvc mounts to be unusable
#USER node
# CMD [ "npm", "start" ]
CMD /bin/bash /usr/src/app/app/entrypoint.sh