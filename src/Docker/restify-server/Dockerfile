FROM yuto/nodejs
EXPOSE 80
ENV LOGGER_API_URL="http://log-server:80/"
WORKDIR /app
COPY ./node_modules/ /app/node_modules/
COPY ./dist/ /app/
CMD [ "node", "./lib/server.js" ]

