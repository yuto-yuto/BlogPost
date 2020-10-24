FROM yuto/nodejs-dev as builder

RUN npm install typescript -g
WORKDIR /hello-world

COPY ./package.json .
COPY ./tsconfig.json .

COPY ./lib/ ./lib/
RUN npm run build

FROM yuto/nodejs
WORKDIR /hello-world
CMD [ "node", "./dist/app.js" ]
COPY --from=builder /hello-world/dist/ /hello-world/dist/
