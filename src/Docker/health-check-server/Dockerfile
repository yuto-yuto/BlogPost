FROM yutona/nodejs
EXPOSE 80
ENV LOGGER_API_URL="http://log-server:80/"

CMD node ./lib/server.js
HEALTHCHECK --interval=1s --timeout=5s --start-period=5s --retries=3 \
            CMD curl --fail http://localhost/status || exit 1

WORKDIR /app
COPY ./node_modules/ /app/node_modules/
COPY ./dist/ /app/
