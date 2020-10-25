FROM yuto/nodejs-dev as builder

RUN npm install typescript -g
WORKDIR /http-server

COPY ./package.json .
RUN npm install
COPY . .

RUN npm run build

FROM yuto/nodejs
EXPOSE 80
RUN mkdir /data
CMD [ "node", "./http-server/dist/app.js" ]
COPY --from=builder /http-server/dist/ /http-server/dist/
